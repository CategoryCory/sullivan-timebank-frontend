import React from 'react';
import UserDashboardBanner from './UserDashboardBanner';
import { useStore } from '../../stores/store';
import NotApprovedDashboard from './NotApprovedDashboard';
import UserDashboardJobList from './UserDashboardJobList';

export default function UserDashboard() {
  const { userStore } = useStore();
  const isApproved = userStore.user?.isApproved;

  return (
    <>
      <UserDashboardBanner />
      {isApproved ? 
        <UserDashboardJobList />
        : 
        <NotApprovedDashboard />
      }
    </>
  )
}
