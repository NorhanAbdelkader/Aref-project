import StarRating from "./StarRating";
import './addreview.css'
import {useState} from 'react'

export default function AddReview({ onAddReview,isOpen }){
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
          user,
          comment,
          rating
        };
        onAddReview(newReview);
        setUser('rewesdsd');
        setComment('dffhgfhjfffffffghfgh');
        setRating(3);
      };
    
    return(   
        
    <div className="popup">
    <div className="popup-inner" >
     
     
    <div>
     <StarRating/>
     </div>
     <div>
    <input placeholder="أضف تعليقًا" className="review-input"></input>
    </div>
    <button type="submit" onClick={handleSubmit}>Submit Review</button>
     
    
    </div>
    </div>
    
    
    
     
    )
}