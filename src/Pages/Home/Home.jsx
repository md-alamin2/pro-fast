import React, { Suspense } from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div className='my-20 space-y-30'>
            <Banner></Banner>
            <Suspense>
                <HowItWorks></HowItWorks>
            </Suspense>
        </div>
    );
};

export default Home;