'use client';
import { Link, Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function MembersMyDataTabs(){
    const pathname = usePathname();
    const [lastPath]= pathname.split("/members/my-data").slice(-1);
    return(
        <>
        <Tabs radius="md" size="lg" color="primary" selectedKey={lastPath} variant="underlined" className="text-3xl mx-auto">
            <Tab key="" title="Historia" href="/members/my-data" as={Link}/>
            <Tab key="/fees" title="Składki" href="/members/my-data/fees" as={Link}/>
            <Tab key="/recommendations" title="Moje rekomendacje" href="/members/my-data/recommendations" as={Link}/>
        </Tabs>  
        </> 
        );
}