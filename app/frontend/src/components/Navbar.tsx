import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mountain } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@metagptx/web-sdk";

const client = createClient();

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await client.auth.me();
        if (res?.data) setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogin = async () => {
    await client.auth.toLogin();
  };

  const handleLogout = async () => {
    await client.auth.logout();
    setUser(null);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A1628]/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-[#C9A96E]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A96E] to-[#E8D5B0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mountain className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-wider font-serif">
                ZDRAVA
              </span>
              <span className="block text-[10px] text-[#C9A96E] tracking-[0.3em] uppercase -mt-1">
                Resort & Spa
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${
                  location.pathname === link.href
                    ? "text-[#C9A96E]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#C9A96E] transition-all duration-300 ${
                    location.pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Auth + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/my-bookings"
                  className="text-sm text-white/70 hover:text-[#C9A96E] transition-colors"
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Sign In
              </button>
            )}
            <Link
              to="/rooms"
              className="px-6 py-2.5 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] text-sm font-semibold rounded-lg hover:from-[#E8D5B0] hover:to-[#C9A96E] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-[#C9A96E]/10"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block text-base font-medium py-2 ${
                    location.pathname === link.href
                      ? "text-[#C9A96E]"
                      : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/my-bookings"
                      className="block text-sm text-white/70"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-sm text-white/70"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="block text-sm text-white/70"
                  >
                    Sign In
                  </button>
                )}
                <Link
                  to="/rooms"
                  className="block text-center px-6 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}