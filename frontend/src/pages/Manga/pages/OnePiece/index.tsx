import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import style from './style.module.scss';

const OnePiece = ({match}: RouteComponentProps) => {
    return (
        <div>
            <div className={style.container}>
                <div className={style.circle1}></div>
                <div className={style.circle2}></div>
            </div>
            <div className={style.container1}>
                <div className={style.square1}></div>
                <div className={style.square2}></div>
            </div>
            <div className={style.water_drop}></div>
        </div>

    );
}
export default OnePiece;