import React, {useEffect} from 'react';
import {withRouter} from 'react-router';
import {RouteComponentProps} from "react-router-dom";

const Contact = ({match}: RouteComponentProps) => {
    useEffect(() => {
        console.log("here");
    }, []);
    return (<div>Contact</div>);
}
export default withRouter(Contact);