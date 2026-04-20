import { useState, useEffect, useRef } from "react";
import {
  MapPin, Wallet, Compass, Star, ChevronRight, Sparkles, Clock,
  Utensils, Hotel, Car, Ticket, TrendingUp, Leaf, Zap, Heart,
  Mountain, Waves, Coffee, Home, Users, User, Search, ArrowRight,
  CheckCircle, AlertCircle, Loader2, ChevronDown, Navigation,
  Sun, Moon, Camera, Gift, ThumbsUp, Map, DollarSign, Info,
  RefreshCw, Globe, Phone, Mail, Instagram, Twitter, X, Menu
} from "lucide-react";

// ============================================================
// DUMMY DATA
// ============================================================
const destinations = [
  {
    id: 1, name: "Kawah Putih & Bandung City", city: "Bandung", province: "Jawa Barat",
    type: "Alam + Kota", tags: ["Alam", "Kuliner", "Wisata Kota", "Healing"],
    budgetCategory: ["hemat", "standar"],
    estimatedCost: { "1 Hari": 350000, "2D1N": 650000, "3D2N": 950000 },
    transportCost: 120000, hotelCost: 200000, foodCost: 150000, ticketCost: 80000,
    distanceLabel: "3–4 jam dari Jakarta", distance: 150,
    matchReason: "Destinasi favorit keluarga dengan pemandangan kawah dan kuliner trendi",
    rating: 4.7, reviewCount: 12400,
    badges: ["Populer", "Hemat"],
    image: "🏔️",
    hiddenGems: ["Curug Cimahi — air terjun sepi di balik hutan pinus", "Pasar Gasibu — jajanan lokal murah meriah pagi hari", "Kampung Adat Cikondang — desa tradisional tersembunyi"],
    itinerary: {
      "1 Hari": [
        { time: "07:00", activity: "Berangkat dari Jakarta via tol Cipularang", location: "Jakarta", cost: 120000, icon: "🚗" },
        { time: "10:30", activity: "Sarapan di warung soto Bandung", location: "Bandung Kota", cost: 25000, icon: "🍜" },
        { time: "11:30", activity: "Eksplorasi Kawah Putih Ciwidey", location: "Kawah Putih", cost: 30000, icon: "🌋" },
        { time: "14:00", activity: "Makan siang dengan view kebun teh", location: "Rancabali", cost: 40000, icon: "☕" },
        { time: "15:30", activity: "Factory Outlet & belanja oleh-oleh", location: "Jl. Riau / Dago", cost: 200000, icon: "🛍️" },
        { time: "18:00", activity: "Kuliner malam Jl. Braga", location: "Braga", cost: 60000, icon: "🌆" },
        { time: "21:00", activity: "Kembali ke Jakarta", location: "Bandung → Jakarta", cost: 120000, icon: "🚗" },
      ],
      "2D1N": [
        { time: "07:00", activity: "Berangkat dari Jakarta", location: "Jakarta", cost: 120000, icon: "🚗" },
        { time: "10:30", activity: "Check-in penginapan di Lembang", location: "Lembang", cost: 200000, icon: "🏨" },
        { time: "12:00", activity: "Makan siang kuliner Sunda", location: "Bandung", cost: 40000, icon: "🍚" },
        { time: "14:00", activity: "Kawah Putih & Situ Patenggang", location: "Ciwidey", cost: 50000, icon: "🌊" },
        { time: "19:00", activity: "Dinner BBQ Kampung Daun", location: "Lembang", cost: 80000, icon: "🔥" },
        { time: "08:00", activity: "Sarapan & Farm to Table breakfast", location: "Lembang", cost: 35000, icon: "🌿" },
        { time: "10:00", activity: "Tangkuban Perahu", location: "Tangkuban Perahu", cost: 30000, icon: "🌋" },
        { time: "13:00", activity: "Belanja Factory Outlet", location: "Dago", cost: 200000, icon: "🛍️" },
        { time: "16:00", activity: "Pulang ke Jakarta", location: "Bandung → Jakarta", cost: 120000, icon: "🚗" },
      ]
    }
  },
  {
    id: 2, name: "Yogyakarta Cultural Trip", city: "Yogyakarta", province: "DIY",
    type: "Budaya + Alam", tags: ["Kuliner", "Wisata Kota", "Keluarga", "Hidden Gem"],
    budgetCategory: ["standar", "premium"],
    estimatedCost: { "1 Hari": 500000, "2D1N": 900000, "3D2N": 1500000 },
    transportCost: 250000, hotelCost: 350000, foodCost: 200000, ticketCost: 100000,
    distanceLabel: "8 jam darat / 1 jam pesawat", distance: 560,
    matchReason: "Kota budaya dengan street food legendaris, candi megah, dan pantai selatan",
    rating: 4.8, reviewCount: 34200,
    badges: ["Populer", "Keluarga"],
    image: "🏛️",
    hiddenGems: ["Bukit Bintang — spot malam terbaik lihat Jogja dari atas", "Warung Bu Ageng — masakan rumahan asli Jawa", "Pantai Timang — pantai berbatu dramatis dengan gondola"],
    itinerary: {
      "2D1N": [
        { time: "06:00", activity: "Naik kereta Argo Lawu dari Jakarta", location: "Stasiun Gambir", cost: 250000, icon: "🚂" },
        { time: "13:30", activity: "Tiba Jogja, check-in hotel Malioboro", location: "Malioboro", cost: 350000, icon: "🏨" },
        { time: "15:00", activity: "Kraton Yogyakarta & Museum", location: "Kraton", cost: 15000, icon: "👑" },
        { time: "18:00", activity: "Sunset di Benteng Vredeburg", location: "Vredeburg", cost: 3000, icon: "🌅" },
        { time: "19:30", activity: "Kuliner malam Gudeg Wijilan", location: "Wijilan", cost: 35000, icon: "🍲" },
        { time: "05:00", activity: "Sunrise di Candi Borobudur", location: "Magelang", cost: 50000, icon: "☀️" },
        { time: "09:00", activity: "Prambanan + Museum", location: "Prambanan", cost: 50000, icon: "🕌" },
        { time: "13:00", activity: "Makan siang Warung Sate Klatak", location: "Bantul", cost: 40000, icon: "🥩" },
        { time: "16:00", activity: "Belanja batik Pasar Beringharjo", location: "Malioboro", cost: 200000, icon: "👘" },
        { time: "20:00", activity: "Naik KA balik ke Jakarta", location: "Stasiun Tugu", cost: 250000, icon: "🚂" },
      ]
    }
  },
  {
    id: 3, name: "Bali Island Escape", city: "Bali", province: "Bali",
    type: "Pantai + Spa", tags: ["Pantai", "Healing", "Solo Trip", "Hidden Gem"],
    budgetCategory: ["standar", "premium"],
    estimatedCost: { "2D1N": 2000000, "3D2N": 3500000, "5D4N": 5500000 },
    transportCost: 800000, hotelCost: 1200000, foodCost: 600000, ticketCost: 300000,
    distanceLabel: "2.5 jam pesawat", distance: 1175,
    matchReason: "Surga tropis dunia dengan pantai memukau, spa murah, dan sunset terbaik",
    rating: 4.9, reviewCount: 89600,
    badges: ["Populer", "Premium"],
    image: "🌴",
    hiddenGems: ["Pantai Nyang Nyang — pantai tersembunyi tanpa turis massal", "Warung Babi Guling Ibu Oka II — cabang tersembunyi lebih sepi", "Pura Lempuyang — spot foto 'Gates of Heaven' yang genuine"],
    itinerary: {
      "3D2N": [
        { time: "06:00", activity: "Flight dari Jakarta ke Denpasar", location: "CGK → DPS", cost: 800000, icon: "✈️" },
        { time: "09:00", activity: "Check-in villa/resort di Seminyak", location: "Seminyak", cost: 1200000, icon: "🏨" },
        { time: "11:00", activity: "Pantai Seminyak & Coffee", location: "Seminyak Beach", cost: 50000, icon: "☕" },
        { time: "14:00", activity: "Spa tradisional Bali", location: "Spa Ubud", cost: 150000, icon: "💆" },
        { time: "18:00", activity: "Sunset di Pura Tanah Lot", location: "Tanah Lot", cost: 60000, icon: "🌅" },
        { time: "20:00", activity: "Seafood dinner di Jimbaran Bay", location: "Jimbaran", cost: 200000, icon: "🦞" },
        { time: "08:00", activity: "Tour Ubud — Rice Terrace & Monkey Forest", location: "Ubud", cost: 200000, icon: "🌾" },
        { time: "13:00", activity: "Kelas memasak masakan Bali", location: "Ubud", cost: 250000, icon: "👨‍🍳" },
        { time: "17:00", activity: "Kintamani — danau & gunung Batur", location: "Kintamani", cost: 30000, icon: "🌋" },
        { time: "08:00", activity: "Snorkeling di Blue Lagoon", location: "Padangbai", cost: 150000, icon: "🤿" },
        { time: "14:00", activity: "Belanja oleh-oleh Sukawati", location: "Sukawati", cost: 300000, icon: "🛍️" },
        { time: "19:00", activity: "Flight pulang", location: "DPS → CGK", cost: 800000, icon: "✈️" },
      ]
    }
  },
  {
    id: 4, name: "Malang Apple Town", city: "Malang", province: "Jawa Timur",
    type: "Kota + Alam", tags: ["Kuliner", "Alam", "Keluarga", "Wisata Kota"],
    budgetCategory: ["hemat", "standar"],
    estimatedCost: { "1 Hari": 300000, "2D1N": 550000, "3D2N": 800000 },
    transportCost: 150000, hotelCost: 180000, foodCost: 120000, ticketCost: 70000,
    distanceLabel: "10 jam darat / 1h15m pesawat", distance: 800,
    matchReason: "Kota apel yang sejuk, pantai cantik Malang Selatan, dan kuliner unik",
    rating: 4.5, reviewCount: 15600,
    badges: ["Hemat", "Keluarga"],
    image: "🍎",
    hiddenGems: ["Pantai Tiga Warna — pantai sertifikat snorkeling unik", "Pasar Apung Selecta — sarapan seru", "Coban Rais — air terjun swing kekinian"],
    itinerary: {
      "2D1N": [
        { time: "05:00", activity: "Bus dari Surabaya / flight dari Jakarta", location: "Jakarta/Surabaya", cost: 150000, icon: "🚌" },
        { time: "10:00", activity: "Check-in homestay kota", location: "Malang Kota", cost: 180000, icon: "🏠" },
        { time: "12:00", activity: "Bakso malang & es krim apel", location: "Alun-alun", cost: 30000, icon: "🍜" },
        { time: "14:00", activity: "Jatim Park 1 / Batu Secret Zoo", location: "Batu", cost: 120000, icon: "🦁" },
        { time: "18:00", activity: "Dinner di alun-alun Batu", location: "Batu", cost: 40000, icon: "🌃" },
        { time: "07:00", activity: "Petik apel langsung di kebun", location: "Petung", cost: 25000, icon: "🍎" },
        { time: "10:00", activity: "Coban Rondo waterfall", location: "Pujon", cost: 20000, icon: "💦" },
        { time: "13:00", activity: "Makan siang ikan bakar Pantai Balekambang", location: "Balekambang", cost: 50000, icon: "🐟" },
        { time: "17:00", activity: "Berangkat pulang", location: "Malang", cost: 150000, icon: "🚌" },
      ]
    }
  },
  {
    id: 5, name: "Bogor Weekend Retreat", city: "Bogor", province: "Jawa Barat",
    type: "Alam + Refresh", tags: ["Alam", "Healing", "Keluarga", "Hemat"],
    budgetCategory: ["hemat"],
    estimatedCost: { "1 Hari": 200000, "2D1N": 400000 },
    transportCost: 60000, hotelCost: 150000, foodCost: 100000, ticketCost: 40000,
    distanceLabel: "1–1.5 jam dari Jakarta", distance: 60,
    matchReason: "Kota hujan terdekat dari Jakarta dengan kebun raya legendaris",
    rating: 4.3, reviewCount: 8900,
    badges: ["Dekat", "Hemat"],
    image: "🌿",
    hiddenGems: ["Kampung Wisata Cinangneng — agrowisata tersembunyi", "Curug Cilember — 7 curug mini yang sepi", "Warung Nasi Uduk Bejo — sarapan legendaris murah"],
    itinerary: {
      "1 Hari": [
        { time: "07:00", activity: "Berangkat dari Jakarta (KRL/Bus)", location: "Jakarta", cost: 60000, icon: "🚃" },
        { time: "09:00", activity: "Kebun Raya Bogor", location: "Kebun Raya", cost: 30000, icon: "🌳" },
        { time: "12:00", activity: "Makan siang Soto Kuning khas Bogor", location: "Jl. Suryakencana", cost: 25000, icon: "🍜" },
        { time: "13:30", activity: "Istana Bogor (lihat dari luar)", location: "Istana Bogor", cost: 0, icon: "🏰" },
        { time: "15:00", activity: "Taman Safari Indonesia", location: "Cisarua", cost: 150000, icon: "🦒" },
        { time: "18:30", activity: "Mie ayam + Es krim Bogor", location: "Kota Bogor", cost: 30000, icon: "🍦" },
        { time: "20:00", activity: "Kembali ke Jakarta", location: "Bogor → Jakarta", cost: 60000, icon: "🚃" },
      ]
    }
  },
  {
    id: 6, name: "Dieng Plateau Magic", city: "Dieng", province: "Jawa Tengah",
    type: "Alam Pegunungan", tags: ["Alam", "Hidden Gem", "Healing", "Gunung"],
    budgetCategory: ["hemat", "standar"],
    estimatedCost: { "2D1N": 700000, "3D2N": 1100000 },
    transportCost: 200000, hotelCost: 200000, foodCost: 150000, ticketCost: 100000,
    distanceLabel: "6 jam dari Jakarta", distance: 350,
    matchReason: "Surga tersembunyi di atas awan — dataran tinggi misterius dan megah",
    rating: 4.6, reviewCount: 7200,
    badges: ["Hidden Gem", "Alam"],
    image: "🌄",
    hiddenGems: ["Telaga Cebong — danau mini di puncak desa Sembungan", "Bukit Scooter — offroad mewah ala Eropa", "Warung kopi jin — kafe misterius dengan view awan"],
    itinerary: {
      "2D1N": [
        { time: "22:00", activity: "Berangkat malam dari Jakarta", location: "Jakarta", cost: 200000, icon: "🚌" },
        { time: "06:00", activity: "Tiba Dieng — sunrise di Bukit Sikunir", location: "Sikunir", cost: 15000, icon: "☀️" },
        { time: "09:00", activity: "Sarapan carica & mie ongklok khas Dieng", location: "Dieng", cost: 25000, icon: "🍜" },
        { time: "10:00", activity: "Candi Arjuna & Telaga Warna", location: "Dieng Plateau", cost: 60000, icon: "🏛️" },
        { time: "13:00", activity: "Kawah Sikidang", location: "Sikidang", cost: 20000, icon: "🌋" },
        { time: "15:00", activity: "Check-in homestay",  location: "Dieng Village", cost: 200000, icon: "🏡" },
        { time: "18:00", activity: "Dinner & bonfire di homestay", location: "Dieng", cost: 50000, icon: "🔥" },
        { time: "05:00", activity: "Sunrise kedua di Bukit Teletubbies", location: "Prau", cost: 10000, icon: "🌅" },
        { time: "10:00", activity: "Belanja oleh-oleh keripik carica", location: "Pasar Dieng", cost: 100000, icon: "🛍️" },
        { time: "13:00", activity: "Kembali ke Jakarta", location: "Dieng → Jakarta", cost: 200000, icon: "🚌" },
      ]
    }
  },
  {
    id: 7, name: "Anyer Beach Weekend", city: "Anyer", province: "Banten",
    type: "Pantai", tags: ["Pantai", "Keluarga", "Healing", "Solo Trip"],
    budgetCategory: ["hemat", "standar"],
    estimatedCost: { "1 Hari": 250000, "2D1N": 500000 },
    transportCost: 80000, hotelCost: 250000, foodCost: 100000, ticketCost: 30000,
    distanceLabel: "2.5 jam dari Jakarta", distance: 130,
    matchReason: "Pantai paling dekat dari Jakarta dengan sunset Selat Sunda yang indah",
    rating: 4.2, reviewCount: 11300,
    badges: ["Dekat", "Pantai"],
    image: "🌊",
    hiddenGems: ["Pantai Karang Bolong — pantai batu karang unik yang sepi", "Tanjung Lesung — resort mewah alternatif yang lebih sepi", "Mercusuar Anyer — naik ke atas lihat 360 derajat"],
    itinerary: {
      "2D1N": [
        { time: "07:00", activity: "Berangkat dari Jakarta via tol", location: "Jakarta", cost: 80000, icon: "🚗" },
        { time: "09:30", activity: "Tiba & check-in penginapan pinggir pantai", location: "Anyer", cost: 250000, icon: "🏖️" },
        { time: "11:00", activity: "Main di pantai & snorkeling", location: "Anyer Beach", cost: 30000, icon: "🤿" },
        { time: "13:00", activity: "Makan ikan bakar segar di warung", location: "Anyer", cost: 50000, icon: "🐟" },
        { time: "16:00", activity: "Sunset cruise mini atau naik perahu", location: "Anyer Laut", cost: 50000, icon: "⛵" },
        { time: "19:00", activity: "BBQ di pinggir pantai", location: "Penginapan", cost: 75000, icon: "🔥" },
        { time: "07:00", activity: "Sarapan + surfing/bodyboard", location: "Anyer", cost: 30000, icon: "🏄" },
        { time: "11:00", activity: "Mercusuar Anyer & Carita", location: "Carita", cost: 20000, icon: "🗼" },
        { time: "14:00", activity: "Pulang ke Jakarta", location: "Anyer → Jakarta", cost: 80000, icon: "🚗" },
      ]
    }
  },
  {
    id: 8, name: "Pangandaran Paradise", city: "Pangandaran", province: "Jawa Barat",
    type: "Pantai + Alam", tags: ["Pantai", "Alam", "Keluarga", "Solo Trip"],
    budgetCategory: ["standar"],
    estimatedCost: { "2D1N": 800000, "3D2N": 1300000 },
    transportCost: 250000, hotelCost: 300000, foodCost: 150000, ticketCost: 80000,
    distanceLabel: "5 jam dari Bandung", distance: 290,
    matchReason: "Pantai Jawa Barat terbaik dengan cagar alam, snorkeling, dan seafood segar",
    rating: 4.4, reviewCount: 9800,
    badges: ["Populer", "Pantai"],
    image: "🏝️",
    hiddenGems: ["Pantai Batu Karas — surfing spot tersembunyi", "Green Canyon / Cukang Taneuh — sungai hijau dramatis", "Warung Bu Entin — nasi liwet + ikan asin terenak"],
    itinerary: {
      "2D1N": [
        { time: "06:00", activity: "Berangkat dari Bandung / Jakarta", location: "Bandung/Jakarta", cost: 250000, icon: "🚌" },
        { time: "11:00", activity: "Check-in penginapan", location: "Pangandaran", cost: 300000, icon: "🏨" },
        { time: "12:00", activity: "Seafood lunch segar",  location: "Pangandaran", cost: 60000, icon: "🦐" },
        { time: "14:00", activity: "Cagar Alam Pangandaran", location: "Cagar Alam", cost: 30000, icon: "🌿" },
        { time: "17:00", activity: "Sunset di Pantai Barat", location: "Pantai Barat", cost: 0, icon: "🌅" },
        { time: "20:00", activity: "Night market seafood", location: "Pangandaran", cost: 60000, icon: "🌙" },
        { time: "07:00", activity: "Snorkeling di Pantai Timur", location: "Pantai Timur", cost: 50000, icon: "🤿" },
        { time: "10:00", activity: "Green Canyon boat trip", location: "Cijulang", cost: 150000, icon: "🚣" },
        { time: "14:00", activity: "Pulang", location: "Pangandaran", cost: 250000, icon: "🚌" },
      ]
    }
  }
];

