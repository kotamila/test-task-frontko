import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images, onSelect, selectUrls }) => {
  const [offset, setOffset] = useState(0);

  const handleNext = () => {
    setOffset((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setOffset((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="arrow left" onClick={handlePrev}>
        {" "}
        ❬
      </button>
      <div className="viewport">
        <div
          className="track"
          style={{ transform: `translateX(-${offset * 100}%)` }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className={`slide ${selectUrls.includes(img.url) ? "active" : ""}`}
              onClick={() => onSelect(img.url)}
            >
              <img src={img.url} alt="Carousel Item" />
            </div>
          ))}
        </div>
      </div>
      <button className="arrow right" onClick={handleNext}>
        ❭
      </button>
    </div>
  );
};

export default Carousel;
