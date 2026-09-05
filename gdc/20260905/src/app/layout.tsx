import type { Metadata } from "next";
import { Special_Elite, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Marlowe Affair — A Murder-Mystery Experience",
  description:
    "An immersive noir murder-mystery booking experience. Examine the dossier, trace the red-string connections, and join the game.",
  keywords: [
    "murder mystery",
    "noir",
    "detective",
    "booking",
    "immersive theatre",
    "whodunit",
  ],
  authors: [{ name: "The Marlowe Bureau" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "The Marlowe Affair",
    description: "A noir murder-mystery experience. Join the game.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${specialElite.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
