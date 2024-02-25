'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Progress, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import MyData from "./my-data";
import { MemberDto } from "@/app/models/member.dto";
import MyFees from "./my-fees";
import { FeeItemDto } from "@/app/models/FeeDto";
import MyRecommendations from "./my-recommendations";
import { RecommendationItemDto } from "@/app/models/recommendation-items";

export default withPageAuthRequired(function Me() {

    const [me, setMe] = useState({ loading: true, data: {} as MemberDto });
    const [myFees, setMyFees] = useState({ loading: true, data: [] } as { loading: boolean, data: FeeItemDto[] });
    const [myRecommendations, setMyRecommendations] = useState({ loading: true, data: [] as RecommendationItemDto[] } as { loading: boolean, data: any[] });
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
        fetch(`/api/members/me/recommendations`)
            .then((res) => res.json())
            .then((data) => {
                setMyRecommendations({ loading: false, data });
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
                <Tab id="my-recommendations" title="Moje rekomendacje">
                    <MyRecommendations  recommendations={myRecommendations.data}/>
                </Tab>
            </Tabs>
        </div>

    </>)
});