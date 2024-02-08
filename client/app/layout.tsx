'use client';
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
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
          <div className="text-foreground bg-background text-base">
            <Header />
            <div className="flex min-h-screen w-auto flex-col items-centerjustify-between md:px-24 sm:px-4">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
