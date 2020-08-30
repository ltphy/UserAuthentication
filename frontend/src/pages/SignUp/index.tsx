import React, {useContext, useEffect, useRef, useState} from 'react';
import {useHistory, withRouter} from "react-router";
import {Button, Col, Container, Row} from "react-bootstrap";
import style from './style.module.scss';
import {validateEmail} from "../../services/validate.service";
import HttpClientService from "../../services/httpclient.service";
import AuthService, {SignUpInfo} from "../../services/auth.service";
import {AuthLogin, SetAuthenticationFnc} from "../../context/auth.context";
import {GenericModalContext} from "../../components/ModalContext/ModalContext";

const SignUp = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const userNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const rePasswordRef = useRef<HTMLInputElement | null>(null);
    const signUpBtnRef = useRef<HTMLButtonElement | null>(null);
    const setAuthContext = useContext(SetAuthenticationFnc);
    const [errorText,setErrorText] = useState<string>();
    const modalContext = useContext(GenericModalContext);

    const history = useHistory();
    const registerEnterEvent = (event: KeyboardEvent) => {
        if (event.keyCode === 13 || event.key === "Enter") {
            event.preventDefault();
            if (signUpBtnRef.current) {
                signUpBtnRef.current.click();
            }
        }
    };

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.addEventListener("keyup", registerEnterEvent);
        }
        if (passwordRef.current) {
            passwordRef.current.addEventListener("keyup", registerEnterEvent);
        }
        if (rePasswordRef.current) {
            rePasswordRef.current.addEventListener("keyup", registerEnterEvent);
        }
        if (userNameRef.current) {
            userNameRef.current.addEventListener("keyup", registerEnterEvent);
        }
        return (() => {
            if (emailRef.current) {
                emailRef.current.removeEventListener("keyup", registerEnterEvent);
            }
            if (passwordRef.current) {
                passwordRef.current.removeEventListener("keyup", registerEnterEvent);
            }
            if (rePasswordRef.current) {
                rePasswordRef.current.removeEventListener("keyup", registerEnterEvent);
            }
            if (userNameRef.current) {
                userNameRef.current.removeEventListener("keyup", registerEnterEvent);
            }

        });
    }, []);


    const onBlurInputText = (event: React.FocusEvent<HTMLInputElement>) => {
        const name = event.target.name;
        switch (name) {
            case 'userName':
                break;
            case 'Email':
                break;
            case 'Password':
                break;
            case 'confirmPassword':
                break;
        }
    };

    const signUp = () => {
        let error = false;
        let email = "", userName = "", password = "", confirmPassword = "";
        if (userNameRef.current) {
            userName = userNameRef.current.value;
            if (userName.length < 2) {
                error = true;
            }
        }
        if (emailRef.current) {
            email = emailRef.current.value;
            if (!validateEmail(email)) {
                error = true;
            }
        }
        if (passwordRef.current) {
            password = passwordRef.current.value;
            if (password.length < 6) {
                error = true;
            }
        }
        if (rePasswordRef.current) {
            confirmPassword = rePasswordRef.current.value;
            if (confirmPassword !== password) {
                error = true;
            }
        }
        if (error){
            return
        }

        else {
            const signUpInfo: SignUpInfo = {
                name: userName,
                email: email,
                password: password
            };
            AuthService.signUp(signUpInfo).then((res: AuthLogin) => {
                console.log(res);
                setAuthContext(res);
                history.push('/');

            }).catch((error) =>{
                console.log(error);
                modalContext.notifyError(error);
            });
        }
    };

    return (
        <Container fluid>
            <Row className={style.form_layout}>
                <div className={style.form_wrapper}>

                    <Row className={"justify-content-md-center"}>
                        <h2 className={'text-center'}>Sign Up</h2>
                    </Row>

                    <Col className={style.signin_wrapper}>
                        <Row className={style.password_wrap}>
                            <Col>
                                <div>
                                    User Name
                                </div>
                                <span className={style.input_container}>
                                        <input ref={userNameRef}
                                               className={style.input_wrapper}
                                               name={'userName'}
                                               onBlur={onBlurInputText}/>
                                    </span>
                            </Col>
                        </Row>
                        <Row className={style.password_wrap}>
                            <Col>
                                <div>
                                    Email
                                </div>
                                <span className={style.input_container}>
                                        <input type={'email'}
                                               ref={emailRef}
                                               className={style.input_wrapper}
                                               name={'Email'}
                                               onBlur={onBlurInputText}/>
                                    </span>
                            </Col>
                        </Row>
                        <Row className={style.password_wrap}>
                            <Col>
                                <div>
                                    Password
                                </div>
                                <span className={style.input_container}>
                                        <input type={'password'}
                                               ref={passwordRef}
                                               className={style.input_wrapper}
                                               name={'Password'}
                                               onBlur={onBlurInputText}/>
                                    </span>
                            </Col>
                        </Row>
                        <Row className={style.password_wrap}>
                            <Col>
                                <div>
                                    Confirm Password
                                </div>
                                <span className={style.input_container}>
                                        <input type={'password'}
                                               ref={rePasswordRef}
                                               className={style.input_wrapper}
                                               name={'confirmPassword'}
                                               onBlur={onBlurInputText}/>
                                    </span>
                            </Col>
                        </Row>
                    </Col>
                    <Button ref={signUpBtnRef as any}
                            size={'sm'}
                            variant={'outline-success'}
                            onClick={() => signUp()}
                            className={style.btn_signup}
                    >
                        Sign Up</Button>
                </div>
            </Row>
        </Container>
    );
};
export default withRouter(SignUp);