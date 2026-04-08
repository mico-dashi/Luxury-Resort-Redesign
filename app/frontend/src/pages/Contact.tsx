import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const CONTACT_INFO = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Address",
    details: ["Mountain Valley Road", "Zdrava Region, 12345"],
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    details: ["reservations@zdravaresort.com", "info@zdravaresort.com"],
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Reception Hours",
    details: ["24/7 Front Desk", "Concierge: 8AM - 10PM"],
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll respond within 24 hours.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase font-medium">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-3 mb-4">
            Contact Us
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            We'd love to hear from you. Whether you have a question about our
            rooms, services, or anything else, our team is ready to help.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-4 bg-[#162038] border border-[#C9A96E]/10 rounded-xl p-5"
              >
                <div className="w-12 h-12 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{info.title}</h3>
                  {info.details.map((d) => (
                    <p key={d} className="text-sm text-white/50">
                      {d}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#162038] border border-[#C9A96E]/10 rounded-xl p-8 space-y-5"
            >
              <h3 className="text-xl font-serif font-semibold mb-2">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white focus:border-[#C9A96E]/50 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option value="reservation">Reservation Inquiry</option>
                  <option value="spa">Spa & Wellness</option>
                  <option value="dining">Dining</option>
                  <option value="events">Events & Celebrations</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 block">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0A1628] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 focus:border-[#C9A96E]/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-[#0A1628] font-semibold rounded-lg hover:from-[#E8D5B0] hover:to-[#C9A96E] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}