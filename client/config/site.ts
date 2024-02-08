export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Next.js + NextUI",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Start",
            href: "/",
        },
        {
            label: "Deklaracje członkowskie",
            href: "/apply/applicants",
        },
        {
            label: "Członkowie",
            href: "/membership/members",
        },
        {
            label: "Wydarzenia",
            href: "/eventing",
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