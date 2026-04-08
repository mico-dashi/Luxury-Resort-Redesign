import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { createClient } from "@metagptx/web-sdk";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Booking } from "@/lib/data";

const client = createClient();

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const userRes = await client.auth.me();
        if (userRes?.data) {
          setUser(userRes.data);
          const res = await client.entities.bookings.query({
            query: {},
            sort: "-created_at",
            limit: 50,
          });
          if (res?.data?.items) {
            setBookings(res.data.items);
          }
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C9A96E]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A1628] text-white">
        <Navbar />
        <div className="pt-32 text-center px-4">
          <h1 className="text-3xl font-serif mb-4">Sign In Required</h1>
          <p className="text-white/50 mb-6">
            Please sign in to view your bookings.
          </p>
          <button
            onClick={() => client.auth.toLogin()}
            className="px-8 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg"
          >
            Sign In
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />

      <section className="pt-32 pb-20 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Your Account
          </span>
          <h1 className="text-4xl font-serif font-bold mt-3 mb-8">
            My Bookings
          </h1>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#162038] border border-[#C9A96E]/10 rounded-xl">
            <Calendar className="w-12 h-12 text-[#C9A96E]/30 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Bookings Yet</h3>
            <p className="text-white/40 mb-6">
              Start planning your luxury getaway today.
            </p>
            <Link
              to="/rooms"
              className="inline-flex px-6 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg"
            >
              Explore Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-[#162038] border border-[#C9A96E]/10 rounded-xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-serif font-semibold mb-1">
                      {booking.room_name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {booking.check_in} → {booking.check_out}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.guest_name}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#C9A96E]">
                      €{booking.total_price}
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : booking.status === "cancelled"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}