'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Button, Card, CardBody, CardHeader, Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import MyData from "./my-data";

export default withPageAuthRequired(function Me() {
    let tabs = [
        {
            id: "my-data",
            label: "Moje Dane",
            content: <MyData />
        },
        {
            id: "my-fees",
            label: "Składki",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            id: "my-recommendations",
            label: "Moje Rekomendacje",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }

    ];
    return (<>
        <div className="w-full gap-2">
            <Tabs aria-label="Me" items={tabs}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {item.content}
                    </Tab>
                )}
            </Tabs>
        </div>

    </>)
});