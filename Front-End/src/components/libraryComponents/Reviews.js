import StarReviews from "./StarRewiews";
import RatingBar from "./RatingBar";

import './reviews.css'
export default function Reviews({rate,avgRate,totalReviews}){
    console.log(rate);
const getPercentRate=(rateForStar)=>{
return (rateForStar*100)/totalReviews
}
   return (<>
   <div className="reviews-container">
    
   <div className=".reviews-star">
   <h2 className="reviwes-star-item">{(avgRate).toString().replace(/\d/g, (d) => String.fromCharCode(1632 + parseInt(d)))}</h2>
   <div className="reviwes-stars">
   <StarReviews rating={avgRate}/>  
   </div >
   <p className="reviwes-star-item">{(totalReviews).toString().replace(/\d/g, (d) => String.fromCharCode(1632 + parseInt(d)))}  مراجعات</p>
   </div>
   <div className="reviwes-item">
    {  rate.map((num,_index)=>{
return(<div className="reviwes-bar"><p>{(_index+1).toString().replace(/\d/g, (d) => String.fromCharCode(1632 + parseInt(d)))}</p><RatingBar rateValue={getPercentRate(num)}/> </div>)})}
   
  
    </div>
   </div>
   </>);
}