import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../../stores/store';

const AdminRoute = () => {
    const { userStore } = useStore();

    return userStore.user?.roles.includes("Admin") ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export default AdminRoute;