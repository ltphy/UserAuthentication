import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const OnePiece = (match:RouteComponentProps) => {
    console.log(match);
    return (<div>One Piece</div>);
}
export default OnePiece;