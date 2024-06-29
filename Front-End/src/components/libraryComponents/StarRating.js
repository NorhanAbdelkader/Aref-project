import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import './starstyling.css'
export default function StarRating({handleRate}) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
 
  return (
    <>
      <div className="popup">
    <div className="popup-inner" >
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return (
          
          <label key={index}>
            <input
              type='radio'
              name='rate'
              value={currentRate}
              onClick={(e)=>{
  handleRate();
  setRating(e.target.value)
}}
              style={{ display: 'none' }}
            />
            <FaStar 
              
               
              color={currentRate <= (hover || rating) ? "yellow" : "grey"}
              onMouseEnter={() => setHover(currentRate)}
              onMouseLeave={() => setHover(null)}
                  
            />
          </label>
        );
      })}
      </div>
      </div>
    </>
  );
}