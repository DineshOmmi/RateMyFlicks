import React, { useState, useEffect } from 'react';
import { Home, RefreshCcw } from 'lucide-react';

const NotFound = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [showGhost, setShowGhost] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Update position randomly every 2 seconds when hovering
  useEffect(() => {
    let interval;
    if (isHovering) {
      interval = setInterval(() => {
        setPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
        setRotation(Math.random() * 30 - 15); // Random rotation between -15 and 15 degrees
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovering]);

  // Show ghost animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowGhost(true);
      setTimeout(() => setShowGhost(false), 3000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating shapes background animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${i * 25}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + i * 2}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className="w-16 h-16 bg-purple-400 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Ghost animation */}
      <div 
        className={`absolute transition-all duration-1000 ease-in-out ${
          showGhost ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          right: showGhost ? '10%' : '-10%',
          top: '20%'
        }}
      >
        <div className="animate-bounce">
          <div className="text-4xl">👻</div>
        </div>
      </div>

      <div className="max-w-md w-full text-center relative">
        {/* Animated 404 Text */}
        <div 
          className="relative h-48 mb-8"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h1 
            className="text-8xl font-bold text-purple-600 absolute transition-all duration-1000 ease-in-out hover:scale-110"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            404
          </h1>
        </div>

        {/* Message with fade-in animation */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! This page is playing hide and seek
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for seems to have wandered off. Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Action Buttons with hover animations */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2 animate-pulse" />
            Go Home
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <RefreshCcw className="w-5 h-5 mr-2 animate-spin-slow" />
            Try Again
          </button>
        </div>

        {/* Easter Egg */}
        <div className="mt-12 text-sm text-gray-500 animate-bounce">
          <p>Hover over the 404 to see it try to escape! 🎮</p>
        </div>
      </div>
    </div>
  );
};

// Add custom animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-float { animation: float 6s infinite ease-in-out; }
  .animate-fade-in { animation: fade-in 1s ease-out; }
  .animate-spin-slow { animation: spin 3s linear infinite; }
`;
document.head.appendChild(style);

export default NotFound;