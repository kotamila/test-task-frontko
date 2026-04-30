import { useState, useRef } from "react";
import "./Carousel.css";

const COPIES = 5;

const Carousel = ({ images, onSelect, selectUrls }) => {
  const len = images?.length || 0;
  const middle = Math.floor(COPIES / 2) * len;
  const [offset, setOffset] = useState(middle);
  const trackRef = useRef(null);

  if (!images || len === 0) {
    return <div className="loading">Завантаження зображень...</div>;
  }

  const slides = Array.from({ length: COPIES }, () => images).flat();

  const jumpWithoutAnimation = (newOffset) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    setOffset(newOffset);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.35s ease";
      });
    });
  };

    const handlePrev = () => {
      const prev = offset - 1;
      setOffset(prev);
      if (prev <= 0) {
        setTimeout(() => jumpWithoutAnimation(prev + len), 350);
      }
    };

  const handleNext = () => {
    const next = offset + 1;
    setOffset(next);
    if (next >= len * (COPIES - 1)) {
      setTimeout(() => jumpWithoutAnimation(next - len), 350);
    }
  };

  return (
    <div className="carousel">
      <button className="arrow left" onClick={handlePrev}>❬</button>
      <div className="viewport">
        <div
          ref={trackRef}
          className="track"
          style={{
            transform: `translateX(-${offset * 100}%)`,
            transition: "transform 0.35s ease",
          }}
        >
          {slides.map((img, i) => (
            <div
              key={i}
              className={`slide ${selectUrls.includes(img.url) ? "active" : ""}`}
              onClick={() => onSelect(img.url)}
            >
              <img src={img.url} alt="Carousel Item" />
            </div>
          ))}
        </div>
      </div>
      <button className="arrow right" onClick={handleNext}>❭</button>
    </div>
  );
};

export default Carousel;