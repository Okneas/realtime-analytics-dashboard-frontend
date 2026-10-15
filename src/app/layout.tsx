import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Realtime Analytics Dashboard",
  description: "Collaborative analytics dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
