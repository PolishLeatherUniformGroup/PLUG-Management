import {
    Button,
    Link,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
    Navbar,
} from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useUser } from '@auth0/nextjs-auth0/client';
import { User, Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
    const { user, error, isLoading } = useUser();
    const pathname = usePathname();
    return (
        <NextUINavbar maxWidth="2xl" position="sticky" isBordered className="shadow-lg bg-primary ">

            <NavbarContent className="hidden sm:flex gap-4" justify="start" >
                {siteConfig.navItems.map((item) => {
                    const selected = item.href === pathname;
                    if (item.isProtected && user === undefined) {
                        return null;
                    } else {
                        return (
                            <NavbarItem key={item.href}>
                                <NextLink
                                    className={clsx(
                                        linkStyles({ color: "foreground" }),
                                        "data-[active=true]:text-primary text-base data-[active=true]:font-medium"
                                    )}
                                    color="foreground"
                                    href={item.href}
                                >
                                    {item.label}
                                </NextLink>
                            </NavbarItem>
                        );
                    }
                })}
            </NavbarContent>
            <NavbarContent justify="end">
                {user !== undefined && (<NavbarItem>
                    <Button
                        as={Link}
                        href="api/auth/logout" variant="flat" size="lg" color="primary" className="light text-primary">Wyloguj się</Button>
                </NavbarItem>)
                }
                {user === undefined && (<NavbarItem>
                    <Button
                        as={Link}
                        href="api/auth/login" variant="flat" size="lg" color="primary" className="light text-primary">Login</Button>
                </NavbarItem>)
                }
            </NavbarContent>
        </NextUINavbar>
    );
};
