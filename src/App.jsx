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
  useLocation,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Menu,
  X,
  Stethoscope,
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
  "Pulmonology",
  "Dermatology and Aesthetics",
  "Nutrition",
  "X-Ray / Imaging",
  "Ultrasound",
  "Lab Test",
];

const departmentDetails = {
  ENT: {
    summary:
      "Our ENT department evaluates and treats problems of the ear, nose, throat, and related head-neck structures. Care includes clinic-based diagnosis, medical treatment, and procedure guidance for both acute and long-standing symptoms.",
    issues: [
      "Frequent sore throat, tonsillitis, and adenoid enlargement",
      "Sinus blockage, facial pain, and allergic rhinitis",
      "Ear pain, discharge, and recurrent ear infections",
      "Hearing reduction, tinnitus, and balance-related concerns",
      "Snoring, sleep-disordered breathing, and sleep apnea screening",
      "Voice changes, hoarseness, and swallowing difficulty",
    ],
    image: "/images/ehsan.jpg",
    departmentImage: "/images/dep_ent_department.jpg",
  },
  Urology: {
    summary:
      "Our Urology team manages urinary tract and male reproductive health conditions using modern diagnostic and minimally invasive options when appropriate. Patients are supported from first consultation through treatment and follow-up.",
    issues: [
      "Kidney, ureter, and bladder stone disease",
      "Prostate enlargement and urinary flow problems",
      "Burning urination, recurrent UTIs, and urgency",
      "Blood in urine and unexplained urinary symptoms",
      "Urinary incontinence and bladder control problems",
      "Male urological and reproductive health concerns",
    ],
    image: "/images/sarfaraz.jpg",
    departmentImage: "/images/dep_urology_department.jpg",
  },
  Gynecology: {
    summary:
      "Our Gynecology department provides comprehensive women’s healthcare from adolescence to post-menopausal years. Services cover preventive checkups, pregnancy-related care, and treatment planning for complex gynecologic conditions.",
    issues: [
      "Irregular, painful, or heavy menstrual cycles",
      "PCOS, hormonal imbalance, and related symptoms",
      "Infertility assessment and preconception planning",
      "Antenatal, high-risk pregnancy, and postpartum care",
      "Fibroids, ovarian cysts, and endometriosis management",
      "Screening and treatment support for gynecologic cancers",
    ],
    image: "/images/saeeda.jpg",
    departmentImage: "/images/dep_gynecology_department.jpg",
  },
  "General Surgery": {
    summary:
      "Our General Surgery department handles common elective and emergency surgical conditions with a focus on safe outcomes and faster recovery. Patients receive pre-op counseling, operative care, and structured post-op follow-up.",
    issues: [
      "Hernia repair and abdominal wall defects",
      "Gallbladder disease and gallstone surgery",
      "Appendix and acute abdominal pain emergencies",
      "Thyroid swelling and neck lump procedures",
      "Soft tissue masses, cysts, and abscess treatment",
      "Minor trauma and wound-related surgical care",
    ],
    image: "/images/surgery.png",
    departmentImage: "/images/dep_general_surgery_department.jpg",
  },
  Cardiology: {
    summary:
      "Our Cardiology department focuses on early detection, risk reduction, and long-term management of heart and circulation disorders. Care plans are personalized for acute symptoms as well as preventive heart health.",
    issues: [
      "Chest discomfort, angina, and exertional breathlessness",
      "High blood pressure and cardiovascular risk control",
      "Irregular heartbeat, palpitations, and rhythm concerns",
      "Heart failure assessment and follow-up monitoring",
      "High cholesterol and preventive heart screening",
      "Post-cardiac event rehabilitation guidance",
    ],
    image: "/images/cardiology.png",
    departmentImage: "/images/dep_cardiology_department.jpg",
  },
  "Endocrinology & Diabetology": {
    summary:
      "Our Endocrinology & Diabetology department manages hormone-related disorders and metabolic diseases with evidence-based treatment plans. We emphasize long-term control, complication prevention, and lifestyle support.",
    issues: [
      "Type 1 and Type 2 diabetes control and monitoring",
      "Thyroid disorders including hypo/hyperthyroidism",
      "Insulin resistance, obesity, and metabolic syndrome",
      "Diabetes-related kidney, nerve, and eye risk reduction",
      "Hormonal causes of fatigue, weight, and mood changes",
      "Endocrine guidance for PCOS and reproductive health",
    ],
    image: "/images/anees.jpg",
    departmentImage: "/images/dep_endocrinology_diabetology_department.jpg",
  },
  Pediatrics: {
    summary:
      "Our Pediatrics department offers compassionate care for infants, children, and adolescents, with attention to growth, nutrition, and developmental milestones. Families are guided on prevention, vaccination, and timely treatment.",
    issues: [
      "Fever, cough, flu, and seasonal childhood infections",
      "Vaccination counseling and routine immunization visits",
      "Growth, feeding, and nutrition-related concerns",
      "Asthma, allergy, and recurrent breathing problems",
      "Neonatal and infant wellness checkups",
      "Developmental, behavioral, and school-age health concerns",
    ],
    image: "/images/shoaib.jpg",
    departmentImage: "/images/dep_pediatrics_department.jpg",
  },
  Nephrology: {
    summary:
      "Our Nephrology services focus on kidney disease prevention, diagnosis, and long-term treatment. Patients with chronic kidney disease receive ongoing monitoring and renal replacement planning where required.",
    issues: [
      "Chronic kidney disease and declining renal function",
      "Protein leakage, swelling, and abnormal urine findings",
      "Difficult-to-control blood pressure linked to kidneys",
      "Kidney stone recurrence and preventive nephrology care",
      "Dialysis counseling, access planning, and follow-up",
      "Electrolyte imbalance and fluid management",
    ],
    image: "/images/abubakar.jpg",
    departmentImage: "/images/dep_nephrology_department.jpg",
  },
  "Dental Care": {
    summary:
      "Our Dental Care department provides preventive, restorative, and cosmetic oral treatments for all age groups. We focus on pain relief, oral hygiene improvement, and functional rehabilitation.",
    issues: [
      "Toothache, dental caries, and sensitivity",
      "Root canal therapy and restorative fillings",
      "Gum infection, bleeding gums, and periodontal care",
      "Wisdom tooth and minor oral surgical procedures",
      "Crowns, bridges, dentures, and missing tooth replacement",
      "Orthodontic alignment and smile enhancement",
    ],
    image: "/images/dental_care.png",
    departmentImage: "/images/dep_dental_care_department.jpg",
  },
  Physiotherapy: {
    summary:
      "Our Physiotherapy department supports recovery from injury, surgery, and chronic pain using structured rehabilitation programs. Therapy plans are tailored to improve mobility, strength, and day-to-day function.",
    issues: [
      "Back, neck, and posture-related pain syndromes",
      "Sports injuries and soft tissue strain rehabilitation",
      "Post-operative strengthening and movement restoration",
      "Joint stiffness, arthritis, and flexibility training",
      "Balance training and fall-prevention exercises",
      "Neuromuscular re-education and gait correction",
    ],
    image: "/images/physiotherapy.png",
    departmentImage: "/images/dep_physiotherapy_department.jpg",
  },
  "General Medicine": {
    summary:
      "Our General Medicine department provides first-contact adult medical care and coordinates further specialist referral when needed. Focus areas include early diagnosis, chronic disease control, and preventive health maintenance.",
    issues: [
      "Fever, infections, and unexplained weakness",
      "Diabetes and blood pressure routine management",
      "Asthma, allergies, and respiratory complaints",
      "Digestive symptoms such as acidity and abdominal discomfort",
      "Headache, fatigue, and lifestyle-related health concerns",
      "Annual checkups and preventive health screening",
    ],
    image: "/images/male_doctor.png",
    departmentImage: "/images/dep_general_medicine_department.jpg",
  },
  Pulmonology: {
    summary:
      "Our Pulmonology department provides specialized care for breathing and lung-related conditions, from common airway illnesses to chronic respiratory disease. We focus on accurate diagnosis, symptom control, and long-term improvement in respiratory health.",
    issues: [
      "Asthma diagnosis, control plans, and inhaler optimization",
      "COPD evaluation and long-term breathing management",
      "Chronic cough and persistent chest symptom assessment",
      "Chest infections including bronchitis and pneumonia care",
      "Tuberculosis (TB) diagnosis, treatment, and follow-up",
      "Sleep apnea and snoring-related breathing disorder screening",
    ],
    image: "/images/umair_saeed.jpg",
    departmentImage: "/images/dep_pulmonology_department.jpg",
  },
  "Dermatology and Aesthetics": {
    summary:
      "Our Dermatology and Aesthetics services treat medical skin, hair, and nail disorders while also addressing cosmetic concerns safely. Treatment plans are personalized based on skin type, severity, and long-term goals.",
    issues: [
      "Acne, acne scars, and post-inflammatory pigmentation",
      "Eczema, dermatitis, and chronic skin irritation",
      "Hair fall, dandruff, and scalp disorders",
      "Fungal infections and recurrent skin rashes",
      "Anti-aging skin care and texture improvement",
      "Mole, wart, and minor lesion evaluation",
    ],
    image: "/images/asma.jpg",
    departmentImage: "/images/dep_dermatology_aesthetics_department.jpg",
  },
  Nutrition: {
    summary:
      "Our Nutrition department provides individualized diet plans for disease prevention, treatment support, and healthy weight goals. Counseling is aligned with medical conditions, lifestyle, and cultural food preferences.",
    issues: [
      "Weight loss and healthy weight gain programs",
      "Diet planning for diabetes and hypertension",
      "Pregnancy and lactation nutrition counseling",
      "Pediatric and adolescent nutrition optimization",
      "Therapeutic diets for kidney and heart disease",
      "Deficiency-focused plans for anemia and low vitamins",
    ],
    image: "/images/rimsha.jpg",
    departmentImage: "/images/dep_nutrition_department.jpg",
  },
  "X-Ray / Imaging": {
    summary:
      "Our X-Ray / Imaging department supports timely diagnosis through quality radiographic services and clinician-coordinated reporting. Imaging is used for emergency, outpatient, and follow-up care pathways.",
    issues: [
      "Bone fracture and joint injury assessment",
      "Chest imaging for infection and respiratory symptoms",
      "Spine and limb imaging for trauma and pain",
      "Follow-up imaging to monitor treatment response",
      "Pre-operative and routine diagnostic radiology support",
      "Physician-guided imaging for faster clinical decisions",
    ],
    image: "/images/x-ray.png",
    departmentImage: "/images/dep_xray_imaging_department.jpg",
  },
  Ultrasound: {
    summary:
      "Our Ultrasound services provide non-invasive real-time imaging for abdominal, obstetric, pelvic, and soft tissue evaluations. The department supports both screening and problem-focused diagnostic pathways.",
    issues: [
      "Pregnancy viability, growth, and anomaly scans",
      "Abdominal pain, liver, and gallbladder assessment",
      "Kidney, bladder, and urinary tract ultrasound",
      "Pelvic ultrasound for gynecologic evaluation",
      "Thyroid, neck, and superficial soft tissue scans",
      "Doppler-based vascular flow assessment",
    ],
    image: "/images/ultrasound.png",
    departmentImage: "/images/dep_ultrasound_department.jpg",
  },
  "Lab Test": {
    summary:
      "Our Lab Test department delivers essential pathology services for diagnosis, screening, and treatment monitoring. Timely and accurate reporting helps clinicians make faster, evidence-based medical decisions.",
    issues: [
      "Complete blood count and infection marker profiles",
      "Blood sugar, HbA1c, and metabolic monitoring tests",
      "Liver and kidney function panels",
      "Lipid profile and cardiovascular risk screening",
      "Hormonal, thyroid, and vitamin deficiency testing",
      "Urine analysis and culture-based investigations",
    ],
    image: "/images/labtest.png",
    departmentImage: "/images/dep_lab_test_department.jpg",
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
    fee: 2500,
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
    online: true,
    fee: 2000,
  },
//     {
//       key: "farah",
//       name: "Dr. Farah Majid Rao",
//       department: "Gynecology",
//       qualification: "MBBS, FCPS – Consultant Obstetrician",
//       expertise: ["High-Risk Pregnancy",
//                   "Fibroids",
//                   "Laparoscopic Surgery",
//                   "Gynecologic Cancers"],
//       image: "/images/farah.jpg",
//     },
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
    online: true,
    fee: 1500,
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
    key: "umair_saeed",
    name: "Dr. Umair Saeed",
    department: "Pulmonology",
    qualification: "MBBS, FCPS – Pulmonology (General Physician / Chest Specialist)",
    expertise: ["Asthma Care",
                "COPD Management",
                "Chest Infections",
                "TB Management", 
                "Chronic Cough", 
                "Sleep Apnea", 
                "Lung Function Tests"],
    image: "/images/umair_saeed.jpg",
    online: true,
    fee: 1500,
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
    online: true,
    fee: 1500,
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
    online: true,
    fee: 1500,
  },
  {
    key: "faheem_abbas",
    name: "Dr. Faheem Abbas",
    department: "General Medicine",
    qualification: "MD, South America",
    expertise: ["Asthma", "Diabetes Management", "Heart & Cholesterol Care", "Family Health & Elderly Care"],
    image: "/images/faheem_abbas.jpg",
  },
  {
    key: "ali",
    name: "Dr. Ali Kamran",
    department: "General Medicine",
    qualification: "MBBS, RMP – General Physician",
    expertise: ["Hypertension", "UTIs", "Migraines"],
    image: "/images/ali.jpg",
  },
