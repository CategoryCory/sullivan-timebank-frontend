import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStore } from "../../stores/store";
import { ITokenTransaction } from '../../models/tokenTransactions';

export default function TokenTransactions() {
    const [userSentTransactions, setUserSentTransactions] = useState<ITokenTransaction[]>([]);
    const [userReceivedTransactions, setUserReceivedTransactions] = useState<ITokenTransaction[]>([]);
    const { userStore } = useStore();

    const userId = userStore.user!.userId;

    useEffect(() => {
        axios.get<ITokenTransaction[]>(`/tokentransactions/${userId}`)
            .then(res => {
                const sentTransactions = res.data.filter(d => d.senderId === userId);
                const receivedTransactions = res.data.filter(d => d.recipientId === userId);

                setUserSentTransactions(sentTransactions);
                setUserReceivedTransactions(receivedTransactions);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [userId]);

    return (
        <>
            <section className='py-8 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='mb-3 text-3xl text-gray-700'>My Transactions</h1>
                    <Link to="/dashboard" className='flex items-center gap-2 text-gray-500 text-sm'>
                        <ArrowBackIcon fontSize='small' />Back to dashboard
                    </Link>
                </div>
            </section>
            <main className='container mx-auto my-8 space-y-8'>
                <div>
                    <h3>Sent Transactions</h3>
                    <p className='text-sm text-gray-500'>These are the transactions where you awarded time coins to another user.</p>
                    {userSentTransactions.length === 0 && <p className='my-4 text-sm text-gray-500'>You haven't awarded any time coins yet.</p>}
                    {userSentTransactions.length > 0 && (
                        <div className="max-w-3xl mt-4 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope='col'
                                                        className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-indigo-600'
                                                    >
                                                        Date Processed
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-indigo-600'
                                                    >
                                                        Sender Name
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-indigo-600'
                                                    >
                                                        Coin Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {userSentTransactions.map(t => (
                                                    <tr key={t.tokenTransactionId}>
                                                        <td
                                                            className='whitespace-nowrap px-2 py-2 text-sm'
                                                        >
                                                            {format(new Date(t.processedOn!), "MMMM d, yyyy")}
                                                        </td>
                                                        <td
                                                            className='whitespace-nowrap px-2 py-2 text-sm'
                                                        >
                                                            {t.senderName}
                                                        </td>
                                                        <td
                                                            className='whitespace-nowrap px-2 py-2 text-sm'
                                                        >
                                                            {t.amount}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h3>Received Transactions</h3>
                    <p className='text-sm text-gray-500'>These are the transactions where you were awarded time coins for work done on a job.</p>
                    {userReceivedTransactions.length === 0 && <p className='my-4 text-sm text-gray-500'>You haven't received any time coins yet.</p>}
                    {userReceivedTransactions.length > 0 && (
                        <div className="max-w-3xl mt-4 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope='col'
                                                        className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-indigo-600'
                                                    >
                                                        Date Processed
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-indigo-600'
                                                    >
                                                        Sender Name
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-indigo-600'
                                                    >
                                                        Coin Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {userReceivedTransactions.map(t => (
                                                    <tr key={t.tokenTransactionId}>
                                                        <td
                                                            className='whitespace-nowrap px-2 py-2 text-sm'
                                                        >
                                                            {format(new Date(t.processedOn!), "MMMM d, yyyy")}
                                                        </td>
                                                        <td
                                                            className='whitespace-nowrap px-2 py-2 text-sm'
                                                        >
                                                            {t.senderName}
                                                        </td>
                                                        <td
                                                            className='whitespace-nowrap px-2 py-2 text-sm'
                                                        >
                                                            {t.amount}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
