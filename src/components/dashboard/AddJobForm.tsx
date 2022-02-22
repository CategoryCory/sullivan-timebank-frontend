import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import TextareaInput from '../common/forms/TextareaInput';
import SingleSelectInput from '../common/forms/SingleSelectInput';
import { Job, JobCategory, JobCustomSchedule } from '../../models/job';
import { OptionType, NumberOptionType } from '../../models/options';
import MaterialSelectInput from '../common/forms/MaterialSelectInput';
import DateInput from '../common/forms/DateInput';
import TextInput from '../common/forms/TextInput';

export default function AddJobForm() {
    const [showCustomSchedule, setShowCustomSchedule] = useState(false);
    const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
    let navigate = useNavigate();
    // const [currentCategory, setCurrentCategory] = useState<OptionType>({
    //     label: "",
    //     value: ""
    // });

    const jobScheduleType = [
        { id: 'open', title: 'Open Availability' },
        { id: 'custom', title: 'Custom Schedule' },
    ];

    const daysOfWeek: NumberOptionType[] = [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
    ]

    const timesOfDay: NumberOptionType[] = [
        { value: 700, label: "7:00 AM" },
        { value: 730, label: "7:30 AM" },
        { value: 800, label: "8:00 AM" },
        { value: 830, label: "8:30 AM" },
        { value: 900, label: "9:00 AM" },
        { value: 930, label: "9:30 AM" },
        { value: 1000, label: "10:00 AM" },
        { value: 1030, label: "10:30 AM" },
        { value: 1100, label: "11:00 AM" },
        { value: 1130, label: "11:30 AM" },
        { value: 1200, label: "12:00 PM" },
        { value: 1230, label: "12:30 PM" },
        { value: 1300, label: "1:00 PM" },
        { value: 1330, label: "1:30 PM" },
        { value: 1400, label: "2:00 PM" },
        { value: 1430, label: "2:30 PM" },
        { value: 1500, label: "3:00 PM" },
        { value: 1530, label: "3:30 PM" },
        { value: 1600, label: "4:00 PM" },
        { value: 1630, label: "4:30 PM" },
        { value: 1700, label: "5:00 PM" },
        { value: 1730, label: "5:30 PM" },
        { value: 1800, label: "6:00 PM" },
        { value: 1830, label: "6:30 PM" },
        { value: 1900, label: "7:00 PM" },
    ]

    // const handleCategorySelection = (opt: OptionType) => {
    //     setCurrentCategory(opt);
    // };

    const handleCustomScheduleChanged = (state: boolean) => {
        setShowCustomSchedule(state);
    } 

    useEffect(() => {
        axios.get<JobCategory[]>("/jobcategories")
            .then(res => {
                setJobCategories(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                jobName: "",
                jobCategory: "",
                expiresOn: new Date().toISOString().slice(0, 10),
                jobDescription: "",
                scheduleType: "open",
                jobCustomSchedules: [
                    {
                        dayOfWeek: "",
                        timeBegin: undefined,
                        timeEnd: undefined,
                    } as JobCustomSchedule
                ],
            }}
            validationSchema={Yup.object({
                jobName: Yup.string().required("Please enter a name for this job."),
                jobCategory: Yup.string().required("Please select a category for this job."),
                expiresOn: Yup
                            .date()
                            .required("Please enter an expiration date for this job.")
                            .min(new Date().toISOString().slice(0, 10), "Expiration date must be later than today."),
                jobDescription: Yup
                                .string()
                                .max(250, "The description cannot be greater than 250 characters.")
                                .required("Please enter a description for this job."),
                scheduleType: Yup.string(),
                jobCustomSchedules: Yup.array().when('scheduleType', {
                    is: "custom",
                    then: Yup.array().of(
                        Yup.object({
                            dayOfWeek: Yup.string().required("Please enter a day."),
                            timeBegin: Yup.number().required("Please enter a start time."),
                            timeEnd: Yup.number().required("Please enter an end time.")
                                        .moreThan(Yup.ref('timeBegin'), 'Your end time cannot be earlier than the start time.')
                        })
                    )
                })
            })}
            onSubmit={ async (values, { setErrors, setSubmitting }) => {
                // console.log(values);

                const jobToAdd: Job = {
                    displayId: uuidv4(),
                    jobName: values.jobName,
                    description: values.jobDescription,
                    jobScheduleType: values.scheduleType,
                    expiresOn: new Date(values.expiresOn),
                    jobCategoryId: parseInt(values.jobCategory, 10),
                    jobSchedules: values.jobCustomSchedules.filter(jobSchedule => (
                        jobSchedule.dayOfWeek !== "" && jobSchedule.timeBegin != null && jobSchedule.timeEnd != null
                    )),
                };

                console.log(jobToAdd);

                axios.post<Job>('/jobs', jobToAdd)
                    .then(response => {
                        toast.success("Your job has been successfully added.");
                        navigate("/dashboard", { replace: true });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }}
        >
            {formik => (
                <Form className='container mx-auto my-10 px-4'>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <div className="md:basis-1/3 md:flex-none lg:basis-1/4"></div>
                        <div className='md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <p className='text-lg text-gray-700'>
                                Fill out the form below to create a new job. 
                            </p>
                            <p className='text-sm text-gray-500 leading-5'>
                                Select a category for the job, add a brief description of the job, and choose a schedule type.
                            </p>
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <div className="md:basis-1/3 md:flex-none lg:basis-1/4">
                            <h3 className='font-bold font-sans text-xl text-gray-700'>Job Detail</h3>
                        </div>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <div className='grid grid-cols-1'>
                                <TextInput
                                    name='jobName'
                                    label='Job Name'
                                    type='text'
                                />
                            </div>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                                <SingleSelectInput
                                    label='Job Category'
                                    name='jobCategory'
                                    options={jobCategories.map(category => (
                                        {
                                            label: category.jobCategoryName,
                                            value: category.jobCategoryId.toString(),
                                        } as OptionType
                                    ))}
                                    // currentSelections={[currentCategory]}
                                    // onSelectionChange={handleCategorySelection}
                                />
                                <DateInput
                                    label='Expires On'
                                    name='expiresOn'
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <TextareaInput
                                    label='Job Description'
                                    name='jobDescription'
                                    rows={4}
                                    maxLength={250}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <div className="md:basis-1/3 md:flex-none lg:basis-1/4">
                            <h3 className='font-bold font-sans text-xl text-gray-700'>Working Days</h3>
                        </div>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <div className='grid grid-cols-1'>
                                <label className='text-gray-700'>Type of Schedule</label>
                                <p className='text-sm leading-5 text-gray-500'>
                                    You can specify an open availability or select specific work days.
                                </p>
                                <fieldset className='mt-4'>
                                    <legend className='sr-only'>Schedule Type</legend>
                                    <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                                        {jobScheduleType.map(scheduleType => (
                                            <div key={scheduleType.id} className='flex items-center'>
                                                <Field
                                                    id={scheduleType.id}
                                                    name='scheduleType'
                                                    type='radio'
                                                    checked={formik.values.scheduleType === scheduleType.id}
                                                    // defaultChecked={scheduleType.id === 'open'}
                                                    onChange={() => {
                                                        const isCustom = scheduleType.id === 'custom';
                                                        handleCustomScheduleChanged(isCustom);
                                                        formik.setFieldValue('scheduleType', scheduleType.id)
                                                    }}
                                                    className='h-4 w-4 text-indigo-700 border-gray-300 focus:ring-indigo-500
                                                    transition duration-100'
                                                />
                                                <label htmlFor={scheduleType.id} className='ml-3 block font-medium text-gray-700'>
                                                    {scheduleType.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                                <div className={showCustomSchedule ? '' : 'hidden'}>
                                    <FieldArray name="jobCustomSchedules">
                                        {({ insert, remove, push }) => (
                                            <div className='mt-6 flex flex-col'>
                                                {formik.values.jobCustomSchedules.length > 0 &&
                                                    formik.values.jobCustomSchedules.map((customSchedule, index) => (
                                                        <div 
                                                            key={index}
                                                            className='mb-4 grid items-center gap-3 grid-cols-1 lg:grid-cols-4 lg:gap-4'
                                                        >
                                                            <div className='flex flex-col'>
                                                                <MaterialSelectInput
                                                                    name={`jobCustomSchedules.${index}.dayOfWeek`}
                                                                    label="Day of Week"
                                                                    initialValue={customSchedule.dayOfWeek}
                                                                    options={daysOfWeek}
                                                                />
                                                                <ErrorMessage
                                                                    name={`jobCustomSchedules.${index}.dayOfWeek`}
                                                                    component='p'
                                                                    className='mt-1 text-red-600'
                                                                />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <MaterialSelectInput
                                                                    name={`jobCustomSchedules.${index}.timeBegin`}
                                                                    label="From"
                                                                    initialValue={
                                                                        customSchedule.timeBegin ?
                                                                        customSchedule.timeBegin.toString() :
                                                                        ""
                                                                    }
                                                                    options={timesOfDay}
                                                                />
                                                                <ErrorMessage
                                                                    name={`jobCustomSchedules.${index}.timeBegin`}
                                                                    component='p'
                                                                    className='mt-1 text-red-600'
                                                                />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <MaterialSelectInput
                                                                    name={`jobCustomSchedules.${index}.timeEnd`}
                                                                    label="To"
                                                                    initialValue={
                                                                        customSchedule.timeEnd ?
                                                                        customSchedule.timeEnd.toString() :
                                                                        ""
                                                                    }
                                                                    options={timesOfDay}
                                                                />
                                                                <ErrorMessage
                                                                    name={`jobCustomSchedules.${index}.timeEnd`}
                                                                    component='p'
                                                                    className='mt-1 text-red-600'
                                                                />
                                                            </div>
                                                            {index > 0 && 
                                                                <button
                                                                    type="button"
                                                                    className="w-8 h-8"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <DeleteIcon sx={{ color: "#64748B" }} />
                                                                </button>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                                <button
                                                    type="button"
                                                    className="px-3 py-2 self-start bg-indigo-200 text-indigo-700 text-sm rounded
                                                                hover:bg-indigo-300 transition duration-100"
                                                    onClick={() => push({ dayOfWeek: "", timeBegin: undefined, timeEnd: undefined } as JobCustomSchedule)}
                                                >
                                                    Add Day
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex justify-end md:flex-row'>
                        <button
                            type="submit"
                            className={formik.isSubmitting ? "form-button-disabled" : "form-button"}
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting 
                                    ? <CircularProgress size={16} sx={{ color: "#fff" }} /> 
                                    : <AddIcon fontSize="small" />}
                                    Add Job
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
