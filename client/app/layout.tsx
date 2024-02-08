'use client';
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import NavigationBar from "./components/navigation-bar";
import { useEffect, useState } from "react";

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
          <div className="plug-light text-foreground bg-background text-base">
            <NavigationBar />
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
              {children}
            </div>
          </div>
        </Providers>
      </body>

    </html>
  );
}
