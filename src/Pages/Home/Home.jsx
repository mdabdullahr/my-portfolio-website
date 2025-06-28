import React from 'react';
import HeroSection from '../../component/HeroSection';
import AboutMe from '../AboutMe/AboutMe';

const Home = () => {
    return (
        <div className='bg-[#0C0C0C] px-5'>
            <HeroSection></HeroSection>
            <AboutMe></AboutMe>
        </div>
    );
};

export default Home;