"use client";

import { AwesomeButton } from "react-awesome-button";
import { useTheme } from "~/app/lib/context/ThemeContext";
import React from "react";

interface AwsmButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'link';
}

export default function AwsmButton({ 
    children, 
    className, 
    onClick, 
    disabled = false,
    type 
}: AwsmButtonProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    const buttonType = type || (isDark ? "secondary" : "primary");
    
    return (
        <AwesomeButton 
            type={buttonType} 
            className={className}
            onPress={onClick}
            disabled={disabled}
        >
            {children}
        </AwesomeButton>
    );
}
