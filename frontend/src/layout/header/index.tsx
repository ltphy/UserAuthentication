import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav} from "react-bootstrap";
import {routes, IRouter} from '../../constants/routes.constants';
import style from './style.module.scss';
import { withRouter } from 'react-router-dom';
//create a header nav bar to link route
const Header = () => {
    return (
        <Navbar bg="dark" variant={"dark"} sticky={"top"}>
            <LinkContainer to="/">
                <Navbar.Brand className={style.title}>
                    MC
                </Navbar.Brand>
            </LinkContainer>
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
            </Navbar.Collapse>
        </Navbar>
    );

}
export default withRouter(Header);