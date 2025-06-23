// src/App.tsx
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import ChartsPage from "./pages/ChartsPage";
import EventsPage from "./pages/EventsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPortal from "./pages/AdminPortal";
import NotFound from "./pages/NotFound";

// Auth + Components
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage";
import UserAudioPortal from "@/components/UserAudioPortal";
import AudioUploader from "@/components/AudioUploader";
import RankingView from "@/components/RankingView";
import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/components/AuthContext";

// Admin Approval (temporarily unused but kept for future)
import AdminApproval from "@/components/AdminApproval"; // ✅ kept, but not routed for now

// Toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Pages */}
              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <UserAudioPortal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rankings"
                element={
                  <PrivateRoute>
                    <RankingView />
                  </PrivateRoute>
                }
              />

              {/* ⚠️ Future use — Admin Approval page not yet in use */}
              {/* <Route
                path="/admin-approval"
                element={
                  <PrivateRoute>
                    <AdminApproval />
                  </PrivateRoute>
                }
              /> */}
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/portal" element={<AdminPortal />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global UI Elements */}
          <Toaster />
          <Sonner />
          <ToastContainer position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
