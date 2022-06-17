import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserRating, UserAverageRating } from "../../models/userRating";
import { useStore } from '../../stores/store';
import { Rating } from '@mui/material';

export default function UserRatings() {
    const [ratings, setRatings] = useState<UserRating[]>([]);
    const [averageRating, setAverageRating] = useState<UserAverageRating>();
    const { userStore } = useStore();

    const userId = userStore.user!.userId;

    useEffect(() => {
        axios.get<UserAverageRating>(`/userratings/${userId}`)
            .then(res => {
                setAverageRating(res.data);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            })
    }, [userId]);

    useEffect(() => {
        axios.get<UserRating[]>(`/userratings/received/${userId}`)
            .then(res => {
                setRatings(res.data);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            })
    }, [userId]);

    return (
        <>
            <section className='py-8 bg-gray-100'>
                <div className='container mx-auto'>
                    <h1 className='mb-3 text-3xl text-gray-700'>My Ratings</h1>
                    <Link to="/dashboard" className='flex items-center gap-2 text-gray-500 text-sm'>
                        <ArrowBackIcon fontSize='small' />Back to dashboard
                    </Link>
                </div>
            </section>
            <main className='container mx-auto py-8'>
                <p className="pb-4 font-bold text-8xl text-lime-600 border-b-2 border-b-slate-200">
                    {averageRating?.averageRating}
                </p>
                <h3 className='my-4 font-bold text-2xl'>Reviews</h3>
                {ratings.length === 0 && <p className='text-sm text-gray-500'>You don't have any reviews yet.</p>}

                <ul className="max-w-3xl divide-y divide-slate-200">
                    {ratings.length > 0 && ratings.map(rating => (
                        <div 
                            key={rating.userRatingId}
                            className=""
                        >
                            <div className='mb-2 flex justify-between items-center'>
                                <p className='font-bold'>{rating.authorName}</p>
                                <Rating
                                    name={`rating-${rating.userRatingId}`}
                                    value={rating.rating}
                                    precision={0.25}
                                    readOnly
                                />
                            </div>
                            <p className='text-sm text-gray-500'>{rating.comments}</p>
                        </div>
                    ))}
                </ul>
            </main>
        </>
    )
}
