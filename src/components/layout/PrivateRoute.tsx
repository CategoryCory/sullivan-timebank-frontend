import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../../stores/store';

const ProtectedRoute = () => {
    const { userStore } = useStore();

    return userStore.isLoggedIn ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export default ProtectedRoute;