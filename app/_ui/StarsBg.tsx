import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import {useTheme} from "~/app/lib/context/ThemeContext";
import {generateRandomInSphere} from "~/app/lib/generateRandomInSphere";

export default function StarsBG() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen">
            <Canvas
                className="h-full"
                camera={{ position: [0, 0, 1] }}
            >
                <Stars />
            </Canvas>
        </div>
    );
}

function Stars(props: any) {
    const ref = useRef<any>(null);
    const {theme, toggleTheme} = useTheme();
    const isDark = theme === "dark";
    const sphere = useMemo(
        () => generateRandomInSphere(500),
        []
    );

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]} ref={ref}>
            <Points
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color={isDark ? '#6b7280' : '#1c3158'}
                    size={0.002}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}
