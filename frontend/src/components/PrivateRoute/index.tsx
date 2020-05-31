import React, {useContext} from 'react';
import {Redirect, Route, RouteComponentProps, withRouter} from "react-router";
import {AuthenticateFunctionContext} from "../../context/auth.context";


const PrivateRoute = ({children, ...rest}: any) => {
    const isAuthenContext = useContext(AuthenticateFunctionContext);
    return (<Route
            {...rest}
            render={({...privateProps}) => {
                const authenticated =isAuthenContext.isAuthenticated();
                return (authenticated?
                        children : (
                            <Redirect to={{
                                pathname: "/sign-in",
                                state: {from: privateProps.location}
                            }}/>)
                );
            }}
        />
    );
};
export default PrivateRoute;
