import { CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';

function UserDashboardBanner() {
    const { userStore, userRatingStore, tokenTransactionsStore } = useStore();
    const { getAverageRating } = userRatingStore;
    const { getTokenBalance } = tokenTransactionsStore;
    const [averageRating, setAverageRating] = useState(0);
    const [tokenTotal, setTokenTotal] = useState(0);

    useEffect(() => {
        getAverageRating(userStore.user!.userId).then(avg => {
            setAverageRating(avg!.averageRating);
        })
    }, [getAverageRating, userStore.user]);

    useEffect(() => {
        getTokenBalance(userStore.user!.userId).then(balance => {
            setTokenTotal(balance!.currentBalance);
        })
    }, [getTokenBalance, userStore.user]);

    return (
        <section className='py-6 bg-gray-100'>
            <div className='container mx-auto px-4 grid grid-cols-4 items-center'>
                <div className=''>
                    <p className='font-bold'>
                        Your Rating
                        <Link to="/" className='ml-2 font-normal text-sm text-indigo-500 hover:underline hover:text-indigo-700'>
                            VIEW ALL
                        </Link>
                    </p>
                    <p className='flex justify-start items-center font-bold text-9xl text-lime-500'>
                        {userRatingStore.loading 
                            ? <CircularProgress sx={{ mt: 4, mb: 4 }} />
                            : averageRating
                        }
                    </p>
                </div>
                <div className=''>
                    <p className='font-bold'>
                        Your Coins
                        <Link to="/" className='ml-2 font-normal text-sm text-indigo-500 hover:underline hover:text-indigo-700'>
                            VIEW ALL
                        </Link>
                    </p>
                    <p className='flex justify-start items-center font-bold text-9xl text-amber-400'>
                        {tokenTransactionsStore.loading 
                            ? <CircularProgress sx={{ mt: 4, mb: 4 }} />
                            : tokenTotal
                        }
                    </p>
                </div>
                <div className='col-span-2'>
                    <p className='mb-3 font-bold'>Alerts &amp; Notifications</p>
                    <div className='space-y-4'>
                        <p className='pt-4 pl-3 border-t-2 border-t-gray-300'>Lorem ipsum dolor sit amet.</p>
                        <p className='pt-4 pl-3 border-t-2 border-t-gray-300'>Lorem ipsum dolor sit amet.</p>
                        <p className='pt-4 pl-3 border-t-2 border-t-gray-300'>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default observer(UserDashboardBanner);