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
} from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon,ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useUser } from '@auth0/nextjs-auth0/client';
import { User, Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { PlugLogo } from "./logo";

export default function NavigationBar() {
    const { user, error, isLoading } = useUser();
    return (
        <NextUINavbar maxWidth="xl" position="sticky" isBordered className="drop-shadow-md">
            <NavbarContent className="basis-1/5 sm:basis-full p-2" justify="start">
                <NavbarBrand className="gap-3 max-w-fit p-2">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <PlugLogo />
                        <p className="font-thin text-inherit text-3xl m-1 p-1">PLUG</p>
                    </NextLink>
                </NavbarBrand>

                <div className="hidden lg:flex gap-4 justify-start ml-2">
                    {user && siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">

                {!user && (<NavbarItem className="hidden md:flex">
                    <Button
                        as={Link}
                        color="primary"
                        href="/api/auth/login"
                        startContent={<ArrowRightEndOnRectangleIcon className="h-6 w-6" />}
                        variant="flat"
                    >
                        Login
                    </Button>
                </NavbarItem>)}
                {user && (
                    
                    <NavbarItem>
                          <User
                                name={`${user.name}`}
                                description={`${user.nickname}`}
                                avatarProps={{
                                    src: `${user.picture}`,
                                    name: `${user.name}`
                                }}
                                className="p-2 m-3"
                            /> 
                            
                            <Button
                        as={Link}
                        color="danger"
                        href="api/auth/logout"
                        startContent={<ArrowLeftStartOnRectangleIcon className="h-10 w-10" />}
                        variant="bordered"
                    >
                        Login
                    </Button>
                    </NavbarItem>
                
                )}
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? "primary"
                                        : index === siteConfig.navMenuItems.length - 1
                                            ? "danger"
                                            : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
