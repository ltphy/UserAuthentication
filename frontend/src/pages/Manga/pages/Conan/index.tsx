import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import NavModal from "../../NavModal";
import {API} from "../../constants/home.constant";
import {UserInfo} from "../../../../models/user_info.model";
import {defaultUserInfo} from "../../constants/menu.constant";
import {GlobalSpinnerActionContext} from "../../../../context/loading.context";
import {RouteComponentProps, withRouter} from "react-router";
import style from './style.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {IconProp, library} from '@fortawesome/fontawesome-svg-core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {countErrors} from "../../../../services/xml.service";

library.add(faTimesCircle as any);
const Conan = ({match}: RouteComponentProps) => {
    const [modal, showModal] = useState(false);
    const userInfoList: UserInfo[] = [defaultUserInfo, JSON.parse(JSON.stringify(defaultUserInfo))];
    const [listUserInfo, updateListUserInfo] = useState<UserInfo[]>(userInfoList);
    const setGlobalSpinner = useContext(GlobalSpinnerActionContext);
    const [user, setUser] = useState<string>('');
    const [alertModal, setAlertModal] = useState<boolean>(false);
    const validateErrorsRef = useRef<boolean[]>([]);

    useEffect(() => {
        const count = countErrors(validateErrorsRef.current);
        console.log(validateErrorsRef.current);//why in code work not working?
        console.log(count);
        console.log("Match", match);
    }, []);

    const [description, setDescription] = useState<string>('');
    const showNavModal = () => {
        showModal(true);
    };

    useEffect(() => {
        fetchGitHub();

    }, []);
    const updateUserInfoList = () => {
        console.log(listUserInfo);
        updateListUserInfo(listUserInfo);
    };

    const fetchGitHub = async () => {
        setGlobalSpinner(true);
        await fetch(API)
            .then(res => res.json())
            .then(res => {
                setUser(res);
            }).catch((error) => {
                console.log(error);
            });
        setGlobalSpinner(false);
    };

    const showDescription = (value: string) => {
        console.log("here", value);
        setDescription(value);
    };

    return (
        <Container fluid>
            <Col>
                <Row className={"justify-content-center"}>
                    <Button variant={"danger"} onClick={() => {
                        showNavModal()
                    }}>Pop Up Modal</Button>
                    <NavModal modal={modal} onHide={() => {
                        showModal(false)
                    }}
                              userInfo={userInfoList[0]}
                              updateUserInfoList={updateUserInfoList}
                              showDescription={showDescription}
                    />
                </Row>
                <Row className={"justify-content-center mt-10"}>
                    <Button variant={"danger"} onClick={() => {
                        setAlertModal(true);
                    }}>Pop Up Modal <FontAwesomeIcon icon={faTimesCircle as IconProp}/></Button>
                    <Modal show={alertModal} onHide={() => {
                        setAlertModal(false)
                    }}>
                        <Modal.Header className={style.error_header}>
                            <Container>
                                <Row>
                                    <Col md={11}>
                                        <Modal.Title>
                                            <div>
                                                <FontAwesomeIcon icon={faTimesCircle as IconProp} color={"white"}
                                                                 size={"4x"}/>
                                            </div>
                                        </Modal.Title>
                                    </Col>
                                    <Col md={1}>
                                        <span className={"color-white"} onClick={() => {
                                            setAlertModal(false);
                                        }}> <FontAwesomeIcon icon={faTimes}/></span>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Please review error(s) at the following tabs:</h4>
                            {
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-danger" onClick={() => {
                                setAlertModal(false)
                            }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
                <Row className={"mt-10"}>
                    <div>{description}</div>
                </Row>
            </Col>
        </Container>
    );
};
export default withRouter(Conan);
