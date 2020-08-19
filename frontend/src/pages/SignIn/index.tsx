import React, {useContext, useEffect, useRef, useState} from 'react';
import {Col, Container, Form, Row, Button} from "react-bootstrap";
import style from './style.module.scss';
import {useHistory, withRouter} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPalette} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash, faEye} from "@fortawesome/free-regular-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {validateEmail} from '../../services/validate.service';
import ErrorComponent from "../../components/ErrorComponent";
import AuthService, {LoginInfo} from "../../services/auth.service";
import {AuthLogin, SetAuthenticationFnc} from "../../context/auth.context";
import {useGenericModal} from "../../components/ModalContext/ModalContext";

const SignIn = () => {

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const signInBtnRef = useRef<HTMLButtonElement | null>(null);
    const [emailInputClick, setEmailInputClick] = useState<boolean>(false);
    const [passwordInputClick, setPasswordInputClick] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [wrongEmail, setWrongEmail] = useState<boolean>(false);
    const [wrongPassword, setWrongPassword] = useState<boolean>(false);
    const [emailFilled, setEmailFilled] = useState<boolean>(false);
    const [passwordFilled, setPasswordFilled] = useState<boolean>(false);
    const setAuthContext = useContext(SetAuthenticationFnc);
    const useModal = useGenericModal();
    const history = useHistory();
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
        let error = false;
        if (emailRef.current) {
            email = emailRef.current.value;
            if (validateEmail(email)) {
                setWrongEmail(false);
                error = true;
            } else {
                setWrongEmail(true);
            }
        }
        if (passwordRef.current) {
            password = passwordRef.current.value;
            if (password === "") {
                error = true;
                setWrongPassword(true);
            } else {
                setWrongPassword(false);
            }
        }
        const accInfo: LoginInfo = {email: email, password: password};
        AuthService.signIn(accInfo).then((res: AuthLogin) => {
            history.push('/');
            setAuthContext(res);
        }).catch((error)=>{
            useModal.notifyError(errorText(error));
        })

    };

    const errorText = (error:any)=>{
        return (<div>{error.messages.join('')}</div>);
    };

    const onEmailInputClick = () => {
        //when reclick
        if (emailInputClick) {
            if (emailRef.current && emailRef.current.value) {
                setEmailFilled(false);//to use color title
                emailRef.current.placeholder = "";
            }
        }
        //start = false => email input true =>
        else if (!emailInputClick) {
            setEmailInputClick(true);
            console.log("Email Filled", emailFilled);

        }

    };

    const onPasswordInputClick = () => {
        if (passwordInputClick) {
            if (passwordRef.current && passwordRef.current.value) {
                setPasswordFilled(false);
            }
        } else {
            console.log("here");
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
                if (emailRef.current && !emailRef.current.value) {
                    console.log("EMPTY EMAIL");
                    setEmailInputClick(false); //only when empty email => false
                } else {
                    //still let email input click = true
                    setEmailFilled(true);
                }
                break;
            case 'Password':
                if (event.target.value === "") {
                    setPasswordInputClick(false);
                } else {
                    //
                    setPasswordFilled(true);
                }
                break;
        }

    };
    const onEmailTitleClick = () => {
        console.log("email");
        if (emailInputClick) {
            return;
        }
        onEmailInputClick();
        if (emailRef.current) {
            emailRef.current.focus();
        }
    };

    const onPasswordTitleClick = () => {
        if (passwordInputClick) {
            console.log("PASSWORD click");
            return;
        }

        onPasswordInputClick();
        if (passwordRef.current) {
            passwordRef.current.focus();
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
                                <span
                                    /* 2 case 1 when email is empty / not empty: change text color to gray */
                                    className={emailInputClick ? (emailFilled ? style.filled_title : style.title) : style.hide_title}
                                    onClick={onEmailTitleClick}>Email</span>
                                <span className={style.input_container}>
                                    <input type={'email'}
                                           ref={emailRef}
                                           className={style.input_wrapper}
                                           onSelect={onEmailInputClick}
                                           name={'Email'}
                                           onBlur={onBlurInputText}/>
                                </span>
                                <div className={style.error_text}>
                                    {
                                        wrongEmail && <ErrorComponent error={"Email is not valid"}/>
                                    }
                                </div>
                            </Col>
                        </Row>

                        <Row className={'mt-3' + ' ' + style.password_wrap}>
                            <Col className={"justify-content-md-center"}>
                                <span
                                    className={passwordInputClick ? (passwordFilled ? style.filled_title : style.title) : style.hide_title}
                                    onClick={onPasswordTitleClick}
                                >Password</span>

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
                                <div className={style.error_text}>
                                    {
                                        (wrongPassword && <ErrorComponent error={"Password cannot be empty"}/>)
                                    }
                                </div>
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