import React, {useContext} from 'react';
import {GlobalSpinnerContext} from "../../context/loading.context";
import style from "../../style.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const LoadingComponent = () => {
    const isSpinnerGlobalSpinnerOn = useContext(GlobalSpinnerContext);
    return (
        isSpinnerGlobalSpinnerOn ?
            <div className={style.app_loader}>
                <FontAwesomeIcon icon={faSpinner} size={"5x"} spin={true}/>
            </div> : null
    )

}
export default LoadingComponent;