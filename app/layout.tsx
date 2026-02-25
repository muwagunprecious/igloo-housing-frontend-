import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./components/layout/BottomNav";
import EnhancedNavbar from "./components/layout/EnhancedNavbar";
import ToastContainer from "./components/common/Toast";

export const metadata: Metadata = {
  title: "IGLOO - Student Housing Marketplace",
  description: "Find your perfect student accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <EnhancedNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <BottomNav />
        <ToastContainer />
      </body>
    </html>
  );
}
