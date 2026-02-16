import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { FileDown, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import OnlineConsultation from "@/pages/OnlineConsultation";
import { DoctorsGrid } from "@/components/site/DoctorsGrid";
import { departments, departmentDetails, doctors, services, reports, localServicePages, healthArticles } from "@/data/siteContent";

export function Home() {
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

export function Departments() {
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

export function DepartmentDetailPage() {
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

export function DoctorsPage() {
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

export function ReportsPage() {
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

export function Contact() {
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

export function ServiceLocationPage({
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

export function GynecologyMultanPage() {
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

export function CardiologyMultanPage() {
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

export function EntEmergencyMultanPage() {
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

export function SameDayUltrasoundMultanPage() {
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

export function PediatricCareMultanPage() {
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

export function DiabetesCareMultanPage() {
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

export function PhysiotherapyMultanPage() {
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

export function HealthLibraryPage() {
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

export function HealthArticlePage() {
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


export function ContentAdminPage() {
  const sections = [
    { name: "Doctors", count: doctors.length, file: "src/data/siteContent.js" },
    { name: "Departments", count: departments.length, file: "src/data/siteContent.js" },
    { name: "Health Library Articles", count: healthArticles.length, file: "src/data/siteContent.js" },
    { name: "Local Service Pages", count: localServicePages.length, file: "src/data/siteContent.js" },
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Content Admin</h1>
      <p className="mt-3 text-gray-600">
        Non-developer staff can update core website content through structured data modules.
        Update the listed sections in <code className="rounded bg-gray-100 px-1 py-0.5">src/data/siteContent.js</code> and redeploy.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((item) => (
          <div key={item.name} className="rounded-2xl border p-4">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="mt-1 text-sm text-gray-600">Entries: {item.count}</p>
            <p className="mt-1 text-xs text-gray-500">Source: {item.file}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
