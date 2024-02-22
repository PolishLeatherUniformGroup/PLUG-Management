'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Member({ params }: { params: { card: string } }) {
    const card = params.card;
    return (<div>{card}</div>);
});