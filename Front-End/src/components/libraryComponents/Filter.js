import React, { useState } from 'react';
import './filter.css';
import PriceRangeSlider from './PriceRange';

export default function Filter({ onFilter }) {
  const [author, setAuthor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState('All');
  const [activeCategories, setActiveCategories] = useState({
    'الكل': false, 'اهتماماتي': false, 'رواية': false, 'خيالي': false,
    'علوم': false, 'واقعي': false, 'ديني': false, 'شعر': false
  });
  const [selectedRate, setSelectedRate] = useState(null);
  const toArabicNums=(num)=>{
    return num.toString().replace(/\d/g, (d) => String.fromCharCode(1632 + parseInt(d)))
   }
  const cat_list = ['الكل', 'اهتماماتي', 'رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'];
  const rate_List = ['الكل', 'أعلى من نجمتين', `نجوم ${toArabicNums(3)} أعلى من `, `نجوم ${toArabicNums(5)} أعلى من `, `${toArabicNums(5)} نجوم`];
  const rate_values_list = ['All', 'Above2', 'Above3', 'Above4', 'Equal5'];

  const toggleActive = (item) => {
    setActiveCategories(prevState => ({
      ...prevState,
      [item]: !prevState[item]
    }));
    handleFilterChange("category", item, !activeCategories[item]);
  };

  const handleFilterChange = (criteria, criteriaValue, isChosen) => {
    onFilter(criteria, criteriaValue, isChosen);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    handleFilterChange("price", range, true);
  };

  return (
    <div className="filter">
      <div className="filtersection">
        <h2 className="filter-text">نوع الأدب</h2>
        {cat_list.map((item, index) => (
          <button
            key={index}
            className={activeCategories[item] ? "activefilterbutton" : "sidebarbutton"}
            value={item}
            onClick={() => toggleActive(item)}
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
            handleFilterChange("author", e.target.value, true);
          }}
        />
      </div>
      <div className="filtersection">
        <h2 className="filter-text">التقييم</h2>
        {rate_List.map((item, index) => (
          <button
            key={index}
            className={(selectedRate === rate_values_list[index]) ? "activefilterbutton" : "sidebarbutton"}
            value={rate_values_list[index]}
            onClick={() => {
              if (selectedRate === rate_values_list[index]) {
                handleFilterChange("rating", rate_values_list[index], false);
                setSelectedRate(null);
              } else {
                setSelectedRate(rate_values_list[index]);
                handleFilterChange("rating", rate_values_list[index], true);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}