import React, { Suspense } from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import ClientMarque from '../../Components/ClientMarque/ClientMarque';
import Benefits from '../../Components/Benefits/Benefits';
import BecomeMerchant from '../../Components/BecomeMerchant/BecomeMerchant';
import ReviewSection from '../../Components/Review/ReviewSection';
import FAQ from '../../Components/FAQ/FAQ';

const Home = () => {
    return (
        <div className='my-20 space-y-30'>
            <Banner></Banner>
            <Suspense>
                <HowItWorks></HowItWorks>
            </Suspense>
            <OurServices></OurServices>
            <ClientMarque></ClientMarque>
            <Benefits></Benefits>
            <BecomeMerchant></BecomeMerchant>
            <ReviewSection></ReviewSection>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;