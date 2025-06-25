import React from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/' className='flex items-center'>
            <img className='mb-5' src={logo} alt="logo" />
            <p className='text-3xl font-semibold -ml-4'>ProFast</p>
        </Link>
    );
};

export default Logo;