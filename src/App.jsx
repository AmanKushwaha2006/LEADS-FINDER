import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { LeadDiscovery } from './pages/LeadDiscovery';
import { Companies } from './pages/Companies';
import { CompanyDetails } from './pages/CompanyDetails';
import { Recruiters } from './pages/Recruiters';
import { Automation } from './pages/Automation';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { Tasks } from './pages/Tasks';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="discovery" element={<LeadDiscovery />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:id" element={<CompanyDetails />} />
          <Route path="recruiters" element={<Recruiters />} />
          <Route path="automation" element={<Automation />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
