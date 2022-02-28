import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueFormatterParams } from '@mui/x-data-grid';
import { IJob } from '../../models/job';
import { useStore } from '../../stores/store';


export default function Jobs() {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<IJob[]>([]);
    const { userStore } = useStore();

    useEffect(() => {
        setLoading(true);
        axios.get<IJob[]>("/jobs")
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
    ];

    const dgRows: GridRowsProp = Array.from(jobs).map(job => (
        { 
            id: job.displayId, 
            category: job.jobCategory, 
            jobName: job.jobName, 
            createdOn: job.createdOn, 
            createdBy: job.createdBy,
        }
    ));

    if (userStore.isLoggedIn) {
        dgColumns.push({
            field: "createdBy",
            headerName: "Created By",
            flex: 1,
            renderCell: (params: GridRenderCellParams<string>) => (
                params.value
            )
        });
    }

    return (
        <>
            <div className='py-10 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='text-3xl text-gray-700'>Current Jobs</h1>
                </div>
            </div>
            <div className="container mx-auto h-96 my-6 flex">
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
        </>
    )
}
