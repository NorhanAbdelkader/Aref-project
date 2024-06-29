import './bookdetails.css'
import {fetchBooks} from './mockLibraryService'
import book2 from'./assets/book2.jpg'
import Reviews from './Reviews';
import { useState,useEffect } from 'react';
import StarRating from './StarRating'
import {useParams} from 'react-router'
//import AddReview from './AddReview';
export default function(){ 
    const [userRating, setUserRating] = useState(null);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [books, setBooks] = useState([]);

    const [showAddReview, setShowAddReview] =useState(false);
    const{id}= useParams();
    useEffect(() => {
      fetchBooks().then((fetchedBooks) => {
        setBooks(fetchedBooks);
        
         
      });
    }, []);
    const bookDetail = books.filter(x => x.id == id)
    //const [reviews, setReviews] = useState([{userName:"أماني",userRate:3,userReview:"جميل"}]);

    /**const handleAddReview = (review) => {

      setReviews([...reviews, review]);
      setShowAddReview(!showAddReview)
    };**/
    const handleRate = (rate) => {
      setUserRating(rate);
      setShowRatingForm(false);
      setShowAddReview(!showAddReview)
      console.log(`User rated this book ${rate} stars`);
    };
    return(<>
    <div  className="book-details-container"> 
    
    <div className="image-container">
   <img src={book2} className="cover-image" alt="غلاف الكتاب"/>
   </div>
   <div className="book-details">
  <h2 className="textle">{bookDetail.title} </h2> 
  <p className="text">هنا وصف الكتاب نذة مختصرة عن المحتوى</p>  
  
 
  </div>
  <hr className="split"/>  
  <p className="item book-desc">مصطفى صادق الرافعي</p> 
  <hr className="split"/>  
  <p className="item book-desc">عصير الكتب</p> 
  <hr className="split"/>  
  <p className="item book-desc">يوليو 2001 </p> 
  <hr className="split"/>  
  <p className="item book-desc">نبذة مختصرة للتعريف بالكتاب</p>
  <hr className="split"/>  
      <Reviews className="item" />
   <div className="item">  
      <button className="Add-review" onClick={()=>setShowAddReview(!showAddReview)} >Add review</button>   
      {showAddReview&&
      <div>
      <StarRating className ="star-rate"handleRate={handleRate}/></div>}
   </div>
   <div className="item">
   <button className="Read" color>Read</button> 
   </div>
   <hr className="split"/> 
   { /*
   <div className="container">
     {
       reviews.map((item)=>{
         <div>
         <strong>{item.userName}</strong>
         
        <p>{item.userReview}</p>
         </div>
          
       })
     }
    </div>**/}
    </div>
  
    </>)
}
