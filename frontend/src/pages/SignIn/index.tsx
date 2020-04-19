import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Form, Row, Button} from "react-bootstrap";
import style from './style.module.scss';
import {withRouter} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPalette} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash, faEye} from "@fortawesome/free-regular-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {validateEmail} from '../../services/validate.service';
import ErrorComponent from "../../components/ErrorComponent";

const SignIn = () => {

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const signInBtnRef = useRef<HTMLButtonElement | null>(null);
    const [emailInputClick, setEmailInputClick] = useState<boolean>(false);
    const [passwordInputClick, setPasswordInputClick] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [wrongEmail, setWrongEmail] = useState<boolean>(false);
    const [wrongPassword, setWrongPassword] = useState<boolean>(false);
    const bugArray: number[] = [];
    const registerEnterEvent = (event: KeyboardEvent) => {
        if (event.keyCode === 13 || event.key === "Enter") {
            event.preventDefault();
            if (signInBtnRef.current) {
                signInBtnRef.current.click();
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
        return (() => {
            if (emailRef.current) {
                emailRef.current.removeEventListener("keyup", registerEnterEvent);
            }
            if (passwordRef.current) {
                passwordRef.current.removeEventListener("keyup", registerEnterEvent);
            }
        });
    }, []);

    const signIn = () => {
        let email = "", password = "";

        if (emailRef.current) {
            email = emailRef.current.value;
            if (validateEmail(email)) {
                setWrongEmail(false);
            } else {
                setWrongEmail(true);
            }
        }
        if (passwordRef.current) {
            password = passwordRef.current.value;
            if (password === "") {
                setWrongPassword(true);
            } else {
                setWrongPassword(false);
            }
        }

        console.log(email, password);
    };

    const onEmailInputClick = () => {
        if (!emailInputClick) {
            setEmailInputClick(true);
            if (emailRef.current) {
                emailRef.current.placeholder = "";
            }
        }

    };

    const onPasswordInputClick = () => {
        if (!passwordInputClick) {
            setPasswordInputClick(true);
            if (passwordRef.current) {
                passwordRef.current.placeholder = "";
            }
        }

    };

    const onClickShowPassword = () => {
        if (!showPassword) {
            if (passwordRef.current) {
                passwordRef.current.type = "text";
            }
        } else {
            if (passwordRef.current) {
                passwordRef.current.type = "password";
            }
        }
        setShowPassword(!showPassword);

    };
    const onBlurInputText = (event: React.FocusEvent<HTMLInputElement>) => {
        const name = event.target.name;
        switch (name) {
            case 'Email':
                console.log("Value", event.target.value);
                if (event.target.value === "") {
                    setEmailInputClick(false);
                } else {

                }
                break;
            case 'Password':
                if (event.target.value === "") {
                    setPasswordInputClick(false);
                } else {

                }
                break;
        }

    };

    return (<Container fluid>
        <Row className={style.form_layout}>
            <Col md={{span: "auto"}}>
                <div className={style.form_wrapper}>
                    <Row className={"justify-content-md-center"}>
                        <h2 className={'text-center'}>Welcome</h2>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <FontAwesomeIcon icon={faPalette} size={'3x'} color={'rgb(201, 76, 76)'}/>
                    </Row>
                    <Col className={style.login_wrapper}>
                        <Row className={style.password_wrap}>
                            <Col>
                                <span className={emailInputClick ? style.title : style.hide_title}>Email</span>
                                <span className={style.input_container}>
                                    <input type={'email'}
                                           ref={emailRef}
                                           className={style.input_wrapper}
                                           onSelect={onEmailInputClick}
                                           name={'Email'}
                                           onBlur={onBlurInputText}/>
                                </span>
                                <Row className={'mt-4'}>
                                    {
                                        wrongEmail && <ErrorComponent error={"Email is not valid"}/>
                                    }
                                </Row>
                            </Col>
                        </Row>

                        <Row className={style.password_wrap}>
                            <Col className={"justify-content-md-center"}>
                                <span className={passwordInputClick ? style.title : style.hide_title}>Password</span>

                                <div className={style.input_container}>
                                    <input type={'password'}
                                           ref={passwordRef}
                                           className={style.input_wrapper}
                                           name={"Password"}
                                           onBlur={onBlurInputText}
                                           onSelect={onPasswordInputClick}
                                    />
                                    <div className={"input-group-append ml-2"}>
                                        <span className={style.show_pw_btn}
                                              onClick={onClickShowPassword}>
                                            {
                                                showPassword ? <FontAwesomeIcon icon={faEyeSlash as IconProp}/> :
                                                    <FontAwesomeIcon icon={faEye as IconProp}/>
                                            }

                                        </span>
                                    </div>

                                </div>
                                <Row>
                                    {
                                        (wrongPassword && <ErrorComponent error={"Password cannot be empty"}/>)
                                    }
                                </Row>
                            </Col>

                        </Row>
                    </Col>


                    <Button ref={signInBtnRef as any}
                            block
                            size={'sm'}
                            variant={'outline-success'}
                            onClick={() => signIn()}
                            className={'mt-2'}
                    >
                        Sign In</Button>
                </div>
            </Col>
        </Row>
    </Container>);
};
export default withRouter(SignIn);