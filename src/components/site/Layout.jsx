import React, { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Menu, X, Stethoscope, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import OnlineConsultButton from "@/components/OnlineConsultButton";
import { doctors, navLinks, seoConfig, SITE_URL, SOCIAL_PROFILES, topConsultants, localServicePages, healthArticles } from "@/data/siteContent";

export function Layout() {
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

export function SeoManager() {
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
