import { FaStar } from 'react-icons/fa';
import { useState,useEffect,useRef  } from 'react';
import './starrating.css'
export default function StarRating({ isOpen, onClose, handleRate }) {
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
  
  setRating(e.target.value)
  handleRate(e.target.value)
  console.log(e.target.value);

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