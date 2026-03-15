import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { NodeData } from "../../utils/types";
import { NodeTypeSwitcher } from "../NodeTypeSwitcher/NodeTypeSwitcher";
import styles from "./NodeContainer.module.css";

type NodeContainerProps = {
    node: NodeData;
    updateFocusedIndex(index: number): void;
    isFocused: boolean;
    index: number;
}

export const NodeContainer = ({ 
    node,
    updateFocusedIndex,
    isFocused,
    index,
 } : NodeContainerProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: node.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={styles.container}
        >
            <div {...listeners} className={styles.dragHandle}>⠿</div>
            <NodeTypeSwitcher
                node={node}
                index={index}
                isFocused={isFocused}
                updateFocusedIndex={updateFocusedIndex}
            />
        </div>
    );
 }