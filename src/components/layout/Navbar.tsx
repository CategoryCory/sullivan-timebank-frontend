import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { toast } from "react-toastify";
import { useStore } from "../../stores/store";
import logo from "../../images/sullivan-logo-color.png";
import { Logout } from '@mui/icons-material';

export default function Navbar() {
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { userStore } = useStore();

    const userMenuIsOpen = Boolean(anchorEl);

    const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    }

    const logUserOut = () => {
        try {
            userStore.logout();
            setLogoutSuccess(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (logoutSuccess) {
            toast.success("You have been logged out.");
            setLogoutSuccess(false);
            navigate("/", { replace: true });
        }
    }, [logoutSuccess, navigate]);

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
                            {!userStore.isLoggedIn 
                                ? (
                                <>
                                    <NavLink to="/login" className="navlink">Login</NavLink>
                                    <NavLink
                                        to="/register"
                                        className="btn btn-regular btn-outlined text-indigo-600 border-indigo-600 hover:text-white hover:bg-indigo-600"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                                ) : (
                                <>
                                    <div className="pl-6 flex justify-center items-center border-l border-gray-300">
                                        <span className="font-bold text-gray-500">Hi, {userStore.user?.displayName}!</span>
                                        <IconButton
                                            onClick={handleUserMenuClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={userMenuIsOpen ? 'user-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={userMenuIsOpen ? "true" : undefined}
                                        >
                                            <Avatar sx={{ width: 36, height: 36, backgroundColor: "#4F46E5" }}>
                                                {userStore.user?.image 
                                                    ? <span className="text-sm">{userStore.user!.displayName.substring(0, 1).toUpperCase()}</span>
                                                    : <span className="text-sm">{userStore.user!.displayName.substring(0, 1).toUpperCase()}</span>
                                                }
                                            </Avatar>
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="user-menu"
                                            open={userMenuIsOpen}
                                            onClose={handleUserMenuClose}
                                            onClick={handleUserMenuClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: "visible",
                                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
                                                    mt: 1.5,
                                                    "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    "&:before": {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <AccountBoxIcon fontSize="small" sx={{ color: "#6B7280" }} />
                                                </ListItemIcon>
                                                <Link to="/profile" className="font-sans text-gray-600">Profile</Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <DashboardIcon fontSize="small" sx={{ color: "#6B7280" }} />
                                                </ListItemIcon>
                                                <Link to="/dashboard" className="font-sans text-gray-600">Dashboard</Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <AddIcon fontSize="small" sx={{ color: "#6B7280" }} />
                                                </ListItemIcon>
                                                <Link to="/dashboard/job" className="font-sans text-gray-600">Add New Job</Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" sx={{ color: "#6B7280" }} />
                                                </ListItemIcon>
                                                <span className="font-sans text-gray-600">
                                                    <button onClick={logUserOut}>Logout</button>
                                                </span>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </>
                                )
                            }
                        </Stack>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
