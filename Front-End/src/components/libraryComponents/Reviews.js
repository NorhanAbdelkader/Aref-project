import StarReviews from "./StarRewiews";
import RatingBar from "./RatingBar";
import './library.css'
import './reviews.css'
export default function Reviews({rate}){

   return (<>
   <div className="reviews-container">
    
   <div className=".reviews-star">
   <h2 className="reviwes-star-item">4.5</h2>
   <div>
   <StarReviews rating={4.5}/>  
   </div>
   <p className="reviwes-star-item">2,508 reviews</p>
   </div>
   <div className="reviwes-item">
    <div className="reviwes-bar"><p>5</p><RatingBar rateValue={50}/>
    </div>
    <div className="reviwes-bar"> <p>4</p><RatingBar rateValue={30} />
    </div>
    <div className="reviwes-bar"><p>3</p><RatingBar rateValue={60} />
    </div>
    <div className="reviwes-bar"><p>2</p><RatingBar rateValue={70} />
    </div>
    <div className="reviwes-bar"><p>1</p><RatingBar rateValue={90}/>
    </div>
    </div>
   </div>
   </>);
}