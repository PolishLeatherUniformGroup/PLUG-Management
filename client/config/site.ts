export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    navItems: [
        {
            label: "Home",
            href: "/",
            isExternal: false,
        },
        {
            label: "Stowarzyszenie",
            href: "/association",
            isExternal: false,
        },
        {
            label: "Dołącz do nas",
            href: "/apply-form",
            isExternal: false,
        },
        {
            label: "Wydarzenia",
            href: "/events",
            isExternal: false,
        }, {
            label: "Partnerzy",
            href: "/partners",
            isExternal: false,
        },
        {
            label: "Strefa członka",
            href: "/members",
            isExternal: false,
        },
        {
            label: "Zarządazanie",
            href: "/admin",
            isExternal: false,
        },
        {
            label: "Communities",
            href: "/communities",
            isExternal: false,
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