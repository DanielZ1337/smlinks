'use client'

import LinkSiteSelector from "@/components/link-site-selector";
import React from "react";
import {Input} from "@nextui-org/react";
import {Link} from "@/types/links";

export default function NewLinkInput({href, site}: { href?: Link["href"], site?: Link["site"] }) {
    const [newLinkSite, setNewLinkSite] = React.useState<Link["site"] | undefined>(site)
    const [newLinkHref, setNewLinkHref] = React.useState<Link["href"] | undefined>(href)

    return (
        <>
            <Input type="text" placeholder="Site" name='site' className={"hidden"} value={newLinkSite || undefined}/>
            <LinkSiteSelector setNewLinkSite={setNewLinkSite} defaultSelected={site}/>
            <label htmlFor="href" className="text-secondary text-sm">Link</label>
            <Input type="text" placeholder="https://example.com/yourusername" name='href' required value={newLinkHref || undefined}/>
        </>
    )
}