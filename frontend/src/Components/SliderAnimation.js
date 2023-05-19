import React, { useState, useEffect } from 'react';

const SliderTextAnimation = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ['Text 1', 'Text 2', 'Text 3'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [texts.length]);

  return (
    <div className="sliderComponent">
      <div className="slider-text-animation">
        <div className="slider-container">
          {texts.map((text, index) => (
            <div
              key={index}
              className={`slider-item ${
                currentTextIndex === index ? 'active' : ''
              }  textHolder`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderTextAnimation;
