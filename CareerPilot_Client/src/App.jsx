import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Guest from "./pages/Guest";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import Company from "./pages/Company";
import AllJobs from "./pages/AllJobs";
import JobDetails from "./pages/JobDetails";
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
        </Route>
        <Route path="/company" element={<Company/>} />
        <Route path="/all-jobs" element={<AllJobs/>}>
            <Route path="job/:id" element={<JobDetails/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
