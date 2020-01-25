import React from 'react';
import Header from "./header";
import Footer from './footer';

interface mainProps {
    children: any;
}

const MainLayout = (props: mainProps) => {
    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    );
}
export default MainLayout;