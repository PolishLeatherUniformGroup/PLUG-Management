
'use client';
import { Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function MembersTabs(){
    const pathname = usePathname();
    return(
        <Tabs radius="md" size="lg" selectedKey={pathname} color="primary" variant="bordered" className="text-3xl mx-auto">
            <Tab key="/members" title="Aktualności"  href="/members" />
            <Tab key="/members/my-data" title="Moje dane" href="/members/my-data"/>
            <Tab key="/members/my-settings" title="Ustawienia" href="/members/my-settings" />
        </Tabs>   
        );
}