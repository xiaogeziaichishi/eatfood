
import React, { useEffect, useRef, useState } from 'react';
import { Dish } from '../types';
import { playSpinSound, playWinSound } from '../utils/audio';

interface SpinWheelProps {
  items: Dish[];
  isSpinning: boolean;
  onSpinEnd: (winnerIndex: number) => void;
  winnerIndex: number | null;
}

const COLORS = [
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#f59e0b', // amber-500
  '#84cc16', // lime-500
  '#10b981', // emerald-500
  '#06b6d4', // cyan-500
  '#3b82f6', // blue-500
  '#8b5cf6', // violet-500
];

const SpinWheel: React.FC<SpinWheelProps> = ({ items, isSpinning, onSpinEnd, winnerIndex }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  // When spinning starts or resets
  useEffect(() => {
    if (isSpinning) {
      // Audio: Trigger the mechanical spin sound sequence
      playSpinSound(4000);

      // Calculate a random landing spot
      // To ensure it spins "forward" a lot, we add multiple full rotations (360 * 5)
      // Then we add the specific angle to land on a random item.
      const newWinnerIndex = Math.floor(Math.random() * items.length);
      const segmentAngle = 360 / items.length;
      
      // The pointer is usually at the top (0 degrees or 270 depending on css).
      // Let's assume pointer is at Top (0deg).
      // If we want item index 0 to be at top, rotation should be 0 (or 360).
      // If we want item index 1, rotation should be -segmentAngle.
      // Visual rotation = Current + (5 * 360) + (TargetOffset)
      
      // Calculate offset to land the specific slice at the TOP (pointer).
      // Note: If slice 0 is at 0-45deg, center is 22.5. We need to rotate -22.5 to bring it to top 0.
      
      const randomOffsetInsideSegment = Math.random() * (segmentAngle * 0.8) - (segmentAngle * 0.4); // Add a little randomness within the slice
      const targetRotationForIndex = 360 - (newWinnerIndex * segmentAngle); 
      
      const totalRotation = rotation + (360 * 5) + (targetRotationForIndex - (rotation % 360));
      
      setRotation(totalRotation);

      // Notify parent after animation finishes
      const timer = setTimeout(() => {
        // Audio: Play win sound exactly when wheel stops
        playWinSound();
        onSpinEnd(newWinnerIndex);
      }, 4000); // Must match transition duration

      return () => clearTimeout(timer);
    }
  }, [isSpinning, items.length]);

  const segmentAngle = 360 / items.length;

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center mx-auto my-8">
      {/* Pointer/Arrow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-lg"></div>
      
      {/* Wheel Container */}
      <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
        {/* Rotating Element */}
        <div
          ref={wheelRef}
          className="w-full h-full relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
          }}
        >
          {items.map((item, index) => {
            const rotate = index * segmentAngle;
            // Skew is used to make the segment shape if we were using raw HTML/CSS borders, 
            // but here we will position content absolutely and use a conic gradient background (or simplified absolute slices)
            // A simpler approach for the background is a conic gradient on the parent, but let's try individual slices for colors.
            
            return (
              <div
                key={item.id}
                className="absolute w-full h-full top-0 left-0"
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                {/* Visual Slice using Border Trick or Clip Path */}
                {/* Using a central point rotation for the text content */}
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-[100px] origin-bottom flex flex-col justify-start pt-4 items-center"
                  style={{
                   // The text needs to be in the middle of the slice, so we rotate it half the segment angle
                   transform: `rotate(${segmentAngle / 2}deg)`,
                  }}
                >
                  <span className="text-2xl filter drop-shadow-md mb-1">{item.emoji}</span>
                  <span className="text-sm font-bold text-white drop-shadow-md truncate max-w-[80px] writing-mode-vertical" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Conic Gradient Background generated purely via style */}
          <div 
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              background: `conic-gradient(
                ${items.map((_, i) => `${COLORS[i % COLORS.length]} ${i * (100 / items.length)}% ${(i + 1) * (100 / items.length)}%`).join(', ')}
              )`
            }}
          />
        </div>
        
        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center z-10 border-4 border-gray-100">
          <span className="text-2xl">😋</span>
        </div>
      </div>
      
      {/* Shadow Base */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/20 blur-xl rounded-[100%]"></div>
    </div>
  );
};

export default SpinWheel;
