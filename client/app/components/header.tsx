import React from "react";
import Image from "next/image";
import { Navbar } from "@nextui-org/react";
import NavigationBar from "./navigation-bar";

export default function Header() {
    return (
        <>
            {/*<header className="m-0 p-0">
                <div className="bg-gray-600">
                    <Image src="/plug.png" alt="PLUG" width={192} height={192} className=" mx-auto py-2 lg:h-150 lg:w-150 md:h-80 md:w-80" />
                </div>

    </header*/}
            <NavigationBar />
        </>
    );
}
