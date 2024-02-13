import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./common/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>
          <div className="text-foreground bg-background gradient-radial text-base">
            <Header />
            <main className="flex min-h-screen mt-3  pt-0 lg:px-24 sm:px-12 xs:px-6" >
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
