import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import { Dialog as HUDialog, Transition } from '@headlessui/react';
import { CircularProgress, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { IJobApplication } from '../../models/job';
import { useStore } from '../../stores/store';
import { IMessageThreadCheck } from '../../models/userMessage';
import MessagePanel from '../messages/MessagePanel';

export default function UserDashboardApplicationsTable() {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<IJobApplication[]>([]);
    const [messagePanelOpen, setMessagePanelOpen] = useState(false);
    const [messageThreadDetails, setMessageThreadDetails] = useState<IMessageThreadCheck | undefined>(undefined);
    const { userStore } = useStore();

    useEffect(() => {
        setLoading(true);
        const userId = userStore.user!.userId;
        axios.get<IJobApplication[]>(`/jobapplications/?userId=${userId}`)
            .then(res => {
                if (res != null) {
                    console.log(res.data);
                    setApplications(res.data);
                }
                setLoading(false);
            })
            .catch((err: AxiosError) => {
                console.error(err);
                setLoading(false);
            })
    }, [userStore.user]);

    const dgColumns: GridColDef[] = [
        { 
            field: "category",
            flex: 1,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-bold text-lg'>Category</span>
            ),
            renderCell: (params: GridRenderCellParams<string>) => (
                <span className="px-3 py-0.5 inline-flex items-center rounded-full text-sm bg-indigo-100 text-indigo-800">
                    {params.value}
                </span>
            )
        },
        { 
            field: "jobName",
            flex: 2,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-bold text-lg'>Job Name</span>
            ),
        },
        {
            field: "postedBy",
            flex: 1,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-bold text-lg'>Posted By</span>
            )
        },
        {
            field: "applicationStatus",
            flex: 1,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-bold text-lg'>Status</span>
            ),
            renderCell: (params: GridRenderCellParams<string>) => {
                let icon: React.ReactElement;
                let cssClass: string;

                switch (params.value) {
                    case 'Pending':
                        icon = <AccessTimeIcon />;
                        cssClass = "text-blue-600";
                        break;
                    case 'Accepted':
                        icon = <CheckIcon />;
                        cssClass = "text-emerald-600";
                        break;
                    case 'Declined':
                        icon = <CloseIcon />;
                        cssClass = "text-red-600";
                        break;
                    case 'Completed':
                        icon = <CheckIcon />;
                        cssClass = "text-gray-500";
                        break;
                    default:
                        icon = <AccessTimeIcon />;
                        cssClass = "text-blue-600";
                        break;
                };

                return <span className={`inline-flex items-center gap-2 ${cssClass}`}>{icon}{params.value}</span>;
            }
        },
        {
            field: "actions",
            type: "actions",
            renderCell: (params: GridRenderCellParams<string>) => (
                <div className='w-full flex justify-around items-center'>
                    <GridActionsCellItem 
                        icon={<Tooltip title="Messages"><ChatIcon /></Tooltip>}
                        label="Messages"
                        onClick={() => handleOpenMessagePanel(params.row.jobId, params.row.jobApplicantId)}
                        sx={{ "&:hover": { color: "#6d28d9"} }}
                    />
                </div>
            )
        }
    ];

    const dgRows: GridRowsProp = Array.from(applications).map(application => (
        {
            id: application.jobApplicationId,
            category: application.jobCategory,
            jobName: application.jobName,
            postedBy: application.jobCreatedByName,
            applicationStatus: application.status,
            jobId: application.jobId,
            jobApplicantId: application.applicant?.id,
        }
    ));

    if (loading) return (
        <div className='mt-16 flex justify-center'>
            <CircularProgress sx={{ color: "#4f46e5" }} />
        </div>
    );

    if (applications.length === 0) return (
        <div className='mt-20 flex flex-col items-center'>
            <h3 className='my-2 font-sans text-2xl text-gray-600'>No applications submitted yet</h3>
            <p className='text-gray-500'>Get started by submitting an application to a job!</p>
            <p className='text-gray-500'>    
                <Link to="/jobs" className='text-indigo-600 underline'>Go to the jobs page</Link> and browse the jobs posted there.
            </p>
        </div>
    )

    const handleOpenMessagePanel = (jobId: number, jobApplicantId: string) => {
        const msgThreadDetails: IMessageThreadCheck = {
            jobId,
            jobApplicantId,
        };
        setMessageThreadDetails(msgThreadDetails);
        setMessagePanelOpen(true);
    }

    const handleCloseMessagePanel = () => {
        setMessageThreadDetails(undefined);
        setMessagePanelOpen(false);
    }

    return (
        <>
            <div className="h-96 my-6 flex">
                <div className="font-sans min-h-full grow">
                    <DataGrid 
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        rows={dgRows}
                        columns={dgColumns}
                        sx={{ fontFamily: "inherit" }}
                    />
                </div>
            </div>
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
