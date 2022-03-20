import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IJob } from '../../models/job';

export default function UserDashboardJobDetails() {
    const [jobDetails, setJobDetails] = useState<IJob>();
    // const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);
    // const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const displayId = params.displayId;

        axios.get<IJob>(`/jobs/${displayId}`)
            .then(res => {
                setJobDetails(res.data);
                console.log(res.data);
            })
            .catch((err: AxiosError) => {
                console.error(err);
            })
    }, [params.displayId]);

    useEffect(() => {
        
    }, [jobDetails]);

    return (
        <>
            <section className='py-8 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='mb-3 text-3xl text-gray-700'>{jobDetails?.jobName}</h1>
                    <Link to="/dashboard" className='flex items-center gap-2 text-gray-500 text-sm'>
                        <ArrowBackIcon fontSize='small' />Back to dashboard
                    </Link>
                </div>
            </section>
            <main className='container mx-auto my-10'>
                <div className='mb-8 flex items-center gap-4'>
                    <h2 className='font-sans text-4xl'>{jobDetails?.jobName}</h2>
                    <span className='inline-block px-3 py-0.5 bg-indigo-100 text-indigo-800 text-sm rounded-full'>
                        {jobDetails?.jobCategory}
                    </span>
                </div>
                <div className='mb-4 flex gap-12'>
                    <div>
                        <p className='text-sm text-gray-500'>Posted On</p>
                        <p className='font-bold text-lg'>
                            {jobDetails && format(new Date(jobDetails!.createdOn!.toString()), "MMMM d, yyyy")}
                        </p>
                    </div>
                    <div>
                        <p className='text-sm text-gray-500'>Expires On</p>
                        <p className='font-bold text-lg'>
                            {jobDetails && format(new Date(jobDetails!.expiresOn!.toString()), "MMMM d, yyyy")}
                        </p>
                    </div>
                </div>
                <p className='mb-4 pb-4 border-b border-b-gray-300'>{jobDetails?.description}</p>
                <section>
                    <h3 className='mb-4 font-sans font-bold text-xl'>Applicants</h3>
                    {jobDetails?.jobApplications?.length === 0 ? (
                        <p className='text-sm text-gray-500'>
                            This job currently has no applicants.
                        </p>
                    ) : (
                        <ul className="-my-5 divide-y divide-gray-200">
                            {jobDetails?.jobApplications?.map(application => (
                                <li key={application.jobApplicationId} className="py-4">
                                    <div className='flex items-center space-x-4'>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-bold'>
                                                {`${application.applicant?.firstName} ${application.applicant?.lastName}`}
                                            </p>
                                            <div className='space-x-2'>
                                                {application.applicant?.skills.map(skill => (
                                                    <span
                                                        key={skill.userSkillId}
                                                        className='inline-block px-2 py-0.5 bg-indigo-100 text-sm text-indigo-700 rounded-full'
                                                    >
                                                        {skill.skillName}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            {application.jobSchedules?.map(schedule => (
                                                <p key={schedule}>{schedule}</p>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </>
    )
}
