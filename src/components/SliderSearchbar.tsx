
import { useEffect, useRef, useState } from "react";
import styles from "./SliderSearchbar.module.css";

import img1 from "../pictures/Aquascaping1.jpeg";
import img2 from "../pictures/Aquascaping2.jpeg";
import img3 from "../pictures/Aquascaping3.jpeg";
import img4 from "../pictures/Aquascaping4.jpeg";
import img5 from "../pictures/Aquascaping5.jpeg";
import img6 from "../pictures/Aquascaping6.jpeg";

const realImages = [img1, img2, img3, img4, img5, img6];

// Add clones for infinite illusion
const images = [realImages[realImages.length - 1], ...realImages, realImages[0]];

const slideDuration = 1500;
const delayBetweenSlides = 6000;
const intervalTime = slideDuration + delayBetweenSlides;

export default function SlideSliderSearchbar() {
  const [index, setIndex] = useState(1); 
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }, intervalTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, isPaused]);

  // Handle transition end to loop
  const handleTransitionEnd = () => {
    if (index === images.length - 1) {
      // At the end clone → reset to first real image
      setIsTransitioning(false);
      setIndex(1);
    } else if (index === 0) {
      // At the beginning clone → reset to last real image
      setIsTransitioning(false);
      setIndex(images.length - 2);
    }
  };

  // Manual dot navigation
  const goToIndex = (i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTransitioning(true);
    setIndex(i + 1); // +1 because of start clone
  };

  return (
    <div className={styles.sliderSearchbar}>
      <div className={styles.searchbarWrapper}>
        <div className={styles.searchbar}>
          <input type="text" placeholder="Search fishy things..." />
          <button>🔍</button>
        </div>
      </div>

      <div
        className={styles.sliderContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className={styles.slideTrack}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: isTransitioning ? `transform 1.5s ease-in-out` : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className={styles.slide}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        <div className={styles.dots}>
          {realImages.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${index === i + 1 ? styles.activeDot : ""}`}
              onClick={() => goToIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
