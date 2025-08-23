"use client";
import { Nunito } from "next/font/google";

import "../globals.css";
import ToastProvider from "@/provider/ToastProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${nunito.variable}`}>
      <body className="font-nunito">
        <div className="flex min-h-screen flex-col">
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  );
}
