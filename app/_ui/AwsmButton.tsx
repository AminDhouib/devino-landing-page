"use client";

import { AwesomeButton } from "react-awesome-button";
import { useTheme } from "~/app/lib/context/ThemeContext";
import React from "react";

interface AwsmButtonProps {
    children: React.ReactNode;
}

export default function AwsmButton({ children }: AwsmButtonProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (

        <AwesomeButton type={isDark ? "secondary" : "primary"}>
            {children}
        </AwesomeButton>
    );
}
