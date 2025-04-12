import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AllJobs from "./pages/AllJobs";
import Blog from "./pages/Blog";
import Company from "./pages/Company";
import Guest from "./pages/Guest";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddNewCompanyPage from "./components/company/starter/AddNewCompanyPage";
import CompanyDashboard from "./components/company/starter/CompanyDashboard";
import { ThemeProvider } from "./contexts/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route
            path="blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="company"
            element={
              <ProtectedRoute>
                <Company />
              </ProtectedRoute>
            }
          >
            {/* Route for creating a new company */}
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <AddNewCompanyPage />
                </ProtectedRoute>
              }
            />
            {/* Route for viewing the company dashboard */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/jobs" element={<AllJobs />}>
          <Route path="job/:id" element={<JobDetails />} />
        </Route>
      </Routes>
      <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
