import { Inter } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/state/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce App",
  description: "A simple e-commerce app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
