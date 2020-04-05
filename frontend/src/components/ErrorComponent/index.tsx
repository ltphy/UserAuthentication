import React from 'react';
import style from './style.module.scss';

interface ErrorProps {
    error: string;
}

const ErrorComponent = (props: ErrorProps) => {
    return <div className={style.error}>{props.error}</div>;
};

export default ErrorComponent;