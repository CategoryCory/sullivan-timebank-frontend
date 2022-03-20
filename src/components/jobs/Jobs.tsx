import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowsProp, GridValueFormatterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { IJob } from '../../models/job';
import { useStore } from '../../stores/store';
import { Link } from 'react-router-dom';


export default function Jobs() {
    // const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<IJob[]>([]);
    const navigate = useNavigate();
    const { userStore } = useStore();

    useEffect(() => {
        // setLoading(true);
        axios.get<IJob[]>("/jobs")
            .then(res => {
                setJobs(res.data);
                // setLoading(false);
            })
            .catch(error => {
                console.error(error);
                // setLoading(false);
            });
    }, []);

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
            field: "createdOn",
            flex: 1,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-bold text-lg'>Posted On</span>
            ),
            valueFormatter: (params: GridValueFormatterParams) => (
                format(new Date(params.value!.toString()), "MMMM d, yyyy")
            )
        },
    ];

    // This should filter out the current user's jobs
    const dgRows: GridRowsProp = jobs
                                .filter(job => job.createdById !== userStore.user?.userId)
                                .map(job => (
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
            flex: 1,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-bold text-lg'>Created By</span>
            ),
            renderCell: (params: GridRenderCellParams<string>) => (
                params.value
            )
        });
    }

    return (
        <>
            <section className='py-10 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='text-3xl text-gray-700'>Current Jobs</h1>
                </div>
            </section>
            <section className='container mx-auto my-6'>
                <h2 className='mb-2 font-sans text-xl font-bold'>
                    Below are our <span className='text-indigo-600'>current job listings</span>
                </h2>
                <p className='text-sm text-gray-500'>
                    Click on a row in the table below to see more information about each job.
                </p>
                { userStore.isLoggedIn === false && 
                    <p className='text-sm text-gray-500'>
                        Note that you must be <Link to="/login" className="font-bold text-indigo-600">logged in</Link> to see 
                        all job information and to notify the job's creator that you are interested in completing this job.
                    </p>
                }
            </section>
            <main className="container mx-auto h-96 my-6 flex">
                <div className="min-h-full grow font-sans">
                    <DataGrid 
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        rows={dgRows}
                        columns={dgColumns}
                        sx={{ fontFamily: "inherit" }}
                        onRowClick={params => {
                            navigate(`/jobs/details/${params.id}`);
                        }}
                    />
                </div>
            </main>
        </>
    )
}
