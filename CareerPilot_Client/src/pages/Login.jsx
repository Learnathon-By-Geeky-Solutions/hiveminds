import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { AlertCircle, Lock, Mail, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormBtn from "../components/AuthenticationFormBtn";
import Backgroundgrad from "../components/Backgroundgrad";
import InputField from "../components/InputField";
import AuthService from "../services/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorStatus, setErrorStatus] = useState(null);
  const { setToken, login } = useAuth();
  const { fetchUserData } = useUser();
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const inputOnChnage = (property, value) => {
    setLoginUser((prevObj) => ({
      ...prevObj,
      [property]: value,
    }));
  };
  // Effect to clear error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setErrorType("");
        setErrorStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Clear previous error messages
    setErrorMessage("");
    setErrorType("");
    setErrorStatus(null);

    AuthService.loginUser(loginUser)
      .then((response) => {
        console.log(response.data);
        const { token } = response.data; // Extract token from the response
        
        // Use the enhanced login function from AuthContext
        login(token); // Use login function instead of setToken directly
        
        // clear loginUser state after successful login
        setLoginUser({
          username: "",
          password: "",
        });
        
        // Explicitly fetch user data after login
        fetchUserData().then(() => {
          // Navigate to profile page after user data is loaded
          navigate("/profile");
        });
      })
      .catch((error) => {
        console.error("Error logging in!", error);

        // Extract error message from the backend response
        if (error.response && error.response.data) {
          const { message, error: errorType, status, timestamp } = error.response.data;
          
          // Store error details in state
          setErrorMessage(message || "Unknown error");
          setErrorType(errorType || "");
          setErrorStatus(status || null);
          
          // Log the full error response for debugging
          console.log("Error response:", { message, errorType, status, timestamp });
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      });}
      return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
            {/* Background gradient effect */}
            <Backgroundgrad />
    
            <div className="relative z-10 w-full max-w-md mx-auto">
              <div className="glass-card rounded-xl p-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                  <p className="text-gray-400">
                    Log in to your CareerPilot account
                  </p>
                </div>
    
                <form onSubmit={handleOnSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <InputField
                      icon={Mail}
                      type={"text"}
                      value={loginUser.username}
                      name={"username"}
                      placeholder={"User Name"}
                      onChange={(e) => {
                        inputOnChnage("username", e.target.value);
                      }}
                    />
    
                    <InputField
                      icon={Lock}
                      type={"password"}
                      value={loginUser.password}
                      name={"password"}
                      placeholder={"Password"}
                      onChange={(e) => {
                        inputOnChnage("password", e.target.value);
                      }}
                    />
                  </div>
    
                  <AuthenticationFormBtn btnText="Sign In" />
                </form>
    
                {/* Display error message */}
                {errorMessage && (
                  <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center animate-fade-in">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <p className="text-red-500 font-medium">
                          {errorStatus === 404 && errorType === "Resource Not Found" 
                            ? `User '${errorMessage}' not found` 
                            : errorMessage}
                        </p>
                      </div>
                      {errorType && (
                        <p className="text-xs text-red-400/80">
                          {errorStatus && <span className="font-semibold">{errorStatus}</span>} {errorType}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {errorStatus === 404 
                          ? "Please check your username and try again" 
                          : "Please try again or contact support if the problem persists"}
                      </p>
                    </div>
                  </div>
                )}
    
                <div className="mt-8 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-gray-400">
                        or continue with
                      </span>
                    </div>
                  </div>
    
                  <div className="mt-6 flex gap-4 justify-center">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/50 transition-all hover:bg-white/5">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20.3 12.04c0-.65-.06-1.31-.17-1.95H12v3.68h4.66c-.2 1.1-.8 2.03-1.7 2.65v2.2h2.76c1.61-1.48 2.54-3.66 2.54-6.58z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 21c2.3 0 4.24-.77 5.65-2.1l-2.76-2.14c-.77.52-1.75.82-2.89.82-2.23 0-4.13-1.5-4.8-3.52h-2.85v2.22c1.4 2.84 4.28 4.72 7.65 4.72z"
                          fill="#34A853"
                        />
                        <path
                          d="M7.2 14.04c-.18-.52-.28-1.06-.28-1.62 0-.56.1-1.1.28-1.62V8.58H4.35C3.75 9.6 3.4 10.77 3.4 12.02c0 1.25.35 2.41.95 3.43l2.85-2.22z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 6.88c1.26 0 2.38.43 3.28 1.27l2.44-2.44C16.06 4.34 14.12 3.5 12 3.5c-3.37 0-6.25 1.9-7.65 4.72l2.85 2.22c.67-2.01 2.57-3.56 4.8-3.56z"
                          fill="#EA4335"
                        />
                      </svg>
                    </button>
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/50 transition-all hover:bg-white/5">
                      <svg
                        className="h-5 w-5 fill-current text-[#1877F2]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                      </svg>
                    </button>
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/50 transition-all hover:bg-white/5">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                      </svg>
                    </button>
                  </div>
                </div>
    
                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-400">Don't have an account?</span>{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
  };
 

export default Login;
