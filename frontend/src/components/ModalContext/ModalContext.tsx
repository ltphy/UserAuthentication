import React, {useContext, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faExclamationTriangle, faTimes} from "@fortawesome/free-solid-svg-icons";

interface GenericModal {
    notifyError(message: any): void;

    notifyInfo(message: any): void;

    notifyWarning(message: any, performWarning: Function): void;
}

const defaultGenericModal: GenericModal = {
    notifyError: (message: any) => {

    },
    notifyInfo: (message: any) => {

    },
    notifyWarning: (message: any, performWarning: Function) => {

    },
};

export const GenericModalContext: React.Context<GenericModal> = React.createContext<GenericModal>(defaultGenericModal);

interface genericProps {
    children: any;
}

const GenericModalProvider = (props: genericProps) => {
    const [showErrorModal, setShowErrorModal] = useState<boolean>();
    const [showInfoModal, setShowInfoModal] = useState<boolean>();
    const [showWarningModal, setShowWarningModal] = useState<boolean>();
    //if we use normal set state => one change all change => we can use multiple context
    //or we can use 1 object => but with different method
    // const [message, setMessage] = useState<any>(null);
    const messageRender = useRef<any>();
    const performWarningRef = useRef<Function|null>(null);

    const notifyError = (message: any) => {
        console.log("MESSAGE", message);
        messageRender.current = message;
        setShowErrorModal(true);
    };

    const notifyInfo = (message: any) => {
        messageRender.current = message;
        setShowInfoModal(true);
    };

    const notifyWarning = (message: any, performWarning: Function) => {
        performWarningRef.current = performWarning;
        messageRender.current = message;
        setShowWarningModal(true);
    };
    //define generic modal function
    const genericModal: GenericModal = {
        notifyError: notifyError,
        notifyInfo: notifyInfo,
        notifyWarning: notifyWarning,
    };

    return (
        <GenericModalContext.Provider value={genericModal}>
            {props.children}
            {/*
                Error modal
            */}
            {showErrorModal &&<Modal show={showErrorModal} onHide={() => {
                setShowErrorModal(false);
            }}>
                <Modal.Header>
                    <FontAwesomeIcon icon={faTimes} size={'2x'}/>
                    <span className={"text-danger"}>
                        Error
                    </span>
                </Modal.Header>
                <Modal.Body>
                    {messageRender.current}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-secondary"} onClick={() => {
                        setShowErrorModal(false);
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>}
            {/*
                Info modal
           */}
            {showInfoModal&&<Modal show={showInfoModal} onHide={() => {
                setShowInfoModal(true);
            }}>
                <Modal.Header closeButton>
                    Info
                </Modal.Header>
                <Modal.Body>
                    {messageRender.current()}
                </Modal.Body>
                <Modal.Footer>
                !<Button variant={"outline-secondary"} onClick={() => {
                        setShowInfoModal(false);
                    }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>}
            {/*show warning modal*/}
            {showWarningModal&&<Modal show={showWarningModal} onHide={() => {
                setShowWarningModal(true);
            }}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    {messageRender.current}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-secondary"}>
                        Cancel
                    </Button>
                    <Button variant={"outline-secondary"} onClick={() => {
                        if(performWarningRef.current) {
                            performWarningRef.current();
                        }
                        setShowWarningModal(false);
                    }}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>}
        </GenericModalContext.Provider>
    )
};
export const useGenericModal = () => {
    return useContext<GenericModal>(GenericModalContext);
};

export default GenericModalProvider;