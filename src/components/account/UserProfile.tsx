import React from 'react';
import { useStore } from '../../stores/store';
import BannerContainer from '../common/containers/BannerContainer';
import NotApprovedBanner from './NotApprovedBanner';
import UserProfileForm from './UserProfileForm';

export default function UserProfile() {
    const { userStore } = useStore();

    return (
        <>
            <BannerContainer>
                <h2 className="text-2xl text-gray-700">User Profile</h2>
            </BannerContainer>
            {!userStore.user?.isApproved && <NotApprovedBanner />}
            <UserProfileForm />
        </>
    );
}
