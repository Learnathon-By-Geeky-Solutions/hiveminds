import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:text-primary"
        >
          <span className="text-primary">Career</span>Pilot
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 transition-all duration-300 ease-in-out" />
          ) : (
            <Menu className="h-6 w-6 transition-all duration-300 ease-in-out" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#jobs"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Find Jobs
          </a>
          <a
            href="#categories"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Categories
          </a>
          <a
            href="#about"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            About Us
          </a>
        </nav>

        {/* Desktop Login and Sign Up Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:brightness-110 hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 bg-background/95 backdrop-blur-lg mt-4 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-6">
          <nav className="flex flex-col space-y-5">
            <a
              href="#jobs"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              onClick={toggleMenu}
            >
              Find Jobs
            </a>
            <a
              href="#categories"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              onClick={toggleMenu}
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              onClick={toggleMenu}
            >
              About Us
            </a>
          </nav>

          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-700">
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:brightness-110 text-center"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
