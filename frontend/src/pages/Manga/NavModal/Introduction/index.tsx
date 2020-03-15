import React, {useEffect, useRef, useState} from 'react';
import {UserInfo} from '../../../../models/user_info.model';
import {Container, Row, Col} from "react-bootstrap";

interface introductionProps {
    userInfo: UserInfo;

    changeValue(event: React.ChangeEvent<HTMLInputElement>): void;

    onChangeDescription(value: string): void;
}

const Introduction = (props: introductionProps) => {
    const startValueRef = useRef<string>('');
    const [defaultValue, setDefaultValue] = useState<string>('');
    useEffect(() => {
        const defaults = Object.keys(props.userInfo.description).map((key: string) => {
            return (props.userInfo.description as any)[key];

        });
        startValueRef.current = defaults.join('\n');
        setDefaultValue(startValueRef.current);
    }, []);
    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value) {
            const value = event.target.value;
            console.log(value);
            props.onChangeDescription(value);


        }

    };
    return (
        <Container>
            <Col>
                <Row>
                    <h4>Description</h4>
                </Row>
                <Row>
                    <textarea rows={5} cols={50} onChange={changeDescription} defaultValue={defaultValue}/>
                </Row>
            </Col>
        </Container>


    );
};
export default Introduction;