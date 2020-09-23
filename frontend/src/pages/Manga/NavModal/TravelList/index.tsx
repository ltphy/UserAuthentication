import React, {useEffect, useState} from 'react';
import {Row, Col, Container, Button} from 'react-bootstrap';
import {UserInfo} from "../../../../models/user_info.model";
import styles from './style.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faHamburger, faSearch} from '@fortawesome/free-solid-svg-icons';

interface TravelListProps {

}

interface TravelListState {
    name: string;
    travelList: string[];
}

class Name {
    name = "Phy";

    callMyName() {
        console.log(this);
    };
}

interface TravelItem {
    name: string;
}

class TravelList extends React.Component<TravelListProps, TravelListState> {
    // name:Name = new Name();
    // travelList: TravelItem[] = [];
    constructor(props: TravelListProps) {
        super(props);
        this.state = {
            name: "phy",
            travelList: ["phy"]
        }
    }

    addItem = () => {
        // let callMy = this.name.callMyName.bind(this.name);
        // let callMy = this.name.callMyName;
        // callMy();
        let newList = [...this.state.travelList, "phy"];
        this.setState({travelList: newList});
    };

    render() {
        return (
            <div className={styles.container_wrapper}>
                <div className={"row"}>
                    <div className={"col-sm-2 "+ styles.side_bar}>
                        <FontAwesomeIcon icon={faHamburger}/>
                    </div>
                    <div className={"col-sm-10 " + styles.search_field}>
                        <input type={"text"} size={12}/>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
                <div>
                    <div className={styles.travel_list}>
                        {
                            this.state.travelList.map((travel) => {
                                return (
                                    <div className={styles.travel_item}>
                                        {travel}
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className={styles.wrapper_button}>
                        <div className={styles.plus_button}>
                            <Button onClick={this.addItem} size={'sm'}
                                    variant={'danger'}
                            >
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>`
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default TravelList;