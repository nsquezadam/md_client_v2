import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AuthenticatedLayout from "./components/AuthenticatedLayout";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/admin-dashboard" 
                    element={
                        <AuthenticatedLayout>
                            <AdminDashboard />
                        </AuthenticatedLayout>
                    } 
                />
                <Route 
                    path="/user-dashboard" 
                    element={
                        <AuthenticatedLayout>
                            <UserDashboard />
                        </AuthenticatedLayout>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;