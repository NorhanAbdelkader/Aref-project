import React, { useState } from 'react';
import './filter.css';
import PriceRangeSlider from './PriceRange';

export default function Filter({ minPrice, maxPrice, onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [author, setAuthor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState ('All');

  const cat_list = ['الكل', 'اهتماماتي','رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'];
  const cat_values_List = ['All','All', 'novel', 'fiction', 'science', 'literature', 'religious', 'poetry'];
  const rate_List = ['الكل', 'أعلى من نجمتين', 'أعلى من 3', 'أعلى من 4', '5 نجوم'];
  const rate_values_list = ['All', 'Above2', 'Above3', 'Above4', 'Equal5'];

  const handleFilterChange = () => {
    const criteria = {
      category: selectedCategory,
      author: author,
      priceRange: priceRange,
      rating: rating,
    };
    onFilter(criteria);
  };
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  return (
    <div className="filter">
      <div className="filtersection">
        <h2 className="filter-text">نوع الأدب</h2>
        {cat_list.map((item, index) => (
          <button
            key={index}
            className="sidebarbutton"
            value={cat_values_List[index]}
            onClick={() => {
              setSelectedCategory(cat_values_List[index]);
              handleFilterChange();
              
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="filtersection">
        <h2 className="filter-text">اسم المؤلف</h2>
        <input
          className="filter_input"
          placeholder="اسم المؤلف"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            handleFilterChange();
          }}
        />
      </div>
      <div className="filtersection">
      {  /*
        <label>
          <h2 className="filter-text">السعر</h2>
        </label>
        <div class="range-input"><PriceRangeSlider/></div>
     */}
      </div>
      <div className="filtersection">
        <h2 className="filter-text">التقييم</h2>
        {rate_List.map((item, index) => (
          <button
            key={index}
            className="sidebarbutton"
            value={rate_values_list[index]}
            onClick={() => {
              setRating(rate_values_list[index]);
              handleFilterChange();
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}