import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const MainLayout = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return undefined;
        }

        const targetId = decodeURIComponent(location.hash.slice(1));
        const startedAt = performance.now();
        let frameId;
        let timerId;

        const scrollWhenReady = () => {
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                return;
            }

            if (performance.now() - startedAt >= 500) return;

            frameId = window.requestAnimationFrame(scrollWhenReady);
        };

        timerId = window.setTimeout(() => {
            frameId = window.requestAnimationFrame(scrollWhenReady);
        }, 0);

        return () => {
            window.clearTimeout(timerId);
            window.cancelAnimationFrame(frameId);
        };
    }, [location.pathname, location.hash]);

    return (
        <div className='bg-[#0C0C0C]'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;