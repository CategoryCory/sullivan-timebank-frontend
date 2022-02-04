import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AboutPage from './components/AboutPage';
import Homepage from './components/Homepage';
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Layout from './components/layout/Layout';
import Jobs from './components/jobs/Jobs';
import ModalContainer from './components/common/modals/ModalContainer';
import { Slide, ToastContainer } from 'react-toastify';
import LoadingComponent from './components/LoadingComponent';
import { useStore } from './stores/store';
import UserDashboard from './components/dashboard/UserDashboard';
import NotFound from './components/NotFound';
import UserProfile from './components/profile/UserProfile';
import ProtectedRoute from './components/layout/PrivateRoute';

function App() {
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent />;

  return (
    <>
      <ToastContainer 
        position="bottom-right"
        theme="dark"
        transition={Slide}
        pauseOnHover={false}
        draggable
      />
      <ModalContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<Jobs />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          {/* </Route> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default observer(App);
