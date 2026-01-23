import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/AppShell";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}