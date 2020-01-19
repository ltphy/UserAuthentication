import React, {useCallback, useEffect, useState} from 'react';
import style from './style.module.scss';
import Home from './pages/Home';

import {GlobalSpinnerProvider} from "./context/loading.context";
import LoadingComponent from "./components/LoadingComponent";
const App = () => {

    return (
        <GlobalSpinnerProvider>
            <LoadingComponent/>
            <Home/>
        </GlobalSpinnerProvider>

    );
}

export default App;
