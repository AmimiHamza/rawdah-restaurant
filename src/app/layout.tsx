import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import LanguagePicker from "@/components/LanguagePicker";

export const metadata: Metadata = {
  title: "Amimi Digital | عميمي ديجيتال — Restaurant Websites That Convert",
  description: "We build luxury, bilingual restaurant websites with smart dashboards, online reservations, and seamless payments. Serving Saudi Arabia & GCC.",
  keywords: ["restaurant website design", "luxury restaurant website", "Saudi restaurant website", "موقع مطعم احترافي", "تصميم مواقع مطاعم"],
  openGraph: {
    title: "Amimi Digital — Restaurant Websites That Convert",
    description: "We build luxury bilingual restaurant websites with dashboards and reservations.",
    type: "website",
    siteName: "Amimi Digital",
  },
  robots: { index: true, follow: true },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amimi Digital",
  alternateName: "عميمي ديجيتال",
  description: "Luxury restaurant website design and development agency serving Saudi Arabia and GCC.",
  url: "https://amimi.digital",
  areaServed: ["SA", "AE", "QA", "KW", "BH", "OM"],
  serviceType: "Web Design & Development",
  founder: { "@type": "Person", name: "Hamza Amimi", familyName: "عميمي" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <LanguagePicker />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
