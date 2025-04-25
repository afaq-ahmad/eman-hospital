// -----------------------------------------------------------------------------
//  EMAN HOSPITAL – Full React SPA  (React 18 · react-router-dom v6 · Tailwind)
// -----------------------------------------------------------------------------

import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import {
  Menu,
  X,
  Stethoscope,
  CalendarCheck2,
  FileText,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------
  Static Data
--------------------------------------------------------------------*/
const departments = [
  "ENT",
  "Urology",
  "Gynecology",
  "General Surgery",
  "Cardiology",
  "Neurodevelopmental",
  "Dental Care",
  "Physiotherapy",
  "General Medicine",
  "Dermatology and Aesthetics",
  "Nutrition",
  "X-Ray / Imaging",
  "Ultrasound",
  "Lab Test",
];

const doctors = [
  {
    key: "ehsan",
    name: "Prof. Dr. Ehsan Ul Haq",
    department: "ENT",
    qualification: "MBBS, FCPS – Head of ENT (MMDC)",
    expertise: [
      "Hearing Loss",
      "Tonsillitis And Sore Throat",
      "Sinus Infections",
      "Cochlear Implants And Ear Surgeries",
      "Sleep Apnea And Snoring Treatment",
      "Head & Neck Cancers", 
      "Tonsil & Adenoid Problems",
    ],
    image: "eman-hospital/images/ehsan.jpg",
  },
  {
    key: "sarfaraz",
    name: "Asst. Prof. Dr. Sarfaraz Hassan Sial",
    department: "Urology",
    qualification: "MBBS, FCPS (Urology)",
    expertise: [
      "Urinary Stones",
      "Endoscopic Procedures",
      "Prostate Enlargement",
      "UTIs & STDs",
      "Prostatic Tumors",
      "Bladder Dysfunction",
      "Urinary Incontinence in Adults Infants & Newborns",
    ],
    image: "eman-hospital/images/sarfaraz.jpg",
  },
  {
    key: "saeeda",
    name: "Dr. Saeeda Ehsan",
    department: "Gynecology",
    qualification: "MBBS, MCPS Gynecologist",
    expertise: ["Uterine Conditions", 
                "High-Risk Pregnancy Care",
                "Infertility And Recurrent Miscarriage",
                "Caesarean Section And Normal Delivery", 
                "Menstrual and Hormonal Disorders"],
    image: "/eman-hospital/images/saeeda.jpg",
  },
  {
    key: "farah",
    name: "Dr. Farah Majid Rao",
    department: "Gynecology",
    qualification: "MBBS, FCPS – Consultant Obstetrician",
    expertise: ["High-Risk Pregnancy",
                "Fibroids",
                "Laparoscopic Surgery",
                "Gynecologic Cancers"],
    image: "/eman-hospital/images/farah.jpg",
  },
  {
    key: "tariq",
    name: "Dr. Tariq Anwar",
    department: "Cardiology",
    qualification: "MBBS (PB, DIP, CARD) UHS MRCP, UK | POST GRADUATION IN ENDOCRINOLOGY  (Diabetes), UK",
    expertise: ["Expert In Heart Diseases", 
                "High Blood Pressure Management",
                "Diabetes And Hormonal Disorders",
                "Cardiovascular Risk Prevention",
                "Chest Pain And Angina Diagnosis", 
                "Heart Failure Management",
                "Preventive Cardiology"],
    image: "/eman-hospital/images/male_doctor.png",
  },
  {
    key: "umair",
    name: "Dr. Umair Tahir Chaudary",
    department: "General Surgery",
    qualification: "MBBS, FCPS – Laparoscopic Surgeon",
    expertise: ["Thyroid", "Hernia", "Gallstones"],
    image: "/eman-hospital/images/umair.jpg",
  },
  {
    key: "rimsha",
    name: "Dr. Rimsha Salman",
    department: "Neurodevelopmental",
    qualification: "BS Speech & Language Pathology | UHS (Multan Medical & Dental College)",
    expertise: ["Autism Spectrum Disorder", 
                "Hyperactivity", 
                "Stilted Or Scripted Speech",
                "Non Verbal Communication",
                "Delayed Language Development"],
    image: "/eman-hospital/images/rimsha.jpg",
  },
  {
    key: "kainat",
    name: "Dr. Kainat Asad Hiraj",
    department: "General Medicine",
    qualification: "MBBS, RMP – General Physician",
    expertise: ["Asthma", "Diabetes", "Fever & Flu"],
    image: "/eman-hospital/images/kainat.jpg",
  },
  {
    key: "ali",
    name: "Dr. Ali Kamran",
    department: "General Medicine",
    qualification: "MBBS, RMP – General Physician",
    expertise: ["Hypertension", "UTIs", "Migraines"],
    image: "/eman-hospital/images/ali.jpg",
  },
  {
    key: "alizay",
    name: "Dr. Alizay Khan",
    department: "Dental Care",
    qualification: "BDS, RDS – Gold Medalist",
    expertise: ["Scaling", "Root Canal", "Braces"],
    image: "/eman-hospital/images/alizay.jpg",
  },
  {
    key: "athar",
    name: "Dr. M. Athar Munawar",
    department: "Dental Care",
    qualification: "B.D.S (Gold Medalist) | RDS (PMDC) | Certified in Endodontics & Orthodontics (NMU & Dental Hospital Multan)",
    expertise: ["Wisdom Teeth", 
                "Bone Loss",
                "Facial Trauma",
                "TMJ Disorder",
                "Impacted Canines",
                "Periodontal Disease",
                "Cleft Lips and Cleft Palate"],
    image: "/eman-hospital/images/athar.jpg",
  },
  {
    key: "aroosa",
    name: "Dr. Aroosa Aziz",
    department: "Dental Care",
    qualification: "BDS, RDS (Ibn e Seeena Hospital)",
    expertise: ["Bone Loss",
                "Facial Trauma",
                "Impacted Canines",
                "Periodontal Disease",
                "Temporomandibular Joint Disorder",
                "Cleft Lips And Cleft Palate"],
    image: "/eman-hospital/images/aroosa.jpg",
  },
  {
    key: "asma",
    name: "Dr. Asma Aziz",
    department: "Dermatology and Aesthetics",
    qualification: "MBBS | RMP (Pak) | Professional Diplomate in Facial Aesthetics (AACME, USA) | Certified Aesthetic Physician (CPD, UK)",
    expertise: ["Acne",
                "Alopecia Areata",
                "Atopic Dermatitis",
                "Epidermolysis Bullosa",
                "Hidradenitis Suppurativa (HS)",
                "Ichthyosis",
                "Pachyonychia Congenita",
                "Pemphigus"],
    image: "/eman-hospital/images/asma.jpg",
  },
  {
    key: "areesha",
    name: "Dn. Areesha Malik",
    department: "Nutrition",
    qualification: "BSc (Hons) Food and Nutrition – MMDC",
    expertise: ["Diabetes Management",
                "PCOS",
                "Celiac Disease",
                "Hypertension",
                "Weight Gain / Weight Loss",
                "Fatty Liver",
                "GERD / IBS / Hemorrhoids"],
    image: "/eman-hospital/images/areesha.jpg",
  },
  {
    key: "shan",
    name: "Dr. Shan Ali",
    department: "Physiotherapy",
    qualification: "DPT, MS-OMPT – HOD Physiotherapy",
    expertise: ["Sports Injury", "Back Pain", "Stroke Rehab"],
    image: "/eman-hospital/images/shan.jpg",
  },
];

const services = [
  { name: "X-Ray", image: "/eman-hospital/images/x-ray.png" },
  { name: "Surgery", image: "/eman-hospital/images/surgery.png" },
  { name: "Ultrasound", image: "/eman-hospital/images/ultrasound.png" },
  { name: "Lab Test", image: "/eman-hospital/images/labtest.png" },
  { name: "Physiotherapy", image: "/eman-hospital/images/physiotherapy.png" },
  { name: "Dental Care", image: "/eman-hospital/images/dental_care.png" },
  { name: "Cardiology", image: "/eman-hospital/images/cardiology.png" },
  { name: "Pharmacy", image: "/eman-hospital/images/pharmacy.png" },
];

const reports = [
  {
    id: "EH-2025-001",
    patient: "Ayesha Khan",
    department: "Cardiology",
    date: "2025-03-10",
    file: "/sample-report.pdf",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Departments", href: "/departments" },
  { name: "Doctors", href: "/doctors" },
  { name: "Reports", href: "/reports" },
  { name: "Contact", href: "/contact#booking" }, // link directly to booking
];

/* -------------------------------------------------------------------
  Helper Components
--------------------------------------------------------------------*/
function DoctorsGrid({ list }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((d) => (
        <div
          key={d.key}
          className="flex flex-col rounded-2xl bg-gray-50 p-6 shadow-sm"
        >
          <img
            src={d.image}
            alt={d.name}
            className="mx-auto h-24 w-24 rounded-full object-cover shadow"
          />
          <h3 className="mt-4 text-center text-lg font-semibold text-primary">
            {d.name}
          </h3>
          <p className="mt-1 text-center text-xs uppercase tracking-wide text-gray-500">
            {d.department}
          </p>
          <p className="mt-1 text-center text-sm text-gray-600">
            {d.qualification}
          </p>
          <ul className="mt-3 list-disc list-inside space-y-1 overflow-y-auto text-xs text-gray-600">
            {d.expertise.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BookingForm() {
  const [f, setF] = useState({
    name: "",
    phone: "",
    dept: departments[0],
    date: "",
    time: "",
  });
  const h = (e) => setF({ ...f, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    alert(`Appointment booked for ${f.name}`);
    setF({ name: "", phone: "", dept: departments[0], date: "", time: "" });
  };
  return (
    <form
      onSubmit={submit}
      className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2"
    >
      <input
        name="name"
        required
        placeholder="Full Name"
        value={f.name}
        onChange={h}
        className="rounded border p-3 text-sm"
      />
      <input
        name="phone"
        required
        placeholder="Phone"
        value={f.phone}
        onChange={h}
        className="rounded border p-3 text-sm"
      />
      <select
        name="dept"
        value={f.dept}
        onChange={h}
        className="col-span-full rounded border p-3 text-sm md:col-span-1"
      >
        {departments.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <input
        type="date"
        name="date"
        required
        value={f.date}
        onChange={h}
        className="rounded border p-3 text-sm"
      />
      <input
        type="time"
        name="time"
        required
        value={f.time}
        onChange={h}
        className="rounded border p-3 text-sm"
      />
      <Button
        type="submit"
        size="sm"
        className="col-span-full flex items-center justify-center gap-2"
      >
        <CalendarCheck2 size={18} /> Submit
      </Button>
    </form>
  );
}

/* -------------------------------------------------------------------
  Layout (Navbar + Footer)
--------------------------------------------------------------------*/
function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 z-30 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <img
              src="/eman-hospital/images/logo.png"
              alt="Eman Hospital logo"
              className="h-8 w-8 object-contain"
            />
            EMAN HOSPITAL
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium hover:text-primary"
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden gap-3 md:flex">
            <Button
              size="sm"
              asChild
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Link to="/contact#booking">Appointment</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/reports">Medical Reports</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="flex flex-col gap-4 bg-white px-6 pb-4 md:hidden">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-base"
                onClick={() => setOpen(false)}
              >
                {l.name}
              </Link>
            ))}
            <Button
              size="sm"
              asChild
              onClick={() => setOpen(false)}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Link to="/contact#booking">Appointment</Link>
            </Button>
            <Button size="sm" variant="outline" asChild onClick={() => setOpen(false)}>
              <Link to="/reports">Medical Reports</Link>
            </Button>
          </div>
        )}
      </header>

      <div className="pt-[72px]">
        <Outlet />
      </div>

      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white">EMAN HOSPITAL</h3>
            <p className="mt-4 text-sm">Zakriya Town, Bosan Road, Multan</p>
            <p className="mt-2 text-sm">061-6218623 | 0325-7105960</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Timings</h4>
            <p className="mt-4 text-sm">Open 24/7 – Emergency &amp; IPD</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="mt-4 flex gap-4 text-sm">
              {["instagram", "facebook", "youtube"].map((s) => (
                <a key={s} href="#" className="capitalize hover:text-white">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eman Hospital. All rights reserved.
        </div>
      </footer>
    </>
  );
}

/* -------------------------------------------------------------------
  Pages
--------------------------------------------------------------------*/
function Home() {
  // ① list of background images
  const heroImages = [
    "eman-hospital/images/hero/1.jpg",
    "eman-hospital/images/hero/2.jpg",
    "eman-hospital/images/hero/3.jpg",
  ];

  // ② rotate every 5 s
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  const bgImage = `url('${heroImages[idx]}')`;

  const featured = doctors.filter((d) =>
    ["ehsan", "sarfaraz", "saeeda", "farah"].includes(d.key)
  );

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex h-[85vh] items-center justify-center bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: bgImage }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
            Your Journey to Wellness Starts Here
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Comprehensive healthcare services available 24/7 in Multan.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              asChild
              className="text-lg bg-primary text-white hover:bg-primary/90"
            >
              <Link to="/contact#booking">Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg">
              <Link to="/reports">Medical Reports</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --- removed the inline booking section (moved to Contact page) --- */}

      {/* Services */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Our Core Services
          </h2>
      
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.name}
                to="/departments"
                className="flex flex-col items-center rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                {/* icon / picture */}
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-24 w-24 object-contain"
                />
      
                {/* caption UNDER the picture */}
                <span className="mt-4 text-sm font-semibold text-primary text-center">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Meet Our Consultants
          </h2>
          <DoctorsGrid list={featured} />
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/doctors">View Full Directory</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Departments() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Our Departments</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Click a department to view its consultants.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {departments.map((d) => (
            <Link
              key={d}
              to={`/doctors?dept=${encodeURIComponent(d)}`}
              className="rounded-xl bg-white p-6 text-sm font-medium shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {d}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorsPage() {
  const [sp] = useSearchParams();
  const initial = sp.get("dept") || "All";
  const [selected, setSelected] = useState(initial);
  const filtered = useMemo(
    () => (selected === "All" ? doctors : doctors.filter((d) => d.department === selected)),
    [selected]
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">Our Doctors</h2>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          size="sm"
          variant={selected === "All" ? "default" : "outline"}
          onClick={() => setSelected("All")}
        >
          All
        </Button>
        {departments.map((d) => (
          <Button
            key={d}
            size="sm"
            variant={selected === d ? "default" : "outline"}
            onClick={() => setSelected(d)}
          >
            {d}
          </Button>
        ))}
      </div>

      <div className="mt-12">
        <DoctorsGrid list={filtered} />
      </div>
    </section>
  );
}

function ReportsPage() {
  const [form, setForm] = useState({ name: "", id: "" });
  const [res, setRes] = useState(null);
  const sub = (e) => {
    e.preventDefault();
    const r = reports.find(
      (x) =>
        x.id.toLowerCase() === form.id.toLowerCase() &&
        x.patient.toLowerCase() === form.name.toLowerCase()
    );
    setRes(r || { nf: true });
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Find Your Medical Report
      </h2>

      <form onSubmit={sub} className="flex flex-col gap-4 md:flex-row">
        <input
          required
          placeholder="Patient Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 rounded border p-3 text-sm"
        />
        <input
          required
          placeholder="Report ID (e.g., EH-2025-001)"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          className="flex-1 rounded border p-3 text-sm"
        />
        <Button type="submit" className="flex items-center gap-2">
          <FileText size={18} />
          Search
        </Button>
      </form>

      {res && (
        <div className="mt-10 rounded-xl bg-gray-50 p-6 shadow-sm">
          {res.nf ? (
            <p className="text-center text-red-600">No matching report.</p>
          ) : (
            <>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                <FileText />
                Report Details
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  <strong>ID:</strong> {res.id}
                </li>
                <li>
                  <strong>Patient:</strong> {res.patient}
                </li>
                <li>
                  <strong>Department:</strong> {res.department}
                </li>
                <li>
                  <strong>Date:</strong> {res.date}
                </li>
              </ul>
              <Button
                asChild
                size="sm"
                className="mt-6 flex items-center gap-2"
              >
                <a href={res.file} download>
                  <FileDown size={18} />
                  Download PDF
                </a>
              </Button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <>
      {/* Hero / banner */}
      <section
        id="appointment"
        className="relative flex flex-col items-center justify-center bg-primary py-20 text-white"
      >
        <h2 className="text-3xl font-bold md:text-4xl">Book an Appointment</h2>
        <p className="mt-4 max-w-xl text-center text-white/90">
          Call or request online 24/7.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-white text-primary hover:bg-gray-100"
          asChild
        >
          <Link to="#booking">Request Now</Link>
        </Button>
      </section>

      {/* --- Booking form moved here --- */}
      <section
        id="booking"
        className="-mt-16 pb-12 px-6"
      >
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-primary">
            <CalendarCheck2 /> Request an Appointment
          </h2>
          <BookingForm />
        </div>
      </section>

      {/* Contact info */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Contact Us</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="font-semibold text-primary">Address</h3>
            <p className="mt-2 text-sm text-gray-700">
              Zakriya Town, Bosan Road, Multan
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="font-semibold text-primary">Phone</h3>
            <p className="mt-2 text-sm text-gray-700">
              061-6218623 / 0325-7105960
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="font-semibold text-primary">Email</h3>
            <p className="mt-2 text-sm text-gray-700">
              info@emanhospital.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------
  Root App
--------------------------------------------------------------------*/
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
