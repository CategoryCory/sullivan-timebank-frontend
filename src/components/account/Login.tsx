import React, { useEffect, useState } from 'react';
import { ErrorMessage, Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import TextInput from "../common/forms/TextInput";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, CircularProgress, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import sullivanTorchPic from "../../images/sullivan-logo-torch.png";

export default function Login() {
    const { userStore } = useStore();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorIsOpen, setErrorIsOpen] = useState(false);
    const navigate = useNavigate();

    // if (userStore.isLoggedIn) {
    //     console.log("You're already logged in!");
    // } else {
    //     console.log(userStore.user);
    //     console.log("Is this working?");
    // }

    useEffect(() => {
        if (loginSuccess) {
            toast.success("You are now logged in.");
            navigate("/", { replace: true });
        }
    }, [loginSuccess, navigate]);

    return (
        <Formik
            initialValues={{ email: "", password: "", error: null }}
            validationSchema={Yup.object({
                email: Yup
                        .string()
                        .email("Please enter a valid email address.")
                        .max(250, "Email cannot be greater than 250 characters.")
                        .required("Please enter your email address."),
                password: Yup
                        .string()
                        .required("Please enter your password."),
            })}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
                try {
                    await userStore.login(values);
                    setLoginSuccess(true);
                } catch(error) {
                    setErrors({error: "Invalid email or password"});
                    setErrorIsOpen(true);
                    setSubmitting(false);
                }
            }}
        >
            {formik => (
                <div className="min-h-screen px-4 flex flex-col justify-center items-center gap-3 md:gap-6 bg-zinc-100">
                    <img src={sullivanTorchPic} alt="Sullivan Logo" className="w-10 md:w-14" />
                    <h2 className="font-sans font-bold text-slate-700 text-2xl lg:text-4xl">
                        <span className="text-indigo-600">Log in</span> to your account
                    </h2>
                    <div className="container max-w-xl px-3 lg:px-6 py-8 rounded-lg bg-white shadow-lg shadow-zinc-400/30">
                        <Collapse in={errorIsOpen}>
                            <ErrorMessage
                                name="error"
                                render={() => (
                                    <Alert
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => setErrorIsOpen(false)}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        severity="error"
                                        sx={{ mb: 2 }}
                                    >
                                        Invalid username or password
                                    </Alert>
                                )}
                            />
                        </Collapse>
                        <Form className="w-full flex flex-col gap-4">
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
                            <button
                                type="submit"
                                className={formik.isSubmitting ? "form-button-disabled" : "form-button"}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting 
                                    ? <CircularProgress size={16} sx={{ color: "#fff" }} /> 
                                    : <LoginIcon fontSize="small" />}
                                    Log In
                            </button>
                        </Form>
                        <div className="mt-6 pt-6 flex flex-col gap-4 border-t border-slate-300">
                            <div>
                                <span className="text-slate-600">Don't have an account yet?</span>
                                <Link 
                                    to="/register"
                                    className="ml-3 font-bold text-indigo-600"
                                >
                                    Create account
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
    )
}