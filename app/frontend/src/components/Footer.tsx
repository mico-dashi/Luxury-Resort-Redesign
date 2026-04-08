import { Link } from "react-router-dom";
import { Mountain, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060E1A] border-t border-[#C9A96E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A96E] to-[#E8D5B0] flex items-center justify-center">
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
            <p className="text-sm text-white/50 leading-relaxed">
              Nestled in the heart of pristine mountains, Zdrava Resort offers
              an unparalleled luxury experience where nature meets sophistication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Rooms", href: "/rooms" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-[#C9A96E] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {["Spa & Wellness", "Fine Dining", "Infinity Pool", "Concierge"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-white/50">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold text-sm tracking-wider uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>Mountain Valley Road, Zdrava Region</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <Phone className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <Mail className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>reservations@zdravaresort.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Zdrava Resort & Spa. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <span
                  key={item}
                  className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}