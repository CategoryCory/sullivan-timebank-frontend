import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Job } from '../../models/job';

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

    const dgColumns: GridColDef[] = [
        { 
            field: "category",
            headerName: "Category",
            flex: 1,
            renderCell: (params: GridRenderCellParams<string>) => (
                <span className="px-3 py-0.5 inline-flex items-center rounded-full text-sm bg-indigo-100 text-indigo-800">
                    {params.value}
                </span>
            )
        },
        { field: "jobName", headerName: "Job Name", flex: 1 },
        { field: 
            "createdOn",
            headerName: "Posted On",
            flex: 1,
            valueFormatter: (params: GridValueFormatterParams) => (
                format(new Date(params.value!.toString()), "MMMM d, yyyy")
            )
        },
        { 
            field: "jobStatus",
            headerName: "Status",
            flex: 1,
            renderCell: (params: GridRenderCellParams<string>) => {
                let icon: React.ReactElement;
                let cssClass: string;

                switch (params.value) {
                    case 'available':
                        icon = <AccessTimeIcon />;
                        cssClass = "text-blue-600";
                        break;
                    case 'completed':
                        icon = <CheckIcon />;
                        cssClass = "text-emerald-600";
                        break;
                    case 'deleted':
                        icon = <CloseIcon />;
                        cssClass = "text-red-600";
                        break;
                    default:
                        icon = <AccessTimeIcon />;
                        cssClass = "text-blue-600";
                        break;
                };

                return <span className={`inline-flex items-center gap-2 ${cssClass}`}>{icon}{params.value}</span>;
            }
        },
    ];

    const dgRows: GridRowsProp = Array.from(jobs).map(job => (
        { id: job.displayId, category: job.jobCategory, jobName: job.jobName, createdOn: job.createdOn, jobStatus: job.jobStatus }
    ));

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
                to="/dashboard/job" 
                className='mt-3 px-5 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                            hover:bg-indigo-700 transition duration-150'
            >
                <AddIcon />New Job
            </Link>
        </div>
    )

    return (
        <div className="h-96 my-6 flex">
            <div className="min-h-full grow">
                <DataGrid 
                    autoHeight
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    rows={dgRows}
                    columns={dgColumns}
                />
            </div>
        </div>
    );
}
