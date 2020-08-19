import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {GlobalSpinnerProvider} from "./context/loading.context";
import LoadingComponent from "./components/LoadingComponent";
import MainLayout from "./layout";
import {Route, Switch, withRouter, BrowserRouter as Router} from 'react-router-dom';
import {routes, IRouter} from './constants/routes.constants';
import ErrorBoundary from "./components/ErrorBoundary";
import AuthUserProvider, {AuthenticateFunctionContext} from "./context/auth.context";

import PrivateRoute from "./components/PrivateRoute";
import {Redirect} from "react-router";
import GenericModalProvider from "./components/ModalContext/ModalContext";

const App = () => {
    const RenderMainRoute = () => {
        const isAuthenContext = useContext(AuthenticateFunctionContext);
        return (
            <Switch>
                {
                    routes.map((route: IRouter, index: number) => {
                        if (route.isPrivate) {
                            return (<PrivateRoute key={index.toString()} path={route.path}>
                                <route.component/>
                            </PrivateRoute>);

                        } else {
                            //if already authenticated => then redirect to home not signin

                            if (route.title === "Sign In") {
                                return (
                                    <Route path={route.path}
                                           exact={route.path === '/'}
                                           key={index.toString()}
                                           render={({location}) => {
                                               return (!isAuthenContext.isAuthenticated() ?
                                                       <route.component/> : <Redirect to={{
                                                           pathname: "/",
                                                           state: {from: location}
                                                       }}/>
                                               )
                                           }}
                                    />
                                );
                            } else {
                                return (

                                    <Route path={route.path}
                                           exact={route.path === '/'}
                                           key={index.toString()}
                                           render={() => <route.component/>}
                                    />
                                );
                            }

                            // }

                        }

                    })}
            </Switch>
        );
    };

    return (
        <ErrorBoundary>
            <AuthUserProvider>
                <GenericModalProvider>
                    <GlobalSpinnerProvider>
                        <LoadingComponent/>
                        <Router>
                            <MainLayout>
                                <RenderMainRoute/>
                            </MainLayout>
                        </Router>
                    </GlobalSpinnerProvider>
                </GenericModalProvider>
            </AuthUserProvider>
        </ErrorBoundary>
    );
};

export default App;