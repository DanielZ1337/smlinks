import {Card} from "@nextui-org/card";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import getLinksByProfileID from "@/lib/hooks/server/getLinksByProfileID";
import SitesForm from "@/components/sites-form";

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/signin')
    }

    const currentLinks = await getLinksByProfileID(session.user.id)

    return (
        <div className={"flex flex-col items-center"}>
            <Card className={'flex flex-col items-center gap-2 p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'}>
                <div className="flex flex-col items-center gap-2 w-full">
                    {/*<h1>Profile</h1>
                    <h2>{session.user.name}</h2>
                    <h6>{session.user.email}</h6>
                    <Avatar src={session.user.image!} alt="Profile Image"/>*/}
                    <div className="flex flex-col gap-2">
                        <h1 className={'text-2xl font-bold'}>You are now editing your profile</h1>
                        <h2 className={'text-muted'}>Add a new link to your profile.</h2>
                        <SitesForm currentLinks={currentLinks}/>
                    </div>
                </div>
            </Card>
        </div>
    )
}