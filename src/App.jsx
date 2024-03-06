import i18n from "./i18n";
import { lazy } from "react";
import { Suspense } from "react";
import { AuthPage } from "./pages";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import { I18nextProvider } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, Flip } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorFallback, SuspenseFallback } from "./components";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

const AdminDashboard = lazy(() =>
  import("./pages/adminDashboard/AdminDashboard")
);
const Projects = lazy(() => import("./pages/projects/Projects"));
const Scoreboard = lazy(() => import("./pages/scoreboard/Scoreboard"));
const Settings = lazy(() => import("./pages/settings/Settings"));

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const locationArr = location.pathname?.split("/") ?? [];
  const { currentUser } = useAuth();

  return (
    <I18nextProvider i18n={i18n}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes key={locationArr[1]} location={location}>
          <Route element={<MainLayout />}>
            {currentUser ? (
              <>
                <Route path="/*" element={<PrivateRoutes />} />
                <Route index element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="auth/*" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}
          </Route>
        </Routes>
      </AnimatePresence>
    </I18nextProvider>
  );
};

const PrivateRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="projects/*" element={<Projects />} />
    <Route path="scoreboard" element={<Scoreboard />} />
    <Route path="settings" element={<Settings />} />
    <Route path="auth/*" element={<Navigate to="/dashboard" />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

const MainLayout = () => (
  <motion.div
    className="w-full h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>

      <ToastContainer
        theme="colored"
        autoClose={2000}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        transition={Flip}
      />
    </QueryClientProvider>
  </motion.div>
);

export default App;
