import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import sullivanTorchPic from "../images/sullivan-logo-torch.png";
import TextInput from './common/forms/TextInput';
import { CircularProgress } from '@mui/material';

export default function Login() {
    return (
        <Formik
            initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
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
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setTimeout(() => {
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {formik => (
                <div className="h-screen px-4 flex flex-col justify-center items-center gap-3 md:gap-6 bg-zinc-100">
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
                            <button
                                type="submit"
                                className={formik.isSubmitting ? "form-button-disabled" : "form-button"}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting 
                                    ? <CircularProgress size={16} sx={{ color: "#fff" }} /> 
                                    : <AppRegistrationIcon fontSize="small" />}
                                    Log In
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