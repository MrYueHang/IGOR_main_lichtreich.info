/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Vision from './pages/public/Vision';
import Gallery from './pages/public/Gallery';
import Projects from './pages/public/Projects';
import Prices from './pages/public/Prices';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Customers from './pages/admin/Customers';
import Email from './pages/admin/Email';
import Inquiries from './pages/admin/Inquiries';
import PR from './pages/admin/PR';
import Profile from './pages/admin/Profile';
import Content from './pages/admin/Content';
import Workspace from './pages/admin/Workspace';
import Calendar from './pages/admin/Calendar';
import AdminGallery from './pages/admin/AdminGallery';
import AdminPrices from './pages/admin/AdminPrices';
import AdminProjects from './pages/admin/AdminProjects';
import Checklists from './pages/admin/Checklists';
import SocialMedia from './pages/admin/SocialMedia';
import AIAssistant from './pages/admin/AIAssistant';
import AdminDatabases from './pages/admin/AdminDatabases';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="vision" element={<Vision />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="projects" element={<Projects />} />
          <Route path="prices" element={<Prices />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="email" element={<Email />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="pr" element={<PR />} />
          <Route path="profile" element={<Profile />} />
          <Route path="content" element={<Content />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="databases" element={<AdminDatabases />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="prices" element={<AdminPrices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="checklists" element={<Checklists />} />
          <Route path="social" element={<SocialMedia />} />
          <Route path="ai" element={<AIAssistant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
