import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LocaleProvider } from './contexts/LocaleContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { getCurrentUser } from './lib/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}

export default App;