"use client";

import React, { useEffect, useRef, useState } from 'react';

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const videoId = 'Bruy6RhD6k4';
  // Replace 'yourThumbnailUrl.jpg' with your actual thumbnail URL
  const thumbnailUrl = '/startup.jpg';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Check if the video section is intersecting
        if (entry.isIntersecting) {
          // Delay playing the video by 1.5 seconds after the section enters the viewport
          setTimeout(() => {
            setPlayVideo(true);
          }, 1500);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // viewport
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Clean up on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="max-w-[1000px] w-full"> {/* Adjusted for a larger video */}
          <div className="relative" style={{ paddingTop: '56.25%' }} ref={videoRef}>
            {playVideo ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&showinfo=0&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className="w-full h-full absolute top-0 left-0"
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
