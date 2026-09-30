import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { generateSoftwareAppSchema, generateOrganizationSchema } from "@/lib/seo/structured-data";
import { getStoreProducts } from "@/lib/pricing/catalogue";
import { APP_CONFIG } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Ironix",
    default: "Ironix — Train with Purpose. Progress with Proof.",
  },
  description: APP_CONFIG.description,
  metadataBase: new URL(APP_CONFIG.url),
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appSchema = generateSoftwareAppSchema(await getStoreProducts());
  const orgSchema = generateOrganizationSchema();

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
