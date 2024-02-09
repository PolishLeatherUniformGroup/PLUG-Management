'use client';
import { Link, Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function AdminTabs(){
    const pathname = usePathname();
    return(
        
        <Tabs radius="md" size="lg" selectedKey={pathname} color="primary" variant="underlined" className="text-3xl ml-0">
            <Tab key="/admin" title="Dashboard"  href="/admin" as={Link} />
            <Tab key="/admin/applicants" title="Wnioski" href="/admin/applicants" as={Link}/>
            <Tab key="/admin/members" title="Członkowie" href="/admin/members"  as={Link} />
            <Tab key="/admin/events" title="Wydarzenia" href="/admin/events" as={Link} />
            <Tab key="/admin/tasks" title="Zadania" href="/admin/tasks" as={Link} />
            <Tab key="/admin/settings" title="Ustawienia" href="/admin/settings" as={Link} />
        </Tabs>   
        );
}