import React, {useEffect, useRef, useState} from 'react';
import {Card, Container, Row, Col, Button, ProgressBar} from 'react-bootstrap';
import style from './style.module.scss';
import DropZone from "./DropZone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import FileList from "./FileList";

export interface Database {
    folderName: string;
    files: string [];
}

const DragonBall = () => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [successfulUpload, setSuccessfulUpload] = useState<boolean>(false);

    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const progressRef = useRef<number>(0);
    const startUploading = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const uploadBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("keyup", (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    if (uploadBtnRef.current) {
                        uploadBtnRef.current.click();
                    }

                }
            });
        }
    }, []);

    const onFilesAdded = (file: File[]) => {
        const newFiles = [...files, ...file];
        setFiles(newFiles);
    };

    const start = () => {
        if (startUploading.current) {
            return;
        }
        startUploading.current = setInterval(() => {
            progressRef.current += 10;
            console.log("1-", progress, "2-ref", progressRef.current);
            if (progressRef.current >= 100) {
                setSuccessfulUpload(true);
                setUploading(false);
            }

            setProgress(progressRef.current);


        }, 300);
    };

    const stop = () => {
        if (!startUploading.current) {
            return;
        }
        clearInterval(startUploading.current);
        startUploading.current = null;

    };


    useEffect(() => {
        if (uploading) {
            console.log("start");
            start();
        } else {
            console.log("stop");
            stop();
        }
    }, [uploading]);

    const uploadingFiles = () => {
        setUploading(true);
    };

    const resetUpload = () => {
        progressRef.current = 0;
        setProgress(0);
        setUploading(false);
        setSuccessfulUpload(false);
        setFiles([]);
    };

    const renderButton = () => {
        if (successfulUpload) {
            return (
                <Button className={style.upload_button} variant={"outline-secondary"} onClick={() => {
                    resetUpload()
                }}>Reset</Button>
            )
        } else {
            return (
                <Button className={style.upload_button}

                        onClick={() => {
                            uploadingFiles()
                        }}
                        disabled={files.length < 0 || uploading}
                        ref={uploadBtnRef as any}
                >Uploading</Button>
            )
        }
    };

    const renderProgressBar = () => {

        return (
            <ProgressBar animated
                         now={(uploading || successfulUpload) ? progress : 0}
                         striped
                         variant={"success"}
            />
        );


    };

    const removeFile = (key: number) => {
        const newFiles = files.filter((value: File, index: number) => {
            return key !== index;
        });
        setFiles(newFiles);
    };
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

    };
    return (
        <Container fluid>
            <Row className={"justify-content-md-center"}>
                <Card className={style.Card}>
                    <Card.Body>
                        <Card.Title>Upload files</Card.Title>
                        <Row>
                            <Col sm={"auto"}>
                                <DropZone disabled={uploading || successfulUpload} onFilesAdded={onFilesAdded}/>
                            </Col>
                            <Col>
                                <Row className={"justify-content-md-center"}>
                                    <div className={style.files_container}>
                                        <Col>
                                            <FileList files={files} removeFile={removeFile}/>
                                        </Col>
                                    </div>
                                </Row>
                                <Row className={style.progress_wrapper}>
                                    <Col sm={10} className={style.progress_bar}>
                                        {renderProgressBar()}
                                    </Col>
                                    <Col sm={2}>
                                        <FontAwesomeIcon icon={faCheckCircle as IconProp}/>
                                    </Col>
                                </Row>
                                <Row className={"justify-content-md-center"}>
                                    <Row>
                                        <Col>
                                            <input onChange={changeValue} ref={inputRef}/>
                                        </Col>
                                        <Col>
                                            {
                                                renderButton()
                                            }
                                        </Col>

                                    </Row>

                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default DragonBall;