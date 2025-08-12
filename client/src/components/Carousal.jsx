import React, { useEffect, useState, useCallback } from 'react';
import './styles/ImageCarousel.css';

const ImageCarousel = ({ 
  images, 
  autoplaySpeed = 3000, 
  height = '300px',
  showArrows = true,
  showDots = true,
  pauseOnHover = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay functionality
  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;

    const interval = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(interval);
  }, [images, nextSlide, autoplaySpeed, isPaused]);

  if (!images || images.length === 0) return <div className="carousel-empty">No images to display</div>;

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{ height }}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img 
              src={image.src || image} 
              alt={image.alt || `Slide ${index + 1}`} 
              className="carousel-image"
            />
            {image.caption && (
              <div className="carousel-caption">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && images.length > 1 && (
        <>
          <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button 
              key={index}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="carousel-progress">
          <div 
            className="carousel-progress-inner" 
            style={{ 
              width: `${((currentIndex + 1) / images.length) * 100}%`,
              animationDuration: `${autoplaySpeed}ms`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;