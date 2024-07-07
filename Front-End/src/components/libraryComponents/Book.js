import './bookcard.css'
import StarReviews from "./StarRewiews";

function Book(props){
    return(  
        <>


    <div className="card">
   
    <div className="columns">
    <img src={props.bookImage} className='card-image' alt="Book" />   
    {////<h2 className='price'>EGP{props.price}</h2>
 }
    <div className="rows">
    <h3 className='card-title'>{props.bookName}</h3>
    <div className="columns">
    <div  className='star-rating'>
        <StarReviews rating={props.rating}/>
        </div>   
    <div className='rating'>{props.rating}</div>
    <div className='reviews'>{props.reviews}</div>     
    </div>
    </div>

 </div>
 {//<h2 className='price'>EGP{props.price}</h2>
 }
    <hr/>
    <div className="columns">
    <div className='card-small-division card_text'>{props.author}</div>
    <div className='card-small-division card_text'>{props.publisher}</div>
    <div className='card-small-division card_text'>{props.dateOfPublish}</div>
    </div>
   </div>
   </>
   );}
export default Book