const upgradeTips = [
  { from: 500000, to: 800000, message: "Tambah Rp300rb bisa dapat hotel bintang 3 lebih dekat ke pantai dengan sarapan gratis." },
  { from: 800000, to: 1200000, message: "Tambah Rp400rb bisa dapat vila dengan kolam renang pribadi dan shuttle gratis." },
  { from: 1200000, to: 1800000, message: "Tambah Rp600rb bisa dapat penginapan resort + spa gratis + breakfast buffet." },
  { from: 200000, to: 350000, message: "Tambah Rp150rb bisa upgrade transport ke travel AC dengan jadwal lebih fleksibel." },
];

const savingTips = [
  { icon: "📅", tip: "Pergi di weekday, harga hotel bisa lebih murah 30–50%" },
  { icon: "🎫", tip: "Beli tiket tempat wisata online lewat Traveloka / Klook lebih hemat" },
  { icon: "🚌", tip: "Gunakan transportasi umum / KRL untuk kota-kota terdekat" },
  { icon: "🕐", tip: "Book hotel minimal H-7 untuk dapat early bird rate terbaik" },
  { icon: "🍽️", tip: "Makan di warung lokal, kualitas sama tapi harga 40% lebih murah" },
  { icon: "⛽", tip: "Cari promo voucher bensin / toll cashback dari dompet digital" },
];