//   {
//     key: "alizay",
//     name: "Dr. Alizay Khan",
//     department: "Dental Care",
//     qualification: "BDS, RDS – Gold Medalist",
//     expertise: ["Root canal treatment",
//                 "Dental implants",
//                 "Orthodontic braces",
//                 "Teeth whitening",
//                 "Crowns & bridges",
//                 "Scaling & polishing",
//                 "Fixed & removable dentures"],
//     image: "/images/alizay.jpg",
//   },
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
//   {
//     key: "aroosa",
//     name: "Dr. Aroosa Aziz",
//     department: "Dental Care",
//     qualification: "BDS, RDS (Ibn e Seeena Hospital)",
//     expertise: ["Bone Loss",
//                 "Facial Trauma",
//                 "Impacted Canines",
//                 "Periodontal Disease",
//                 "Temporomandibular Joint Disorder",
//                 "Cleft Lips And Cleft Palate"],
//     image: "/images/aroosa.jpg",
//   },
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
    key: "abdul_basit",
    name: "Dr. Abdul Basit",
    department: "Physiotherapy",
    qualification: "DPT, GCUF",
    expertise: ["Mascular Imbalance", "Back Pain", "Stroke Rehab",
                "Sports injury rehabilitation",
                "Arthritis & osteoarthritis care"],
    image: "/images/abdul_basit.jpg",
    online: true,
    fee: 1500,
  },
  {
    key: "fatima_umer",
    name: "Dr. Fatima Umer Hayat",
    department: "Physiotherapy",
    qualification: "DPT, University of Sargodha",
    expertise: ["Back and knee pain management",
                "Sports injury rehabilitation",
                "Arthritis & osteoarthritis care",
                "Neurological physiotherapy (Parkinson’s, multiple sclerosis)",
                "Post-stroke rehabilitation",
                "Osteoporosis and obesity management"],
    image: "/images/fatima_umer.jpg",
    online: true,
    fee: 1500,
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
  { name: "X-Ray", image: "/images/x-ray.png", department: "X-Ray / Imaging" },
  { name: "Surgery", image: "/images/surgery.png", department: "General Surgery" },
  { name: "Ultrasound", image: "/images/ultrasound.png", department: "Ultrasound" },
  { name: "Lab Test", image: "/images/labtest.png", department: "Lab Test" },
  { name: "Physiotherapy", image: "/images/physiotherapy.png", department: "Physiotherapy" },
  { name: "Dental Care", image: "/images/dental_care.png", department: "Dental Care" },
  { name: "Cardiology", image: "/images/cardiology.png", department: "Cardiology" },
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
  { name: "Health Library", href: "/health-library" },
  { name: "Contact", href: "/contact" },
];

