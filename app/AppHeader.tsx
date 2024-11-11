import Head from 'next/head'
import { FC } from 'react'
import { capitalizeFirst } from './lib/capitalizeFirst'

type Props = {
    description?: string
    ogTitle?: string
    ogUrl?: string
    metaDescription?: string
}

const AppHeader: FC<Props> = ({
    description,
    ogTitle,
    ogUrl,
    metaDescription,
}) => {
    const title = `Devino | ${capitalizeFirst(description || "Software Development Company")}`
    const fullOgUrl = ogUrl ? ogUrl : 'https://devino.ca'
    const fullOgImage = `${fullOgUrl}/brand/full_logo.png`
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/brand/logo.png"/>
                <title>{title}</title>
                <meta name="description" content={description || "Software Development Company"}/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={ogTitle ? ogTitle : title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={fullOgImage}/>
                <meta property="og:url" content={fullOgUrl}/>
                <meta property="og:site_name" content="Devino"/>
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={fullOgUrl}/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:description" content={description}/>
                <meta property="twitter:image" content={fullOgImage}/>
                <meta property="twitter:creator" content="@devino_solutions"/>
                <link rel="canonical" href={fullOgUrl}/>
                <meta
                    property="og:title"
                    name="description"
                    content={title}
                    key="title"
                />

                <meta
                    name="description"
                    content={
                        metaDescription
                            ? metaDescription
                            : 'Software Development Company'
                    }
                />

                <meta name="application-name" content="Devino"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="Devino"/>
                <meta
                    name="description"
                    content="Software Development Company"
                />
                <meta name="format-detection" content="telephone=no"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="msapplication-TileColor" content="#2B5797"/>
                <meta name="msapplication-tap-highlight" content="no"/>
                <meta name="theme-color" content="#000000"/>

                <link
                    rel="apple-touch-icon"
                    href="/icons/touch-icon-iphone.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/touch-icon-ipad.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/touch-icon-iphone-retina.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="/icons/touch-icon-ipad-retina.png"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json"/>
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="twitter:card" content="summary"/>
                <meta
                    name="twitter:url"
                    content={ogUrl ? ogUrl : 'https://devino.ca'}
                />
                <meta name="twitter:title" content="Devino"/>
                <meta
                    name="twitter:description"
                    content="Develop with innovation"
                />
                <meta name="twitter:image" content="/og.svg"/>
                <meta name="twitter:creator" content="@devino_solutions"/>
                <meta property="og:type" content="website"/>
                <meta
                    property="og:title"
                    content={ogTitle ? ogTitle : 'Devino'}
                />
                <meta
                    property="og:description"
                    content="Develop with innovation"
                />
                <meta property="og:site_name" content="Devino"/>
                <meta
                    property="og:url"
                    content={ogUrl ? ogUrl : 'https://devino.ca'}
                />
                <meta property="og:image" content="/brand/logo.png"/>
            </Head>
        </>
    )
}

export default AppHeader
