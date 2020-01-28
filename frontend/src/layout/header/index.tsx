import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Form, Button, Col, Row, NavDropdown, FormControl} from "react-bootstrap";
import {routes, IRouter} from '../../constants/routes.constants';
import style from './style.module.scss';
import {withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
//create a header nav bar to link route

const Header = () => {
    return (
        <Navbar bg="dark" expand="lg" variant={"dark"} sticky={"top"}>
            <LinkContainer to="/">
                <Navbar.Brand className={style.title}>
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

                <div className={style.search_wrapper}>
                    <div className={style.search_field}>
                        <input type="text"
                               placeholder="Search"
                               className={style.search_box}
                               autoComplete="off"
                               autoCorrect="off"
                        />

                    </div>
                    <button
                        className={style.btn_wrapper}>
                        <div className={style.btn_search}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </button>
                </div>
            </Navbar.Collapse>


        </Navbar>
    );

}
export default withRouter(Header);