import {redisClient} from '@/lib/redis'
import React, {Suspense} from 'react'
import {User} from "next-auth";
import {Card} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar";
import SocialMediaLink from "@/components/social-media-link";
import {GithubIcon, LinkedinIcon} from "lucide-react";
import {IoLogoGoogle} from "react-icons/io";
import {sites} from "@/lib/link-site-providers";
import UserProfileLinks from "@/components/user-profile-links";
import {Skeleton} from "@nextui-org/react";

/*export async function generateStaticParams() {
    const users = await redisClient.smembers('users')
    return users.map(user => ({params: {id: user}}))
}*/

const socialMediaLinks = [
    {
        name: "Github",
        url: "https://github.com/brandonharrisondev",
        icon: <IoLogoGoogle/>
    },
    {
        name: "Twitter",
        url: "https://twitter.com/brandonharrison",
        icon: <GithubIcon/>
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/brandonharrisondev",
        icon: <LinkedinIcon/>
    },
]

export default async function Page({params}: { params: { id: string } }) {
    const user = await redisClient.get(`user:${params.id}`) as User

    if (!user) {
        throw new Error('User Not Found')
    }

    return (
        <div className={"flex flex-col items-center"}>
            <Card
                className={"px-4 py-10 flex flex-col items-center gap-2 lg:w-1/3 xl:w-1/4 md:w-1/2 w-full lg:px-10 md:px-5"}>
                <Avatar src={user.image!}
                        className={"h-auto xl:w-1/5 md:w-1/5 w-1/4 lg:w-1/3 border-[4px] border-secondary mb-[21px]"}/>
                <h1 className={"lg:text-2xl text-xl font-bold text-foreground"}>{user.name}</h1>
                <h2 className={"lg:text-lg text-base font-medium text-shdcnmuted-shdcnforeground overflow-ellipsis break-all"}>{user.email}</h2>
                <Suspense fallback={<div>Loading...</div>}>
                    <UserProfileLinks id={params.id}/>
                </Suspense>
            </Card>
        </div>
    )
}
