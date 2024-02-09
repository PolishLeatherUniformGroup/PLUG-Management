
'use client';
import { Link, Tab, Tabs } from "@nextui-org/react";
import {usePathname} from "next/navigation";
import { useEffect, useState } from "react";

export default function MembersTabs(){
    const pathname = usePathname();
  

    const basePathProcess = function(path:string){
        const splitted = path.split("/");
        const length = splitted.length;
        if(length ==1){
            return {path, length};
        }
        if(length == 2){
            return {path, length};
        }
        const r=splitted.slice(0,3).join("/");
        return {path:r,length};
    }
    let {path} = basePathProcess(pathname);

    return(
        <>
        <Tabs radius="md" size="lg" selectedKey={path} color="secondary" variant="bordered" className="text-3xl mx-auto">
            <Tab key="/members" title="Aktualności"  href="/members" as={Link} />
            <Tab key="/members/my-data" title="Moje dane" href="/members/my-data" as={Link}/>
            <Tab key="/members/my-settings" title="Ustawienia" href="/members/my-settings" as={Link}/>
        </Tabs> 
        </>  
        );
}