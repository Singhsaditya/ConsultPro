import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';
import Clients from './pages/admin/Clients';
import Contacts from './pages/admin/Contacts';
import Newsletter from './pages/admin/Newsletter';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="clients" element={<Clients />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="newsletter" element={<Newsletter />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
