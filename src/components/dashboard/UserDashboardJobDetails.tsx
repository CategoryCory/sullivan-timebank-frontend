import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom';
import { Dialog as HUDialog, Transition } from '@headlessui/react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import MessagePanel from '../messages/MessagePanel';
import { IJob, IJobApplication } from '../../models/job';
import { ITokenTransaction } from '../../models/tokenTransactions';
import { useStore } from "../../stores/store";
import { IMessageThreadCheck } from '../../models/userMessage';
import { UserRating } from '../../models/userRating';
import { getWeekdayLabel, getTimeOfDayLabel, jobApplicationStatuses } from "../common/values";

export default function UserDashboardJobDetails() {
    const [jobDetails, setJobDetails] = useState<IJob>();
    const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [timeDialogOpen, setTimeDialogOpen] = useState(false);
    const [appTimeToRecord, setAppTimeToRecord] = useState("");
    const [appTimeRecipient, setAppTimeRecipient] = useState("");
    const [appTimeError, setAppTimeError] = useState(false);
    const [completeAppDialogOpen, setCompleteAppDialogOpen] = useState(false);
    const [completeAppApplicant, setCompleteAppApplicant] = useState("");
    const [completeAppId, setCompleteAppId] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [userRatingError, setUserRatingError] = useState(false);
    const [messagePanelOpen, setMessagePanelOpen] = useState(false);
    const [messageThreadDetails, setMessageThreadDetails] = useState<IMessageThreadCheck | undefined>(undefined);
    const params = useParams();
    const { userStore } = useStore();

    const displayId = params.displayId;

    const loadApplications = async (jobId: number) => {
        try {
            const response = await axios.get<IJobApplication[]>(`/jobapplications/job/${jobId}`);
            setJobApplications(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        axios.get<IJob>(`/jobs/${displayId}`)
            .then(res => {
                setJobDetails(res.data);

                const jobId = res.data.jobId;

                loadApplications(jobId!);
            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [displayId]);

    function handleApplicationAccept(appId: number) {
        updateApplicationStatus(appId, jobApplicationStatuses.accepted);
    }

    function handleApplicationDeny(appId: number) {
        updateApplicationStatus(appId, jobApplicationStatuses.declined);
    }

    const updateApplicationStatus = async (appId: number, newStatus: string) => {
        setLoadingApplications(true);

        const applicationToUpdate: IJobApplication = {
            jobId: jobDetails!.jobId!,
            jobApplicationId: appId,
            status: newStatus,
        };

        try {
            await axios.put("/jobapplications", applicationToUpdate);
            loadApplications(jobDetails!.jobId!);
        } catch (error) {
            console.error(error);
        }

        setLoadingApplications(false);
    }

    const handleTimeDialogOpen = (applicantId: string) => {
        setAppTimeRecipient(applicantId);
        setTimeDialogOpen(true);
    }

    const handleTimeDialogClose = () => {
        setAppTimeRecipient("");
        setAppTimeToRecord("");
        setTimeDialogOpen(false);
    }

    const handleRecordAppTime = async () => {
        if (appTimeRecipient === "") {
            return;
        }

        if (isNaN(parseFloat(appTimeToRecord)) || appTimeToRecord === "") {
            setAppTimeError(true);
            return;
        } else {
            setAppTimeError(false);
        }

        const transactionDetails: ITokenTransaction = {
            senderId: userStore.user!.userId,
            recipientId: appTimeRecipient,
            amount: parseFloat(appTimeToRecord),
        }

        try {
            await axios.post<ITokenTransaction>("/tokentransactions", transactionDetails);
            loadApplications(jobDetails!.jobId!);
            setAppTimeRecipient("");
            setAppTimeToRecord("");
            setTimeDialogOpen(false);
        } catch (error) {
            console.error(error);
            setAppTimeRecipient("");
            setAppTimeToRecord("");
            setTimeDialogOpen(false);
        }
    }

    const handleAppCompleteOpen = (appId: number, applicantId: string) => {
        setCompleteAppApplicant(applicantId);
        setCompleteAppId(appId);
        setCompleteAppDialogOpen(true);
    }

    const handleAppCompleteClose = () => {
        setCompleteAppApplicant("");
        setCompleteAppId(0);
        setUserReview("");
        setUserRating(0);
        setCompleteAppDialogOpen(false);
    }

    const handleCompleteApplication = async () => {
        if (completeAppApplicant === "" || completeAppId === 0) {
            return;
        }

        if (userRating === 0) {
            setUserRatingError(true);
            return;
        } else {
            setUserRatingError(false);
        }

        const ratingToAdd: UserRating = {
            rating: userRating,
            comments: userReview,
            authorId: userStore.user!.userId,
            revieweeId: completeAppApplicant,
        }

        try {
            await axios.post("/userratings", ratingToAdd);
            await updateApplicationStatus(completeAppId, jobApplicationStatuses.completed);
            handleAppCompleteClose();
        } catch (error) {
            console.error(error);
            handleAppCompleteClose();
        }
    }

    const handleOpenMessagePanel = async (jobApplicantId: string) => {
        const msgThreadDetails: IMessageThreadCheck = {
            jobId: jobDetails!.jobId!,
            jobApplicantId
        };
        setMessageThreadDetails(msgThreadDetails);
        setMessagePanelOpen(true);
    }

    const handleCloseMessagePanel = async () => {
        setMessageThreadDetails(undefined);
        setMessagePanelOpen(false);
    }

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
                    <h3 className='mb-2 font-sans font-bold text-xl text-indigo-700'>Applicants</h3>
                    <p className='text-sm text-gray-500'>
                        Below you can see everyone who has applied to complete this job. If you entered time slots for this job,
                        applicants will be arranged by the day and time for which they applied. You can either approve or deny
                        these applications.
                    </p>
                    {jobApplications?.length === 0 ? (
                        <p className='my-4 text-sm text-gray-500'>
                            This job currently has no applicants.
                        </p>
                    ) : (
                        loadingApplications ? (
                            <div className="h-96 grid place-items-center">
                                <CircularProgress sx={{ color: "#4f46e5" }} />
                            </div>
                        ) : (
                            jobDetails?.jobScheduleType === "Open" ? (
                                <p>This job has an open schedule.</p>
                            ) : (
                                jobDetails?.jobSchedules?.map(schedule => (
                                    <div key={schedule.jobScheduleId} className="py-4">
                                        <h3 className='px-3 py-1 font-sans font-bold text-lg bg-gray-100'>
                                            {`${getWeekdayLabel(parseInt(schedule.dayOfWeek))}`}
                                        </h3>
                                        {jobApplications?.some(a => a.jobApplicationSchedule?.dayOfWeek === schedule.dayOfWeek) === false && (
                                            <p className='px-3 pt-2 text-sm text-gray-500'>There are no applicants for this day.</p>
                                        )}
                                        <ul className='max-w-5xl divide-y divide-gray-200'>
                                            {jobApplications?.filter(a => a.jobApplicationSchedule?.dayOfWeek === schedule.dayOfWeek).map(a => (
                                                <li key={a.jobApplicationId} className="px-3 py-2">
                                                    <div className='grid grid-cols-[auto_25%_20%_150px]'>
                                                        <div className=''>
                                                            <p className='font-bold'>
                                                                {`${a.applicant?.firstName} ${a.applicant?.lastName}`}
                                                            </p>
                                                            <div className='space-x-2'>
                                                                {a.applicant?.skills.map(skill => (
                                                                    <span
                                                                        key={skill.userSkillId}
                                                                        className="inline-block px-2 py-0.5 bg-indigo-100 text-sm
                                                                                    text-indigo-800 rounded-full"
                                                                    >
                                                                        {skill.skillName}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className=''>
                                                            <p className="text-sm text-gray-500 tracking-wider">
                                                                Time Slot
                                                            </p>
                                                            <p>
                                                                {`${getTimeOfDayLabel(schedule.timeBegin!)} - ${getTimeOfDayLabel(schedule.timeEnd!)}`}
                                                            </p>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm text-gray-500 tracking-wider'>
                                                                Status
                                                            </p>
                                                            {a.status === 'Pending' && 
                                                                <p className='flex items-center gap-1 text-blue-600'>
                                                                    <AccessTimeIcon fontSize="small" />Pending
                                                                </p>
                                                            }
                                                            {a.status === 'Accepted' && 
                                                                <p className='flex items-center gap-1 text-emerald-600'>
                                                                    <CheckIcon fontSize="small" />Accepted
                                                                </p>
                                                            }
                                                            {a.status === 'Declined' && 
                                                                <p className='flex items-center gap-1 text-red-600'>
                                                                    <CloseIcon fontSize="small" />Declined
                                                                </p>
                                                            }
                                                            {a.status === 'Completed' && 
                                                                <p className='flex items-center gap-1 text-gray-500'>
                                                                    <CheckIcon fontSize="small" />Completed
                                                                </p>
                                                            }
                                                            
                                                        </div>
                                                        <div
                                                            className='space-x-3'
                                                        >
                                                            {a.status === "Pending" && (
                                                                <>
                                                                    <Tooltip
                                                                        title="Approve this time slot"
                                                                    >
                                                                        <button 
                                                                            className="h-8 w-8 inline-flex justify-center items-center bg-gray-100
                                                                                        rounded hover:bg-emerald-100 hover:text-emerald-700 transition
                                                                                        duration-150"
                                                                            onClick={() => handleApplicationAccept(a.jobApplicationId!)}
                                                                        >
                                                                            <CheckIcon fontSize='small' />
                                                                        </button>
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        title="Decline this time slot"
                                                                    >
                                                                        <button
                                                                            className="h-8 w-8 inline-flex justify-center items-center bg-gray-100
                                                                                        rounded hover:bg-red-100 hover:text-red-700 transition
                                                                                        duration-150"
                                                                            onClick={() => handleApplicationDeny(a.jobApplicationId!)}
                                                                        >
                                                                            <CloseIcon fontSize='small' />
                                                                        </button>
                                                                    </Tooltip>
                                                                </>
                                                            )}
                                                            {a.status === "Accepted" && (
                                                                <>
                                                                    <Tooltip title="Record time">
                                                                        <button
                                                                            className='h-8 w-8 inline-flex justify-center items-center bg-gray-100
                                                                                    rounded hover:bg-blue-100 hover:text-blue-700 transition
                                                                                    duration-150'
                                                                            onClick={() => handleTimeDialogOpen(a.applicant!.id!)}
                                                                        >
                                                                            <AvTimerIcon fontSize='small' />
                                                                        </button>
                                                                    </Tooltip>
                                                                    <Tooltip title="Complete job">
                                                                        <button
                                                                            className='h-8 w-8 inline-flex justify-center items-center bg-gray-100
                                                                                    rounded hover:bg-emerald-100 hover:text-emerald-700 transition
                                                                                    duration-150'
                                                                            onClick={() => handleAppCompleteOpen(a.jobApplicationId!, a.applicant!.id!)}
                                                                        >
                                                                            <PlaylistAddCheckIcon fontSize='small' />
                                                                        </button>
                                                                    </Tooltip>
                                                                </>
                                                            )}
                                                            <Tooltip title="Message this user">
                                                                <button
                                                                    className='h-8 w-8 inline-flex justify-center items-center bg-gray-100
                                                                        text-gray-500 rounded hover:bg-violet-100 hover:text-violet-700 transition
                                                                        duration-150'
                                                                    onClick={() => handleOpenMessagePanel(a.applicant!.id!)}
                                                                >
                                                                    <ChatIcon fontSize="small" />
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            )
                        )
                    )}
                </section>
            </main>

            {/* Dialog to record time for job */}
            <Dialog open={timeDialogOpen} onClose={handleTimeDialogClose} sx={{ fontFamily: "inherit" }}>
                <DialogTitle
                    sx={{
                        fontFamily: "inherit",
                        fontWeight: "bold",
                    }}
                >
                    Record Time Transaction
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            fontFamily: "inherit",
                            fontSize: "0.85rem"
                        }}
                    >
                        Enter the number of hours you'd like to record for this job. You can enter any number in half-hour
                        increments, up to the total number of hours you have available.
                    </DialogContentText>
                    <form className='py-5'>
                        <label 
                            htmlFor="timeToRecord"
                            className='block mb-1'
                        >
                            Time to record
                        </label>
                        <input
                            id="timeToRecord"
                            name="timeToRecord"
                            type="number"
                            min="0"
                            step="0.5"
                            onChange={e => setAppTimeToRecord(e.target.value)}
                            className='w-full px-4 py-2 rounded border-2 border-slate-400 focus:ring-0 
                                    focus:border-indigo-600 transition duration-150'
                        />
                        <div className={appTimeError ? "" : "hidden"}>
                            <p className='mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-sm rounded'>
                                Please make sure you have entered a valid number.
                            </p>
                        </div>
                    </form>
                    <DialogActions>
                        <Button onClick={handleTimeDialogClose} sx={{ fontFamily: "inherit"}}>Cancel</Button>
                        <Button onClick={handleRecordAppTime} sx={{ fontFamily: "inherit" }}>Record time</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {/* Dialog to mark job as complete */}
            <Dialog open={completeAppDialogOpen} onClose={handleAppCompleteClose} sx={{ fontFamily: "inherit" }}>
                <DialogTitle
                    sx={{
                        fontFamily: "inherit",
                        fontWeight: "bold",
                    }}
                >
                    Mark application as complete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            fontFamily: "inherit",
                            fontSize: "0.85rem"
                        }}
                    >
                        Use the form below to mark this application as complete. Please make sure you have recorded all time
                        transactions for this application. Additionally, you can leave a review for the person who completed 
                        this job.
                    </DialogContentText>
                    <form className='py-5 space-y-4'>
                        <div>
                            <label className='block pb-1'>Rating</label>
                            <Rating
                                name="userRating"
                                value={userRating}
                                precision={0.5}
                                onChange={(e, newValue) => {
                                    if (newValue) {
                                        setUserRating(newValue);
                                    }
                                }}
                            />
                            <div className={userRatingError ? "" : "hidden"}>
                                <p className='mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-sm rounded'>
                                    Please select a rating to continue.
                                </p>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="ratingComments"
                                className="block pb-1"
                            >
                                Please enter a brief review for this user (optional).
                            </label>
                            <textarea
                                id="ratingComments"
                                maxLength={200}
                                rows={3}
                                onChange={e => setUserReview(e.target.value)}
                                className="w-full px-4 py-2 rounded border-2 border-slate-400 focus:ring-0 
                                        focus:border-indigo-600 transition duration-150"
                            />
                        </div>
                    </form>
                    <DialogActions>
                        <Button onClick={handleAppCompleteClose} sx={{ fontFamily: "inherit" }}>Cancel</Button>
                        <Button onClick={handleCompleteApplication} sx={{ fontFamily: "inherit" }}>Mark as complete</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {/* Slide-over for messages */}
            <Transition.Root show={messagePanelOpen} as={Fragment}>
                <HUDialog as="div" className='relative z-10' onClose={handleCloseMessagePanel}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out"
                        enterFrom="opacity-0 duration-300"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className='fixed inset-0 overflow-hidden'>
                        <div className='absolute inset-0 overflow-hidden'>
                            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-300 sm:duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-300 sm:duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <HUDialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className='px-4 sm:px-6 py-4 bg-gray-200'>
                                                <div className='flex items-start justify-between'>
                                                    <HUDialog.Title className="text-2xl font-sans font-bold text-gray-700">
                                                        Messages
                                                    </HUDialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="grid place-items-center p-1 rounded-full bg-indigo-700 text-white
                                                                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                                                focus:ring-offset-2"
                                                            onClick={handleCloseMessagePanel}
                                                        >
                                                            <span className='sr-only'>Close message panel</span>
                                                            <CloseIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                                                <MessagePanel messageThreadDetails={messageThreadDetails} />
                                            </div>
                                        </div>
                                    </HUDialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </HUDialog>
            </Transition.Root>
        </>
    )
}
