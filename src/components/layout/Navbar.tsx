import React from 'react';
import { NavLink } from "react-router-dom";
import { AppBar, Container, Stack, Toolbar } from '@mui/material';
import logo from "../../images/sullivan-logo-color.png";

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ bgcolor: "#fff" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 75 }}>
                    <div className="flex w-full justify-between items-center">
                        <NavLink to="/">
                            <img src={logo} alt="Sullivan Logo" width="250" />
                        </NavLink>
                        <Stack direction="row" spacing={4} alignItems="center">
                            <NavLink to="/about" className={({ isActive }) => (isActive ? "active-navlink" : "navlink")}>About</NavLink>
                            <NavLink to="/jobs" className={({ isActive }) => (isActive ? "active-navlink" : "navlink")}>Jobs</NavLink>
                            <NavLink to="/login" className="navlink">Login</NavLink>
                            <NavLink
                                to="/register"
                                className="btn btn-regular btn-outlined text-indigo-600 border-indigo-600 hover:text-white hover:bg-indigo-600"
                            >
                                Sign Up
                            </NavLink>
                        </Stack>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
