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
            label:'Wnioski',
            href:'/applicants',
            isExternal:false,
            isProtected:true,
        },{
            label:'Członkowie',
            href:'/members',
            isExternal:false,
            isProtected:true,
        }

    ],
    navMenuItems: [
        
    ],
};