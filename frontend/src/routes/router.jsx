
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import ProtectedRoutes from '../components/ProtectedRoutes';
import Dashboard from '../components/dashboard/admin/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import ForgotPswd from '../pages/ForgotPswd';
import ResetPaswd from '../pages/ResetPaswd';
import AuthForm from '../components/AuthForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <Home />
                ),
            },

            
            {
                path: 'forgot-password',
                element: (
                    <ForgotPswd />
                ),
            },
        ],
    },




    ///////////////// Dashboard

          {
        path: 'dashboard',
        element: (
            <ProtectedRoutes>
                <DashboardLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                index: true,
                element: (
                    <h1>Profile Page</h1>
                ),
            },

            
             {
                path: 'reset-password',
                element: (
                    <ResetPaswd />
                ),
            },
        ],
    },



    /////////////////////////  ADMIN




   {
        path: 'admin',
        element: (
            <ProtectedRoutes role="admin">
                <DashboardLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                index: true,
                element: (
                    <Dashboard />
                ),
            },
            {
                path: "dashboard", element: (
                    <Dashboard />
                ),
            },
        ]
    },

    { path: '/auth', element: <AuthForm /> }
]);

export default router;