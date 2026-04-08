import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  ArrowRight,
  Calendar,
  Users,
  Sparkles,
  UtensilsCrossed,
  Waves,
  ChevronRight,
  Quote,
} from "lucide-react";
import { createClient } from "@metagptx/web-sdk";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, SERVICES, TESTIMONIALS, STATS, Room } from "@/lib/data";

const client = createClient();

const serviceIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" />,
  Waves: <Waves className="w-6 h-6" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HomePage() {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await client.entities.rooms.query({
          query: { is_featured: true },
          limit: 4,
        });
        if (res?.data?.items) {
          setFeaturedRooms(res.data.items);
        }
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Zdrava Resort aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/30 to-[#0A1628]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block text-[#C9A96E] text-sm tracking-[0.4em] uppercase mb-6 font-medium">
              Welcome to Zdrava
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
              Where Luxury Meets
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-[#E8D5B0]">
                Mountain Serenity
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Escape to an extraordinary retreat nestled among pristine peaks.
              Experience world-class hospitality, rejuvenating wellness, and
              unforgettable moments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg hover:from-[#E8D5B0] hover:to-[#C9A96E] transition-all duration-300 shadow-xl shadow-[#C9A96E]/20 text-base"
            >
              Explore Rooms
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300 text-base"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#C9A96E] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Booking Bar */}
      <section className="relative z-20 -mt-12 max-w-5xl mx-auto px-4">
        <div className="bg-[#162038]/90 backdrop-blur-xl border border-[#C9A96E]/20 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-2 block font-medium">
                Check In
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]/60" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-white text-sm focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-2 block font-medium">
                Check Out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]/60" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-white text-sm focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-2 block font-medium">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]/60" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-white text-sm focus:border-[#C9A96E]/50 focus:outline-none transition-colors appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Link
              to={`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg hover:from-[#E8D5B0] hover:to-[#C9A96E] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20"
            >
              Search
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-[#C9A96E] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Accommodations
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mt-3 mb-4">
            Exquisite Rooms & Suites
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Each room is a sanctuary of comfort and elegance, designed to provide
            an unforgettable experience with stunning views and premium amenities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredRooms.map((room, i) => (
            <motion.div
              key={room.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link
                to={`/rooms/${room.slug}`}
                className="group block bg-[#162038] border border-[#C9A96E]/10 rounded-xl overflow-hidden hover:border-[#C9A96E]/30 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.image_url}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162038] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#0A1628]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#C9A96E] border border-[#C9A96E]/20 capitalize">
                    {room.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-semibold group-hover:text-[#C9A96E] transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[#C9A96E]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{room.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {room.short_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#C9A96E]">
                        €{room.price_per_night}
                      </span>
                      <span className="text-sm text-white/40 ml-1">/ night</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-[#C9A96E] group-hover:gap-2 transition-all">
                      View Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#C9A96E]/30 text-[#C9A96E] font-medium rounded-lg hover:bg-[#C9A96E]/10 transition-all duration-300"
          >
            View All Rooms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#0F1D32]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
              Experiences
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mt-3 mb-4">
              World-Class Services
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              From rejuvenating spa treatments to exquisite dining, every moment
              at Zdrava is crafted for your pleasure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative rounded-xl overflow-hidden h-96"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-12 h-12 rounded-lg bg-[#C9A96E]/20 backdrop-blur-sm flex items-center justify-center text-[#C9A96E] mb-4 border border-[#C9A96E]/30">
                    {serviceIcons[service.icon]}
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mt-3 mb-4">
            Guest Experiences
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#162038] border border-[#C9A96E]/10 rounded-xl p-8 relative"
            >
              <Quote className="w-8 h-8 text-[#C9A96E]/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-[#C9A96E] fill-current"
                  />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-xs text-[#C9A96E]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
              Begin Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-[#E8D5B0]">
                Extraordinary
              </span>{" "}
              Journey
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10">
              Reserve your stay at Zdrava Resort and discover a world of luxury,
              wellness, and mountain serenity.
            </p>
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg hover:from-[#E8D5B0] hover:to-[#C9A96E] transition-all duration-300 shadow-xl shadow-[#C9A96E]/20 text-lg"
            >
              Reserve Your Stay
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}