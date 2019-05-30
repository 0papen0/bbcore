import * as b from "bobril";
import {IBobrilMouseEvent} from "bobril";

export function mouseDownHandler(args: { content: b.IBobrilChildren, action: (evt: IBobrilMouseEvent) => void }): b.IBobrilNode {
    const {content, action} = args;

    return {
        children: content,
        component: {
            onMouseDown(ctx, evt: IBobrilMouseEvent) {
                action(evt);
                return true;
            },
        }
    };
}
