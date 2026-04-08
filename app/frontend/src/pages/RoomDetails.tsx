import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Maximize,
  ArrowLeft,
  Calendar,
  Check,
  Loader2,
} from "lucide-react";
import { createClient } from "@metagptx/web-sdk";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Room } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const client = createClient();

export default function RoomDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const userRes = await client.auth.me();
        if (userRes?.data) setUser(userRes.data);
      } catch {
        setUser(null);
      }

      try {
        const res = await client.entities.rooms.query({
          query: { slug },
          limit: 1,
        });
        if (res?.data?.items?.[0]) {
          setRoom(res.data.items[0]);
        }
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [slug]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalPrice = room ? nights * room.price_per_night : 0;

  const handleBooking = async () => {
    if (!user) {
      await client.auth.toLogin();
      return;
    }
    if (!checkIn || !checkOut || !guestName || !guestEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (nights <= 0) {
      toast({
        title: "Invalid Dates",
        description: "Check-out must be after check-in.",
        variant: "destructive",
      });
      return;
    }

    setBooking(true);
    try {
      await client.entities.bookings.create({
        data: {
          room_id: room!.id,
          room_name: room!.name,
          check_in: checkIn,
          check_out: checkOut,
          guests: parseInt(guests),
          total_price: totalPrice,
          status: "confirmed",
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          special_requests: specialRequests,
          created_at: new Date().toISOString(),
        },
      });
      toast({
        title: "Booking Confirmed!",
        description: `Your stay at ${room!.name} has been booked for ${nights} night${nights > 1 ? "s" : ""}.`,
      });
      setCheckIn("");
      setCheckOut("");
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setSpecialRequests("");
    } catch (err) {
      console.error("Booking failed:", err);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C9A96E]" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0A1628] text-white">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-serif mb-4">Room Not Found</h1>
          <Link to="/rooms" className="text-[#C9A96E] hover:underline">
            Back to Rooms
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const amenities = room.amenities ? room.amenities.split(",").map((a) => a.trim()) : [];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />

      <section className="pt-28 pb-6 max-w-7xl mx-auto px-4">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#C9A96E] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Rooms
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Room Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl overflow-hidden h-[400px] sm:h-[500px]"
            >
              <img
                src={room.image_url}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#0A1628]/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-[#C9A96E] border border-[#C9A96E]/20 capitalize">
                {room.category}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2">
                    {room.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Up to {room.max_guests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      {room.size_sqm} m²
                    </span>
                    <span className="flex items-center gap-1 text-[#C9A96E]">
                      <Star className="w-4 h-4 fill-current" />
                      {room.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[#C9A96E]">
                    €{room.price_per_night}
                  </span>
                  <span className="text-sm text-white/40 ml-1">/ night</span>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-8">
                {room.description}
              </p>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Room Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <Check className="w-4 h-4 text-[#C9A96E] shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 bg-[#162038] border border-[#C9A96E]/15 rounded-xl p-6 space-y-5">
              <h3 className="text-xl font-serif font-semibold text-center">
                Reserve Your Stay
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Check In *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]/60" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Check Out *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]/60" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white focus:border-[#C9A96E]/50 focus:outline-none transition-colors appearance-none"
                  >
                    {Array.from({ length: room.max_guests }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Special Requests
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements..."
                    rows={3}
                    className="w-full px-3 py-2.5 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Price Summary */}
              {nights > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-white/50">
                    <span>
                      €{room.price_per_night} × {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span>€{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#C9A96E]">€{totalPrice}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={booking}
                className="w-full py-3.5 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg hover:from-[#E8D5B0] hover:to-[#C9A96E] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {booking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : !user ? (
                  "Sign In to Book"
                ) : (
                  "Confirm Reservation"
                )}
              </button>

              <p className="text-xs text-white/30 text-center">
                Free cancellation up to 48 hours before check-in
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}