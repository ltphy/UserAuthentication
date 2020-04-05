import React, {useCallback, useEffect, useState} from 'react';
import {GlobalSpinnerProvider} from "./context/loading.context";
import LoadingComponent from "./components/LoadingComponent";
import MainLayout from "./layout";
import {Route, Switch, withRouter, BrowserRouter as Router} from 'react-router-dom';
import {routes, IRouter} from './constants/routes.constants';
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {

    return (
        <ErrorBoundary>
            <GlobalSpinnerProvider>
                <LoadingComponent/>
                <Router>
                    <MainLayout>
                        <Switch>
                            {
                                routes.map((route: IRouter, index: number) => {
                                    console.log(route.path === '/');
                                    if (route.isPrivate) {
                                        return <div></div>
                                    } else {
                                        console.log(route.path);
                                        return (

                                            <Route path={route.path}
                                                   exact={route.path === '/'}
                                                   key={index.toString()}
                                                   render={route.component}
                                            />
                                        );
                                    }

                                })
                            }
                        </Switch>
                    </MainLayout>
                </Router>
            </GlobalSpinnerProvider>
        </ErrorBoundary>
    );
};

export default App;