'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { MemberDto } from "../../../models/member.dto";
import { FeeItemDto } from "../../../models/FeeDto";
import { RecommendationItemDto } from "../../../models/recommendation-items";
import { Button, ButtonGroup, Link, Progress, Tab, Tabs } from "@nextui-org/react";
import MemberData from "./member-data";
import MemberFees from "./member-fees";
import MemberRecommendations from "./member-recommendations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default withPageAuthRequired(function Member({ params }: { params: { card: string } }) {
    const [member, setMember] = useState({ loading: true, data: {} as MemberDto });
    const [memberFees, setMemberFees] = useState({ loading: true, data: [] } as { loading: boolean, data: FeeItemDto[] });
    const [memberRecommendations, setMemberRecommendations] = useState({ loading: true, data: [] as RecommendationItemDto[] } as { loading: boolean, data: any[] });

    useEffect(() => {
        fetch(`/api/members/${params.card}`)
            .then((res) => res.json())
            .then((data) => {
                setMember({ loading: false, data });
            });
        fetch(`/api/members/${params.card}/fees`)
            .then((res) => res.json())
            .then((data) => {
                setMemberFees({ loading: false, data });
            });
        fetch(`/api/members/${params.card}/recommendations`)
            .then((res) => res.json())
            .then((data) => {
                setMemberRecommendations({ loading: false, data });
            });
    }, [params.card]);
    const card = params.card;
    return (<>
        <div className="w-full gap-2">
            <ButtonGroup size="sm"  radius="md" className="bg-content2 p-1 rounded-xl mr-1">
                <Button isIconOnly color="default" as={Link} href="/admin/members" radius="sm">
                    <FontAwesomeIcon icon={faLeftLong} />
                </Button>
                <Button color="default" as={Link} radius="sm">Zawieś</Button>
                <Button color="default" as={Link} radius="sm">Wyklucz</Button>
                <Button color="default" as={Link} radius="sm">Wygaś</Button>
            </ButtonGroup>

            <Tabs aria-label="Me">
                <Tab id="my-data" title="Dane">
                    {member.loading && <Progress
                        size="sm"
                        isIndeterminate
                        aria-label="Loading..."
                        className="max-w-full"
                    />}
                    {!member.loading && <MemberData member={member.data} />}
                </Tab>
                <Tab id="my-fees" title="Składki">

                    {!memberFees.loading && <MemberFees fees={memberFees.data} />}
                </Tab>
                <Tab id="my-recommendations" title="Rekomendacje">
                    <MemberRecommendations recommendations={memberRecommendations.data} />
                </Tab>
            </Tabs>
        </div>

    </>)
});