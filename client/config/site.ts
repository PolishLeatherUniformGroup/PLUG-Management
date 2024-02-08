export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    navItems: [
        {
            label: "Home",
            href: "/",
            isExternal: false,
            isProtected: false,
        },
        {
            label: "Stowarzyszenie",
            href: "/association",
            isExternal: false,
            isProtected: false,
        },
        {
            label: "Dołącz do nas",
            href: "/apply-form",
            isExternal: false,
            isProtected: false,
        },
        {
            label: "Wydarzenia",
            href: "/events",
            isExternal: false,
            isProtected: false,
        }, {
            label: "Partnerzy",
            href: "/partners",
            isExternal: false,
            isProtected: false,
        },
        {
            label: "Strefa członka",
            href: "/members",
            isExternal: false,
            isProtected: false,
        },
        {
            label: "Zarządazanie",
            href: "/admin",
            isExternal: false,
            isProtected: true,
        }

    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
};