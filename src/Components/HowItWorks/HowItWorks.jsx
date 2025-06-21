import React, { use } from 'react';
import HowItWorksCard from '../HowItWorksCard/HowItWorksCard';

const HowItWorksPromise = fetch('/data/howItWorks.json').then(res=>res.json())

const HowItWorks = () => {
    const HowItWorksData = use(HowItWorksPromise)
    // console.log(HowItWorksData);
    return (
        <div className='w-11/12 lg:w-7xl mx-auto'>
            <h3 className='text-3xl text-secondary font-bold'>How It Works</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>
                {
                    HowItWorksData.map((data, index)=><HowItWorksCard key={index} data={data}></HowItWorksCard>)
                }
            </div>
        </div>
    );
};

export default HowItWorks;