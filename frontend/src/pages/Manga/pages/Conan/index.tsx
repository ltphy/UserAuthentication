import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import NavModal from "../../NavModal";
import {API} from "../../constants/home.constant";
import {UserInfo} from "../../../../models/user_info.model";
import {defaultUserInfo} from "../../constants/menu.constant";
import {GlobalSpinnerActionContext} from "../../../../context/loading.context";
import {RouteComponentProps, withRouter} from "react-router";

const Conan = ({match}:RouteComponentProps) => {
    const [modal, showModal] = useState(false);
    const userInfoList: UserInfo[] = [defaultUserInfo, JSON.parse(JSON.stringify(defaultUserInfo))];
    const [listUserInfo, updateListUserInfo] = useState<UserInfo[]>(userInfoList);
    const setGlobalSpinner  = useContext(GlobalSpinnerActionContext);
    const [user,setUser] = useState<string>('');

    const showNavModal = () => {
        showModal(true);
    }
    useEffect(()=>{
        fetchGitHub();

    },[]);
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
            })
        setGlobalSpinner(false);
    }

    return (
        <Container fluid>
            <Button variant={"danger"} onClick={() => {
                showNavModal()
            }}>Pop Up Modal</Button>
            <NavModal modal={modal} onHide={() => {
                showModal(false)
            }}
                      userInfo={userInfoList[0]}
                      updateUserInfoList={updateUserInfoList}
            />
        </Container>
    );
}
export default Conan;
