import React, { createContext, useContext, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import CookieModal from "@/components/cookie-modal";

export const CookieContext = createContext<CookieContextType>({} as CookieContextType)

type CookieContextType = {
    isOpen: boolean,
    onOpen: () => void,
    onOpenChange: () => void,
    getCookiePermissions: () => CookiePermissions | undefined,
    setCookiePermissions: (cookiePermissions: CookiePermissions) => void,
    saveCookiePermissions: () => void
}

export const DefaultCookiePermissions = {
    necessary: true,
    preferences: true,
    statistics: true
}

export type CookiePermissions = typeof DefaultCookiePermissions

export const useCookieContext = () => useContext(CookieContext)

export const setCookiePermissions = (cookiePermissions: CookiePermissions) => {
    localStorage.setItem('cookiePermissions', JSON.stringify(cookiePermissions))
}

export const saveCookiePermissions = () => {
    const currentCookiePermissions = localStorage.getItem('cookiePermissions')
    if (!currentCookiePermissions) {
        localStorage.setItem('cookiePermissions', JSON.stringify(DefaultCookiePermissions))
    }
}

function getCookiePermissions() {
    const currentCookiePermissions = localStorage.getItem('cookiePermissions')

    if (!currentCookiePermissions) {
        return
    } else {
        return JSON.parse(currentCookiePermissions)
    }
}

export default function CookieProvider({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        if (mounted) {
            const currentCookiePermissions = getCookiePermissions()
            if (!currentCookiePermissions) {
                onOpen()
            }
        }
    }, [mounted, onOpen])
    if (!mounted) return null


    return (
        <CookieContext.Provider value={{
            isOpen,
            onOpen,
            onOpenChange,
            getCookiePermissions,
            setCookiePermissions,
            saveCookiePermissions
        }}>
            {children}
            <CookieModal />
        </CookieContext.Provider>
    )
}