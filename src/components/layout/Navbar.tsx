import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { AdjustmentsIcon, DocumentAddIcon, IdentificationIcon, LogoutIcon, MenuIcon, UserCircleIcon, XIcon } from "@heroicons/react/outline";
import { UserCircleIcon as UserSolid } from "@heroicons/react/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../../stores/store";
import logo from "../../images/sullivan-logo-color.png";
import { observer } from 'mobx-react-lite';

function Navbar() {
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined)
    const navigate = useNavigate();
    const { userStore } = useStore();

    const logUserOut = () => {
        try {
            userStore.logout();
            setLogoutSuccess(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // if (userProfileStore.userProfile?.photos && userProfileStore.userProfile.photos.length > 0) {
        //     setProfileImage(userProfileStore.userProfile.photos[0]);
        // }
        setProfileImageUrl(userStore.user?.profileImageUrl);
    }, [userStore.user?.profileImageUrl]);

    useEffect(() => {
        if (logoutSuccess) {
            toast.success("You have been logged out.");
            setLogoutSuccess(false);
            navigate("/", { replace: true });
        }
    }, [logoutSuccess, navigate]);

    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {/* Brand Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <NavLink to="/">
                                    <img src={logo} alt="Sullivan Foundation" className="w-[250px]" />
                                </NavLink>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:gap-8 sm:items-center">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => (isActive ? "active-navlink" : "navlink")}
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    to="/jobs"
                                    className={({ isActive }) => (isActive ? "active-navlink" : "navlink")}
                                >
                                    Jobs
                                </NavLink>
                                {!userStore.isLoggedIn ? 
                                    <>
                                        <NavLink to="/login" className="navlink">Login</NavLink>
                                        <NavLink
                                            to="/register"
                                            className="btn btn-regular btn-outlined text-indigo-600 border-indigo-600 
                                                hover:text-white hover:bg-indigo-600"
                                        >
                                            Sign up
                                        </NavLink>
                                    </> : 
                                    <div className="pl-8 flex items-center gap-4 border-l border-l-gray-300">
                                        <span className="font-bold text-gray-500">Hi, {userStore.user?.displayName}!</span>
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button 
                                                    className="bg-white rounded-full flex text-sm focus:outline-none 
                                                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <span className="sr-only">Open user menu</span>
                                                    {profileImageUrl != null
                                                        ? <img 
                                                            src={profileImageUrl}
                                                            alt={`${userStore.user?.displayName} profile`}
                                                            className="w-10 h-10 object-cover object-center rounded-full"
                                                        />
                                                        : <UserSolid className="text-gray-500" />
                                                    }
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items 
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                                                        bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <Menu.Item>
                                                        {({ active }) =>(
                                                            <NavLink
                                                                to="/profile"
                                                                className={active ? "usermenu-active-navlink" : "usermenu-navlink"}
                                                            >
                                                                <UserCircleIcon className="w-5 h-5" />
                                                                Profile
                                                            </NavLink>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) =>(
                                                            <NavLink
                                                                to="/dashboard"
                                                                className={active ? "usermenu-active-navlink" : "usermenu-navlink"}
                                                            >
                                                                <AdjustmentsIcon className="w-5 h-5" />
                                                                Dashboard
                                                            </NavLink>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) =>(
                                                            <NavLink
                                                                to="/dashboard/job"
                                                                className={active ? "usermenu-active-navlink" : "usermenu-navlink"}
                                                            >
                                                                <DocumentAddIcon className="w-5 h-5" />
                                                                Add New Job
                                                            </NavLink>
                                                        )}
                                                    </Menu.Item>
                                                    {userStore.user?.roles.includes("Admin") && (
                                                        <Menu.Item>
                                                            {({ active }) =>(
                                                                <NavLink
                                                                    to="/admin/user-management"
                                                                    className={active ? "usermenu-active-navlink" : "usermenu-navlink"}
                                                                >
                                                                    <IdentificationIcon className="w-5 h-5" />
                                                                    Manage Users
                                                                </NavLink>
                                                            )}
                                                        </Menu.Item>
                                                    )}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={logUserOut}
                                                                className={active ? "usermenu-active-navlink" : "usermenu-navlink"}
                                                            >
                                                                <LogoutIcon className="w-5 h-5" />
                                                                Logout
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                }
                            </div>
                            <div className="flex items-center sm:hidden">
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                                        hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 
                                        focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <Disclosure.Button
                                as={NavLink}
                                to="/about"
                                className="mobile-navlink"
                            >
                                About
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={NavLink}
                                to="/jobs"
                                className="mobile-navlink"
                            >
                                Jobs
                            </Disclosure.Button>
                            {userStore.isLoggedIn === false && (
                                <>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to="/login"
                                        className="mobile-navlink"
                                    >
                                        Login
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to="/register"
                                        className="mobile-navlink"
                                    >
                                        Sign up
                                    </Disclosure.Button>
                                </>
                            )}
                        </div>
                        {userStore.isLoggedIn && (
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        {userStore.user?.profileImageUrl && userStore.user.profileImageUrl !== "" 
                                            ? <img 
                                                src={userStore.user.profileImageUrl}
                                                alt={userStore.user.displayName}
                                                className="w-11 h-11 object-cover object-center rounded-full"
                                            />
                                            : <UserCircleIcon className="w-10 h-10 text-gray-500 bg-gray-100 rounded-full" />
                                        }
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base text-gray-800">{userStore.user?.displayName}</div>
                                        <div className="text-sm text-gray-500">{userStore.user?.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Disclosure.Button
                                        as={NavLink}
                                        to="/profile"
                                        className="mobile-navlink"
                                    >
                                        Profile
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to="/dashboard"
                                        className="mobile-navlink"
                                    >
                                        Dashboard
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to="/dashboard/job"
                                        className="mobile-navlink"
                                    >
                                        Add New Job
                                    </Disclosure.Button>
                                    {userStore.user?.roles.includes("Admin") && (
                                        <Disclosure.Button
                                            as={NavLink}
                                            to="/admin/user-management"
                                            className="mobile-navlink"
                                        >
                                            Manage Users
                                        </Disclosure.Button>
                                    )}
                                    <Disclosure.Button
                                        className="mobile-navlink"
                                        onClick={logUserOut}
                                    >
                                        Logout
                                    </Disclosure.Button>
                                </div>
                            </div>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default observer(Navbar);
