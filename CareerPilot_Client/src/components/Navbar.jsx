import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomLoader from "./CustomLoader";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useAuth();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-[hsl(var(--background))/0.95] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold text-[hsl(var(--foreground))] relative group"
        >
          CareerPilot
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[hsl(var(--foreground))] transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-full p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu
            className={`h-7 w-7 transition-transform duration-300 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <LinkStyled
            to="/"
            isActive={location.pathname === "/"}
            hasDropdown={true}
          >
            Home
          </LinkStyled>
          <LinkStyled to="/jobs" isActive={location.pathname === "/jobs"}>
            Jobs
          </LinkStyled>
          <LinkStyled
            to="/community"
            isActive={location.pathname === "/community"}
          >
            Community
          </LinkStyled>
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
              isActive={
                location.pathname === "/profile/company/dashboard" ||
                location.pathname === "/profile/company/create"
              }
            >
              Company
            </LinkStyled>
          )}
          {!token && (
            <LinkStyled to="/about" isActive={location.pathname === "/about"}>
              About Us
            </LinkStyled>
          )}
        </nav>

        {/* Desktop Login/Sign Up or Welcome Message */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <Link
              to="/profile"
              className="flex items-center gap-3 group transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--card-foreground))] font-semibold text-lg">
                {user && user.username
                  ? user.username.charAt(0).toUpperCase()
                  : "?"}
              </div>
              <span className="text-lg font-semibold text-[hsl(var(--card-foreground))] group-hover:scale-105 transition-transform duration-200">
                {user && user.username ? user.username : <CustomLoader />}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg font-semibold text-[hsl(var(--card-foreground))] relative group transition-all duration-200"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--foreground))] transition-all duration-300 group-hover:w-full group-hover:scale-x-110"></span>
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-lg font-semibold text-[hsl(var(--card-foreground))] bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-[var(--radius)] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[hsl(var(--background))/0.98] backdrop-blur-xl transition-all duration-500 ease-in-out ${
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
              Home
            </MobileNavLink>
            <MobileNavLink
              href="/jobs"
              onClick={toggleMenu}
              isActive={location.pathname === "/jobs"}
            >
              Jobs
            </MobileNavLink>
            <MobileNavLink
              href="/community"
              onClick={toggleMenu}
              isActive={location.pathname === "/community"}
            >
              Community
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
              <MobileNavLink
                href="/about"
                onClick={toggleMenu}
                isActive={location.pathname === "/about"}
              >
                About Us
              </MobileNavLink>
            )}
          </nav>

          {/* Mobile Login/Sign Up or Welcome Message */}
          <div className="flex flex-col space-y-8 items-center mt-12">
            {token ? (
              <Link
                onClick={toggleMenu}
                to="/profile"
                className="flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--card-foreground))] text-xl font-semibold">
                  {user && user.username
                    ? user.username.charAt(0).toUpperCase()
                    : "?"}
                </div>
                <span className="text-2xl font-semibold text-[hsl(var(--card-foreground))] hover:scale-105 transition-transform duration-200">
                  {user && user.username ? user.username : <CustomLoader />}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-2xl font-semibold text-[hsl(var(--card-foreground))] relative group transition-all duration-200"
                  onClick={toggleMenu}
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--foreground))] transition-all duration-300 group-hover:w-full group-hover:scale-x-110"></span>
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-3 text-2xl font-semibold text-[hsl(var(--card-foreground))] bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-[var(--radius)] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] hover:scale-105 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper components for cleaner code
const LinkStyled = ({ to, children, isActive, hasDropdown }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (hasDropdown) {
    return (
      <div className="relative group">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`text-lg font-semibold text-[hsl(var(--card-foreground))] transition-all duration-200 flex items-center gap-2 ${
            isActive ? "text-[hsl(var(--foreground))]" : "hover:scale-105"
          }`}
        >
          {children}
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 mt-3 w-52 rounded-[var(--radius)] bg-[hsl(var(--background))/0.95] backdrop-blur-xl border border-[hsl(var(--border))] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="py-2">
              <a
                href="#jobs"
                className="block px-4 py-2 text-base font-semibold text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--card))] hover:scale-105 transition-all duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Featured Jobs
              </a>
              <a
                href="#about"
                className="block px-4 py-2 text-base font-semibold text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--card))] hover:scale-105 transition-all duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                About Us
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-base font-semibold text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--card))] hover:scale-105 transition-all duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={`text-lg font-semibold text-[hsl(var(--card-foreground))] transition-all duration-200 relative group ${
        isActive ? "text-[hsl(var(--foreground))]" : "hover:scale-105"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-2 left-0 h-1 bg-[hsl(var(--foreground))] transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full group-hover:scale-x-110"
        }`}
      ></span>
    </Link>
  );
};

const MobileNavLink = ({ href, onClick, children, isActive }) => (
  <Link
    to={href}
    className={`text-2xl font-semibold text-[hsl(var(--card-foreground))] transition-all duration-200 relative group ${
      isActive ? "text-[hsl(var(--foreground))]" : "hover:scale-105"
    }`}
    onClick={onClick}
  >
    {children}
    <span
      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-[hsl(var(--foreground))] transition-all duration-300 ${
        isActive ? "w-1/2" : "w-0 group-hover:w-1/2 group-hover:scale-x-110"
      }`}
    ></span>
  </Link>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] hover:scale-105 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
};

export default Navbar;
