import React, { useState } from 'react';
import './filter.css';
import PriceRangeSlider from './PriceRange';

export default function Filter({ minPrice, maxPrice, onFilter }) {
  const [Author, setSelectedAuthor] = useState('');
  const cat_list = ['الكل', 'اهتماماتي', 'رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'];
  const cat_values_List = ['All', 'All', 'novel', 'fiction', 'science', 'literature', 'religious', 'poetry'];
  const rate_List = ['الكل', 'أعلى من نجمتين', 'أعلى من 3', 'أعلى من 4', '5 نجوم'];
  const rate_values_list = ['All', 'Above2', 'Above3', 'Above4', 'Equal5'];

  const handleCategorySelect = (category) => {
    onFilter.selectedCategories([],category);
  };


  const handleRateFilter = (rate) => {
    onFilter.filterRate(rate);
  };


  const handleAuthorSelect = (author) => {
     
    onFilter.selectedAuthor(author);
  };


  const handlePriceRangeSelect = (min, max) => {
    onFilter.selectedPriceRange([min, max]);
  };


  const applyAllFilters = () => {
    onFilter.filterAllCriteria();
  };
    return (
      <div className="filter">
        <div className="filtersection">
          <h2 className="filter-text">نوع الأدب</h2>
          {cat_list.map((item, index) => (
            <button
              key={index}
              className="sidebarbutton"
              value={item}
              onClick={() => {
                handleCategorySelect(item);
                applyAllFilters();
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
            value=""
            onChange={(e) => {
              handleAuthorSelect(e.target.value);
              applyAllFilters();
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
              value={item}
              onClick={() => {
                handleRateFilter(item);
                applyAllFilters();
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }