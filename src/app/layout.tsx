import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import ThemeColorUpdater from "@/components/ThemeColorUpdater";
import ProviderComponent from "@/context/Provider";
import { Metadata, Viewport } from "next";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Next.js App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {/* Preload background image */}
        <link rel="preload" href="/images/login/background.jpg" as="image" />
      </Head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}>
        <AuthProvider>
          <ProviderComponent>
            <ThemeColorUpdater />
            {children}
            <Toaster richColors closeButton theme="light" />
          </ProviderComponent>
        </AuthProvider>
      </body>
    </html>
  );
}
