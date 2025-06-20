import React, { Suspense } from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';

const Home = () => {
    return (
        <div className='my-20 space-y-30'>
            <Banner></Banner>
            <Suspense>
                <HowItWorks></HowItWorks>
            </Suspense>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;