import * as b from "bobril";
import { ResultTree } from "../resultTree";
import {TestFocusParameters} from "../../communication";

export abstract class TreeNode {
    nestingID: any;
    isFiltered: boolean;
    hasFilteredAncestor: boolean;
    hasFilteredDescendant: boolean;
    containedResults: ResultTypes = {};

    public namesOfParentFiles: string[] = [];
    public namesOfParentDescribes: string[] = [];

    abstract recalculateContainedResults(): void;
    abstract setIsFiltered(): void;
    abstract toComponent(): b.IBobrilNode;
    abstract createTestFocusParameters(): TestFocusParameters;

    constructor(nestingID: any, namesOfParentFiles: string[], namesOfParentDescribes: string[]) {
        this.nestingID = nestingID;
        this.namesOfParentFiles = namesOfParentFiles;
        this.namesOfParentDescribes = namesOfParentDescribes;
    }

    updateContainedResults(comparedContainedResults: ResultTypes) {
        this.containedResults.failed = this.containedResults.failed || comparedContainedResults.failed;
        this.containedResults.skipped = this.containedResults.skipped || comparedContainedResults.skipped;
        this.containedResults.successful = this.containedResults.successful || comparedContainedResults.successful;
        this.containedResults.logs = this.containedResults.logs || comparedContainedResults.logs;
    }

    isShown(): boolean {
        if (this.nestingID === ResultTree.ROOT_NODE_NESTING_ID) {
            return true;
        }

        if (
            ResultTree.textFilter !== "" &&
            !(this.hasFilteredDescendant || this.hasFilteredAncestor || this.isFiltered)
        ) {
            return false;
        }

        return (
            (this.containedResults.successful && ResultTree.showStatus.successful) ||
            (this.containedResults.logs && ResultTree.showStatus.logs) ||
            (this.containedResults.failed && ResultTree.showStatus.failed) ||
            (this.containedResults.skipped && ResultTree.showStatus.skipped)
        );
    }

    protected createFilePath(): string {
        return this.namesOfParentFiles.map(parentFileName => parentFileName +"/").join();
    }

    protected createDescribePath(): string {
        return this.namesOfParentDescribes.map(parentDescribeName => parentDescribeName +"/").join();
    }

}

export interface ResultTypes {
    failed?: boolean;
    skipped?: boolean;
    successful?: boolean;
    logs?: boolean;
}
