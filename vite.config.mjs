import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "node:path";
import { pageMetadata, site } from "./site.config.mjs";

const absolute = (path) => `${site.url}${path}`;

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absolute("/#organization"),
    name: site.name,
    legalName: site.legalName,
    url: absolute("/"),
    logo: absolute("/images/npo-logo.png"),
    image: absolute(site.socialImage),
    description: pageMetadata["/"].description,
    email: site.email,
    telephone: site.phoneHref,
    areaServed: "United States",
    founder: {
      "@type": "Person",
      name: "Brendan Bradley",
      jobTitle: "Founder and Grant Strategist",
      url: absolute("/about.html")
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "US"
    },
    knowsAbout: site.knowsAbout,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Grant Growth System services",
      itemListElement: site.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": absolute("/#organization") }
        }
      }))
    }
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function breadcrumbSchema(page) {
  if (!page.breadcrumbs) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.item)
    }))
  };
}

function stagesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Grant Growth System six stages",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: site.ggsStages.length,
    itemListElement: site.ggsStages.map((stage, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: stage.title,
      description: stage.summary,
      url: absolute(`/grant-growth-system.html#${stage.id}`)
    }))
  };
}

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(import.meta.dirname, "partials"),
      helpers: {
        json: (value) => JSON.stringify(value).replace(/</g, "\\u003c")
      },
      context(pagePath) {
        const normalizedPath = pagePath === "/index.html" ? "/" : pagePath;
        const page = pageMetadata[normalizedPath] ?? pageMetadata["/"];
        return {
          site,
          page,
          currentYear: new Date().getFullYear(),
          organizationSchema: normalizedPath === "/" ? organizationSchema() : null,
          faqSchema: normalizedPath === "/" ? faqSchema() : null,
          stagesSchema: normalizedPath === "/grant-growth-system.html" ? stagesSchema() : null,
          breadcrumbSchema: breadcrumbSchema(page)
        };
      }
    })
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        ggs: resolve(import.meta.dirname, "grant-growth-system.html"),
        about: resolve(import.meta.dirname, "about.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
        privacy: resolve(import.meta.dirname, "privacy.html"),
        thankyou: resolve(import.meta.dirname, "thankyou.html"),
        notfound: resolve(import.meta.dirname, "404.html"),
        process: resolve(import.meta.dirname, "process.html")
      }
    }
  }
});
