import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useAuth();
  const { user } = useUser();
  const location = useLocation();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-md py-3"
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
          <div className="relative w-7 h-5">
            <span
              className={`absolute block h-0.5 rounded-full bg-white transform transition-all duration-300 ease-out ${
                isMenuOpen ? "rotate-45 top-2.5 w-7" : "w-7 top-0"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 rounded-full bg-white transform transition-all duration-300 ease-out ${
                isMenuOpen ? "opacity-0 w-0" : "w-5 top-2.5 right-0"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 rounded-full bg-white transform transition-all duration-300 ease-out ${
                isMenuOpen ? "-rotate-45 top-2.5 w-7" : "w-4 top-5 right-0"
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <LinkStyled to="/" isActive={location.pathname === "/"}>
            Find Jobs
          </LinkStyled>
          <LinkStyled
            to="/all-jobs"
            isActive={location.pathname === "/all-jobs"}
          >
            Jobs
          </LinkStyled>
          {/* <LinkStyled to="/company" isActive={location.pathname === "/company"}>
            Company
          </LinkStyled> */}
          {token && (
            <LinkStyled
              to="/profile/blog"
              isActive={location.pathname === "/profile/blog"}
            >
              Blog
            </LinkStyled>
          )}
          {token && (
            <LinkStyled
              to="/profile/company"
              isActive={location.pathname === "/profile/company"}
            >
              Company
            </LinkStyled>
          )}
          {!token && (
            <LinkStyled to="/" isActive={false}>
              About Us
            </LinkStyled>
          )}
        </nav>

        {/* Desktop Login/Sign Up or Welcome Message */}
        <div className="hidden md:flex items-center space-x-6">
          {token ? (
            <Link to="/profile" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold border border-primary/30">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                {user.username}
              </h2>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-base text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 text-sm rounded-full bg-primary text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px]"
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
            <MobileNavLink
              href="/"
              onClick={toggleMenu}
              isActive={location.pathname === "/"}
            >
              Find Jobs
            </MobileNavLink>
            <MobileNavLink
              href="/all-jobs"
              onClick={toggleMenu}
              isActive={location.pathname === "/all-jobs"}
            >
              Jobs
            </MobileNavLink>
            {token && (
              <MobileNavLink
                href="/profile/blog"
                onClick={toggleMenu}
                isActive={location.pathname === "/profile/blog"}
              >
                Blog
              </MobileNavLink>
            )}
             {token && (
              <MobileNavLink
                href="/profile/company"
                onClick={toggleMenu}
                isActive={location.pathname === "/profile/company"}
              >
                Company
              </MobileNavLink>
            )}
            {!token && (
              <MobileNavLink href="/" onClick={toggleMenu} isActive={false}>
                About Us
              </MobileNavLink>
            )}
          </nav>

          {/* Mobile Login/Sign Up or Welcome Message */}
          <div className="flex flex-col space-y-6 items-center mt-12">
            {token ? (
              <Link
                onClick={toggleMenu}
                to="/profile"
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-semibold border border-primary/30">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-lg font-medium text-gray-200 hover:text-white transition-colors duration-200">
                  {user.username}
                </h2>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  onClick={toggleMenu}
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-3 text-base rounded-full bg-primary text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px]"
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
const LinkStyled = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`text-base font-medium cursor-pointer transition-all duration-200 relative group ${
        isActive ? "text-primary" : "text-gray-300 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  );
};

const MobileNavLink = ({ href, onClick, children, isActive }) => (
  <Link
    to={href}
    className={`text-xl font-medium transition-all duration-200 relative group ${
      isActive ? "text-primary" : "text-gray-200 hover:text-white"
    }`}
    onClick={onClick}
  >
    {children}
    <span
      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
        isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
      }`}
    ></span>
  </Link>
);

export default Navbar;
