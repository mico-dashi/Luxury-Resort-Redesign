import { motion } from "framer-motion";
import { Award, Heart, Leaf, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, STATS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const VALUES = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence",
    description:
      "Every detail is meticulously crafted to exceed the highest standards of luxury hospitality.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Warmth",
    description:
      "Our team delivers heartfelt service that makes every guest feel like family.",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainability",
    description:
      "We are committed to preserving the natural beauty that surrounds our resort for future generations.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy",
    description:
      "Your comfort and privacy are paramount. We ensure a discreet and secure environment.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.lobby}
            alt="Zdrava Resort lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/40 to-[#0A1628]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mt-3">
            About Zdrava Resort
          </h1>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
              Since 2010
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-3 mb-6">
              A Legacy of{" "}
              <span className="text-[#C9A96E]">Luxury & Nature</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Founded with a vision to create a sanctuary where luxury meets
                the untouched beauty of nature, Zdrava Resort has been welcoming
                discerning travelers for over 15 years.
              </p>
              <p>
                Nestled in a pristine mountain valley, our resort was designed by
                award-winning architects who drew inspiration from the surrounding
                landscape, creating spaces that seamlessly blend indoor comfort
                with outdoor grandeur.
              </p>
              <p>
                Every aspect of Zdrava — from our locally sourced gourmet cuisine
                to our signature spa treatments using indigenous botanicals —
                reflects our deep connection to this extraordinary land.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src={IMAGES.pool}
                alt="Zdrava Resort pool"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-[#0A1628] shadow-2xl hidden lg:block">
              <img
                src={IMAGES.spa}
                alt="Spa"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0F1D32]">
        <div className="max-w-6xl mx-auto px-4">
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
                <div className="text-4xl font-serif font-bold text-[#C9A96E] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Our Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-3">
            Values That Define Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#162038] border border-[#C9A96E]/10 rounded-xl p-6 text-center hover:border-[#C9A96E]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}