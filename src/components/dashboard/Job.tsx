import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import JobForm from './JobForm';

export default function Job() {
    const params = useParams();

    let displayId = "";
    let headerText = "Add a New Job";
    let descriptionText = "Fill out the form below to create a new job.";

    if (params.displayId != null) {
        const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (guidPattern.test(params.displayId) === true) {
            displayId = params.displayId;
            headerText = "Edit Job Details";
            descriptionText = "Use the form below to edit this job's details.";
        }
    }

    return (
        <>
            <section className='py-8 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='mb-3 text-4xl text-gray-700'>{headerText}</h1>
                    <Link to="/dashboard" className='flex items-center gap-2 text-gray-500 text-sm'>
                        <ArrowBackIcon fontSize='small' />Back to dashboard
                    </Link>
                </div>
            </section>
            <div className='container mx-auto mt-10 px-4'>
                <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                    <div className="md:basis-1/3 md:flex-none lg:basis-1/4"></div>
                    <div className='md:basis-2/3 md:flex-none lg:basis-3/4'>
                        <p className='text-lg text-gray-700'>
                            {descriptionText}
                        </p>
                        <p className='text-sm text-gray-500 leading-5'>
                            Select a category for the job, add a brief description of the job, and choose a schedule type.
                        </p>
                    </div>
                </div>
            </div>
            <JobForm currentDisplayId={displayId} />
        </>
    )
}
