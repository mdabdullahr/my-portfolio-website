import React from 'react';
import HeroSection from '../../component/HeroSection';
import AboutMe from '../AboutMe/AboutMe';
import MySkills from '../MySkills/MySkills';
import Projects from '../Projects/Projects';
import ContactInfo from '../ContactInfo/ContactInfo';


const Home = () => {
    return (
        <div className='bg-[#0C0C0C] px-5'>
            <HeroSection></HeroSection>
            <AboutMe></AboutMe>
            <MySkills></MySkills>
            <Projects></Projects>
            <ContactInfo></ContactInfo>
        </div>
    );
};

export default Home;