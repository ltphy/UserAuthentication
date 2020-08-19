import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const Home = () => {
    useEffect(() => {
        console.log("here");
    }, []);
    return (<div>Home</div>);
};
export default withRouter(Home);