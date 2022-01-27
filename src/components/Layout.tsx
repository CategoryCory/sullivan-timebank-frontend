import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
