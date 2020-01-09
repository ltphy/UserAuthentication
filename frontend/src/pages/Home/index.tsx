import React, {useState} from 'react';
import {Row, Col, Container, Button, Modal} from 'react-bootstrap'
import style from './style.module.scss';
import NavModal from "./NavModal";
import {defaultUserInfo} from "./menu.constant";
import {UserInfo} from "../../models/user_info.model";

const Home = () => {
    const [modal, showModal] = useState(false);
    const userInfoList: UserInfo[] = [defaultUserInfo, JSON.parse(JSON.stringify(defaultUserInfo))];
    const [listUserInfo, updateListUserInfo] = useState<UserInfo[]>(userInfoList);

    const showNavModal = () => {
        showModal(true);
    }

    const updateUserInfoList = () => {
        console.log(listUserInfo);
        updateListUserInfo(listUserInfo);
    };

    return (
        <Container fluid>
            <Row className={style.wrapper}>
                <Col md={3} xs={4} className={style.menu_container}>

                </Col>
                <Col md={9} xs={8} className={style.info_container}>
                    <Button variant={"danger"} onClick={() => {
                        showNavModal()
                    }}>Pop Up Modal</Button>
                </Col>
            </Row>
            <NavModal modal={modal} onHide={() => {
                showModal(false)
            }}
                      userInfo={userInfoList[0]}
                      updateUserInfoList={updateUserInfoList}
            />
        </Container>
    );
}
export default Home;