# Zdrava Resort - Luxury Website Redesign

## Design Guidelines

### Design References
- **Airbnb Luxe**: Clean booking interface, premium photography
- **Aman Resorts**: Minimal luxury, dark tones, elegant typography
- **Four Seasons**: High-end hospitality, conversion-focused CTAs

### Color Palette
- Primary Background: #0A1628 (Deep Navy)
- Secondary Background: #0F1D32 (Dark Blue)
- Card Background: #162038 (Midnight Blue)
- Accent Gold: #C9A96E (Soft Gold)
- Accent Gold Light: #E8D5B0 (Light Gold)
- Text Primary: #FFFFFF (White)
- Text Secondary: #94A3B8 (Slate Gray)
- Text Muted: #64748B (Muted Slate)
- Border: rgba(201, 169, 110, 0.2) (Gold Border)
- Glass: rgba(15, 29, 50, 0.8) (Glassmorphism)

### Typography
- Headings: Playfair Display (serif, elegant luxury feel)
- Body/UI: Inter (clean, modern, highly readable)
- Heading1: Playfair Display 700 (56px hero, 48px section)
- Heading2: Playfair Display 600 (36px)
- Heading3: Inter 600 (24px)
- Body: Inter 400 (16px)
- Small: Inter 400 (14px)
- Nav: Inter 500 (15px)

### Key Component Styles
- Buttons: Gold background (#C9A96E), dark text (#0A1628), rounded-lg, hover: brighten
- Cards: Dark glass (#162038), border gold/20%, rounded-xl, backdrop-blur
- Inputs: Dark bg with gold border on focus, rounded-lg
- Navbar: Glassmorphism, sticky, transparent to solid on scroll

### Images (CDN URLs)
1. hero-resort-aerial.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/5f4aa13a-1508-414f-9324-24d08e8b5c80.png
2. room-deluxe-suite.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/6f01ee27-7419-42d8-814b-d32de8fa6c09.png
3. spa-treatment.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/ea35324d-d35c-407e-b3fb-98bf465b2e85.png
4. dining-restaurant.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/fdbf2be1-2a03-471a-b66c-a7c1f2fcd0cb.png
5. room-premium.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/0d2ce40e-8132-4535-806d-a942430273d2.png
6. room-royal-suite.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/12e8dfe6-cc19-4dcc-8f12-454055156138.png
7. pool-sunset.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/11fb4ecf-79e5-4d9c-b84a-2dcf88db396b.png
8. resort-lobby.jpg: https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/b73bc11c-4692-41b0-b752-633c04e8a1d1.png

---

## Development Tasks

### Files to Create/Modify (8 files max)

1. **src/lib/data.ts** - All resort data (rooms, services, testimonials, images)
2. **src/components/Navbar.tsx** - Sticky glassmorphism navbar with scroll effect
3. **src/components/Footer.tsx** - Premium footer with contact, links, newsletter
4. **src/pages/Index.tsx** - Homepage: Hero, booking bar, featured rooms, services, testimonials, CTA
5. **src/pages/Rooms.tsx** - Rooms grid with filter/search
6. **src/pages/RoomDetails.tsx** - Room detail with gallery, amenities, booking form
7. **src/pages/About.tsx** - Resort story, luxury branding
8. **src/pages/Contact.tsx** - Contact form, map, phone/email

### Also Modify
- src/App.tsx - Add routes for all pages
- src/index.css - Custom styles, fonts, animations
- index.html - Update title and meta tags

### Database Tables
- rooms (public, create_only=false) - Room listings
- bookings (user-related, create_only=true) - Booking records

---

## Task Checklist
- [ ] Create database tables (rooms, bookings)
- [ ] Insert room mock data with images
- [ ] Create data.ts with all static content
- [ ] Create Navbar component
- [ ] Create Footer component
- [ ] Build Homepage
- [ ] Build Rooms page
- [ ] Build Room Details page
- [ ] Build About page
- [ ] Build Contact page
- [ ] Update App.tsx with routes
- [ ] Update index.css with custom styles
- [ ] Update index.html meta
- [ ] Install framer-motion
- [ ] Lint and build check
- [ ] UI check