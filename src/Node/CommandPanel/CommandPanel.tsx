import { useEffect, useState } from "react";
import type { NodeType } from "../../utils/types";
import { useUserOverflowsScreenBottom } from "../hooks/useOverflowsScreenBottom";
import styles from './CommandPanel.module.css';
import cx from "classnames";

type CommandPanelProps = {
    nodeText: string;
    selectItem: (nodeType: NodeType) => void;
}

type SupportedNodeType = {
    value: NodeType;
    name: string;
}

const supportedNodeTypes: SupportedNodeType[] = [
    {
        value: "text",
        name: "Text",
    },
    {
        value: "list",
        name: "List",
    },
    {
        value: "heading1",
        name: "Heading 1",
    },
    {
        value: "heading2",
        name: "Heading 2",
    },
    {
        value: "heading3",
        name: "Heading 3",
    },
    {
        value: "page",
        name: "Page",
    },
    {
        value: "image",
        name: "Image",
    }
];

export const CommandPanel = ({ nodeText, selectItem }: CommandPanelProps) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { overflows, ref } = useUserOverflowsScreenBottom();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                selectItem(supportedNodeTypes[selectedItemIndex].value);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItemIndex, selectItem]);


    useEffect(() => {
        const normalizedValue = nodeText.toLowerCase().replace(/\//, "");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedItemIndex(
            supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue))
        );
    }, [nodeText]);

    return (
        <div ref={ref}
            className={
                cx(styles.panel, {
                    [styles.reverse]: overflows,
                })
            }
        >
            <div className={styles.title}>Blocks</div>
            <ul>
                {
                    supportedNodeTypes.map((item, index) => {
                        const selected = index === selectedItemIndex;

                        return (
                            <li
                                key={index}
                                onClick={() => selectItem(item.value)}
                                className={cx(styles.item, {
                                    [styles.selected]: selected,
                                })}
                            >
                                {item.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>   
    );
};