import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Navbar from "./components/common/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TrainDetails from "./pages/TrainDetails";
import ControlRoom from './pages/ControlRoom'
import TrainEta from './pages/TrainEta'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Alerts from './pages/Alerts'
import Analytics from './pages/Analytics'
import SystemHealth from './pages/SystemHealth'
import  Settings  from './pages/Settings';


const Soon = ({ title }) => (
  <h1 className="text-2xl font-bold">{title} (coming soon)</h1>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages (Navbar ke saath, bina sidebar) */}
        <Route path="/" element={<><Navbar /><Landing /></>} />
        <Route path="/login" element={<><Navbar/><Login/></>} />

        {/* App pages (Navbar + Sidebar wala AppLayout) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/train/:trainNumber" element={<TrainDetails />} />
          <Route path="/control-room" element={<ControlRoom />} />
           <Route path="/train/:no" element={<TrainEta no="12002" />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/system-health" element={<SystemHealth />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}