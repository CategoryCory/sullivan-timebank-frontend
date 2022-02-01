import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import { useStore } from '../../stores/store';
import DateInput from '../common/forms/DateInput';
import TextInput from '../common/forms/TextInput';

export default function UserProfileForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{
                firstName: userStore.user?.firstName,
                lastName: userStore.user?.lastName,
                streetAddress: userStore.user?.streetAddress,
                city: userStore.user?.city,
                state: userStore.user?.state,
                zipCode: userStore.user?.zipCode,
                birthday: userStore.user?.birthday,
                phone: userStore.user?.phone,
            }}
            validationSchema={Yup.object({
                firstName: Yup
                            .string()
                            .max(50, "First name cannot be greater than 50 characters.")
                            .required("Please enter your first name."),
                lastName: Yup
                            .string()
                            .max(50, "Last name cannot be greater than 50 characters.")
                            .required("Please enter your last name."),
                streetAddress: Yup
                            .string()
                            .max(100, "Street address cannot be greater than 100 characters.")
                            .required("Please enter your street address."),
                city: Yup
                            .string()
                            .max(50, "City cannot be greater than 50 characters.")
                            .required("Please enter your city."),
                state: Yup
                            .string()
                            .max(25, "State cannot be greater than 25 characters.")
                            .required("Please enter your state."),
                zipCode: Yup
                            .string()
                            .max(25, "Zip code cannot be greater than 25 characters.")
                            .required("Please enter your zip code."),
                birthday: Yup
                            .date()
                            .required("Please enter your birthday.")
                            .nullable()
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                console.log(values);
            }}
        >
            {formik => (
                <Form className='container mx-auto'>
                    <div className='w-full pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <h4 className="text-gray-500 md:basis-1/3 md:flex-none lg:basis-1/4">
                            Personal information
                        </h4>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                                <TextInput
                                    label="First name"
                                    name="firstName"
                                    type="text"
                                />
                                <TextInput
                                    label="Last name"
                                    name="lastName"
                                    type="text"
                                />
                            </div>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                                <DateInput
                                    label="Birthday"
                                    name="birthday"
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
