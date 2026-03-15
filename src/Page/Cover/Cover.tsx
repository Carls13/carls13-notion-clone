import { useRef, type ChangeEventHandler } from "react";
import styles from "./Cover.module.css";
import { FileImage } from "../../components/FileImage/FileImage";
import { uploadImage } from "../../utils/uploadImage";

type CoverProps = {
    filePath?: string;
    changePageCover: (filePath: string) => void;
}

export const Cover = ({ filePath, changePageCover }: CoverProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChangeCoverImage = () => {
        fileInputRef.current?.click();
    }

    const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const target = event.target;

        const result = await uploadImage(target.files?.[0]);

        if (result?.filePath) {
            changePageCover(result.filePath);
        } else {
            alert("Error uploading image");
        }

        target.value = ""; // Reset the input value to allow uploading the same file again if needed)
    }

    return (
        <div className={styles.cover}>
            {
                filePath ? <FileImage filePath={filePath} className={styles.image} /> : <img src="/ztm-notes.png" alt="Cover" className={styles.image} />
            }
            <button onClick={onChangeCoverImage} className={styles.button}>Change cover</button>
            <input onChange={onCoverImageUpload} style={{ display: "none" }} type="file" ref={fileInputRef} />
        </div>
    );
}