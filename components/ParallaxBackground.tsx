"use client";

import React from 'react';

const ParallaxBackground = () => {
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/Portfolio' : '';

    return (
        <section className="absolute inset-0 bg-black/40">
            <div className="relative h-screen overflow-y-hidden">
                {/* Background Sky */}
                <div
                    className="absolute inset-0 w-full h-screen -z-50"
                    style={{
                        backgroundImage: `url("${basePath}/assets/sky.jpg")`,
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                    }}
                />
                {/* Mountain Layer 3 */}
                <div
                    className="absolute inset-0 -z-40"
                    style={{
                        backgroundImage: `url("${basePath}/assets/mountain-3.png")`,
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                    }}
                />
                {/* Planets */}
                <div
                    className="absolute inset-0 -z-30"
                    style={{
                        backgroundImage: `url("${basePath}/assets/planets.png")`,
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                    }}
                />
                {/* Mountain Layer 2 */}
                <div
                    className="absolute inset-0 -z-20"
                    style={{
                        backgroundImage: `url("${basePath}/assets/mountain-2.png")`,
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                    }}
                />
                {/* Mountain Layer 1 */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `url("${basePath}/assets/mountain-1.png")`,
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                    }}
                />
            </div>
        </section>
    );
};

export default ParallaxBackground;
