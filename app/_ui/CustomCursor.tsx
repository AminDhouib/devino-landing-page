"use client";

import React, { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function CustomCursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const checkTouchSupport = () => {
        if (typeof window !== "undefined") {
            // Check if the device supports touch input
            const hasTouchSupport =
                "ontouchstart" in window || navigator.maxTouchPoints > 0;
            setIsTouchDevice(hasTouchSupport);
        }
    };

    useEffect(() => {
        // Initial check
        checkTouchSupport();

        // Add resize listener
        window.addEventListener("resize", checkTouchSupport);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", checkTouchSupport);
        };
    }, []);

    // Do not render the cursor for touch devices
    if (isTouchDevice) {
        return null;
    }

    return (
        <AnimatedCursor
            trailingSpeed={1}
            innerSize={10}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
                backgroundColor: 'var(--cursor-color)',
                mixBlendMode: 'exclusion'
            }}
            outerStyle={{
                border: '3px solid var(--cursor-color)',
                mixBlendMode: 'exclusion'

            }}
        />
    );
}
