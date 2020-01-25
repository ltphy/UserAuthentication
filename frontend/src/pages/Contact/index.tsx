import React from 'react';
import { withRouter } from 'react-router';
import {RouteComponentProps} from "react-router-dom";

const Contact = ({match}: RouteComponentProps) => {
    return (<div>Contact</div>);
}
export default withRouter(Contact);