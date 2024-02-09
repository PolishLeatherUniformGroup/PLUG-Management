'use client';
import { Link, Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function AssociationTabs(){
    const pathname = usePathname();
    return(
        
        <Tabs radius="md" size="lg" selectedKey={pathname} color="secondary" variant="bordered" className="text-3xl mx-auto">
            <Tab key="/association" title="O Stowarzyszeniu"  href="/association" as={Link}/>
            <Tab key="/association/history" title="Historia" href="/association/history" as={Link}/>
            <Tab key="/association/management" title="Władze" href="/association/management"  as={Link}/>
            <Tab key="/association/documents" title="Dokumenty" href="/association/documents"  as={Link}/>
            <Tab key="/association/contact" title="Kontakt" href="/association/contact" as={Link}/>
        </Tabs>   
        );
}