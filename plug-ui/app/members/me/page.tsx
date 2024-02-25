'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Progress, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import MyData from "./my-data";
import { MemberDto } from "@/app/models/member.dto";
import MyFees from "./my-fees";
import { FeeItemDto } from "@/app/models/FeeDto";

export default withPageAuthRequired(function Me() {

    const [me, setMe] = useState({ loading: true, data: {} as MemberDto });
    const [myFees, setMyFees] = useState({ loading: true, data: [] } as { loading: boolean, data: FeeItemDto[] });
    useEffect(() => {
        fetch(`/api/members/me`)
            .then((res) => res.json())
            .then((data) => {
                setMe({ loading: false, data });
            });
        fetch(`/api/members/me/fees`)
            .then((res) => res.json())
            .then((data) => {
                setMyFees({ loading: false, data });
            });
    }, []);
    return (<>
        <div className="w-full gap-2">
            <Tabs aria-label="Me">
                <Tab id="my-data" title="Moje Dane">
                    {me.loading && <Progress
                        size="sm"
                        isIndeterminate
                        aria-label="Loading..."
                        className="max-w-full"
                    />}
                    {!me.loading && <MyData member={me.data} />}
                </Tab>
                <Tab id="my-fees" title="Moje składki">
                    
                    {!myFees.loading && <MyFees fees={myFees.data} />}
                </Tab>
            </Tabs>
        </div>

    </>)
});