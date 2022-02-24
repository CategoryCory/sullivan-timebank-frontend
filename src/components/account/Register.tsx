import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { CircularProgress } from '@mui/material';
import { toast } from "react-toastify";
import TextInput from '../common/forms/TextInput';
import CheckboxInput from '../common/forms/CheckboxInput';
import sullivanTorchPic from "../../images/sullivan-logo-torch.png";
import { useStore } from '../../stores/store';

export default function Register() {
    const { userStore } = useStore();
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (registerSuccess) {
            toast.success("Your account has been created, and you may now log in.");
            navigate("/login", { replace: true });
        }
    }, [registerSuccess, navigate]);

    return (
        <Formik
            initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
                termsAndConditions: false,
                error: null,
            }}
            validationSchema={Yup.object({
                firstname: Yup
                            .string()
                            .required("Please enter your first name.")
                            .max(50, "First name cannot be greater than 50 characters."),
                lastname: Yup
                            .string()
                            .required("Please enter your last name.")
                            .max(50, "Last name cannot be greater than 50 characters."),
                email: Yup
                        .string()
                        .email("Please enter a valid email address.")
                        .required("Please enter your email address.")
                        .max(250, "Email cannot be greater than 250 characters."),
                password: Yup
                        .string()
                        .required("Please enter a password."),
                confirmPassword: Yup
                        .string()
                        .oneOf([Yup.ref("password"), null], "The passwords do not match.")
                        .required("Please confirm your password."),
                termsAndConditions: Yup
                        .boolean()
                        .oneOf([true], "You must accept the terms and conditions to create an account."),
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                try {
                    userStore.register(values);
                    setRegisterSuccess(true);
                } catch(error) {
                    setErrors({error: "Something went wrong"});
                }

                setSubmitting(false);
            }}
        >
            {formik => (
                <div className="min-h-screen px-4 flex flex-col justify-center items-center gap-3 md:gap-6 bg-zinc-100">
                    <img src={sullivanTorchPic} alt="Sullivan Logo" className="w-10 md:w-14" />
                    <h2 className="font-sans font-bold text-slate-700 text-2xl lg:text-4xl">
                        <span className="text-indigo-600">Sign up</span> for an account
                    </h2>
                    <div className="container max-w-xl px-3 lg:px-6 py-8 rounded-lg bg-white shadow-lg shadow-zinc-400/30">
                        <Form className="w-full flex flex-col gap-4">
                            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
                                <TextInput
                                    label="First Name"
                                    name="firstname"
                                    type="text"
                                />
                                <TextInput
                                    label="Last Name"
                                    name="lastname"
                                    type="text"
                                />
                            </div>
                            <TextInput
                                label="Email Address"
                                name="email"
                                type="email"
                            />
                            <TextInput
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <TextInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                            />
                            <CheckboxInput
                                name="termsAndConditions"
                            >
                                <span>
                                    I have read and agree to the&nbsp;
                                    <Link to="/privacy" className='text-indigo-600'>privacy policy</Link> and&nbsp;
                                    <Link to="/terms" className="text-indigo-600">terms and conditions.</Link>
                                </span>
                            </CheckboxInput>
                            <button
                                type="submit"
                                className={!formik.isValid || !formik.dirty || formik.isSubmitting 
                                    ? "form-button-disabled"
                                    : "form-button"
                                }
                                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                            >
                                {formik.isSubmitting 
                                    ? <CircularProgress size={16} sx={{ color: "#fff" }} /> 
                                    : <AppRegistrationIcon fontSize="small" />}
                                    Create account
                            </button>
                        </Form>
                        <div className="mt-6 pt-6 flex flex-col gap-4 border-t border-slate-300">
                            <div>
                                <span className="text-slate-600">Already have an account?</span>
                                <Link 
                                    to="/login"
                                    className="ml-3 font-bold text-indigo-600"
                                >
                                    Log in
                                </Link>
                            </div>
                            <Link
                                to="/"
                                className="flex items-center gap-1 font-bold text-indigo-600"
                            >
                                <ArrowBackIcon fontSize="small" />Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}