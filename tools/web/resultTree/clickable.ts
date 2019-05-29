import * as b from "bobril";
import {IBobrilMouseEvent} from "bobril";

export function mouseDownHandler(content: b.IBobrilChildren, action: (evt: IBobrilMouseEvent) => void): b.IBobrilNode {
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
