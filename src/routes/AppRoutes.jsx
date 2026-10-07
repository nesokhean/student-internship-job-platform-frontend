import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Loading from '../components/Loading.jsx'
import Home from '../pages/Home.jsx'
import Jobs from '../pages/Jobs.jsx'
import JobDetails from '../pages/JobDetails.jsx'
import Internships from '../pages/Internships.jsx'
import InternshipDetails from '../pages/InternshipDetails.jsx'
import Companies from '../pages/Companies.jsx'
import CompanyDetails from '../pages/CompanyDetails.jsx'
import NotFound from '../pages/NotFound.jsx'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import StudentDashboard from '../pages/student/Dashboard.jsx'
import StudentProfile from '../pages/student/Profile.jsx'
import StudentJobs from '../pages/student/Jobs.jsx'
import StudentJobDetails from '../pages/student/JobDetails.jsx'
import StudentApplications from '../pages/student/Applications.jsx'
import CompanyDashboard from '../pages/company/Dashboard.jsx'
import AdminDashboard from '../pages/admin/Dashboard.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { roleHome } from '../utils/helpers.js'

function SessionCheck() {
  return <div className="grid min-h-screen place-items-center"><Loading label="Checking your session…" /></div>
}

function RequireRole({ roles, children }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <SessionCheck />
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />
  if (roles && !roles.includes(user.role)) return <Navigate to={roleHome(user.role)} replace />
  return children
}

function GuestOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <SessionCheck />
  if (user) return <Navigate to={roleHome(user.role)} replace />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="internships" element={<Internships />} />
        <Route path="internships/:id" element={<InternshipDetails />} />
        <Route path="companies" element={<Companies />} />
        <Route path="companies/:id" element={<CompanyDetails />} />
        <Route path="profile" element={<Navigate to="/student/profile" replace />} />
        <Route path="applications" element={<Navigate to="/student/applications" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<GuestOnly><AuthLayout /></GuestOnly>}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/student" element={<RequireRole roles={['student']}><DashboardLayout /></RequireRole>}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="jobs" element={<StudentJobs />} />
        <Route path="jobs/:id" element={<StudentJobDetails />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/company" element={<RequireRole roles={['company']}><DashboardLayout /></RequireRole>}>
        <Route index element={<Navigate to="/company/dashboard" replace />} />
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin" element={<RequireRole roles={['admin']}><DashboardLayout /></RequireRole>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

