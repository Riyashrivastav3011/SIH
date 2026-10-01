import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TrainDetails from "./pages/TrainDetails";
import ControlRoom from './pages/ControlRoom'
import StationBoard from './pages/StationBoard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Alerts from './pages/Alerts'
import Analytics from './pages/Analytics'
import SystemHealth from './pages/SystemHealth'
import  Settings  from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages (Navbar ke saath, bina sidebar) */}
        <Route path="/" element={<><Navbar /><Landing /></>} />
        <Route path="/login" element={<><Navbar/><Login/></>} />
        <Route path="/signup" element={<><Navbar/><Signup/></>} />

        {/* Login zaroori: bina login ke /login par redirect */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/train/:trainNumber" element={<TrainDetails />} />
            <Route path="/station-board" element={<StationBoard />} />
            <Route path="/station-board/:code" element={<StationBoard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/system-health" element={<SystemHealth />} />
            <Route path="/settings" element={<Settings />} />

            {/* Sirf staff / admin */}
            <Route element={<ProtectedRoute roles={["staff", "admin"]} />}>
              <Route path="/control-room" element={<ControlRoom />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}