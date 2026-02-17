"use client";

import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const Loader = () => {
    const { progress } = useProgress();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Html center className="text-xl font-normal text-center text-white whitespace-nowrap">
            {Math.round(progress)}% Loaded
        </Html>
    );
};

export default Loader;
