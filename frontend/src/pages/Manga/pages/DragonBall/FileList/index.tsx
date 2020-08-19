import React from 'react';
import {Row, Col, Container, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileAlt,
    faTrashAlt,
    faFileWord,
    faFileExcel,
    faFilePdf,
    faFileImage
} from '@fortawesome/free-regular-svg-icons';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import style from './style.module.scss';

interface filesProps {
    files: File[],

    removeFile(index: number): void;
}

enum FileTypes {
    Application = "application",
    Image = "image",
    Text = "text",
}

enum ApplicationTypes {
    PDF = 'pdf',
    EXCELS = 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    WORDS = 'vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const FileList = (props: filesProps) => {
    const fileType = (fileType: string) => {
        console.log(fileType);
        const [type, detail] = fileType.split('/');
        switch (type) {
            case FileTypes.Application:
                switch (detail) {
                    case ApplicationTypes.PDF:
                        return (<FontAwesomeIcon icon={faFilePdf as IconProp}
                                                 size={'3x'}/>);
                    case ApplicationTypes.EXCELS:
                        return (<FontAwesomeIcon icon={faFileExcel as IconProp}
                                                 size={'3x'}/>);
                    case ApplicationTypes.WORDS:
                        return (<FontAwesomeIcon icon={faFileWord as IconProp}
                                                 size={'3x'}/>);
                    default:
                        return<></>;
                }
            case FileTypes.Image:
                 return (<FontAwesomeIcon icon={faFileImage as IconProp}
                                          size={'3x'}/>);
            case FileTypes.Text:
                return(<FontAwesomeIcon icon={faFileAlt as IconProp}
                                        size={'3x'}/>);
            default:
                return <></>;
        }
    };

    return (
        <>
            {
                props.files.map((file, key: number) => {
                    return (
                        <div className={style.file_wrapper} key={key}>
                            <Row>
                                <Col>
                                    {fileType(file.type)}
                                </Col>
                                <Col className={style.file_name}>{file.name}</Col>
                                <Col>
                                    <Button onClick={() => {
                                        props.removeFile(key)
                                    }}>
                                        <FontAwesomeIcon icon={faTrashAlt as IconProp}/>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
        </>
    );
};
export default FileList;