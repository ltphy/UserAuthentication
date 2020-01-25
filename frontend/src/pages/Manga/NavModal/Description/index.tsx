import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import style from './style.module.scss';
import {UserDescription, UserInfo} from "../../../../models/user_info.model";

interface descriptionProps {
    changeValue(event: React.ChangeEvent<HTMLInputElement>): void,

    userInfo: UserInfo,
}

const Description = (props: descriptionProps) => {

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeValue(event);
    }

    const description: UserDescription = props.userInfo.description;
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} md={6}>
                    <Form.Group as={Row} controlId={"firstName"}>
                        <Form.Label column md={"4"}>
                            First Name
                        </Form.Label>
                        <Col md={"8"}>
                            <Form.Control type={"text"} defaultValue={description.firstName} onChange={changeValue}/>
                        </Col>
                    </Form.Group>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                    <Form.Group as={Row} controlId={"lastName"}>
                        <Form.Label column md={"4"}>
                            Last Name
                        </Form.Label>
                        <Col md={"8"}>
                            <Form.Control type={"text"} defaultValue={description.lastName} onChange={changeValue}/>
                        </Col>
                    </Form.Group>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId={"email"}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" defaultValue={description.email} onChange={changeValue}/>
            </Form.Group>
            <Form.Group controlId="selectManga">
                <Form.Label> Select Your Favorite Manga characters</Form.Label>
                <Form.Control as={"select"} defaultValue={description.selectManga}
                              onChange={changeValue}>
                    <option value={""}> Select option</option>
                    <option>Luffy</option>
                    <option>Naruto</option>
                    <option>Gintama</option>
                </Form.Control>
            </Form.Group>
        </Form>

    );
}
export default Description;