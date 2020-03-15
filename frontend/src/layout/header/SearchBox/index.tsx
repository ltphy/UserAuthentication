import React, {ChangeEvent, useEffect, useRef} from 'react';
import style from "./style.module.scss";
import {Col, Navbar, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

interface searchBoxProps {
    searchValue(value: string): void;
}

const SearchBox = (props: searchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>();
    const searchBtnRef = useRef<HTMLButtonElement>();
    useEffect(() => {

    }, []);
    const searchValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            props.searchValue(value);
        }
    };

    return (
        <Row className={style.search_wrapper}>
            <Col className={style.search_field} md={"auto"}>
                <input type="text"
                       placeholder="Search..."
                       className={style.search_box}
                       autoComplete="off"
                       autoCorrect="off"
                       onChange={searchValue}
                />

            </Col>
            <Col md={"auto"} className={style.btn_wrapper}>
                <FontAwesomeIcon icon={faSearch}/>

            </Col>
        </Row>
    );
};

export default SearchBox;