const SITE_URL = "https://emanhospital.com";

const SOCIAL_PROFILES = [
  "https://www.facebook.com/EmanHospitalMultan",
  "https://www.instagram.com/emanhospital/",
];

const topConsultants = [
  {
    name: "Prof. Dr. Ehsan Ul Haq",
    specialty: "Otolaryngology",
    profilePath: "/doctors#ehsan",
  },
  {
    name: "Asst. Prof. Dr. Sarfaraz Hassan Sial",
    specialty: "Urology",
    profilePath: "/doctors#sarfaraz",
  },
  {
    name: "Dr. Saeeda Ehsan",
    specialty: "Gynecology",
    profilePath: "/doctors#saeeda",
  },
  {
    name: "Dr. Tariq Anwar",
    specialty: "Cardiology",
    profilePath: "/doctors#tariq",
  },
];

const localServicePages = [
  { slug: "gynecology-multan", label: "Gynecology in Multan" },
  { slug: "cardiology-multan", label: "Cardiology in Multan" },
  { slug: "ent-emergency-multan", label: "ENT Emergency in Multan" },
  { slug: "same-day-ultrasound-multan", label: "Same-Day Ultrasound in Multan" },
  { slug: "pediatric-care-multan", label: "Pediatric Care in Multan" },
  { slug: "diabetes-care-multan", label: "Diabetes Care in Multan" },
  { slug: "physiotherapy-multan", label: "Physiotherapy in Multan" },
];

