import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div className='bg-base-300 pt-6 relative'>
            <header className='w-11/12 lg:container mx-auto sticky top-2 z-10'>
                <Navbar></Navbar>
            </header>
            <main><Outlet></Outlet></main>
            <Footer></Footer>
        </div>
    );
};

export default Root;