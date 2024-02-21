import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./common/header";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strefa Członkowska PLUG",
  description: "Strefa Członkowska Stowarzyszenia Polish Leather Uniform Group",
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
          <SpeedInsights />
          <div className="text-foreground bg-background gradient-radial text-base">
            <Header />
            {process.env.NEXT_TEST_MODE === "true" && (<div className=" block w-3/4 m-2 mx-auto">
                 
                    <div className="w-4/5 mx-auto my-2 p-6 bg-danger-300 dark:bg-danger-200 text-3xl  rounded-lg shadow-lg">
                        <strong>Uwaga!</strong>
                        <p>To jest wersja testowa aplikacji w celu dołączenia do Stowarzyszenia, prosimy korzystać z dotychczasowego formularza zgłoszeniowego
                          dostępnego <a className="underline" href="https://plug.org.pl/zostan-czlonkiem/" target="_blank">tutaj</a>.
                        </p>                   
                  </div>
              </div>)}
            <main className="flex min-h-screen mt-3 w-dvw py-2 lg:px-24 sm:px-12 xs:px-6">            
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
