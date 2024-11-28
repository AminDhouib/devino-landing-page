"use client";

import React, { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function CustomCursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check if the device supports touch input
            const hasTouchSupport =
                "ontouchstart" in window || navigator.maxTouchPoints > 0;
            setIsTouchDevice(hasTouchSupport);
        }
    }, []);

    // Do not render the cursor for touch devices
    if (isTouchDevice) {
        return null;
    }

    return (
        <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
                backgroundColor: 'var(--cursor-color)',
            }}
            outerStyle={{
                border: '3px solid var(--cursor-color)',
            }}
        />
    );
}
