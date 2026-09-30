import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import {
  generateSoftwareAppSchema,
  generateOrganizationSchema,
  generateProductSchema
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    template: "%s | Ironix",
    default: "Ironix — Train with Purpose. Progress with Proof.",
  },
  description: "Premium AI-powered fitness app with offline workout logging, 3D muscle anatomy, digital GymID pass, and gamified battlecards.",
  metadataBase: new URL("https://ironix.app"),
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/assets/logo.png" }
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appSchema = generateSoftwareAppSchema();
  const orgSchema = generateOrganizationSchema();
  const productSchema = generateProductSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
