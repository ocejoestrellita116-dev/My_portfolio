"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useTransform, useMotionValue } from "motion/react";
import { BOOK_CONFIG } from "./dossier-hero.config";
import type { BookSequenceCanvasProps } from "./dossier-hero.types";

/**
 * BookSequenceCanvas
 * 
 * Handles the book video scrubbing based on scroll progress.
 * - Desktop: Video with currentTime control (scroll-synced)
 * - Mobile/reduced-motion: Poster or autoplay loop
 */
export function BookSequenceCanvas({
  progress,
  phase,
  isInteractive,
  className = "",
}: BookSequenceCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    setVideoDuration(video.duration);
    setVideoReady(true);
    video.pause();
  }, []);

  // Sync video currentTime with progress
  useEffect(() => {
    if (!isInteractive || !videoReady || videoDuration === 0) return;
    
    const video = videoRef.current;
    if (!video) return;

    const targetTime = progress * videoDuration;
    
    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }
  }, [progress, isInteractive, videoReady, videoDuration]);

  // Transform values for book motion
  const progressMotion = useMotionValue(progress);
  
  useEffect(() => {
    progressMotion.set(progress);
  }, [progress, progressMotion]);

  const bookY = useTransform(
    progressMotion,
    [...BOOK_CONFIG.transforms.y.keys],
    [...BOOK_CONFIG.transforms.y.values]
  );
  
  const bookScale = useTransform(
    progressMotion,
    [...BOOK_CONFIG.transforms.scale.keys],
    [...BOOK_CONFIG.transforms.scale.values]
  );
  
  const bookOpacity = useTransform(
    progressMotion,
    [...BOOK_CONFIG.transforms.opacity.keys],
    [...BOOK_CONFIG.transforms.opacity.values]
  );

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        y: bookY,
        scale: bookScale,
        opacity: bookOpacity,
      }}
    >
      {/* Video element */}
      {isInteractive ? (
        <video
          ref={videoRef}
          className="w-full max-w-[560px] h-auto object-contain"
          src={BOOK_CONFIG.videoSrc}
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.4s ease",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
          }}
        />
      ) : (
        // Mobile/reduced-motion fallback
        <div className="w-full max-w-[560px] aspect-[4/3] flex items-center justify-center">
          <video
            className="w-full h-full object-contain"
            src={BOOK_CONFIG.videoSrc}
            playsInline
            muted
            autoPlay
            loop
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
            }}
          />
        </div>
      )}

      {/* Loading state */}
      {isInteractive && !videoReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-6 h-6 border-2 rounded-full animate-spin"
            style={{
              borderColor: "#e8e4df",
              borderTopColor: "#9a958d",
            }}
          />
        </div>
      )}

      {/* Contact shadow */}
      <div
        className="absolute bottom-0 left-1/2 w-[70%] h-6 -z-10"
        style={{
          transform: "translateX(-50%) translateY(80%) scaleY(0.25)",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </motion.div>
  );
}
