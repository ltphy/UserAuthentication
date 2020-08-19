import React, {ChangeEvent, useEffect, useRef} from 'react';
import style from "./style.module.scss";
import {Col, Navbar, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

interface searchBoxProps {
    searchValue(value: string): void;
}

const SearchBox = (props: searchBoxProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const searchBtnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const enterValue = (event: KeyboardEvent) => {
            if (event.keyCode === 13 || event.key === "Enter") {
                if (searchBtnRef.current) {
                    searchBtnRef.current.click();
                }

            }
        };

        if (inputRef.current) {
            inputRef.current.addEventListener("keyup", enterValue);
        }
        return (() => {
            if (inputRef.current) {
                inputRef.current.removeEventListener("keyup", enterValue);
            }
        });
    }, []);

    const searchValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            props.searchValue(value);
        }
    };
    const onClickSearch = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (inputRef.current) {
            const value = inputRef.current.value;
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
                       ref={inputRef}
                />

            </Col>
            <Col md={"auto"} className={style.btn_wrapper} ref={searchBtnRef as any} onClick={onClickSearch}>
                <FontAwesomeIcon icon={faSearch}/>
            </Col>
        </Row>
    );
};

export default SearchBox;