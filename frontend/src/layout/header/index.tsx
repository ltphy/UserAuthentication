import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Form, Button, Col, Row} from "react-bootstrap";
import {routes, IRouter} from '../../constants/routes.constants';
import style from './style.module.scss';
import {withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
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

                <Row className={style.search_wrapper}>
                    <Col className={style.search_field} md={9}>
                        <input type="text"
                               placeholder="Search"
                               className={style.search_box}
                               autoComplete="off"
                               autoCorrect="off"
                        />

                    </Col>
                    <Col md={3}>
                        <button
                            className={style.btn_wrapper}>
                            <div className={style.btn_search}>
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                        </button>
                    </Col>

                </Row>
                <Form inline>
                    <Form.Control type="text" placeholder="Search" className={"mr-sm-2"}/>
                    <Button className={style.btn_search}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </Button>
                </Form>

            </Navbar.Collapse>
        </Navbar>
    );

}
export default withRouter(Header);