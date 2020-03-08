import React, {ChangeEvent, EventHandler, useRef, useState} from 'react';
import style from './style.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {Col} from 'react-bootstrap';

interface dropZoneProps {
    disabled: boolean;

    onFilesAdded(files: File[]): void;
}

const DropZone = (props: dropZoneProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [hightlight, setHightlight] = useState<boolean>(false);
    //disable if uploaded alr => enable when clear
    const openFileDialog = () => {
        if (props.disabled) return;

        if (fileInputRef.current) {
            console.log("clicked");

            fileInputRef.current.click();
        }

    };
    const onFilesAdded = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.disabled) return;
        const files: FileList | null = event.target.files;
        if (files) {
            const filesArr = fileListToArray(files);
            props.onFilesAdded(filesArr);
        }
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (props.disabled) return;
        setHightlight(true);
    };

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        setHightlight(false);
    };

    const fileListToArray = (files: FileList) => {
        const filesArr: File[] = [];
        for (let i = 0; i < files.length; i++) {
            filesArr.push(files[i]);
        }
        return filesArr;
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (props.disabled) {
            return;
        }
        const files: FileList | null = event.dataTransfer.files;
        if (files) {
            const filesArr = fileListToArray(files);
            props.onFilesAdded(filesArr);
        }
        setHightlight(false);
    };
    const onClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement;
        element.value = '';
    };

    return (
        <div className={hightlight ? style.dropzone_hightlight : style.dropzone}
             onDragOver={onDragOver}
             onDragLeave={onDragLeave}
             onClick={openFileDialog}
             onDrop={onDrop}
             style={{cursor: props.disabled ? "default" : "pointer"}}
        >
            <input ref={fileInputRef}
                   onChange={(event) => {
                       onFilesAdded(event)
                   }}
                   multiple
                   onClick={onClick}
                   className={style.file_input}
                   type={'file'}
            />
            <FontAwesomeIcon icon={faUpload} size={'3x'}/>
            <span className={"mt-5"}>Drop and drop files here</span>
            <span>or</span>
            <span>Browse Files</span>
        </div>
    );
};

export default DropZone;
