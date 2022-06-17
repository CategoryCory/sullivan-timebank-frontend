import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import { format } from 'date-fns';
import { Link, useParams, useNavigate } from "react-router-dom";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { toast } from "react-toastify";
import { useStore } from "../../stores/store";
import guidTest from "../../helpers/guidTest";
import scheduleFormatter from "../../helpers/scheduleFormatter";
import { IJob, IJobApplication, IJobCustomSchedule } from '../../models/job';
import { Dialog, Transition } from '@headlessui/react';
import { IPhoto } from '../../models/photo';

interface IJobApplicationCheck {
    applicationExists: boolean;
    applicationDate: Date;
}

export default function JobDetails() {
    const [jobDetails, setJobDetails] = useState<IJob>({
        displayId: "",
        jobName: "",
        description: "",
        jobScheduleType: "",
        expiresOn: new Date(),
        jobStatus: "",
        createdOn: new Date(),
        jobCategoryId: 0,
        jobCategory: "",
        createdById: "",
        createdBy: "",
        jobSchedules: new Array<IJobCustomSchedule>(),
    });
    const [createdByProfileImage, setCreatedByProfileImage] = useState<IPhoto | null>(null);
    const [scheduleIds, setScheduleIds] = useState<number[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [existingApplication, setExistingApplication] = useState<IJobApplicationCheck>({
        applicationExists: false,
        applicationDate: new Date(),
    });
    const navigate = useNavigate();
    const params = useParams();
    const { userStore } = useStore();

    let jobId = "";

    if (params.displayId != null) {
        if (guidTest(params.displayId)) {
            jobId = params.displayId;
        }
    }

    useEffect(() => {
        if (jobId !== "") {
            axios.get<IJob>(`/jobs/${jobId}`)
                .then(res => {
                    setJobDetails(res.data);
                })
                .catch((err: AxiosError) => {
                    console.error(err);
                });
        }
    }, [jobId]);

    useEffect(() => {
        if (jobDetails.createdById !== "") {
            axios.get<IPhoto>(`/photos/?userId=${jobDetails.createdById}`)
                .then(res => {
                    setCreatedByProfileImage(res.data);
                })
                .catch((err: AxiosError) => {
                    console.error(err);
                })
        }
    }, [jobDetails.createdById]);

    useEffect(() => {
        if (jobDetails.displayId) {
            axios.get<IJobApplicationCheck>(`/jobapplications/verify/?jobId=${jobDetails.jobId}`)
                .then(res => {
                    setExistingApplication(res.data);
                })
                .catch((err: AxiosError) => {
                    console.error(err);
                });
        }
    }, [jobDetails])

    if (jobId === "" || jobId == null) {
        navigate("/jobs", { replace: true });
    }

    const selectSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedScheduleId = parseInt(e.target.value);

        if (scheduleIds.includes(selectedScheduleId)) {
            const updatedIds = scheduleIds.filter(id => id !== selectedScheduleId);
            setScheduleIds(updatedIds);
        } else {
            const updatedIds = [...scheduleIds];
            updatedIds.push(selectedScheduleId);
            setScheduleIds(updatedIds);
        }
    }

    const handleSubmit = () => {
        if (jobDetails == null || jobDetails.jobId == null) {
            toast.error("There was an error submitting this application.");
        }

        const applicationPostRequests = scheduleIds.map(id => {
            const app: IJobApplication = {
                jobId: jobDetails.jobId!,
                jobApplicationScheduleId: id,
            };

            return axios.post<IJobApplication>("/jobapplications", app);
        });

        axios.all(applicationPostRequests)
            .then(axios.spread((...responses) => {
                setModalOpen(true);
            }))
            .catch((errors: AxiosError[]) => {
                errors.forEach(error => console.error(error));
            });

        // const jobApplicationToAdd: IJobApplication = {
        //     jobId: jobDetails.jobId!,
        //     jobSchedules: scheduleIds,
        // };

        // axios.post<IJobApplication>("/jobapplications", jobApplicationToAdd)
        //     .then(res => {
        //         setModalOpen(true);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     })
    }

    return (
        <>
            <section className='py-10 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='mb-3 text-3xl text-gray-700'>Job Details</h1>
                    <Link to="/jobs" className='flex items-center gap-2 text-gray-500 text-sm'>
                        <ArrowBackIcon fontSize='small' />Back to job listings
                    </Link>
                </div>
            </section>
            <main className='container mx-auto my-8'>
                <div className='mb-8 px-8 inline-flex items-center gap-6'>
                    <h2 className='font-sans font-bold text-3xl text-indigo-600'>
                        {jobDetails?.jobName}
                    </h2>
                    <span className='px-3 py-0.5 bg-indigo-100 text-sm text-indigo-500 rounded-full'>
                        {jobDetails.jobCategory}
                    </span>
                </div>
                <section className='mb-4 px-8 py-4 flex items-center gap-8 bg-gray-100 rounded-xl'>
                    {userStore.isLoggedIn && 
                        <div className="flex items-center gap-4">
                            <img 
                                src={createdByProfileImage?.url}
                                alt={jobDetails.createdBy}
                                className="w-14 h-14 object-cover rounded-full"
                            />
                            <div className='pr-8 border-r border-r-gray-400'>
                                <p className='font-bold text-gray-700'>{jobDetails.createdBy}</p>
                                <p className='text-sm text-gray-500'>No reviews</p>
                            </div>
                        </div>
                    }
                    <div className='pr-8 border-r border-r-gray-400'>
                        <p className='text-sm text-gray-500'>Posted On</p>
                        <p className='text-gray-700'>
                            {format(new Date(jobDetails.createdOn!), "MMMM d, yyyy")}
                        </p>
                    </div>
                    <div className=''>
                        <p className='text-sm text-gray-500'>Expires On</p>
                        <p className='text-gray-700'>
                            {format(new Date(jobDetails.expiresOn!), "MMMM d, yyyy")}
                        </p>
                    </div>
                </section>
                <section className='mt-6 px-20 pb-4 border-b border-b-gray-300'>
                    <h3 className='leading-8 font-sans text-lg'>Job details</h3>
                    <p>{jobDetails.description}</p>
                </section>
                {(userStore.isLoggedIn && existingApplication.applicationExists === false) && 
                    <section className='mt-6 px-20 pb-4 border-b border-b-gray-300'>
                        <h3 className='leading-8 font-sans text-lg'>Working days</h3>
                        {jobDetails.jobScheduleType === "Open" && 
                            <p className='text-sm text-gray-500'>
                                This job has an open schedule. Once you have applied to this job, you and the job creator 
                                can select a schedule that is convenient for you both.
                            </p>
                        }
                        {jobDetails.jobScheduleType === "Custom" && 
                            <>
                                <p className='text-sm text-gray-500'>
                                    From the list below, select the days and times you're available to work on this job.
                                    You can select as many time slots as you'd like.
                                </p>
                                <fieldset className='space-y-5'>
                                    <legend className='sr-only'>Job Working Days</legend>
                                    {jobDetails.jobSchedules?.sort((a, b) => (a.dayOfWeek > b.dayOfWeek) ? 1 : -1).map(schedule => (
                                        <div key={schedule.jobScheduleId} className='relative flex items-start'>
                                            <div className='flex items-center h-5'>
                                                <input
                                                    id={schedule.jobScheduleId?.toString()}
                                                    aria-describedby={`job-schedule-${schedule.jobScheduleId}`}
                                                    name={`job-schedule-${schedule.jobScheduleId}`}
                                                    value={schedule.jobScheduleId}
                                                    type="checkbox"
                                                    onChange={selectSchedule}
                                                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                                                />
                                            </div>
                                            <div className='ml-3 text-sm'>
                                                <label htmlFor={schedule.jobScheduleId?.toString()} className="font-medium text-gray-700">
                                                    {scheduleFormatter(parseInt(schedule.dayOfWeek, 10), schedule.timeBegin!, schedule.timeEnd!)}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </fieldset>
                            </>
                        }
                    </section>
                }
                <section className='mt-6 px-20'>
                    {userStore.isLoggedIn ? (
                        existingApplication.applicationExists ? (
                            <p className='flex items-center gap-1 text-sm text-gray-500'>
                                <CheckCircleOutlineIcon fontSize="small" sx={{ color: "#10B981" }} />
                                You applied for this job on {format(new Date(existingApplication.applicationDate), "MMMM d, yyyy")}.
                            </p>
                        ) : (
                            <button
                                className='px-6 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2
                                            focus:ring-indigo-600 hover:bg-indigo-700 transition duration-150'
                                onClick={handleSubmit}
                            >
                                <CheckIcon fontSize='small' />I'm interested
                            </button>
                        )
                    ) : (
                        <div className='flex items-center'>
                            <AnnouncementIcon fontSize='small' sx={{ color: "#D97706" }} />
                            <p className='pl-2 pr-6 text-sm text-gray-500'>You must be logged in to apply for this job.</p>
                            <Link
                                to="/login"
                                className='px-4 py-1 text-indigo-600 text-sm border border-indigo-600 rounded hover:bg-indigo-600
                                            hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                                            transition duration-150'
                            >
                                Log in
                            </Link>
                        </div>
                    )
                    }
                </section>
            </main>
            <Transition.Root show={modalOpen} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setModalOpen(false)}>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
                        </Transition.Child>
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                                            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle
                                            sm:max-w-sm sm:w-full sm:p-6"
                            >
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <ThumbUpOffAltIcon fontSize='large' sx={{ color: "#16a34a" }} />
                                    </div>
                                    <div className='mt-3 text-center sm:mt-5'>
                                        <Dialog.Title as="h3" className="mb-6 text-2xl leading-6 font-medium text-gray-700">
                                            Application Sent
                                        </Dialog.Title>
                                        <div className='mt-2 space-y-4'>
                                            <p className='text-sm text-gray-500'>
                                                Please wait until the job owner reviews your application. Meanwhile, you can send them
                                                a message to learn more about the job.
                                            </p>
                                            <p className='font-bold text-sm text-gray-500'>
                                                Good luck and thanks for applying!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5 sm:mt-6'>
                                    <Link
                                        to="/dashboard"
                                        className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                                                    px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                                    >
                                        Go to my dashboard
                                    </Link>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
