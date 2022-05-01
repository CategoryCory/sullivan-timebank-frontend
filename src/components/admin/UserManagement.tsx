import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CircularProgress, } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { UserProfile } from '../../models/user';

export default function UserManagement() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserProfile[]>();

    useEffect(() => {
        setLoading(true);
        axios.get<UserProfile[]>("/users")
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((error: AxiosError) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleApproveUser = async (userId: string) => {
        setLoading(true);

        try {
            await axios.put<string>(`/account/approve/${userId}`);
            const res = await axios.get<UserProfile[]>("/users");
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 flex flex-col">
            <h2 className='mb-6 font-sans text-3xl text-gray-700'>User Management</h2>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    {loading ? (
                        <div className="mt-8 flex justify-center items-center">
                            <CircularProgress sx={{ mr: 4, color: "#4F46E5" }} />
                            <span className='text-gray-500'>Loading users...</span>
                        </div>
                    ) : (
                        <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-300'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th scope="col" className='py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6'>
                                            Name
                                        </th>
                                        <th scope="col" className='px-3 py-3.5 text-left font-semibold text-gray-900'>
                                            Email
                                        </th>
                                        <th scope="col" className='px-3 py-3.5 text-left font-semibold text-gray-900'>
                                            Biography
                                        </th>
                                        <th scope="col" className='px-3 py-3.5 text-left font-semibold text-gray-900'>
                                            Status
                                        </th>
                                        <th scope="col" className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                                            <span className='sr-only'>Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 bg-white'>
                                    {users?.map(user => (
                                        <tr key={user.id}>
                                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-6'>
                                                {`${user.firstName} ${user.lastName}`}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{user.email}</td>
                                            <td className='whitespace-normal px-3 py-4 text-sm text-gray-500'>{user.biography}</td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                {user.isApproved ? "Approved" : "Not approved"}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                {!user.isApproved && (
                                                    <button 
                                                        onClick={() => handleApproveUser(user.id!)}
                                                        className='px-2 py-0.5 flex gap-1 bg-emerald-100 text-emerald-700 rounded-sm
                                                                    hover:bg-emerald-200 transition duration-150'
                                                    >
                                                        <CheckIcon fontSize='small' />
                                                        Approve
                                                        <span className='sr-only'>, {`${user.firstName} ${user.lastName}`}</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
