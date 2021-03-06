import React, {ChangeEvent, useContext, useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Form, Button, Col, Row, NavDropdown, FormControl} from "react-bootstrap";
import {routes, IRouter} from '../../constants/routes.constants';
import style from './style.module.scss';
import {withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchBox from "./SearchBox";
import {AuthenticateFunctionContext, AuthUserContext} from "../../context/auth.context";
//create a header nav bar to link route

const Header = () => {
    const useAuthFnc = useContext(AuthenticateFunctionContext);
    const authIno = useContext(AuthUserContext);

    const enterSearchValue = (value: string) => {
        console.log(value);
    };

    const signOut = () => {
        useAuthFnc.clearAuth();
    };

    const renderAuthentication = () => {
        if (!useAuthFnc.isAuthenticated()) {
            return (
                routes.map((value: IRouter, key: number) => {
                    if (value.title === 'Sign In') {
                        return (value.showHeaderNavBar &&
                            <LinkContainer to={value.path} key={key.toString()}>
                                <Nav.Link className={style.sign_in_wrapper}>
                                    <span className={style.sign_in_text}>{value.title}</span>
                                </Nav.Link>
                            </LinkContainer>
                        );
                    } else if (value.title === 'Sign Up') {
                        return (value.showHeaderNavBar &&
                            <LinkContainer to={value.path} key={key.toString()}>
                                <Nav.Link>
                                    <Button variant={'outline-secondary'}>{value.title}</Button>
                                </Nav.Link>
                            </LinkContainer>
                        );
                    }
                })

            );
        } else {
            return (
                <div>
                    <span className={style.name}>
                        Welcome {authIno.user.name}!
                    </span>
                    <Button variant={"outline-secondary"} onClick={signOut}>
                        Log Out
                    </Button>

                </div>

            );
        }

    };

    return (
        <Navbar bg={"dark"} expand="lg" sticky={"top"} variant={"dark"} className={style.navbar_wrapper}>
            <LinkContainer to="/">
                <Navbar.Brand>
                    Manga Characters
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={"mr-auto"}>
                    {
                        routes.map((value: IRouter, key: number) => {
                            if (value.title !== 'Sign Up' && value.title !== 'Sign In') {
                                return (value.showHeaderNavBar &&
                                    <LinkContainer to={value.path} key={key.toString()}>
                                        <Nav.Link>
                                            {value.title}
                                        </Nav.Link>
                                    </LinkContainer>);
                            }
                        })
                    }
                </Nav>
                <Nav className={style.right_bar}>
                    {renderAuthentication()}
                </Nav>
            </Navbar.Collapse>

            <SearchBox searchValue={enterSearchValue}/>

        </Navbar>
    );
};
export default withRouter(Header);