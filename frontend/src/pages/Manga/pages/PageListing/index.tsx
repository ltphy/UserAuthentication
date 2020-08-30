import React from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
const PageListing = ()=>{
    //send page number from client to server
    //item per page => constant API
    //current total item to divide page number
    return (
        <Container>
            <Row>
                <Col>
                    Product
                </Col>
                <Col>
                    Icon
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Dropdown/>

            </Row>
        </Container>
    );
};
export default PageListing;