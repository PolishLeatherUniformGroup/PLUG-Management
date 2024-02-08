'use client';
import { Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function MembersMyDataTabs(){
    const pathname = usePathname();
    return(
        
        <Tabs radius="md" size="lg" selectedKey={pathname} variant="underlined" className="text-3xl mx-auto">
            <Tab key="/members/my-data" title="Historia" href="/members/my-data"/>
            <Tab key="/members/my-data/fees" title="Składki" href="/members/my-data/fees" />
            <Tab key="/members/my-data/recommendations" title="Moje rekomendacje" href="/members/my-data/recommendations" />
        </Tabs>   
        );
}