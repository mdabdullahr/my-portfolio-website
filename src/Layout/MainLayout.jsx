import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';


const MainLayout = () => {
    return (
        <div className='bg-[#0C0C0C]'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;