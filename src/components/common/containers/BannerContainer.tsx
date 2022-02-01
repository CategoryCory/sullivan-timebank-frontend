import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function BannerContainer({ children }: Props) {
    return (
        <div className="w-full py-6 bg-gray-200">
            <div className="container mx-auto">
                {children}
            </div>
        </div>
    );
}