const healthArticles = [
  {
    slug: "dengue-fever-warning-signs-prevention",
    title: "Dengue Fever in Multan: Warning Signs, Prevention, and When to Seek Urgent Care",
    excerpt:
      "A practical family guide to recognizing dehydration, bleeding risk, and the right time to escalate to emergency care.",
    department: "General Medicine",
    author: "Dr. Faheem Abbas",
    readMinutes: 7,
    reviewedDate: "2026-02-01",
    tags: ["dengue", "fever", "emergency", "prevention"],
    sections: [
      {
        heading: "Early symptoms families should not ignore",
        points: [
          "High-grade fever with severe body aches and headache can be early dengue indicators.",
          "Persistent vomiting, poor oral intake, and reduced urine output suggest dehydration risk.",
          "A sudden drop in fever with weakness, restlessness, or abdominal pain may indicate a critical phase.",
        ],
      },
      {
        heading: "Home care and hydration checklist",
        points: [
          "Use oral rehydration fluids, soups, and water at frequent intervals rather than large infrequent volumes.",
          "Avoid self-medication with ibuprofen or aspirin unless a clinician confirms safety.",
          "Track fluid intake, urine frequency, and activity level every 4 to 6 hours.",
        ],
      },
      {
        heading: "Urgent red flags",
        points: [
          "Bleeding gums, black stools, repeated vomiting, or confusion need immediate emergency evaluation.",
          "Children, pregnant women, and older adults require lower thresholds for hospital review.",
          "If platelet trends are falling with worsening symptoms, urgent reassessment is essential.",
        ],
      },
    ],
  },
  {
    slug: "heart-attack-vs-acidity-chest-pain-guide",
    title: "Chest Pain in Adults: How to Differentiate Heart Risk from Acidity",
    excerpt:
      "Learn which chest pain patterns may be digestive and which require immediate cardiology or emergency review.",
    department: "Cardiology",
    author: "Dr. Tariq Anwar",
    readMinutes: 6,
    reviewedDate: "2026-02-03",
    tags: ["heart", "chest pain", "cardiology", "emergency"],
    sections: [
      {
        heading: "Features that increase heart-related concern",
        points: [
          "Pressure-like pain radiating to jaw, left arm, or back especially with sweating or nausea.",
          "Breathlessness, dizziness, or sudden fatigue with minor activity.",
          "Pain in patients with diabetes, hypertension, or strong family history needs faster triage.",
        ],
      },
      {
        heading: "Possible acidity-like symptoms",
        points: [
          "Burning after meals, relief with antacid, and discomfort linked to lying down can suggest reflux.",
          "Even if acidity is likely, recurring or atypical chest symptoms should be medically evaluated.",
        ],
      },
      {
        heading: "Immediate action plan",
        points: [
          "Do not delay if pain lasts more than 15 minutes or comes with alarming symptoms.",
          "Call hospital emergency support and avoid driving yourself when symptoms are severe.",
        ],
      },
    ],
  },
  {
    slug: "pcos-menstrual-irregularity-care-plan",
    title: "PCOS and Irregular Periods: A Stepwise Women’s Health Care Plan",
    excerpt:
      "Evidence-informed guidance on cycle tracking, fertility planning, nutrition, and long-term hormonal risk control.",
    department: "Gynecology",
    author: "Dr. Saeeda Ehsan",
    readMinutes: 8,
    reviewedDate: "2026-02-05",
    tags: ["pcos", "gynecology", "hormones", "fertility"],
    sections: [
      {
        heading: "Assessment essentials",
        points: [
          "Cycle length patterns, acne, excess facial hair, and weight trends help define risk and severity.",
          "Thyroid and metabolic screening can identify overlapping causes of irregular periods.",
        ],
      },
      {
        heading: "Treatment pillars",
        points: [
          "Weight optimization, sleep correction, and structured activity improve hormonal stability.",
          "Medication choices depend on whether the current goal is symptom control or pregnancy planning.",
          "Long-term follow-up is important to reduce diabetes and cardiovascular risk.",
        ],
      },
      {
        heading: "When to seek faster review",
        points: [
          "Heavy bleeding, severe pain, or prolonged missed cycles need early gynecology consultation.",
          "Couples planning pregnancy should start preconception review early instead of waiting many months.",
        ],
      },
    ],
  },
];

