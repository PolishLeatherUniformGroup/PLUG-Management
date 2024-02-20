'use client'
import {
    Button,
    Link,
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarItem,
    NavbarBrand,
} from "@nextui-org/react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import ThemeSwitcher from "./theme-switcher";

export default function Header() {
    const { user, error, isLoading } = useUser();
    const pathname = usePathname();
    return (
        <NextUINavbar maxWidth="2xl" position="sticky" className="shadow-lg">
            <NavbarBrand>
                <NextLink href="/">
                    <Image src="/next.svg" alt="logo" height={48} width={48} />
                </NextLink>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="start" >

                {siteConfig.navItems.map((item) => {
                    const selected = item.href === pathname;
                    if (item.isProtected && user === undefined) {
                        return null;
                    } else {
                        return (
                            <NavbarItem key={item.href} isActive={selected}>
                                <NextLink
                                    className="data-[active=true]:text-primary text-base data-[active=true]:font-medium"
                                    href={item.href}
                                >{item.label}
                                </NextLink>
                            </NavbarItem>
                        );
                    }
                })}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                {user != undefined && (<NavbarItem>
                    <Button
                        as={Link}
                        href="api/auth/logout" variant="flat" size="lg" color="primary" >Wyloguj się</Button>
                </NavbarItem>)}
                {user == undefined && (<NavbarItem>
                    <Button
                        as={Link}
                        href="api/auth/login" variant="flat" size="lg" color="primary">Login</Button>
                </NavbarItem>)}

            </NavbarContent>
        </NextUINavbar>
    );
};