'use client'

import {Button} from "@nextui-org/react";
import {addNewLink} from "@/lib/actions";
import NewLinkInput from "@/components/new-link-input";
import {SaveButton} from "@/components/form-button";
import React from "react";
import {Link} from "@/types/links";

export default function SitesForm({currentLinks}: { currentLinks: Link[] | null }) {
    const exists = currentLinks !== null

    const [linksCount, setLinksCount] = React.useState(exists ? currentLinks!.length : 1)

    return (
        <>
            <div className="flex flex-row gap-2">
                <Button color={"success"} variant={"faded"} onClick={() => setLinksCount((prevState) => prevState + 1)}>
                    Add Link
                </Button>
                <Button color={"danger"} variant={"faded"} onClick={() => setLinksCount((prevState) => prevState - 1)}>
                    Remove Link
                </Button>
                <Button color={"warning"} variant={"faded"} onClick={() => setLinksCount(1)}>
                    Reset
                </Button>
            </div>
            <form className="flex flex-col gap-2" action={addNewLink}>
                {[...Array(linksCount)].map((_, i) => (
                    <div className="flex flex-col gap-2" key={Math.random() * 1000}>
                        <h6 className={"text-shdcnmuted-shdcnforeground"}>Link #{i + 1}</h6>
                        <NewLinkInput href={currentLinks ? currentLinks[i]?.href : undefined}
                                      site={currentLinks ? currentLinks[i]?.site : undefined}/>
                    </div>
                ))}
                <SaveButton/>
            </form>
        </>
    )
}