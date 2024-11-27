"use client";

import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const HotjarInitializer = () => {
    const siteId = 3891462;
    const hotjarVersion = 6;

    useEffect(() => {
        if (process.env.NODE_ENV === "development") return;
        Hotjar.init(siteId, hotjarVersion);
    }, []);

    return null;
};

export default HotjarInitializer;
