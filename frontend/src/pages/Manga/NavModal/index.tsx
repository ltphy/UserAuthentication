import React, {useEffect, useMemo, useState} from 'react';
import {Modal, Button, Nav, Row, Col, Navbar} from "react-bootstrap";
import {NavPanel, NavPanels} from "./nav-panel.constant";
import style from './style.module.scss';
import {defaultUserInfo} from "../constants/menu.constant";
import {UserInfo} from "../../../models/user_info.model";

interface modalProps {
    modal: boolean;
    userInfo: UserInfo;

    onHide(): void;

    updateUserInfoList(): void;

}

const NavModal = (props: modalProps) => {
    const {modal, onHide} = props;
    const [panel, setPanel] = useState<NavPanel>(NavPanels[0]);
    const [userInfo, setUserInfo] = useState<UserInfo>(props.userInfo);
    useEffect(() => {
        if (modal) {
            setPanel(NavPanels[0]);
        }
    },[modal]);

    const selectPanel = (selectCallback: string) => {
        console.log(selectCallback);
        const selectPanel = NavPanels.filter((panel) => (panel.name === selectCallback)).shift() || NavPanels[0];
        setPanel(selectPanel);
    };

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            console.log(event.target.value);
            console.log(event.target.id);
            const id: string = event.target.id;
            const value: string = event.target.value;
            (userInfo.description as any)[id] = value;
        }

    };

    const saveValue = () => {
        setUserInfo(userInfo);
        props.updateUserInfoList();
    };

    return (
        <Modal
            show={modal}
            onHide={onHide}
            size="lg"
            centered
            dialogClassName={style.modal_wrapper}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter value
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col md={12} className={style.modal_wrapper}>
                        <Nav variant="tabs"
                             onSelect={(k: string) => selectPanel(k)}
                             className={style.nav_wrapper}
                             defaultActiveKey={"Description"}
                        >
                            {
                                NavPanels.map((panel: NavPanel, index: number) => {
                                    return (
                                        <Nav.Item key={index}>
                                            <Nav.Link eventKey={panel.name}>{panel.name}</Nav.Link>
                                        </Nav.Item>
                                    );
                                })
                            }
                        </Nav>
                        <Row className={style.nav_contents}>
                            {panel && <panel.component changeValue={changeValue} userInfo={defaultUserInfo}/>}
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant={"danger"}
                    onClick={() => {
                        onHide();
                    }}
                >
                    Close
                </Button>
                <Button
                    variant={"primary"}
                    onClick={() => {
                        onHide();
                        saveValue();
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>);
}
export default NavModal;