'use client'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <><UserProvider>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute="class" defaultTheme="system" enableSystem >
                    <ReCaptchaProvider>
                        {children}
                    </ReCaptchaProvider>
                </NextThemesProvider>
            </NextUIProvider>
        </UserProvider>
        </>
    )
}