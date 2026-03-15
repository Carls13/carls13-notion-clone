import type { NodeData } from "../../utils/types"
import { useEffect, useRef, type ChangeEvent } from "react";
import { useAppState } from "../../state/AppStateContext";
import cx from "classnames";
import styles from "./../Node.module.css";
import { FileImage } from "../../components/FileImage/FileImage";
import { uploadImage } from "../../utils/uploadImage";

type ImageNodeProps = {
    node: NodeData;
    isFocused: boolean;
    index: number;
}

export const ImageNode = ({ node, isFocused, index }: ImageNodeProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { removeNodeByIndex, changeNodeValue, changeNodeType } = useAppState();

    useEffect(() => {
        if (!node.value || node.value.length === 0) {
            fileInputRef.current?.click();
        }
    }, [node.value]);

    const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (!target.files) {
            changeNodeType(index, "text");
        }
        try {
            const result = await uploadImage(target.files?.[0]);
            if (result?.filePath) {
                changeNodeValue(index, result.filePath);
            }
        } catch (error) {
            console.error(error);
            changeNodeType(index, "text");
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            if (e.key === "Backspace") {
                removeNodeByIndex(index);
            }

            if (e.key === "Enter") {
                fileInputRef.current?.click();
            }
        }

        if (isFocused) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFocused, removeNodeByIndex, index, node]);


    return (
        <div 
            className={
                cx(styles.node, styles.image, {
                    [styles.focused]: isFocused,
                })
            }
            >
                <FileImage filePath={node.value} />
                <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={onImageUpload}
                />
            </div>
    )

};