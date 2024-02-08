'use client';
import { Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function AssociationTabs(){
    const pathname = usePathname();
    return(
        
        <Tabs radius="md" size="lg" selectedKey={pathname} color="secondary" variant="bordered" className="text-3xl">
            <Tab key="/association" title="O Stowarzyszeniu"  href="/association" />
            <Tab key="/association/history" title="Historia" href="/association/history"/>
            <Tab key="/association/management" title="Władze" href="/association/management" />
            <Tab key="/association/contact" title="Kontakt" href="/association/contact"/>
        </Tabs>   
        );
}