import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Rawdah — Fine Dining Riyadh | روضة مطعم راقٍ الرياض",
  description:
    "Rawdah is Riyadh's premier fine-dining destination, celebrating Saudi heritage ingredients through contemporary French technique. Reserve your table today.",
  keywords: [
    "fine dining Riyadh",
    "luxury restaurant Saudi Arabia",
    "مطعم راقٍ الرياض",
    "best restaurant Riyadh",
    "private dining Riyadh",
    "Saudi cuisine fine dining",
  ],
  openGraph: {
    title: "Rawdah — Fine Dining Riyadh",
    description: "Where Saudi Heritage Meets Contemporary Mastery.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    siteName: "Rawdah Restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawdah — Fine Dining Riyadh",
    description: "Where Saudi Heritage Meets Contemporary Mastery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Rawdah",
  alternateName: "روضة",
  description:
    "Riyadh's premier fine-dining restaurant celebrating Saudi heritage through contemporary mastery.",
  servesCuisine: ["Saudi", "French", "Contemporary"],
  priceRange: "$$$$",
  currenciesAccepted: "SAR",
  paymentAccepted: "Credit Card, Mada, Apple Pay",
  address: {
    "@type": "PostalAddress",
    streetAddress: "King Fahd Road, Olaya District",
    addressLocality: "Riyadh",
    postalCode: "12211",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.6877",
    longitude: "46.6921",
  },
  telephone: "+966-11-XXX-XXXX",
  url: "https://rawdah.sa",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "12:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "19:00",
      closes: "00:00",
    },
  ],
  hasMap: "https://maps.google.com/?q=Rawdah+Restaurant+Riyadh",
  acceptsReservations: "True",
  starRating: { "@type": "Rating", ratingValue: "5" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