const seoConfig = {
  "/": {
    title:
      "Eman Hospital Multan | Best Hospital in Multan for Specialists, Surgery & Emergency Care",
    description:
      "Eman Hospital Multan provides specialist consultants, emergency support, surgery, diagnostics, lab tests, ultrasound, X-ray and online consultations for families across Multan and South Punjab.",
    keywords:
      "Eman Hospital Multan, best hospital in Multan, private hospital in Multan, specialist doctors in Multan, emergency care Multan, surgery Multan, lab test Multan, ultrasound Multan, X-ray Multan",
    type: "website",
  },
  "/departments": {
    title: "Hospital Departments in Multan | Eman Hospital",
    description:
      "Explore Eman Hospital departments including ENT, Urology, Gynecology, Cardiology, Pediatrics, Nephrology, Dental Care, Physiotherapy, Lab Test and Imaging services in Multan.",
    keywords:
      "hospital departments Multan, ENT hospital Multan, gynecology hospital Multan, cardiology Multan, pediatrics Multan, nephrology Multan, diagnostics Multan",
  },
  "/doctors": {
    title: "Specialist Doctors in Multan | Eman Hospital Consultants",
    description:
      "Find experienced consultants at Eman Hospital Multan across ENT, Urology, Gynecology, Cardiology, Pediatrics, General Medicine, Pulmonology and more.",
    keywords:
      "specialist doctors in Multan, consultants in Multan, gynecologist in Multan, ENT specialist Multan, urologist in Multan, pediatrician in Multan",
  },
  "/online-consultation": {
    title: "Online Doctor Consultation in Multan | Eman Hospital",
    description:
      "Book online consultation with Eman Hospital doctors. Select a convenient slot, upload payment receipt and receive WhatsApp confirmation for tele-consultation.",
    keywords:
      "online consultation Pakistan, online doctor Multan, telemedicine Multan, virtual doctor appointment Multan",
  },
  "/reports": {
    title: "Download Medical Reports | Eman Hospital Multan",
    description:
      "Access your Eman Hospital medical report details securely using your patient name and report ID.",
    keywords:
      "medical report Multan, lab reports online Multan, hospital reports Multan",
  },
  "/contact": {
    title: "Contact Eman Hospital Multan | Appointment, Emergency & Location",
    description:
      "Contact Eman Hospital near Street No. 10, Zakriya Town, Multan 60000, Pakistan. Call for appointments, emergency support and specialist consultations.",
    keywords:
      "Eman Hospital contact, hospital phone number Multan, hospital location Multan, appointment booking hospital Multan",
  },
  "/gynecology-multan": {
    title: "Best Gynecology Hospital in Multan | Eman Hospital Women's Care",
    description:
      "Eman Hospital Multan offers gynecology and obstetric care including antenatal checkups, high-risk pregnancy support, infertility counseling, menstrual disorder treatment, and laparoscopic gyne procedures.",
    keywords:
      "gynecology hospital Multan, best gynecologist in Multan, pregnancy care Multan, normal delivery hospital Multan, C section Multan, PCOS treatment Multan, infertility specialist Multan",
    faqs: [
      {
        question: "Do you provide high-risk pregnancy and delivery care in Multan?",
        answer:
          "Yes. Our gynecology team provides antenatal monitoring, high-risk pregnancy assessment, delivery planning, and postnatal follow-up based on clinical need.",
      },
      {
        question: "Can I book an online consultation for gynecology?",
        answer:
          "Yes. You can use our online consultation flow to request a virtual appointment and receive slot confirmation from the hospital team.",
      },
      {
        question: "Do you treat PCOS and irregular periods?",
        answer:
          "Yes. We evaluate hormonal and menstrual issues such as PCOS, painful periods, heavy bleeding, and cycle irregularity with individualized treatment plans.",
      },
    ],
  },
  "/cardiology-multan": {
    title: "Cardiology Hospital in Multan | Heart Specialist Care at Eman Hospital",
    description:
      "Consult experienced cardiology doctors in Multan at Eman Hospital for chest pain assessment, blood pressure control, preventive cardiology, heart risk screening, and long-term follow-up care.",
    keywords:
      "cardiologist in Multan, heart specialist Multan, cardiology hospital Multan, chest pain doctor Multan, blood pressure treatment Multan, preventive cardiology Multan, cholesterol management Multan",
    faqs: [
      {
        question: "When should I see a cardiologist?",
        answer:
          "You should seek cardiology consultation for chest discomfort, shortness of breath, palpitations, uncontrolled blood pressure, or a strong family history of heart disease.",
      },
      {
        question: "Do you offer preventive heart health checkups?",
        answer:
          "Yes. We provide risk assessment for hypertension, cholesterol, diabetes-related cardiac risk, and lifestyle-focused prevention planning.",
      },
      {
        question: "Can I get follow-up consultation online for heart care?",
        answer:
          "Yes. Stable follow-up consultations can be requested online, while urgent symptoms should be assessed physically or in emergency care.",
      },
    ],
  },
  "/ent-emergency-multan": {
    title: "ENT Emergency in Multan | Urgent Ear, Nose & Throat Care",
    description:
      "Get rapid ENT emergency assessment in Multan for severe ear pain, sudden hearing changes, nose bleeding, throat infection complications, and breathing-related ENT concerns.",
    keywords:
      "ENT emergency Multan, ear pain doctor Multan, nose bleeding treatment Multan, throat emergency Multan, sudden hearing loss Multan",
  },
  "/same-day-ultrasound-multan": {
    title: "Same-Day Ultrasound in Multan | Eman Hospital Imaging",
    description:
      "Book same-day ultrasound services in Multan for abdominal, pelvic, obstetric, and urinary tract assessment with physician-coordinated reporting.",
    keywords:
      "same day ultrasound Multan, urgent ultrasound Multan, pregnancy ultrasound Multan, abdominal ultrasound Multan",
  },
  "/pediatric-care-multan": {
    title: "Pediatric Care in Multan | Child Specialist Services at Eman Hospital",
    description:
      "Comprehensive pediatric care in Multan including fever management, growth monitoring, nutrition counseling, developmental follow-up, and vaccination guidance.",
    keywords:
      "pediatrician Multan, child specialist Multan, kids fever doctor Multan, child vaccination Multan",
  },
  "/diabetes-care-multan": {
    title: "Diabetes Care in Multan | Endocrinology & Diabetology Support",
    description:
      "Structured diabetes care in Multan with blood sugar optimization, lifestyle planning, complication prevention, and endocrine follow-up for long-term health.",
    keywords:
      "diabetes doctor Multan, endocrinologist Multan, sugar control Multan, HbA1c monitoring Multan",
  },
  "/physiotherapy-multan": {
    title: "Physiotherapy in Multan | Pain, Mobility & Rehabilitation Care",
    description:
      "Expert physiotherapy in Multan for back pain, post-injury rehab, post-operative recovery, sports rehabilitation, and mobility improvement.",
    keywords:
      "physiotherapy Multan, back pain physiotherapy Multan, rehab center Multan, sports injury physiotherapy Multan",
  },
  "/health-library": {
    title: "Health Library | Eman Hospital Multan",
    description:
      "Read medically reviewed patient education articles from Eman Hospital doctors on prevention, early warning signs, and practical family health guidance.",
    keywords:
      "health articles Multan, medical advice hospital Multan, prevention guides Pakistan",
  },
};

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
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="whitespace-nowrap text-sm font-medium hover:text-primary"
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden gap-3 md:flex">
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
            <p className="mt-4 text-sm">Near Street No. 10, Zakriya Town, Multan 60000, Pakistan</p>
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
              {SOCIAL_PROFILES.map((url) => {
                const label = url.includes("facebook") ? "facebook" : "instagram";
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="capitalize hover:text-white"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eman Hospital. All rights reserved.
        </div>
        <div className="mt-4 text-center text-[11px] text-gray-500">
          <span className="mr-2">Local Service Pages:</span>
          {localServicePages.map((page, index) => (
            <React.Fragment key={page.slug}>
              {index > 0 && <span className="mx-2">•</span>}
              <Link
                to={`/${page.slug}`}
                className="hover:text-white underline-offset-2 hover:underline"
              >
                {page.label}
              </Link>
            </React.Fragment>
          ))}
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

function SeoManager() {
  const location = useLocation();
  const routePath = location.pathname;
  const pathKey = routePath.startsWith("/departments/")
    ? "/departments"
    : routePath.startsWith("/health-library/")
      ? "/health-library"
      : routePath;
  const articleMeta = routePath.startsWith("/health-library/")
    ? healthArticles.find((entry) => routePath === `/health-library/${entry.slug}`)
    : null;
  const meta = articleMeta
    ? {
      title: `${articleMeta.title} | Eman Hospital Multan`,
      description: articleMeta.excerpt,
      keywords: articleMeta.tags.join(", "),
    }
    : (seoConfig[pathKey] || seoConfig["/"]);
  const canonicalUrl = `${SITE_URL}${routePath}`;

  React.useEffect(() => {
    document.title = meta.title;

    const setMeta = (name, content, attr = "name") => {
      let tag = document.querySelector(`meta[${attr}='${name}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel='${rel}']`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    setMeta("description", meta.description);
    setMeta("keywords", meta.keywords || seoConfig["/"].keywords);
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:type", meta.type || "website", "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:site_name", "Eman Hospital", "property");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setLink("canonical", canonicalUrl);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalClinic",
          name: "Eman Hospital",
          url: SITE_URL,
          telephone: "+92-61-6218623",
          image: `${SITE_URL}/images/logo.png`,
          medicalSpecialty: [
            "Otolaryngologic",
            "Urologic",
            "Gynecologic",
            "Cardiologic",
            "Pediatric",
            "GeneralSurgery",
            "Nephrologic",
            "Pulmonary",
            "Dermatologic",
            "Dentistry",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Near Street No. 10, Zakriya Town",
            addressLocality: "Multan",
            addressRegion: "Punjab",
            postalCode: "60000",
            addressCountry: "PK",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 30.1575,
            longitude: 71.5249,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          ],
          hasMap: "https://www.google.com/maps?q=Eman+Hospital,+Near+Street+No.+10,+Zakriya+Town,+60000,+Pakistan",
          areaServed: ["Multan", "South Punjab"],
          priceRange: "₨₨",
          sameAs: SOCIAL_PROFILES,
        },
        {
          "@type": "WebPage",
          name: meta.title,
          description: meta.description,
          url: canonicalUrl,
          inLanguage: "en-PK",
          isPartOf: {
            "@type": "WebSite",
            name: "Eman Hospital",
            url: SITE_URL,
          },
        },
      ],
    };

    if (meta.faqs?.length) {
      schema["@graph"].push({
        "@type": "FAQPage",
        mainEntity: meta.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }


    if (routePath === "/health-library") {
      schema["@graph"].push({
        "@type": "Blog",
        name: "Eman Hospital Health Library",
        url: canonicalUrl,
        inLanguage: "en-PK",
        publisher: {
          "@type": "Organization",
          name: "Eman Hospital",
          url: SITE_URL,
        },
      });
    }

    const article = healthArticles.find((entry) => routePath === `/health-library/${entry.slug}`);
    if (article) {
      schema["@graph"].push({
        "@type": "MedicalWebPage",
        about: article.tags,
      });
      schema["@graph"].push({
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.reviewedDate,
        dateModified: article.reviewedDate,
        author: {
          "@type": "Physician",
          name: article.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Eman Hospital",
          url: SITE_URL,
        },
        mainEntityOfPage: canonicalUrl,
      });
    }

    topConsultants.forEach((doctor) => {
      schema["@graph"].push({
        "@type": "Physician",
        name: doctor.name,
        medicalSpecialty: doctor.specialty,
        worksFor: {
          "@type": "Hospital",
          name: "Eman Hospital",
        },
        url: `${SITE_URL}${doctor.profilePath}`,
      });
    });

    let schemaTag = document.getElementById("schema-org-route");
    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.id = "schema-org-route";
      schemaTag.type = "application/ld+json";
      document.head.appendChild(schemaTag);
    }
    schemaTag.textContent = JSON.stringify(schema);
  }, [canonicalUrl, meta]);

  return null;
}

/* -------------------------------------------------------------------
  Pages
--------------------------------------------------------------------*/
function Home() {
  const promoImages = [
    "/images/Asthetic_hiring.jpg",
    "/images/gyne_offer_feb.jpg",
  ];
  const [isPromoOpen, setIsPromoOpen] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);

  React.useEffect(() => {
    if (!isPromoOpen || promoImages.length < 2) return undefined;

    const id = setInterval(() => {
      setPromoIndex((current) => (current + 1) % promoImages.length);
    }, 4000);

    return () => clearInterval(id);
  }, [isPromoOpen, promoImages.length]);

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
      {isPromoOpen && (
        <div className="fixed inset-x-0 top-4 z-[70] flex justify-center px-3 sm:px-4">
          <div className="relative w-[96vw] max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 sm:w-[92vw]">
            <button
              type="button"
              onClick={() => setIsPromoOpen(false)}
              aria-label="Close promotional popup"
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={promoImages[promoIndex]}
              alt="Eman Hospital promotional offer"
              className="h-auto max-h-[75vh] w-full object-contain sm:max-h-[80vh]"
            />

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1">
              {promoImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPromoIndex(index)}
                  aria-label={`Show promotion ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    promoIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

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
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6">
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
                to={s.department ? `/departments/${encodeURIComponent(s.department)}` : "/departments"}
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
          <img src={details.departmentImage || details.image} alt={`${normalizedDept} department`} className="h-full min-h-[320px] w-full object-cover" />
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
      {/* Contact info */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Contact Us</h2>
        <p className="mt-4 max-w-3xl text-gray-600">
          Eman Hospital is a trusted private healthcare center in Multan, offering specialist
          consultations, diagnostics, emergency support, surgical care, and patient-first service for
          families across Multan and South Punjab.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="font-semibold text-primary">Address</h3>
            <p className="mt-2 text-sm text-gray-700">
              Near Street No. 10, Zakriya Town, Multan 60000, Pakistan
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="font-semibold text-primary">Phone</h3>
            <p className="mt-2 text-sm text-gray-700">
              <a href="tel:+92616218623" className="hover:text-primary">061-6218623</a> /{" "}
              <a href="tel:+923257105960" className="hover:text-primary">0325-7105960</a>
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="font-semibold text-primary">Email</h3>
            <p className="mt-2 text-sm text-gray-700">
              <a href="mailto:info@emanhospital.com" className="hover:text-primary">info@emanhospital.com</a>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-primary">Hospital Hours & Emergency Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li><strong>Outpatient (OPD):</strong> 24 Hours / 7 Days (24/7)</li>
              <li><strong>Online Consultation:</strong> Daily slots as per doctor schedule</li>
              <li><strong>Emergency Assistance:</strong> Call anytime for urgent guidance</li>
              <li><strong>Location Served:</strong> Multan and nearby South Punjab areas</li>
            </ul>
            <p className="mt-4 text-sm text-gray-700">
              For urgent concerns, please call our reception immediately so our team can direct you to
              the appropriate department without delay.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <iframe
              title="Eman Hospital location map"
              src="https://www.google.com/maps?q=Eman+Hospital,+Near+Street+No.+10,+Zakriya+Town,+60000,+Pakistan&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4">
              <a
                href="https://www.google.com/maps/place/Eman+Hospital/@30.2266723,71.4849201,1408m/data=!3m1!1e3!4m6!3m5!1s0x393b359b1a564e21:0xe104250028398951!8m2!3d30.2288246!4d71.4835642!16s%2Fg%2F11v0bc5mlp?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Open directions in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceLocationPage({
  title,
  subtitle,
  highlights,
  ctaHref,
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-bold text-primary md:text-4xl">{title}</h1>
      <p className="mt-4 text-gray-700">{subtitle}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <div key={item} className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link to={ctaHref}>Contact Us</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/online-consultation">Online Consultation</Link>
        </Button>
      </div>
    </section>
  );
}

function GynecologyMultanPage() {
  return (
    <ServiceLocationPage
      title="Gynecology Care in Multan"
      subtitle="Eman Hospital offers comprehensive women’s healthcare in Multan including routine gynecology care, pregnancy support, infertility evaluation, and minimally invasive gynecologic procedures."
      highlights={[
        "Antenatal and postnatal care with maternal safety-focused monitoring",
        "Evaluation and treatment for PCOS, irregular periods, heavy bleeding, and hormonal disorders",
        "High-risk pregnancy consultation and delivery planning",
        "Infertility counseling and stepwise reproductive health assessment",
        "Screening support for cervical and gynecologic health concerns",
        "Patient-centered care for adolescents, reproductive age, and post-menopausal women",
      ]}
      ctaHref="/contact"
    />
  );
}

function CardiologyMultanPage() {
  return (
    <ServiceLocationPage
      title="Cardiology Services in Multan"
      subtitle="At Eman Hospital Multan, our cardiology services focus on early heart disease detection, blood pressure and cholesterol control, symptom evaluation, and long-term heart health management."
      highlights={[
        "Chest pain and breathlessness evaluation with timely clinical triage",
        "Hypertension and cardiovascular risk factor optimization",
        "Palpitation and rhythm-related symptom consultation",
        "Preventive heart health planning for diabetes and family-history risk",
        "Lifestyle counseling for cholesterol, weight, and cardiac wellness",
        "Follow-up care pathways for chronic cardiac conditions",
      ]}
      ctaHref="/contact"
    />
  );
}

function EntEmergencyMultanPage() {
  return (
    <ServiceLocationPage
      title="ENT Emergency Care in Multan"
      subtitle="Our ENT emergency pathway supports rapid assessment for severe ear pain, uncontrolled nose bleeding, sudden voice or swallowing difficulty, and airway-related ENT concerns."
      highlights={[
        "Rapid triage for persistent nose bleeding and traumatic ENT injuries",
        "Urgent evaluation for sudden hearing reduction, severe vertigo, and ear discharge",
        "Throat infection complications including dehydration, high fever, and painful swallowing",
        "Snoring and sleep-breathing escalation screening when acute respiratory symptoms are present",
        "Consultant-led referral coordination for imaging, lab work, and procedural intervention",
        "Clear discharge advice with warning signs and follow-up instructions",
      ]}
      ctaHref="/contact"
    />
  );
}

function SameDayUltrasoundMultanPage() {
  return (
    <ServiceLocationPage
      title="Same-Day Ultrasound in Multan"
      subtitle="Eman Hospital provides same-day ultrasound support for abdominal pain, obstetric review, urinary concerns, and physician-directed follow-up imaging when clinical urgency is high."
      highlights={[
        "Same-day slot allocation for clinically urgent scans when available",
        "Abdominal, pelvic, thyroid, renal, and soft-tissue ultrasound pathways",
        "Pregnancy viability, growth, and routine obstetric scan coordination",
        "Doppler-based vascular assessment in selected cases",
        "Faster clinical communication to the treating consultant",
        "Action-oriented guidance for next steps after report completion",
      ]}
      ctaHref="/contact"
    />
  );
}

function PediatricCareMultanPage() {
  return (
    <ServiceLocationPage
      title="Pediatric Care in Multan"
      subtitle="Our pediatric team supports newborn, infant, child, and adolescent health with focused care for fever, nutrition, growth, vaccination planning, and developmental wellbeing."
      highlights={[
        "Age-specific fever and respiratory infection care plans",
        "Growth monitoring with nutrition and feeding guidance",
        "Childhood asthma, allergy, and recurrent infection review",
        "Vaccination counseling and catch-up immunization support",
        "Development and school-health concern screening",
        "Parent education for home warning signs and timely follow-up",
      ]}
      ctaHref="/contact"
    />
  );
}

function DiabetesCareMultanPage() {
  return (
    <ServiceLocationPage
      title="Diabetes Care in Multan"
      subtitle="Our Endocrinology and Diabetology services focus on practical blood sugar control, complication prevention, and long-term metabolic health for adults and high-risk patients."
      highlights={[
        "Structured diabetes diagnosis and individualized medication optimization",
        "HbA1c-based follow-up plans with realistic milestone targets",
        "Diet, sleep, and physical activity plans for sustainable control",
        "Kidney, nerve, eye, and heart risk reduction counseling",
        "Thyroid and hormone disorder co-management when needed",
        "Education for hypoglycemia safety and self-monitoring practices",
      ]}
      ctaHref="/contact"
    />
  );
}

function PhysiotherapyMultanPage() {
  return (
    <ServiceLocationPage
      title="Physiotherapy & Rehabilitation in Multan"
      subtitle="Our physiotherapy programs are designed for pain relief, mobility restoration, post-operative strengthening, and long-term musculoskeletal wellness."
      highlights={[
        "Personalized plans for back, neck, and joint pain syndromes",
        "Post-injury and post-operative rehabilitation protocols",
        "Sports recovery, flexibility, and return-to-activity support",
        "Neuromuscular re-education and gait training",
        "Home-exercise prescriptions with progression milestones",
        "Fall prevention and mobility safety guidance for seniors",
      ]}
      ctaHref="/contact"
    />
  );
}

function HealthLibraryPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-bold text-primary md:text-4xl">Health Library</h1>
      <p className="mt-4 max-w-3xl text-gray-700">
        Medically reviewed patient education articles by Eman Hospital consultants. This content is
        for awareness and prevention, and does not replace emergency or in-person medical care.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {healthArticles.map((article) => (
          <article key={article.slug} className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-primary/80">
              {article.department} • Reviewed by {article.author}
            </p>
            <h2 className="mt-3 text-lg font-semibold text-gray-900">{article.title}</h2>
            <p className="mt-3 text-sm text-gray-700">{article.excerpt}</p>
            <p className="mt-3 text-xs text-gray-500">Approx. {article.readMinutes} min read</p>
            <Button asChild size="sm" className="mt-4">
              <Link to={`/health-library/${article.slug}`}>Read article</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function HealthArticlePage() {
  const { slug } = useParams();
  const article = healthArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return <Navigate to="/health-library" replace />;
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
        {article.department} • Reviewed by {article.author} • {article.reviewedDate}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-primary md:text-4xl">{article.title}</h1>
      <p className="mt-4 text-gray-700">{article.excerpt}</p>

      <div className="mt-8 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border bg-gray-50 p-5 text-sm text-gray-700">
        <strong>Medical disclaimer:</strong> This article is educational and is not a substitute for
        diagnosis, emergency care, or individualized treatment. If symptoms are severe, worsening, or
        prolonged, contact emergency services or visit the hospital promptly.
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------
  Root App
--------------------------------------------------------------------*/
export default function App() {
  return (
    <Router>
      <SeoManager />
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
          <Route path="health-library" element={<HealthLibraryPage />} />
          <Route path="health-library/:slug" element={<HealthArticlePage />} />
          <Route path="gynecology-multan" element={<GynecologyMultanPage />} />
          <Route path="cardiology-multan" element={<CardiologyMultanPage />} />
          <Route path="ent-emergency-multan" element={<EntEmergencyMultanPage />} />
          <Route path="same-day-ultrasound-multan" element={<SameDayUltrasoundMultanPage />} />
          <Route path="pediatric-care-multan" element={<PediatricCareMultanPage />} />
          <Route path="diabetes-care-multan" element={<DiabetesCareMultanPage />} />
          <Route path="physiotherapy-multan" element={<PhysiotherapyMultanPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