// ============================================================
// HELPERS
// ============================================================
const fmt = (n) => `Rp${Number(n).toLocaleString("id-ID")}`;
const preferenceIcons = {
  Pantai: Waves, Gunung: Mountain, Kuliner: Utensils, Staycation: Home,
  Alam: Leaf, "Hidden Gem": Sparkles, Keluarga: Users, "Solo Trip": User,
  Healing: Heart, "Wisata Kota": Globe
};

function filterDestinations(budget, preferences, duration) {
  let filtered = [...destinations];
  const budgetNum = parseInt(budget) || 0;

  // Budget filter
  if (budgetNum < 500000) filtered = filtered.filter(d => d.budgetCategory.includes("hemat"));
  else if (budgetNum < 1500000) filtered = filtered.filter(d => d.budgetCategory.includes("hemat") || d.budgetCategory.includes("standar"));
  else filtered = filtered.filter(d => d.budgetCategory.includes("standar") || d.budgetCategory.includes("premium"));

  // Preferences filter
  if (preferences.length > 0) {
    filtered = filtered.filter(d => preferences.some(p => d.tags.includes(p)));
  }

  // Sort by matching tags count
  filtered.sort((a, b) => {
    const aMatch = preferences.filter(p => a.tags.includes(p)).length;
    const bMatch = preferences.filter(p => b.tags.includes(p)).length;
    return bMatch - aMatch;
  });

  const durationKey = duration === "1 Hari" ? "1 Hari" : duration === "3D2N" ? "3D2N" : "2D1N";

  const main = filtered[0] || destinations[0];
  const cheaper = destinations.filter(d => {
    const cost = d.estimatedCost[durationKey] || d.estimatedCost["2D1N"] || 0;
    const mainCost = (main.estimatedCost[durationKey] || main.estimatedCost["2D1N"] || 0);
    return d.id !== main.id && cost < mainCost;
  }).slice(0, 3);
  const pricier = destinations.filter(d => {
    const cost = d.estimatedCost[durationKey] || d.estimatedCost["2D1N"] || 0;
    const mainCost = (main.estimatedCost[durationKey] || main.estimatedCost["2D1N"] || 0);
    return d.id !== main.id && cost > mainCost;
  }).slice(0, 3);

  return { main, alternatives: filtered.slice(1, 4), cheaper, pricier, durationKey };
}

