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
    <html lang="pl" suppressHydrationWarning={true}>

      <body className="text-foreground bg-background text-base">
        <div >
          <Providers >
            <SpeedInsights />

            <Header />
            {process.env.NEXT_TEST_MODE === "true" && (<div className="flex min-h-6 mt-1 md:mt-3 w-full py-2 px-2">

              <div className="w-full sm:w-4/5 xl:w-2/3 mx-auto my-2 p-3 bg-danger-300 dark:bg-danger-200 text-base md:text-lg xl:text-2xl rounded-lg shadow-lg">
                <strong>Uwaga!</strong>
                <p>To jest wersja testowa aplikacji w celu dołączenia do Stowarzyszenia, prosimy korzystać z dotychczasowego formularza zgłoszeniowego
                  dostępnego <a className="underline" href="https://plug.org.pl/zostan-czlonkiem/" target="_blank">tutaj</a>.
                </p>
              </div>
            </div>)}
            <main className="flex min-h-screen mt-3 w-full py-2 px-6 sm:px-3 xs:px-1">

              {children}
            </main>

          </Providers>
        </div>
      </body>

    </html>
  );
}
