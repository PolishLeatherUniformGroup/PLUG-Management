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
            label: "Członkowie",
            href: "/members",
            isExternal: false,
            isProtected: true,
            role: 'member'
        },
        {
            label: "Zarządzanie",
            isProtected: true,
            isExternal: false,
            role: 'board',
            children:[ {
                label:'Wnioski',
                description:'Zarządzanie wnioskami o członkostwo',
                href:'/admin/applicants',
                icon: 'faFileLines',
                isExternal:false,
                isProtected:true,
                role: 'board'
            },{
                label:'Członkowie',
                href:'/admin/members',
                description:'Zarządzanie członkami organizacji',
                isExternal:false,
                isProtected:true,
                role: 'board'
            }]
        }       

    ],
    navMenuItems: [
        
    ],
};