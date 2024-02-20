'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UserProvider>
                <NextUIProvider>
                    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem >
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </UserProvider>
        </>
    )
}