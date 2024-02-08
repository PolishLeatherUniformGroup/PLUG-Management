'use client';
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import { Providers } from "./components/providers";
import NavigationBar from "./components/navigation-bar";
import { useEffect, useState } from "react";
import Header from "./components/header";

const inter = Urbanist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>

      <body className={inter.className}>
        <Providers>
          <div className="plug-dark text-foreground bg-background text-base">
            <Header />
            <div className="flex min-h-screen w-auto flex-col items-centerjustify-between md:px-24 sm:px-4 bg-foreground text-background">
              {children}
            </div>
          </div>
        </Providers>
      </body>

    </html>
  );
}
