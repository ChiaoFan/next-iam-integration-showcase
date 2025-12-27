"use client";
import { useState, useEffect, useCallback } from "react";

export default function JumpGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(500);
  const [speed, setSpeed] = useState(3);
  const [obstacleIcon, setObstacleIcon] = useState("🪨");
  const obstacle = ["🪨", "💀", "🌋", "🔥"];

  // Memoized Jump function (so it can be used by both click and keyboard)
  const handleJump = useCallback(() => {
    if (!isJumping && isPlaying) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  }, [isJumping, isPlaying]);

  //  Desktop Keyboard Support (Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Prevents page from scrolling down
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleJump]);

  // Game Loop
  useEffect(() => {
    let gameInterval: NodeJS.Timeout;

    if (isPlaying) {
      gameInterval = setInterval(() => {
        setObstacleLeft((prev) => {
          if (prev < -30) {
            // OBSTACLE RESET LOGIC
            setScore((s) => s + 1);
            // Randomize speed slightly for the next stone to keep it unpredictable
            setSpeed((prevSpeed) => prevSpeed + 0.25);
            const nextIcon =
              obstacle[Math.floor(Math.random() * obstacle.length)];
            setObstacleIcon(nextIcon);
            return 500;
          }
          return prev - speed;
        });
      }, 20);
    }

    return () => clearInterval(gameInterval);
  }, [isPlaying, speed]);

  // Collision Detection
  useEffect(() => {
    if (obstacleLeft > 20 && obstacleLeft < 60 && !isJumping) {
      setIsPlaying(false);
      setObstacleLeft(500);
    }
  }, [obstacleLeft, isJumping]);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-inner border-4 border-gray-100">
      <div className="mb-2 text-2xl font-black text-green-600">
        SCORE: {score}
      </div>

      <div
        onClick={handleJump}
        className="relative w-full h-[250px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border-4 border-white group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-50" />

        <div className="absolute top-8 left-10 text-4xl opacity-40 animate-pulse">
          ☁️
        </div>
        <div className="absolute top-14 right-20 text-3xl opacity-30">☁️</div>

        <div className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-emerald-500 to-green-600 border-t-4 border-green-700/30" />

        <div
          style={{
            bottom: isJumping ? "120px" : "10px",
            transition: isJumping
              ? "bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
              : "bottom 0.4s cubic-bezier(0.32, 0, 0.67, 0)",
          }}
          className="absolute left-10 text-5xl select-none drop-shadow-lg z-10"
        >
          🤖
        </div>

        <div
          style={{ left: `${obstacleLeft}px` }}
          className="absolute bottom-1 text-4xl select-none drop-shadow-md z-10"
        >
          {obstacleIcon}
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold mb-4">GAME OVER</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
                setScore(0);
                setSpeed(3);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-black text-lg transition-transform active:scale-95"
            >
              START JUMPING
            </button>
            <p className="mt-4 text-sm font-medium">
              Press SPACE or Click to Jump
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
