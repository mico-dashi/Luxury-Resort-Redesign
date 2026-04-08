import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Maximize, ChevronRight, Search } from "lucide-react";
import { createClient } from "@metagptx/web-sdk";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Room } from "@/lib/data";

const client = createClient();

const CATEGORIES = ["all", "standard", "premium", "suite", "penthouse"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function RoomsPage() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await client.entities.rooms.query({
          query: {},
          limit: 50,
          sort: "price_per_night",
        });
        if (res?.data?.items) {
          setRooms(res.data.items);
        }
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchCategory = category === "all" || room.category === category;
    const matchSearch =
      !searchTerm ||
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.short_description?.toLowerCase().includes(searchTerm.toLowerCase());
    const guestsParam = searchParams.get("guests");
    const matchGuests = !guestsParam || room.max_guests >= parseInt(guestsParam);
    return matchCategory && matchSearch && matchGuests;
  });

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Accommodations
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-3 mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-white/50 max-w-xl">
            Discover our collection of thoughtfully designed rooms, each offering
            a unique blend of luxury, comfort, and breathtaking views.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                  category === cat
                    ? "bg-[#C9A96E] text-[#0A1628]"
                    : "bg-[#162038] text-white/60 border border-white/10 hover:border-[#C9A96E]/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#162038] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[#162038] rounded-xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              No rooms found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room, i) => (
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
                  className="group block bg-[#162038] border border-[#C9A96E]/10 rounded-xl overflow-hidden hover:border-[#C9A96E]/30 transition-all duration-500 h-full"
                >
                  <div className="relative h-56 overflow-hidden">
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
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-semibold group-hover:text-[#C9A96E] transition-colors">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[#C9A96E]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs">{room.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">
                      {room.short_description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        Up to {room.max_guests}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5" />
                        {room.size_sqm} m²
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <span className="text-xl font-bold text-[#C9A96E]">
                          €{room.price_per_night}
                        </span>
                        <span className="text-xs text-white/40 ml-1">
                          / night
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-[#C9A96E] group-hover:gap-2 transition-all">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}