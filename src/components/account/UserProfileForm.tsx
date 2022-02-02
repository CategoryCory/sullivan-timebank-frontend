import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import LoadingComponent from "../LoadingComponent";
import { useStore } from '../../stores/store';
import DateInput from '../common/forms/DateInput';
import TextareaInput from '../common/forms/TextareaInput';
import TextInput from '../common/forms/TextInput';
import { UserProfile } from '../../models/user';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

function UserProfileForm() {
    const { userStore, userProfileStore } = useStore();
    const userEmail = userStore.user!.email;
    const { getByEmail, loadingInitial } = userProfileStore;
    const [userProfile, setUserProfile] = useState<UserProfile>({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        phone: "",
        birthday: null,
        biography: "",
    });

    useEffect(() => {
        getByEmail(userEmail).then(profile => {
            setUserProfile(profile!);
        });
    }, [userEmail, getByEmail]);

    if (loadingInitial) return <LoadingComponent />;

    return (
        <Formik
            enableReinitialize
            initialValues={userProfile}
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
                            .required("Please enter your street address.")
                            .nullable(),
                city: Yup
                            .string()
                            .max(50, "City cannot be greater than 50 characters.")
                            .required("Please enter your city.")
                            .nullable(),
                state: Yup
                            .string()
                            .max(25, "State cannot be greater than 25 characters.")
                            .required("Please enter your state.")
                            .nullable(),
                zipCode: Yup
                            .string()
                            .max(25, "Zip code cannot be greater than 25 characters.")
                            .required("Please enter your zip code.")
                            .nullable(),
                birthday: Yup
                            .date()
                            .required("Please enter your birthday.")
                            .nullable(),
                biography: Yup
                            .string()
                            .max(500, "Biography cannot be greater than 500 characters."),
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                console.log(values);
            }}
        >
            {formik => (
                <Form className='container mx-auto px-4'>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
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
                            <div className='grid grid-cols-1'>
                                <TextInput 
                                    label="Street Address"
                                    name="streetAddress"
                                    type="text"
                                />
                            </div>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
                                <TextInput
                                    label="City"
                                    name="city"
                                    type="text"
                                />
                                <TextInput
                                    label="State"
                                    name="state"
                                    type="text"
                                />
                                <TextInput
                                    label="Zip Code"
                                    name="zipCode"
                                    type="text"
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <TextInput
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <h4 className="text-gray-500 md:basis-1/3 md:flex-none lg:basis-1/4">
                            Skills Description
                        </h4>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <TextareaInput
                                label="Additional Information"
                                name="biography"
                                rows={4}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default observer(UserProfileForm);