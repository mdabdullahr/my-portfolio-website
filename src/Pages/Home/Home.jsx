import React from 'react';
import HeroSection from '../../component/HeroSection';
import AboutMe from '../AboutMe/AboutMe';
import Services from '../Services/Services';
import ExperienceGrowth from '../Experience/ExperienceGrowth';
/* ================= OLD SKILLS SECTION START =================
import MySkills from '../MySkills/MySkills';
   ================= OLD SKILLS SECTION END ================= */
import TechnicalSkills from '../TechnicalSkills/TechnicalSkills';
/* ================= OLD PROJECTS SECTION START =================
import Projects from '../Projects/Projects';
   ================= OLD PROJECTS SECTION END ================= */
import ProjectsV2 from '../Projects/ProjectsV2';
import ContactInfo from '../ContactInfo/ContactInfo';


const Home = () => {
    
    return (
        <div className='bg-[#0C0C0C] px-5'>
            <HeroSection></HeroSection>
            <AboutMe></AboutMe>
            <Services></Services>
            <ExperienceGrowth></ExperienceGrowth>
            {/* ================= OLD SKILLS SECTION START =================
            <MySkills></MySkills>
               ================= OLD SKILLS SECTION END ================= */}
            <TechnicalSkills></TechnicalSkills>
            {/* ================= OLD PROJECTS SECTION START =================
            <Projects></Projects>
               ================= OLD PROJECTS SECTION END ================= */}
            <ProjectsV2></ProjectsV2>
            <ContactInfo></ContactInfo>
        </div>
    );
};

export default Home;