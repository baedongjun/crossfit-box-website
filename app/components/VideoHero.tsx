"use client"

import { useRef, useEffect } from "react"

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75 // 비디오 속도를 75%로 조절
    }
  }, [])

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/snatch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
          Master the Snatch
          <br />
          <span className="text-2xl md:text-3xl font-normal">Elevate Your CrossFit Game</span>
        </h1>
      </div>
    </div>
  )
}

