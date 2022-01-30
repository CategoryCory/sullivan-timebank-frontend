import { CircularProgress } from '@mui/material';
import React from 'react';

export default function LoadingComponent() {
    return (
        <div className="w-full h-full grid place-items-center flex-grow">
            <div className="flex justify-center items-center gap-4">
                <CircularProgress sx={{ color: "#4f46e5" }} />
                <span className="font-bold text-lg text-gray-600">Loading...</span>
            </div>
        </div>
    );
}
