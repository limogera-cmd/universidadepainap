import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CoursePlayer from './pages/CoursePlayer';
import CaseLibrary from './pages/CaseLibrary';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageStudents from './pages/admin/ManageStudents';
import AdminSettings from './pages/admin/AdminSettings';
import Toolbox from './pages/Toolbox';
import Community from './pages/Community';

// Route Guards
const PrivateRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Rota Privada - Área do Aluno */}
      <Route path="/aluno" element={
        <PrivateRoute allowedRole="aluno">
          <StudentLayout />
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="curso" element={<CoursePlayer />} />
        <Route path="cases" element={<CaseLibrary />} />
        <Route path="toolbox" element={<Toolbox />} />
        <Route path="community" element={<Community />} />
      </Route>

      {/* Rota Privada - Área do Admin */}
      <Route path="/admin" element={
        <PrivateRoute allowedRole="admin">
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="cursos" element={<ManageCourses />} />
        <Route path="alunos" element={<ManageStudents />} />
        <Route path="config" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
