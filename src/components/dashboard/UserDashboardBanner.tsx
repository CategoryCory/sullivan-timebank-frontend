import React from 'react';
import { Link } from 'react-router-dom';

export default function UserDashboardBanner() {
    return (
        <section className='py-6 bg-gray-100'>
            <div className='container mx-auto px-4 grid grid-cols-4 items-center'>
                <div className=''>
                    <p className='font-bold'>
                        Your Rating
                        <Link to="/" className='ml-2 font-normal text-sm text-indigo-500 hover:underline hover:text-indigo-700'>
                            VIEW ALL
                        </Link>
                    </p>
                    <p className='font-bold text-9xl text-lime-500'>4.8</p>
                </div>
                <div className=''>
                    <p className='font-bold'>
                        Your Coins
                        <Link to="/" className='ml-2 font-normal text-sm text-indigo-500 hover:underline hover:text-indigo-700'>
                            VIEW ALL
                        </Link>
                    </p>
                    <p className='font-bold text-9xl text-amber-400'>12.5</p>
                </div>
                <div className='col-span-2'>
                    <p className='mb-3 font-bold'>Alerts &amp; Notifications</p>
                    <div className='space-y-4'>
                        <p className='pt-4 pl-3 border-t-2 border-t-gray-300'>Lorem ipsum dolor sit amet.</p>
                        <p className='pt-4 pl-3 border-t-2 border-t-gray-300'>Lorem ipsum dolor sit amet.</p>
                        <p className='pt-4 pl-3 border-t-2 border-t-gray-300'>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
