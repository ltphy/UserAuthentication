import React, {ChangeEvent, useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Form, Button, Col, Row, NavDropdown, FormControl} from "react-bootstrap";
import {routes, IRouter} from '../../constants/routes.constants';
import style from './style.module.scss';
import {withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchBox from "./SearchBox";
//create a header nav bar to link route

const Header = () => {

    const enterSearchValue = (value:string) => {
        console.log(value);
    };

    return (
        <Navbar expand="lg" sticky={"top"} variant={"light"} className={style.navbar_wrapper}>
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

                            return (value.showHeaderNavBar &&
                                <LinkContainer to={value.path} key={key.toString()}>
                                    <Nav.Link>
                                        {value.title}
                                    </Nav.Link>
                                </LinkContainer>);
                        })
                    }
                </Nav>


0            </Navbar.Collapse>

            <SearchBox searchValue={enterSearchValue}/>
        </Navbar>
    );

}
export default withRouter(Header);