import './bookdetails.css'
import Navbar from'../generalComponents/Navbar'
import Sidebar from'../homeComponents/Sidebar'
import { useAuth } from '../../hooks/AuthProvider'
import Reviews from './Reviews';
import { useState,useEffect } from 'react';
import StarRating from './StarRating'
import {useParams} from 'react-router'

//import AddReview from './AddReview';
export default function BookDetails(){ 
  const authenticattedUser= useAuth();
   const [userRating, setUserRating] = useState(null);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [bookDetail, setBooks] = useState([]);

    const [showAddReview, setShowAddReview] =useState(false);
    const {id}= useParams();
     useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async ()=>{
      try{
       const  response=await fetch(`http://localhost:5000/api/book/${id}`)
        if(!response.ok)
        {console.log("Network Error")}
      const data= await response.json ();
        setBooks( data.book)
      }
      catch(error){
        console.log("Error fetching data",error)

      }


    }
   // const bookDetail = books.filter(x => x.id == id)
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
    return(<div>
      <Navbar/>
      { authenticattedUser&&
    <Sidebar/>
    }
    <div  className="book-details-container"> 

    <div className="image-container">
   <img src={bookDetail.image} className="cover-image" alt="غلاف الكتاب"/>
   </div>

   <div className="book-details">
  <h2 className="text">{bookDetail.name} </h2> 
  <p className="text">{bookDetail.description}</p>  
  </div>

  <p className="item book-desc text">{bookDetail.author}</p> 
  <hr className="split"/>  
  <p className="item book-desc text">{bookDetail.publisher}</p> 
  <hr className="split"/>  
  <p className="item book-desc text">{bookDetail.description} </p> 
 
  <hr className="split"/>  
      <Reviews className="item" rate={bookDetail.rate} />
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
  
    </div>)
}
