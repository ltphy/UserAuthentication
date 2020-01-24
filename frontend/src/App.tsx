import React, {useCallback, useEffect, useState} from 'react';
import style from './style.module.scss';
import Home from './pages/Home';

import {GlobalSpinnerProvider} from "./context/loading.context";
import LoadingComponent from "./components/LoadingComponent";
import MainLayout from "./layout";
import {Route, Switch, withRouter, BrowserRouter as Router} from 'react-router-dom';
import {routes, IRouter} from './constants/routes.constants';

const App = () => {

    return (
        <GlobalSpinnerProvider>
            <LoadingComponent/>
            <Router>
                <MainLayout>
                    <Switch>
                        {
                            routes.map((route: IRouter, index: number) => {
                                if (route.isPrivate) {
                                    return <div></div>
                                } else {
                                    return (
                                        <Route path={route.path}
                                               exact={route.path === '/'}
                                               key={index.toString()}
                                               component={route.component}
                                        />
                                    );
                                }

                            })
                        }
                    </Switch>
                </MainLayout>
            </Router>
        </GlobalSpinnerProvider>

    );
}

export default App;