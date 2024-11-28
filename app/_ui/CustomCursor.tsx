"use client";

import React, { useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function CustomCursor() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Ensure the component runs only in the browser
        }
    }, []);

    return <AnimatedCursor
                innerSize={8}
                outerSize={35}
                innerScale={1}
                outerScale={2}
                outerAlpha={0}
                innerStyle={{
                    backgroundColor: 'var(--cursor-color)'
                }}
                outerStyle={{
                    border: '3px solid var(--cursor-color)',
                }}
            />;
}
