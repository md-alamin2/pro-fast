import React from 'react';
import logo from "../../assets/logo.png"

const Logo = () => {
    return (
        <div className='flex items-center'>
            <img className='mb-5' src={logo} alt="logo" />
            <p className='text-3xl font-semibold -ml-4'>ProFast</p>
        </div>
    );
};

export default Logo;