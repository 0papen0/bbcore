import * as b from "bobril";
import * as styles from "../styles";
import * as treeNode from "./treeNode";
import { ResultTree } from "../resultTree";
import { ResultNode } from "./resultNode";
import { mouseDownHandler } from "../mouseDownHandler";
import {IBobrilMouseEvent} from "bobril";

export abstract class NestingNode extends treeNode.TreeNode {
    readonly OPEN_SYMBOL: string = "▼ ";
    readonly CLOSED_SYMBOL: string = "■ ";
    parent: NestingNode;
    nestingNodes: NestingNode[] = [];
    resultNodes: ResultNode[] = [];
    name: string;

    constructor(name: string, parentFileStructure: string[], parentDescribeStructure: string[]) {
        super(name, parentFileStructure, parentDescribeStructure);
        this.name = name;
        this.setIsFiltered();
    }

    abstract getHeaderStyle(): any;

    setFilteredDescendantRecursively() {
        this.hasFilteredDescendant = true;

        if (!this.parent) return;

        this.parent.hasFilteredDescendant = true;
        this.parent.setFilteredDescendantRecursively();
    }

    insertResultNodes(...resultNodes: ResultNode[]) {
        resultNodes.forEach(node => {
            if (!node.isFiltered && !this.hasFilteredAncestor && !this.isFiltered) {
                return;
            }

            node.hasFilteredAncestor = node.hasFilteredAncestor || this.hasFilteredAncestor || this.isFiltered;
            if (node.isFiltered) {
                this.setFilteredDescendantRecursively();
            }

            this.resultNodes.push(node);
        });

        this.recalculateContainedResults();
    }

    insertNestingNodes(...nestingNodes: NestingNode[]) {
        nestingNodes.forEach(node => {
            node.parent = this;

            node.hasFilteredAncestor = node.hasFilteredAncestor || this.hasFilteredAncestor || this.isFiltered;
            if (node.isFiltered) {
                this.setFilteredDescendantRecursively();
            }

            this.nestingNodes.push(node);
        });
    }

    traversingInsert(resultNode: ResultNode, nestingNodes?: NestingNode[]) {
        if (!nestingNodes || nestingNodes.length === 0) {
            this.insertResultNodes(resultNode);
        } else {
            let targetNode = this.nestingNodes.find(node => node.nestingID === nestingNodes[0].nestingID);

            if (targetNode) {
                targetNode.traversingInsert(resultNode, nestingNodes.slice(1));
            } else {
                this.insertNestingNodes(nestingNodes[0]);
                this.nestingNodes[this.nestingNodes.length - 1].traversingInsert(resultNode, nestingNodes.slice(1));
            }
        }
    }

    setIsFiltered(): void {
        this.isFiltered = this.name.includes(ResultTree.textFilter);
    }

    recalculateContainedResults(): void {
        this.containedResults = {};

        this.nestingNodes.forEach(node => this.updateContainedResults(node.containedResults));
        this.resultNodes.forEach(node => this.updateContainedResults(node.containedResults));

        this.parent && this.parent.recalculateContainedResults();
    }

    toComponent() {
        return b.withKey(createNestingNodeComponent({ node: this }), "Nesting node: " + this.name);
    }
}

export class PathNode extends NestingNode {
    getHeaderStyle: any = () => {
        return this.containedResults.failed && ResultTree.showStatus.failed
            ? styles.pathNodeHeaderFailed
            : styles.pathNodeHeader;
    };

    constructor(name: string, parentNodes: NestingNode[]) {
        super(name, PathNode.filterNamesOfPathNodes(parentNodes), []);
    }

    static filterNamesOfPathNodes(nodes: NestingNode[]): string[] {
        let pathNodes = nodes.filter(parentNode => parentNode instanceof PathNode);
        let namesOfPathNodes = pathNodes.map(pathNode => pathNode.name);

        return namesOfPathNodes;
    }

}

export class DescribeNode extends NestingNode {
    getHeaderStyle: any = () =>
        this.containedResults.failed && ResultTree.showStatus.failed
            ? styles.describeNodeHeaderFailed
            : styles.describeNodeHeader;

    constructor(name: string, parentNodes: NestingNode[]) {
        super(name, PathNode.filterNamesOfPathNodes(parentNodes), DescribeNode.filterNamesOfDescribeNodes(parentNodes));
    }

    static filterNamesOfDescribeNodes(nodes: NestingNode[]): string[]{
        let describeNodes = nodes.filter(parentNode => parentNode instanceof DescribeNode);
        let namesOfDescribeNodes = describeNodes.map(pathNode => pathNode.name);

        return namesOfDescribeNodes;
    }

}

interface NestingDataCtx extends b.IBobrilCtx {
    isOpen: boolean;

    getHeaderName(): string;
}

interface INestingNodeComponentData {
    node: NestingNode;
}

const createNestingNodeComponent = b.createComponent<INestingNodeComponentData>({
    id: "Nesting-Node",
    init(ctx: NestingDataCtx) {
        ctx.isOpen = ctx.data.node.name === ResultTree.ROOT_NODE_NESTING_ID || ResultTree.nodesOpenByDefault;

        ctx.getHeaderName = (): string =>
            ctx.data.node.name !== ResultTree.ROOT_NODE_NESTING_ID &&
            (ctx.isOpen ? ctx.data.node.OPEN_SYMBOL : ctx.data.node.CLOSED_SYMBOL) + ctx.data.node.name;
    },
    render(ctx: NestingDataCtx, me) {
        me.children = [
            ctx.data.node.name !== ResultTree.ROOT_NODE_NESTING_ID &&
                mouseDownHandler( {
                    content: b.styledDiv(ctx.getHeaderName(), ctx.data.node.getHeaderStyle()),
                    action: () => handleMouseDownEvent(ctx)
                }),
            ctx.isOpen && [
                ctx.data.node.nestingNodes.map(node => node.isShown() && node.toComponent()),
                ctx.data.node.resultNodes.map(node => node.isShown() && node.toComponent())
            ]
        ];
        b.style(me, [styles.nestingNode]);
    }
});

function handleMouseDownEvent(ctx: NestingDataCtx) {
    ctx.isOpen = !ctx.isOpen;

    b.invalidate(ctx);
}
