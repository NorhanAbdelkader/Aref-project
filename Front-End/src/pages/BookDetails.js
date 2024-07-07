import './bookdetails.css'
import Navbar from '../components/generalComponents/Navbar'
import Sidebar from '../components/homeComponents/Sidebar'
import Reviews from '../components/libraryComponents/Reviews';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../hooks/AuthProvider";
import StarRating from '../components/libraryComponents/StarRating'
import { useParams } from 'react-router'

//import AddReview from './AddReview';
export default function BookDetails() {
  const [userRating, setUserRating] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [bookDetail, setBooksDetail] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const { id } = useParams();
  const auth = useAuth();
  const loggedInUser = auth.user;
  const isAdmin = (loggedInUser.role === 'Admin')
  const calculateTotalReviews = (ratingReviews = []) => {
    return ratingReviews.reduce((total, num) => total + num, 0);
  };

  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/book/${id}`)
      if (!response.ok) { console.log("Network Error") }
      const data = await response.json();
      setBooksDetail(data.book)
    }
    catch (error) {
      console.log("Error fetching data", error)

    }


  }
  // const bookDetail = books.filter(x => x.id == id)
  //const [reviews, setReviews] = useState([{userName:"أماني",userRate:3,userReview:"جميل"}]);

  /**const handleAddReview = (review) => {

    setReviews([...reviews, review]);
    setShowAddReview(!showAddReview)
  };**/




  const handleRate = async (rate) => {
    setShowRatingForm(false);
    setShowAddReview(!showAddReview);
    try {

      const response = await fetch(`http://localhost:5000/api/book/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rate }),
      });
      if (!response.ok) { console.log("Network Error") }
      const data = await response.json();
      console.log("Rating: ", rate, data.message)

    }
    catch (error) {
      console.log("Error fetching data", error)

    }



  }
  return (<div>
    <Navbar />

    {loggedInUser && <Sidebar />}
    <div className="book-details-container">

      <div className="image-container">
        <img src={bookDetail.image} className="cover-image" alt="غلاف الكتاب" />
      </div>

      <div className="book-details">
        <h2 className="text">{bookDetail.name} </h2>
        <p className="text">{bookDetail.description}</p>
      </div>

      <p className="item book-desc text">{bookDetail.author}</p>
      <hr className="split" />
      <p className="item book-desc text">{bookDetail.publisher}</p>
      <hr className="split" />
      <p className="item book-desc text">{bookDetail.description} </p>

      <hr className="split" />
      <Reviews className="item" rate={bookDetail.rate} avgRate={bookDetail.avgRate} totalReviews={calculateTotalReviews(bookDetail.rate)} />
      {!isAdmin && <div className="item">
        <button className="Add-review" onClick={() => setShowAddReview(!showAddReview)} >Add review</button>
        {showAddReview &&
          <div>
            <StarRating className="star-rate" handleRate={handleRate} /></div>}
      </div>}
      <div className="item">
        <button className="Read" color>Read</button>
      </div>
      <hr className="split" />
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