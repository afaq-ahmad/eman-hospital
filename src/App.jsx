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
  useParams,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Menu,
  X,
  Stethoscope,
  CalendarCheck2,
  FileText,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import OnlineConsultation from '@/pages/OnlineConsultation';
import OnlineConsultButton from '@/components/OnlineConsultButton';

/* -------------------------------------------------------------------
  Static Data
--------------------------------------------------------------------*/
const departments = [
  "ENT",
  "Urology",
  "Gynecology",
  "General Surgery",
  "Cardiology",
  "Endocrinology & Diabetology",
  "Pediatrics",
  "Nephrology",
  "Dental Care",
  "Physiotherapy",
  "General Medicine",
  "Dermatology and Aesthetics",
  "Nutrition",
  "X-Ray / Imaging",
  "Ultrasound",
  "Lab Test",
];

const departmentDetails = {
  ENT: {
    summary:
      "Ear, nose, and throat care focused on breathing, hearing, voice, and recurrent infections.",
    issues: ["Sinusitis and allergies", "Ear infections and hearing concerns", "Tonsil/adenoid problems", "Snoring and sleep apnea"],
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80",
  },
  Urology: {
    summary:
      "Specialized treatment for urinary tract and male reproductive system disorders.",
    issues: ["Kidney and ureteric stones", "Prostate enlargement", "Urinary tract infections", "Urinary incontinence"],
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  },
  Gynecology: {
    summary:
      "Comprehensive women’s health support from adolescence to pregnancy and menopause.",
    issues: ["Menstrual and hormonal imbalance", "Pregnancy and antenatal care", "Infertility evaluation", "PCOS and fibroids"],
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80",
  },
  "General Surgery": {
    summary:
      "Operative care for common abdominal and soft tissue conditions with modern surgical approaches.",
    issues: ["Hernia repair", "Gallbladder surgery", "Appendix and abdominal emergencies", "Thyroid and minor lump surgeries"],
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
  },
  Cardiology: {
    summary:
      "Heart and blood vessel care focused on prevention, diagnosis, and long-term management.",
    issues: ["Chest pain and angina", "High blood pressure", "Heart rhythm disorders", "Heart failure follow-up"],
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=900&q=80",
  },
  "Endocrinology & Diabetology": {
    summary:
      "Hormonal and metabolic care including diabetes, thyroid, and obesity-related concerns.",
    issues: ["Type 1 and Type 2 diabetes", "Thyroid disorders", "PCOS-related endocrine care", "Weight and metabolic syndrome"],
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80",
  },
  Pediatrics: {
    summary:
      "Child-focused healthcare from newborn wellness to adolescent growth and development.",
    issues: ["Fever and infections", "Vaccination counseling", "Growth and nutrition concerns", "Respiratory and allergy issues"],
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  },
  Nephrology: {
    summary:
      "Kidney care for chronic and acute conditions, blood pressure control, and dialysis planning.",
    issues: ["Chronic kidney disease", "Protein in urine", "Resistant hypertension", "Dialysis and renal follow-up"],
    image:
      "https://images.unsplash.com/photo-1666214280218-4d6f7d7a6ec0?auto=format&fit=crop&w=900&q=80",
  },
  "Dental Care": {
    summary:
      "Preventive and restorative oral healthcare for healthy teeth, gums, and jaw function.",
    issues: ["Toothache and cavities", "Root canal and fillings", "Gum disease", "Orthodontic and cosmetic treatments"],
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
  },
  Physiotherapy: {
    summary:
      "Rehabilitation services to restore movement, reduce pain, and improve physical function.",
    issues: ["Back and neck pain", "Sports injuries", "Post-surgery rehabilitation", "Joint stiffness and arthritis"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  },
  "General Medicine": {
    summary:
      "Primary medical care for adult health concerns, screening, and chronic disease management.",
    issues: ["Fever and infections", "Hypertension control", "Respiratory complaints", "Routine health checkups"],
    image:
      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?auto=format&fit=crop&w=900&q=80",
  },
  "Dermatology and Aesthetics": {
    summary:
      "Skin, hair, and nail care with medical and aesthetic treatment options.",
    issues: ["Acne and pigmentation", "Eczema and dermatitis", "Hair loss concerns", "Scar and anti-aging treatments"],
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
  Nutrition: {
    summary:
      "Diet and lifestyle planning tailored for weight goals, metabolic health, and recovery.",
    issues: ["Weight management", "Diabetic meal planning", "Child and maternal nutrition", "Therapeutic diets for chronic illness"],
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
  },
  "X-Ray / Imaging": {
    summary:
      "Diagnostic imaging support for fast and accurate evaluation of bones, chest, and soft tissue.",
    issues: ["Fracture assessment", "Chest X-ray screening", "Injury evaluation", "Follow-up imaging"],
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=900&q=80",
  },
  Ultrasound: {
    summary:
      "Non-invasive imaging service for abdominal, obstetric, vascular, and soft tissue assessment.",
    issues: ["Pregnancy scans", "Abdominal pain workup", "Liver and kidney monitoring", "Thyroid and soft tissue scans"],
    image:
      "https://images.unsplash.com/photo-1516549655169-f0e8f16a6d99?auto=format&fit=crop&w=900&q=80",
  },
  "Lab Test": {
    summary:
      "Laboratory diagnostics for screening, diagnosis, and treatment monitoring.",
    issues: ["CBC and infection markers", "Blood sugar and HbA1c", "Liver/kidney function tests", "Hormone and vitamin profiles"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
};

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
    image: "/images/ehsan.jpg",
    online: true,
    fee: 2000,
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
    image: "/images/sarfaraz.jpg",
    online: true,
    fee: 2000,
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
    image: "/images/saeeda.jpg",
    online: true,
    fee: 1500,
  },
  {
    key: "usmanm",
    name: "Asst. Prof. Dr. Usman Manzoor",
    department: "Dental Care",
    qualification: "BDS, MDS –King Edward Medical University, Lahore",
    expertise: ["Oral & Maxillofacial Surgeon",
                "Dentoalveolar & Wisdom Tooth Surgery",
                "Facial Trauma Management",
                "Dental Implant Surgery",
                "Oral Pathology & Lesion Management"],
    image: "/images/Usman_m.jpeg",
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
    image: "/images/farah.jpg",
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
    image: "/images/male_doctor.png",
  },
  {
    key: "shoaib",
    name: "Dr. Shoaib Saleem",
    department: "Pediatrics",
    qualification: "M.B.BS, FCPS (Pediatric Medicine) | Fellowship Pediatric Cardiology PGPN (Boston) – Consultant Pediatrician",
    expertise: ["Congenital heart disease",
                "Pediatric cardiac imaging",
                "Child heart-failure care",
                "Neonatal intensive care",
                "Child nutrition", 
                "Vaccines & infections",
                "Developmental checkups"],
    image: "/images/shoaib.jpg",
  },
  {
    key: "hira",
    name: "Dr. Hira Aezaz",
    department: "Gynecology",
    qualification: "MBBS, FCPS – Consultant Gynaecologist",
    expertise: ["Cervical cancer management", 
                "Ovarian cancer treatment",
                "Laparoscopic Surgery",
                "Endometriosis & fibroid surgery",
                "Polycystic Ovary Syndrome (PCOS) care",
                "Heavy menstrual bleeding control", 
                "Infertility evaluation & treatment",
                "Caesarean section & safe delivery"],
    image: "/images/hira.jpg",
  },
  {
    key: "umair",
    name: "Dr. Umair Tahir Chaudary",
    department: "General Surgery",
    qualification: "MBBS, FCPS – Laparoscopic Surgeon",
    expertise: ["Thyroid", "Hernia", "Gallstones"],
    image: "/images/umair.jpg",
  },
  {
    key: "abubakar",
    name: "Dr. Muhammad Abubakar Khalid",
    department: "Nephrology",
    qualification: "MBBS | FCPS Nephrology (R)",
    expertise: ["Kidney & Bladder Diseases",
                "Kidney Stones",
                "Urine Infection",
                "Dialysis Care",
                "Dialysis Catheter Insertion",
                "Renal Biopsy",
                "Hypertension Management"],
    image: "/images/abubakar.jpg",
  },
  {
    key: "anees",
    name: "DR. M. ANEES MUMTAZ",
    department: "Endocrinology & Diabetology",
    qualification: "MBBS | Post Graduate Diploma In Diabetes (DIP) | Royal College of Physicians London",
    expertise: ["Diabetes Management",
                "Family Medicine",
                "General Consultation",
                "Hypertension Treatment",
                "Obesity Management",
                "Nutritional Advice",
                "Thyroid Treatment"],
    image: "/images/anees.jpg",
  },
  {
    key: "kainat",
    name: "Dr. Kainat Asad Hiraj",
    department: "General Medicine",
    qualification: "MBBS, RMP – General Physician",
    expertise: ["Asthma", "Diabetes", "Fever & Flu"],
    image: "/images/kainat.jpg",
  },
  {
    key: "ali",
    name: "Dr. Ali Kamran",
    department: "General Medicine",
    qualification: "MBBS, RMP – General Physician",
    expertise: ["Hypertension", "UTIs", "Migraines"],
    image: "/images/ali.jpg",
  },
  {
    key: "alizay",
    name: "Dr. Alizay Khan",
    department: "Dental Care",
    qualification: "BDS, RDS – Gold Medalist",
    expertise: ["Root canal treatment", 
                "Dental implants", 
                "Orthodontic braces",
                "Teeth whitening",
                "Crowns & bridges",
                "Scaling & polishing",
                "Fixed & removable dentures"],
    image: "/images/alizay.jpg",
  },
  {
    key: "taimoor",
    name: "Dr. M. Taimoor",
    department: "Dental Care",
    qualification: "B.D.S  Rashid Latif Dental College, Lahore",
    expertise: ["Wisdom Teeth", 
                "Bone Loss",
                "Facial Trauma",
                "TMJ Disorder",
                "Impacted Canines",
                "Periodontal Disease",
                "Cleft Lips and Cleft Palate"],
    image: "/images/taimoor.jpg",
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
    image: "/images/aroosa.jpg",
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
    image: "/images/asma.jpg",
  },
  {
    key: "shan",
    name: "Dr. Shan Ali",
    department: "Physiotherapy",
    qualification: "DPT, MS-OMPT – HOD Physiotherapy",
    expertise: ["Sports Injury", "Back Pain", "Stroke Rehab", 
                "Sports injury rehabilitation",
                "Arthritis & osteoarthritis care"],
    image: "/images/shan.jpg",
  },
  {
    key: "sabahat",
    name: "Dr. Sabahat Shan",
    department: "Physiotherapy",
    qualification: "DPT, University of Sargodha",
    expertise: ["Back and knee pain management",
                "Sports injury rehabilitation",
                "Arthritis & osteoarthritis care",
                "Neurological physiotherapy (Parkinson’s, multiple sclerosis)",
                "Post-stroke rehabilitation", 
                "Osteoporosis and obesity management"],
    image: "/images/sabahat.jpg",
  },
  {
    key: "areesha",
    name: "Dr. Areesha Malik",
    department: "Nutrition",
    qualification: "BSc (Hons) Food and Nutrition – MMDC",
    expertise: ["Diabetes Management",
                "PCOS",
                "Celiac Disease",
                "Hypertension",
                "Weight Gain / Weight Loss",
                "Fatty Liver",
                "GERD / IBS / Hemorrhoids"],
    image: "/images/areesha.jpg",
  },
];

const services = [
  { name: "X-Ray", image: "/images/x-ray.png" },
  { name: "Surgery", image: "/images/surgery.png" },
  { name: "Ultrasound", image: "/images/ultrasound.png" },
  { name: "Lab Test", image: "/images/labtest.png" },
  { name: "Physiotherapy", image: "/images/physiotherapy.png" },
  { name: "Dental Care", image: "/images/dental_care.png" },
  { name: "Cardiology", image: "/images/cardiology.png" },
  { name: "Pharmacy", image: "/images/pharmacy.png" },
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
  { name: "Contact", href: "/contact#booking" },
  { name: 'Online Consultation', href: '/online-consultation' },
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
  const whatsappUrl =
    "https://wa.me/923257105960?text=Assalam-o-Alaikum%20Eman%20Hospital%2C%20I%20need%20assistance.";

  return (
    <>
      <header className="fixed top-0 z-30 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <img
              src="/images/logo.png"
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

            <OnlineConsultButton />
            
            <Button 
              size="sm"
              variant="success"
              asChild>
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

            <OnlineConsultButton 
              size="sm"
              onClick={() => setOpen(false)}
            />
            
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

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Eman Hospital on WhatsApp"
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 md:h-16 md:w-16"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-6 w-6 fill-current sm:h-7 sm:w-7 md:h-8 md:w-8"
        >
          <path d="M19.11 17.22c-.27-.14-1.58-.78-1.83-.87-.24-.09-.41-.14-.58.14s-.67.87-.82 1.05c-.15.18-.3.2-.57.07-.27-.14-1.13-.42-2.15-1.34-.79-.71-1.33-1.59-1.48-1.86-.15-.27-.02-.42.11-.56.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.58-1.4-.8-1.91-.21-.5-.42-.43-.58-.44-.15-.01-.33-.01-.5-.01-.18 0-.47.07-.72.34-.24.27-.93.9-.93 2.2s.95 2.55 1.08 2.73c.14.18 1.87 2.86 4.53 4.01.63.27 1.13.44 1.51.56.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.06-.11-.24-.17-.5-.3z" />
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.53.72 4.98 2.08 7.09L3 29l6.08-2.01A12.9 12.9 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.6c-2.14 0-4.23-.58-6.06-1.68l-.43-.26-3.61 1.19 1.2-3.52-.28-.45A10.55 10.55 0 0 1 5.4 16C5.4 10.15 10.15 5.4 16 5.4S26.6 10.15 26.6 16 21.85 26.6 16 26.6z" />
        </svg>
      </a>
    </>
  );
}

/* -------------------------------------------------------------------
  Pages
--------------------------------------------------------------------*/
function Home() {
  // ① list of background images
  const heroImages = [
    "/images/hero/1.jpg",
    "/images/hero/2.jpg",
    "/images/hero/3.jpg",
  ];

  // ② rotate every 5 s
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  const bgImage = `url('${heroImages[idx]}')`;

  const featured = doctors.filter((d) =>
    ["ehsan", "sarfaraz", "saeeda", "usmanm"].includes(d.key)
  );

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex h-[85vh] items-end justify-center bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: bgImage }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        <div className="relative z-10 mb-20 max-w-2xl px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">
            Your Journey to Wellness Starts Here
          </h1>
        <p className="text-lg md:text-xl">
          Comprehensive healthcare services available&nbsp;24/7 in Multan.
        </p>
        </div>
      </section>

      {/* ───────── Call-to-Action (buttons) ───────── */}
      <section className="bg-white py-14">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6">
          <Button
            size="lg"
            asChild
            className="h-14 w-full rounded-xl text-base font-semibold shadow-lg md:text-lg"
            >
            <Link to="/contact#booking">Book Appointment</Link>
          </Button>

          <OnlineConsultButton
            size="lg"
            className="h-14 w-full rounded-xl text-base font-semibold md:text-lg"
          />
          
          <Button 
            size="lg"
            variant="success"
            asChild
            className="h-14 w-full rounded-xl text-base font-semibold shadow-lg md:text-lg"
          >
            <Link to="/reports">Medical Reports</Link>
          </Button>
        </div>
      </section>
      
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
              to={`/departments/${encodeURIComponent(d)}`}
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

function DepartmentDetailPage() {
  const { deptName = "" } = useParams();
  const normalizedDept = (() => {
    try {
      return decodeURIComponent(deptName);
    } catch {
      return deptName;
    }
  })();

  const details = departmentDetails[normalizedDept];
  const consultantCount = doctors.filter((doctor) => doctor.department === normalizedDept).length;

  if (!details) {
    return <Navigate to="/departments" replace />;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Department</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{normalizedDept}</h1>
          <p className="mt-5 text-gray-700">{details.summary}</p>

          <h2 className="mt-8 text-lg font-semibold">Commonly managed issues</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            {details.issues.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <Link to={`/doctors?dept=${encodeURIComponent(normalizedDept)}`}>
                View {consultantCount > 0 ? `${consultantCount} ` : ""}Doctors in {normalizedDept}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/departments">Back to all departments</Link>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img src={details.image} alt={`${normalizedDept} department`} className="h-full min-h-[320px] w-full object-cover" />
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
      <Toaster 
        position="top-center"  
        toastOptions={{
          duration: 7000,            // 7 s auto-dismiss
          style: { fontSize: '0.9rem' }
        }}
        />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="departments" element={<Departments />} />
          <Route path="departments/:deptName" element={<DepartmentDetailPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="online-consultation" element={<OnlineConsultation  doctors={doctors} />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

