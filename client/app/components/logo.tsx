import React from "react";
import Image from "next/image";

export const PlugLogo = () => {
    return(<Image
              src="/logo_black.png"
              alt="PLUG Logo"
              className="dark:invert"
              width={60}
              height={60}
              priority
            />);
}