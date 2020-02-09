import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Container, Button, Modal, Navbar, Nav} from 'react-bootstrap'
import style from './style.module.scss';
import {withRouter, RouteComponentProps, Route, Link, Switch, useHistory, Redirect} from "react-router-dom";
import {routes, IRouter} from './constants/routes.constant';
import {LinkContainer} from 'react-router-bootstrap';

const Manga = ({match, location}: RouteComponentProps) => {

    return (
        <Container fluid>
            <Row className={style.wrapper}>
                <Col md={3} xs={4} className={style.menu_container}>
                    {
                        routes.map((route, key) => {
                            return (
                                <LinkContainer to={`${match.url}${route.path}`} key={key.toString()} className={style.link_wrapper}>
                                    <Nav.Link className={"text-secondary"} >
                                        {route.title}
                                    </Nav.Link>
                                </LinkContainer>
                            );
                        })}
                </Col>
                <Col md={9} xs={8} className={style.info_container}>
                    {/*{firstPage&&(<Redirect exact from= '/manga' to={'/manga/conan'}/>)}*/}
                    <Switch>
                        {
                            routes.map((route: IRouter, index: number) => {

                                if (route.isPrivate) {
                                    return <div></div>
                                } else {
                                    return (
                                        <Route path={`${match.url}${route.path}`}
                                               exact={route.path ==='/'}
                                               key={index.toString()}
                                               component={route.component}
                                        />
                                    );
                                }
                            })
                        }
                        <Redirect exact to={{pathname:'/manga/conan', state: {from: '/manga'}}}/>

                    </Switch>
                </Col>
            </Row>

        </Container>
    );
}
export default withRouter(Manga);