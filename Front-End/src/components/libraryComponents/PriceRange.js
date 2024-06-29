import React, { useState } from 'react';
import './pricerange.css';

const PriceRangeSlider = ({ min, max, onChange }) => {
  const [range, setRange] = useState([min, max]);

  const handleRangeChange = (e, index) => {
    const newRange = [...range];
    newRange[index] = Number(e.target.value);
    if (newRange[0] < newRange[1]) {
      setRange(newRange);
      onChange(newRange);
    }
  };

  return (
    <>
    <input
      type="range"
      min="0"
      max="1000"
      className="thumb thumb--zindex-3"
    />
    <input
      type="range"
      min="0"
      max="1000"
      className="thumb thumb--zindex-4"
    />
  </>
  );
};

export default PriceRangeSlider;