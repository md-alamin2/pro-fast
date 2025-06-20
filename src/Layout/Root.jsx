import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <header className='w-11/12 lg:container mx-auto'>
                <Navbar></Navbar>
            </header>
            <main><Outlet></Outlet></main>
            <Footer></Footer>
        </div>
    );
};

export default Root;