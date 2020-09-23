import React, {useEffect, useRef, useState} from 'react';
import {Col, Row, Button, Dropdown, Container} from "react-bootstrap";
import style from './style.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {defaultCharacters} from './summary.constants';

const Summary = () => {
    const [currChars, setCurrChars] = useState<string[]>(['Conan']);
    const charsRef = useRef<HTMLDivElement|null>(null);

    const removeChar = (key: number) => {
        const newChars = currChars.filter((value: string, id: number) => {
            return (id !== key);
        });
        setCurrChars([...newChars]);
    };

    const chooseItem = (eventKey: string) => {
        console.log(eventKey);
        if (eventKey) {
            // currChars.unshift(eventKey);
            currChars.push(eventKey);
            setCurrChars([...currChars]);
        }
    };
    useEffect(() => {
        if (charsRef.current) {
            charsRef.current.scrollTop = charsRef.current.scrollHeight;
        }
    }, [currChars.length]);
    return (
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <label>Characters</label>
                </Col>
                <Col sm={5}>
                    <div className={style.wrapper} ref={charsRef}>
                        {
                            currChars.map((value: string, key: number) => {
                                return (
                                    <div className={style.char_box} key={key}>
                                        <Row>
                                            <Col sm={8}>
                                                <small>{value}</small>
                                                <input type="text" id={key.toString()}/>
                                            </Col>
                                            <Col sm={4}>
                                                <Button onClick={() => {
                                                    removeChar(key);
                                                }} size={'sm'}
                                                        variant={'danger'}
                                                >
                                                    <FontAwesomeIcon icon={faMinus}/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className={'mt-2'}>
                        <Dropdown onSelect={(eventKey: string, e: React.SyntheticEvent<unknown>) => {
                            chooseItem(eventKey)
                        }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" size={'sm'}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    defaultCharacters.map((value: string, key: number) => {
                                        return (
                                            <Dropdown.Item key={key.toString()} eventKey={value}>{value}</Dropdown.Item>
                                        );
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}
export default Summary;