import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const Home = ({match}: RouteComponentProps) => {
    return (<div>Home</div>);
}
export default withRouter(Home);