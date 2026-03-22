import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/theme-context";
import { WalletProvider } from "./context/wallet-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadowWork — Anonymous bounties",
  description:
    "Privacy-first bounty marketplace. Skill—not identity—determines success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Script id="shadowwork-theme-init" strategy="beforeInteractive">
        {`(function(){try{var t=localStorage.getItem("shadowwork-theme");var dark=t!=="light";document.documentElement.classList.toggle("dark",dark);}catch(e){document.documentElement.classList.add("dark");}})();`}
      </Script>
      <body className="relative z-0 flex min-h-full flex-col bg-background text-text-primary">
        <ThemeProvider>
          <WalletProvider>
            <Navbar />
            <main className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-1 flex-col pt-[4.25rem]">
              {children}
            </main>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
