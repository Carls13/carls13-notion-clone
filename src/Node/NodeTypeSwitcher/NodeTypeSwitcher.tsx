import type { NodeData, NodeType } from "../../utils/types";
import { BasicNode } from "../BasicNode/BasicNode";
import { ImageNode } from "../ImageNode/ImageNode";
import { PageNode } from "../PageNode/PageNode";

type NodeTypeSwitcherProps = {
    node: NodeData;
    updateFocusedIndex(index: number): void;
    isFocused: boolean;
    index: number;
}

const TEXT_NODE_TYPES: NodeType[] = [
    "text",
    "list",
    "heading1",
    "heading2",
    "heading3"
];

export const NodeTypeSwitcher = ({
    node,
    updateFocusedIndex,
    isFocused,
    index,
}: NodeTypeSwitcherProps) => {
    if (TEXT_NODE_TYPES.includes(node.type)) {
        return <BasicNode node={node} updateFocusedIndex={updateFocusedIndex} isFocused={isFocused} index={index} />
    }

    if (node.type === "page") {
        return <PageNode node={node} isFocused={isFocused} index={index} />
    }

    if (node.type === "image") {
        return <ImageNode node={node} isFocused={isFocused} index={index} />
    }

    return null;
};