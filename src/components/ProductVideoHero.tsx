import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface ProductVideoHeroProps {
  videoSrc?: string;
  className?: string;
}

const ProductVideoHero = ({
  videoSrc = '/product-video.mp4',
  className = ''
}: ProductVideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Auto-play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay is blocked
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      className={`relative w-full aspect-video bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Jouw browser ondersteunt HTML5 video niet.
      </video>

      {/* Gradient Overlay (top) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Subtle Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className={`absolute bottom-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        aria-label={isPlaying ? 'Pauze' : 'Afspelen'}
      >
        {isPlaying ? (
          <Pause size={16} className="fill-current" />
        ) : (
          <Play size={16} className="fill-current ml-0.5" />
        )}
      </button>

      {/* Playing Indicator Dots (subtle) */}
      {isPlaying && (
        <div className="absolute top-4 right-4 flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
    </div>
  );
};

export default ProductVideoHero;
