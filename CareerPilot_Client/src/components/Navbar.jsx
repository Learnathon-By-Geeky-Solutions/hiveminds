import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useAuth(); // Access token and user from AuthContext

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-white relative group"
        >
          <span className="text-primary">Career</span>Pilot
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white focus:outline-none relative z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={`absolute block h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 top-3 w-6" : "w-6 top-1"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0 w-0" : "w-5 top-3 right-0"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 top-3 w-6" : "w-4 top-5 right-0"
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <NavLink href="#jobs">Find Jobs</NavLink>
          <NavLink href="#categories">Categories</NavLink>
          <NavLink href="#about">About Us</NavLink>
        </nav>

        {/* Desktop Login/Sign Up or Welcome Message */}
        <div className="hidden md:flex items-center space-x-6">
          {token ? (
            <h2 className="text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group">
              Welcome user
            </h2>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 text-sm rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background/98 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col justify-center h-full px-6 transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <nav className="flex flex-col space-y-8 items-center">
            <MobileNavLink href="#jobs" onClick={toggleMenu}>
              Find Jobs
            </MobileNavLink>
            <MobileNavLink href="#categories" onClick={toggleMenu}>
              Categories
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMenu}>
              About Us
            </MobileNavLink>
          </nav>

          {/* Mobile Login/Sign Up or Welcome Message */}
          <div className="flex flex-col space-y-6 items-center mt-12">
            {token ? (
              <h2 className="text-lg text-gray-300 hover:text-white transition-colors duration-200">
                Welcome User
              </h2>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-3 text-base rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px]"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper components for cleaner code
const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm text-gray-300 hover:text-white transition-all duration-200 relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <a
    href={href}
    className="text-xl text-gray-200 hover:text-white transition-all duration-200 relative group"
    onClick={onClick}
  >
    {children}
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2"></span>
  </a>
);

export default Navbar;
