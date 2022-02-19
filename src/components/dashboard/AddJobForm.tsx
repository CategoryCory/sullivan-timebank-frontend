import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from "yup";
import SingleSelectInput from '../common/forms/SingleSelectInput';
import { JobCategory } from '../../models/job';
import { OptionType } from '../../models/options';
import TextareaInput from '../common/forms/TextareaInput';

export default function AddJobForm() {
    // const [loading, setLoading] = useState(true);
    const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
    const [currentCategory, setCurrentCategory] = useState<OptionType>({
        label: "",
        value: ""
    });

    const handleCategorySelection = (opt: OptionType) => {
        setCurrentCategory(opt);
    }

    useEffect(() => {
        // setLoading(true);
        axios.get<JobCategory[]>("/jobcategories")
            .then(res => {
                setJobCategories(res.data);
                // setLoading(false);
            })
            .catch(error => {
                console.error(error);
                // setLoading(false);
            })
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues={{}}
            validationSchema={Yup.object({})}
            onSubmit={ async (values, { setErrors, setSubmitting }) => {
                console.log(currentCategory);
            }}
        >
            {formik => (
                <Form className='container mx-auto my-10 px-4'>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <div className="md:basis-1/3 md:flex-none lg:basis-1/4"></div>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <p>Select the category where you need help, and until when.</p>
                            <p>Please note that you can select an open availability or specify certain work days.</p>
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <div className="md:basis-1/3 md:flex-none lg:basis-1/4">Job Detail</div>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                                <SingleSelectInput
                                    label='Job Category'
                                    name='jobCategory'
                                    options={jobCategories.map(category => (
                                        {
                                            label: category.jobCategoryName,
                                            value: category.jobCategorySlug
                                        } as OptionType
                                    ))}
                                    // currentSelections={[currentCategory]}
                                    onSelectionChange={handleCategorySelection}
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
                        <div className="md:basis-1/3 md:flex-none lg:basis-1/4">Working Days</div>
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
