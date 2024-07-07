import {FaStar} from 'react-icons/fa'
import './starstyling.css'
export default function StarReviews({rating}){
 
    return(
        <>  {
    [...Array(5)].map((_, index) => {
let filling=((rating)>1)?1:rating;

rating=rating-1<0?0:rating-1
    return(      
        <div className="star-container">
        <FaStar size={20} className="star-empty" />
        <FaStar size={20} className="star-filled" style={{ clipPath: `inset(0 0 0 ${100 - filling*100}% )` }} />
      </div>
);

})}</>);
}