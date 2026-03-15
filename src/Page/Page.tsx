import { useFocusedNodeIndex } from "./hooks/useFocusedNodeIndex";
import { Cover } from "./Cover/Cover";
import { Spacer } from "./Spacer/Spacer";
import { Title } from "./Title/Title";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { NodeContainer } from "../Node/NodeContainer/NodeContainer";

export const Page = () => {
    const { addNode, nodes, title, setTitle, reorderNodes } = useAppState();
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
        nodes
    });

    const handleDragEvent = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id && active.id !== over.id) {
            reorderNodes(active.id as string, over.id as string);
        }
    }

    return (
        <>
            <Cover/>
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode} />
                <DndContext onDragEnd={handleDragEvent}>
                    <SortableContext strategy={verticalListSortingStrategy} items={nodes}>
                        {
                            nodes.map((node, index) => (
                                <NodeContainer
                                    key={node.id}
                                    node={node}
                                    index={index}
                                    isFocused={focusedNodeIndex === index}
                                    updateFocusedIndex={setFocusedNodeIndex}
                                />
                            ))
                        }
                    </SortableContext>
                    <DragOverlay />
                </DndContext>
               <Spacer showHint={!nodes.length} handleClick={() => {
                    addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
               }} />
            </div>
        </>
    );
}