// ============================================================
// SUB COMPONENTS
// ============================================================
function Badge({ label }) {
  const colors = {
    "Dekat": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Hemat": "bg-amber-100 text-amber-700 border-amber-200",
    "Populer": "bg-sky-100 text-sky-700 border-sky-200",
    "Hidden Gem": "bg-purple-100 text-purple-700 border-purple-200",
    "Premium": "bg-rose-100 text-rose-700 border-rose-200",
    "Pantai": "bg-cyan-100 text-cyan-700 border-cyan-200",
    "Alam": "bg-green-100 text-green-700 border-green-200",
    "Keluarga": "bg-orange-100 text-orange-700 border-orange-200",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colors[label] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {label}
    </span>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"} />
      ))}
      <span className="text-xs font-semibold text-gray-600 ml-1">{rating}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded-xl w-2/3" />
      <div className="h-4 bg-gray-200 rounded-xl w-1/2" />
      <div className="h-20 bg-gray-100 rounded-2xl" />
      <div className="grid grid-cols-2 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="h-12 bg-gray-100 rounded-xl" />)}
      </div>
      <div className="h-10 bg-gray-200 rounded-2xl" />
    </div>
  );
}

function DestCard({ dest, durationKey, accent = false }) {
  const cost = dest.estimatedCost[durationKey] || dest.estimatedCost["2D1N"] || dest.estimatedCost["1 Hari"];
  return (
    <div className={`rounded-3xl p-5 border transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${accent ? "bg-gradient-to-br from-sky-500 to-cyan-400 text-white border-sky-400" : "bg-white border-gray-100 shadow-sm"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{dest.image}</div>
        <div className="flex gap-1 flex-wrap justify-end">
          {dest.badges.map(b => <Badge key={b} label={b} />)}
        </div>
      </div>
      <h3 className={`font-bold text-base mb-0.5 ${accent ? "text-white" : "text-gray-900"}`}>{dest.name}</h3>
      <p className={`text-xs mb-3 ${accent ? "text-sky-100" : "text-gray-500"}`}>{dest.city}, {dest.province} · {dest.distanceLabel}</p>
      <div className={`text-lg font-black mb-1 ${accent ? "text-white" : "text-sky-600"}`}>{fmt(cost)}</div>
      <p className={`text-xs leading-relaxed mb-4 ${accent ? "text-sky-50" : "text-gray-500"}`}>{dest.matchReason}</p>
      <Stars rating={dest.rating} />
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function LiburanPintarApp() {
  const [budget, setBudget] = useState(1500000);
  const [budgetInput, setBudgetInput] = useState("1500000");
  const [budgetCategory, setBudgetCategory] = useState("standar");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [duration, setDuration] = useState("2D1N");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("terbaik");
  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const resultRef = useRef(null);

  const budgetPresets = { hemat: 500000, standar: 1500000, premium: 3500000 };

  const togglePref = (p) => {
    setPreferences(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleBudgetCategory = (cat) => {
    setBudgetCategory(cat);
    setBudget(budgetPresets[cat]);
    setBudgetInput(String(budgetPresets[cat]));
  };

  const handleSearch = () => {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const r = filterDestinations(budget, preferences, duration);
      setResults(r);
      setLoading(false);
      setActiveTab("terbaik");
      setItineraryOpen(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 1800);
  };

  const prefs = ["Pantai","Gunung","Kuliner","Staycation","Alam","Hidden Gem","Keluarga","Solo Trip","Healing","Wisata Kota"];
  const durations = ["1 Hari","2D1N","3D2N","Custom"];

  const itineraryDays = results ? (() => {
    const raw = results.main.itinerary[results.durationKey] || results.main.itinerary["2D1N"] || [];
    const days = [];
    let day = [];
    raw.forEach((item, i) => {
      if (i > 0 && day.length > 0) {
        const prevHour = parseInt(raw[i - 1].time.split(":")[0]);
        const currHour = parseInt(item.time.split(":")[0]);
        // New day if time resets to an earlier hour (e.g. 21:00 → 05:00)
        if (currHour < prevHour - 2 && day.length >= 2) {
          days.push(day);
          day = [];
        }
      }
      day.push(item);
    });
    if (day.length > 0) days.push(day);
    return days;
  })() : [];

  const currentTabDests = results
    ? activeTab === "terbaik" ? results.alternatives
      : activeTab === "murah" ? results.cheaper
      : results.pricier
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .shimmer { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .slide-in { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .gradient-text { background: linear-gradient(135deg, #0ea5e9, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-card { backdrop-filter: blur(12px); }
      `}</style>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-400 rounded-xl flex items-center justify-center">
              <Compass size={16} className="text-white" />
            </div>
            <span className="font-display font-black text-lg text-gray-900">Liburan<span className="gradient-text">Pintar</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
            {["Beranda","Cara Kerja","Rekomendasi","Tips Hemat"].map(m => (
              <a key={m} href="#" className="hover:text-sky-600 transition-colors">{m}</a>
            ))}
          </div>
          <button className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-sm font-bold px-4 py-2 rounded-2xl hover:opacity-90 transition shadow-md shadow-sky-200">
            Mulai Rencanakan <ArrowRight size={14} />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
            {["Beranda","Cara Kerja","Rekomendasi","Tips Hemat"].map(m => (
              <a key={m} href="#" className="block py-2 text-sm font-semibold text-gray-600 hover:text-sky-600">{m}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-200 rounded-full opacity-10 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-sky-200">
                <Sparkles size={12} /> AI-Powered Travel Planner Indonesia
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
                Liburan sesuai<br /><span className="gradient-text">budget</span>, tanpa ribet.
              </h1>
              <p className="text-gray-500 text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                AI bantu cari destinasi terbaik berdasarkan budget, lokasi, dan preferensimu. Dapat itinerary dan estimasi biaya langsung.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={() => document.getElementById("planner").scrollIntoView({behavior:"smooth"})} className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-sky-200 hover:opacity-90 transition">
                  <Search size={16} /> Mulai Rencanakan
                </button>
                <button onClick={() => { setResults(filterDestinations(1500000, ["Pantai"], "2D1N")); setTimeout(() => resultRef.current?.scrollIntoView({behavior:"smooth"}), 100); }} className="flex items-center justify-center gap-2 bg-white text-gray-700 font-bold px-6 py-3.5 rounded-2xl border border-gray-200 hover:border-sky-300 hover:text-sky-600 transition shadow-sm">
                  <Camera size={16} /> Lihat Contoh
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-400">
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> Gratis selamanya</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> Tanpa registrasi</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> 50+ destinasi</div>
              </div>
            </div>
            {/* Decorative dashboard */}
            <div className="flex-1 hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 max-w-sm ml-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm text-gray-700">Rekomendasi AI</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">Baru!</span>
                  </div>
                  {[{e:"🏖️",n:"Anyer Beach",p:"Rp250.000",b:"Dekat"},{e:"🏔️",n:"Kawah Putih",p:"Rp650.000",b:"Populer"},{e:"🌴",n:"Bali Escape",p:"Rp3.500.000",b:"Premium"}].map((d,i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-sky-50 transition mb-1 cursor-pointer">
                      <div className="text-2xl w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">{d.e}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-gray-800">{d.n}</div>
                        <div className="text-sky-600 font-semibold text-xs">{d.p}</div>
                      </div>
                      <Badge label={d.b} />
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                    {[{v:"2.4K",l:"Destinasi"},{v:"98%",l:"Akurasi"},{v:"<1s",l:"Respons"}].map((s,i) => (
                      <div key={i}><div className="font-bold text-base text-gray-900">{s.v}</div><div className="text-xs text-gray-400">{s.l}</div></div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg rotate-3">✨ AI Match 97%</div>
                <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg -rotate-2">💰 Hemat 40%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="py-16 px-4 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-black text-gray-900 mb-2">Cara Kerja</h2>
            <p className="text-gray-400 text-sm">3 langkah mudah dapat itinerary impianmu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", step: "01", title: "Input Preferensimu", desc: "Masukkan budget, lokasi asal, preferensi wisata, dan durasi perjalananmu." },
              { icon: "🤖", step: "02", title: "AI Proses Instans", desc: "Algoritma kami cocokkan 50+ destinasi dengan parameter dan budgetmu secara real-time." },
              { icon: "🗺️", step: "03", title: "Dapat Itinerary Lengkap", desc: "Terima rekomendasi destinasi, estimasi biaya rinci, itinerary, dan tips hemat." },
            ].map((s, i) => (
              <div key={i} className="relative bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-3xl p-6 hover:shadow-md transition">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="text-xs font-black text-sky-300 mb-1 tracking-widest">{s.step}</div>
                <h3 className="font-bold text-base text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < 2 && <ChevronRight size={20} className="absolute top-1/2 -right-3 text-sky-200 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANNER FORM */}
      <section id="planner" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-black text-gray-900 mb-2">Rencanakan Liburanmu</h2>
            <p className="text-gray-400 text-sm">Isi detail liburan impianmu di bawah ini</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-8">

            {/* Budget */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3"><Wallet size={16} className="text-sky-500" /> Budget Perjalanan</label>
              <div className="flex gap-2 mb-4">
                {[["hemat","🪙 Hemat"],["standar","✈️ Standar"],["premium","💎 Premium"]].map(([cat, label]) => (
                  <button key={cat} onClick={() => handleBudgetCategory(cat)}
                    className={`flex-1 py-2 px-3 rounded-2xl text-xs font-bold border-2 transition ${budgetCategory === cat ? "border-sky-500 bg-sky-50 text-sky-600" : "border-gray-100 text-gray-500 hover:border-sky-200"}`}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="relative mb-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                <input type="number" value={budgetInput} onChange={e => { setBudgetInput(e.target.value); setBudget(parseInt(e.target.value) || 0); }}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-sky-400 focus:outline-none text-sm font-semibold"
                  placeholder="0" />
              </div>
              <input type="range" min="100000" max="10000000" step="100000" value={budget}
                onChange={e => { setBudget(parseInt(e.target.value)); setBudgetInput(String(e.target.value)); }}
                className="w-full accent-sky-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Rp100rb</span><span className="font-bold text-sky-600">{fmt(budget)}</span><span>Rp10jt</span>
              </div>
            </div>

            {/* Lokasi */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3"><MapPin size={16} className="text-sky-500" /> Kota Asal</label>
              <div className="flex gap-2">
                <input type="text" value={location} onChange={e => setLocation(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-sky-400 focus:outline-none text-sm"
                  placeholder="Contoh: Jakarta, Surabaya, Bandung..." />
                <button onClick={() => setLocation("Lokasi Saya")} className="flex items-center gap-1.5 px-4 py-3 bg-sky-50 text-sky-600 font-semibold text-xs rounded-2xl border-2 border-sky-100 hover:bg-sky-100 transition whitespace-nowrap">
                  <Navigation size={13} /> Deteksi
                </button>
              </div>
            </div>

            {/* Preferensi */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3"><Sparkles size={16} className="text-sky-500" /> Preferensi Wisata</label>
              <div className="flex flex-wrap gap-2">
                {prefs.map(p => {
                  const Icon = preferenceIcons[p] || Globe;
                  const active = preferences.includes(p);
                  return (
                    <button key={p} onClick={() => togglePref(p)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold border-2 transition ${active ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-100" : "bg-white text-gray-600 border-gray-100 hover:border-sky-200"}`}>
                      <Icon size={11} /> {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Durasi */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3"><Clock size={16} className="text-sky-500" /> Durasi Perjalanan</label>
              <div className="grid grid-cols-4 gap-2">
                {durations.map(d => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`py-3 rounded-2xl text-xs font-bold border-2 transition ${duration === d ? "bg-sky-500 text-white border-sky-500" : "border-gray-100 text-gray-500 hover:border-sky-200"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleSearch} disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-black text-sm rounded-2xl shadow-lg shadow-sky-200 hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Mencari rekomendasi terbaik...</> : <><Search size={16} /> Cari Rekomendasi</>}
            </button>
          </div>
        </div>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <section className="py-8 px-4 max-w-3xl mx-auto space-y-4">
          <SkeletonCard />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-40 bg-white rounded-3xl animate-pulse shimmer" />)}
          </div>
        </section>
      )}

      {/* EMPTY STATE (before search) */}
      {!loading && !results && (
        <section className="py-8 px-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-dashed border-sky-100 p-12 text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="font-bold text-gray-700 mb-2">Belum ada rekomendasi</h3>
            <p className="text-gray-400 text-sm">Isi form di atas dan klik "Cari Rekomendasi" untuk melihat destinasi terbaik untukmu</p>
          </div>
        </section>
      )}

      {/* RESULTS */}
      {!loading && results && (
        <div ref={resultRef} className="slide-in">
          {/* MAIN RECOMMENDATION */}
          <section className="py-8 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-black text-gray-900">Rekomendasi Untukmu ✨</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Berdasarkan budget dan preferensi yang kamu pilih</p>
                </div>
                <button onClick={() => setResults(null)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-xl">
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              {/* Main dest card */}
              <div className="bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-400 rounded-3xl p-6 text-white shadow-xl shadow-sky-200 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-8xl leading-none p-4 select-none">{results.main.image}</div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex gap-1.5 mb-2 flex-wrap">
                        {results.main.badges.map(b => (
                          <span key={b} className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur">{b}</span>
                        ))}
                        <span className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">⭐ Pilihan Terbaik</span>
                      </div>
                      <h3 className="font-display text-xl font-black text-white">{results.main.name}</h3>
                      <p className="text-sky-100 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={11} />{results.main.city}, {results.main.province} · {results.main.distanceLabel}
                      </p>
                    </div>
                    <div className="text-4xl">{results.main.image}</div>
                  </div>

                  {/* Cost breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {[
                      { icon: Car, label: "Transport", val: results.main.transportCost },
                      { icon: Hotel, label: "Hotel", val: results.main.hotelCost },
                      { icon: Utensils, label: "Makan", val: results.main.foodCost },
                      { icon: Ticket, label: "Tiket", val: results.main.ticketCost },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
                        <Icon size={14} className="mx-auto mb-1 text-sky-100" />
                        <div className="text-xs text-sky-100">{label}</div>
                        <div className="text-xs font-bold text-white">{fmt(val)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sky-100 text-xs mb-0.5">Estimasi Total ({results.durationKey})</div>
                      <div className="text-3xl font-black">
                        {fmt(results.main.estimatedCost[results.durationKey] || results.main.estimatedCost["2D1N"])}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={11} className={i <= Math.round(results.main.rating) ? "fill-amber-300 text-amber-300" : "fill-white/20 text-white/20"} />)}
                        <span className="text-xs text-sky-100 ml-1">{results.main.rating} ({results.main.reviewCount.toLocaleString("id-ID")} ulasan)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setItineraryOpen(!itineraryOpen)} className="bg-white/20 backdrop-blur text-white text-xs font-bold px-4 py-2.5 rounded-2xl hover:bg-white/30 transition border border-white/30">
                        📋 Itinerary
                      </button>
                      <button onClick={() => { setActiveTab("terbaik"); setTimeout(() => document.getElementById("alternatives")?.scrollIntoView({behavior:"smooth"}), 100); }} className="bg-white text-sky-600 text-xs font-bold px-4 py-2.5 rounded-2xl hover:bg-sky-50 transition shadow-lg">
                        Bandingkan ↓
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/15 backdrop-blur rounded-2xl p-3">
                    <div className="flex items-start gap-2">
                      <ThumbsUp size={14} className="text-amber-300 mt-0.5 flex-shrink-0" />
                      <p className="text-sky-50 text-xs leading-relaxed">{results.main.matchReason}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ITINERARY */}
              {itineraryOpen && itineraryDays.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 mb-6 slide-in">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Map size={16} className="text-sky-500" /> Itinerary Perjalanan</h3>
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {itineraryDays.map((_, i) => (
                      <button key={i} onClick={() => setActiveDay(i)}
                        className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition ${activeDay === i ? "bg-sky-500 text-white" : "bg-gray-50 text-gray-600 border border-gray-100"}`}>
                        Hari {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 to-emerald-100" />
                    {(itineraryDays[activeDay] || []).map((item, i) => (
                      <div key={i} className="relative mb-4 last:mb-0">
                        <div className="absolute -left-4 w-3 h-3 bg-sky-400 rounded-full border-2 border-white shadow top-1" />
                        <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 hover:bg-sky-100/50 transition">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{item.icon}</span>
                              <span className="text-xs font-black text-sky-600">{item.time}</span>
                            </div>
                            {item.cost > 0 && <span className="text-xs font-semibold text-emerald-600">{fmt(item.cost)}</span>}
                          </div>
                          <div className="font-semibold text-sm text-gray-800">{item.activity}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={10} />{item.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ALTERNATIVES */}
          <section id="alternatives" className="py-8 px-4 bg-gray-50/50">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-xl font-black text-gray-900 mb-4">Alternatif Pilihan</h2>
              <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-6 shadow-sm">
                {[["terbaik","⭐ Pilihan Terbaik"],["murah","💰 Lebih Murah"],["mewah","💎 Lebih Mewah"]].map(([tab, label]) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${activeTab === tab ? "bg-sky-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
                    {label}
                  </button>
                ))}
              </div>
              {currentTabDests.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">Tidak ada alternatif untuk kategori ini</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentTabDests.map(d => <DestCard key={d.id} dest={d} durationKey={results.durationKey} />)}
                </div>
              )}
            </div>
          </section>

          {/* FITUR TAMBAHAN */}
          <section className="py-8 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-xl font-black text-gray-900 mb-6">Insight & Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Upgrade Tip */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-100">
                  <div className="w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center mb-3">
                    <TrendingUp size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">💡 Saran Upgrade</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {upgradeTips.find(t => budget >= t.from && budget <= t.to)?.message || "Tambah Rp300.000 bisa dapat hotel lebih nyaman dan lebih dekat ke pantai."}
                  </p>
                </div>

                {/* Tips Hemat */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-5 border border-emerald-100">
                  <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center mb-3">
                    <Zap size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-3">⚡ Tips Hemat</h3>
                  <ul className="space-y-1.5">
                    {savingTips.slice(0, 4).map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <span className="text-sm leading-none mt-0.5">{t.icon}</span>
                        <span className="leading-relaxed">{t.tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hidden Gems */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border border-purple-100">
                  <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center mb-3">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-3">✨ Hidden Gem Sekitar</h3>
                  <ul className="space-y-2">
                    {results.main.hiddenGems.map((g, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <span className="text-emerald-500 mt-0.5">◆</span>
                        <span className="leading-relaxed">{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TIPS HEMAT SECTION (always visible) */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-black text-gray-900 mb-2">Tips Hemat Liburan 🪙</h2>
            <p className="text-gray-400 text-sm">Kumpulan tips dari ribuan traveler Indonesia</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {savingTips.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-sky-50 to-white rounded-3xl p-4 border border-sky-100 hover:shadow-md transition text-center">
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-400 rounded-xl flex items-center justify-center">
                  <Compass size={16} className="text-white" />
                </div>
                <span className="font-display text-xl font-black">Liburan<span className="text-sky-400">Pintar</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Platform perencanaan liburan berbasis AI untuk wisatawan Indonesia. Cari destinasi terbaik sesuai budget dan preferensimu.</p>
              <button className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold text-xs px-4 py-2.5 rounded-2xl hover:opacity-90 transition">
                <ArrowRight size={12} /> Mulai Gratis
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              {[
                { title: "Produk", links: ["Perencana AI", "Destinasi", "Tips Hemat", "Komunitas"] },
                { title: "Perusahaan", links: ["Tentang Kami", "Blog", "Karir", "Kontak"] },
              ].map(col => (
                <div key={col.title}>
                  <div className="font-bold text-gray-200 mb-3">{col.title}</div>
                  <ul className="space-y-2">
                    {col.links.map(l => <li key={l}><a href="#" className="text-gray-400 hover:text-sky-400 transition">{l}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <span>© 2025 LiburanPintar. Dibuat dengan ❤️ untuk traveler Indonesia.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-sky-400 transition">Privasi</a>
              <a href="#" className="hover:text-sky-400 transition">Syarat Penggunaan</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <button onClick={() => document.getElementById("planner").scrollIntoView({behavior:"smooth"})} className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-black text-sm rounded-2xl shadow-2xl shadow-sky-300 flex items-center justify-center gap-2">
          <Search size={16} /> Rencanakan Liburanmu
        </button>
      </div>
    </div>
  );
}
