import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CardsProvider } from "@/app/context/CardContext";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Black Jack",
  description: "Cards Game",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CardsProvider>{children}</CardsProvider>
        <Footer />
      </body>
    </html>
  );
}
