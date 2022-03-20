import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// import { DataGrid, GridActionsCellItem, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
// import { Link, useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// import AddIcon from '@mui/icons-material/Add';

import { IJobApplication } from '../../models/job';
import { useStore } from '../../stores/store';

export default function UserDashboardApplicationsTable() {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<IJobApplication[]>([]);
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
        }
    ];

    const dgRows: GridRowsProp = Array.from(applications).map(application => (
        {
            id: application.jobApplicationId,
            category: application.jobCategory,
            jobName: application.jobName,
            postedBy: application.jobCreatedByName,
            applicationStatus: application.status,
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

    return (
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
    )
}
