import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddJobForm from './AddJobForm';

export default function AddJob() {
    return (
        <>
            <section className='py-8 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='mb-3 text-4xl text-gray-700'>Add a New Job</h1>
                    <Link to="/dashboard" className='flex items-center gap-2 text-gray-500 text-sm'>
                        <ArrowBackIcon fontSize='small' />Back to dashboard
                    </Link>
                </div>
            </section>
            <AddJobForm />
        </>
    )
}
