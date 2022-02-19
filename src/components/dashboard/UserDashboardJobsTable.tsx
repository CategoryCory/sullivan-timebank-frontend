import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddIcon from '@mui/icons-material/Add';
import { Job } from '../../models/job';
import { Link } from 'react-router-dom';

export default function UserDashboardJobsTable() {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setLoading(true);
        axios.get<Job[]>("/jobs")
            .then(res => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className='mt-16'>
            <CircularProgress sx={{ color: "#4f46e5" }} />
        </div>
    );

    if (jobs.length === 0) return (
        <div className='mt-20 flex flex-col items-center'>
            <CreateNewFolderIcon sx={{ fontSize: "4rem", color: "#d1d5db" }} />
            <h3 className='mt-2 mb-1 font-sans text-2xl text-gray-600'>No jobs yet</h3>
            <p className='text-gray-500'>Get started by creating a new job.</p>
            <Link 
                to="/dashboard/add-job" 
                className='mt-3 px-5 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                            hover:bg-indigo-700 transition duration-150'
            >
                <AddIcon />New Job
            </Link>
        </div>
    )

    return (
        <div>
            {jobs.map(job => (<h2>{job.jobName}</h2>))}
        </div>
    );
}
