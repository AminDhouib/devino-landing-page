'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'

export const usePageView = () => {
    const pathname = usePathname()

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const handleRouteChange = (url: string) => {
            gtag.pageView(url)
        }

        handleRouteChange(pathname)

    }, [pathname])
}
