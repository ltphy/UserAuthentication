import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import Home from './pages/Home';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import LoadingService from './services/loading.service';

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const API = "https://api.github.com/users/ltphy";
    useEffect(() => {
        DoSth().then(r => console.log(r));
    }, []);

    const LoadingComponent = () => {
        return (
            <div className={style.app_loader}>
                <FontAwesomeIcon icon={faSpinner} size={"5x"} spin={true}/>
            </div>
        );
    }
    const fetchGitHub = () => {
        fetch(API)
            .then(res => res.json())
            .then(res => {
           console.log(res)

        }).catch((error)=>{
            console.log(error);
        })

    }
    const DoSth = async () => {
        await LoadingService.getInstance().wait(2000);
        setIsLoading(false);

    }

    return (<>
            {
                isLoading ? (<LoadingComponent/>) : (
                    <Home/>)
            }
        </>

    );
}

export default App;
