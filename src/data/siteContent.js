export const localServicePages = [
  { slug: "gynecology-multan", label: "Gynecology in Multan" },
  { slug: "cardiology-multan", label: "Cardiology in Multan" },
  { slug: "ent-emergency-multan", label: "ENT Emergency in Multan" },
  { slug: "same-day-ultrasound-multan", label: "Same-Day Ultrasound in Multan" },
  { slug: "pediatric-care-multan", label: "Pediatric Care in Multan" },
  { slug: "diabetes-care-multan", label: "Diabetes Care in Multan" },
  { slug: "physiotherapy-multan", label: "Physiotherapy in Multan" },
];

export const healthArticles = [
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

const ROUTE_LASTMOD = "2026-02-05";

export const sitemapRoutes = [
  "/",
  "/departments",
  "/doctors",
  "/online-consultation",
  "/reports",
  "/health-library",
  "/contact",
  ...localServicePages.map((page) => `/${page.slug}`),
].map((path) => ({ path, lastmod: ROUTE_LASTMOD }));

export const sitemapArticleRoutes = healthArticles.map((article) => ({
  path: `/health-library/${article.slug}`,
  lastmod: article.reviewedDate,
}));
