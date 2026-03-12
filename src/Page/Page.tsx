import { useState } from "react";
import type { NodeData } from "../utils/types";
import { useFocusedNodeIndex } from "./hooks/useFocusedNodeIndex";
import { Cover } from "./Cover/Cover";
import { Spacer } from "./Spacer/Spacer";
import { Title } from "./Title/Title";
import { BasicNode } from "../Node/BasicNode/BasicNode";
import { nanoid } from "nanoid";

export const Page = () => {
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [title, setTitle] = useState("Default Title");
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
        nodes
    });

    const addNode = (node: NodeData, index: number) => {
        const newNodes = [...nodes];
        newNodes.splice(index, 0, node);
        setNodes(newNodes);
    };

    const removeNodeByIndex = (index: number) => {
        const newNodes = [...nodes];
        newNodes.splice(index, 1);
        setNodes(newNodes);
    };

    const changeNodeValue = (index: number, value: string) => {
        const newNodes = [...nodes];
        newNodes[index].value = value;
        setNodes(newNodes);
    };

    return (
        <>
            <Cover/>
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode} />
                {
                    nodes.map((node, index) => (
                        <BasicNode
                            key={node.id}
                            node={node}
                            index={index}
                            isFocused={focusedNodeIndex === index}
                            updateFocusedIndex={setFocusedNodeIndex}
                            addNode={addNode}
                            removeNodeByIndex={removeNodeByIndex}
                            changeNodeValue={changeNodeValue}
                        />
                    ))
                }
               <Spacer showHint={!nodes.length} handleClick={() => {
                    addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
               }} />
            </div>
        </>
    );
}