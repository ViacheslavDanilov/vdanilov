"use client";

import React, { useEffect, useRef } from "react";

export const Component = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Simple noise function
    const noise = (x, y) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;

      // Create gradient background matching theme
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0a0e14");
      gradient.addColorStop(0.5, "#0d1219");
      gradient.addColorStop(1, "#0a0e14");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Create silk-like pattern
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          let tex_x = u;
          let tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern =
            0.6 +
            0.4 *
              Math.sin(
                5.0 *
                  (tex_x +
                    tex_y +
                    Math.cos(3.0 * tex_x + 5.0 * tex_y) +
                    0.02 * tOffset) +
                  Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset)),
              );

          const rnd = noise(x, y);
          const intensity = Math.max(
            0,
            pattern - (rnd / 15.0) * noiseIntensity,
          );

          // Subtle silk pattern with visible contrast
          const r = Math.floor(10 + 60 * intensity);
          const g = Math.floor(14 + 70 * intensity);
          const b = Math.floor(20 + 90 * intensity);
          const a = 255;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = a;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add subtle overlay for depth
      const overlayGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 2,
      );
      overlayGradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
      overlayGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
};
