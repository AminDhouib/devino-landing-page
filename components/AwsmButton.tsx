"use client";

import { AwesomeButton } from "react-awesome-button";
import { useTheme } from "~/app/lib/context/ThemeContext";
import React from "react";

interface AwsmButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function AwsmButton({ children, className }: AwsmButtonProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <AwesomeButton type={isDark ? "secondary" : "primary"} className={className}>
            {children}
        </AwesomeButton>
    );
}
