import { useFocusedNodeIndex } from "./hooks/useFocusedNodeIndex";
import { Cover } from "./Cover/Cover";
import { Spacer } from "./Spacer/Spacer";
import { Title } from "./Title/Title";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher/NodeTypeSwitcher";

export const Page = () => {
    const { addNode, nodes, title, setTitle } = useAppState();
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
        nodes
    });

    return (
        <>
            <Cover/>
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode} />
                {
                    nodes.map((node, index) => (
                        <NodeTypeSwitcher
                            key={node.id}
                            node={node}
                            index={index}
                            isFocused={focusedNodeIndex === index}
                            updateFocusedIndex={setFocusedNodeIndex}
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