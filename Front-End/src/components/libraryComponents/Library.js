import React, { useState, useEffect } from 'react';
import Book from './Book';
import Filter from './Filter';
import './library.css';
import { Search } from './Search';
import Navbar from '../generalComponents/Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider'

export default function Library() {
  const auth = useAuth();
  const user = auth.user;
  const cat_list = ['الكل', 'اهتماماتي', 'رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'];
  const rate_list = ['الكل', 'أعلى من نجمتين', 'أعلى من 3', 'أعلى من 4', '5 نجوم']
  const [books, setBooks] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeRates, setActiveRates] = useState('الكل');
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterPrice, setFilterPrice] = useState([0, 1000]);


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData()
  }, []);
  const selectedCategories = (prevCat, clickedCat) => {
    prevCat.includes(clickedCat) ? (prevCat = prevCat.filter(item => item !== clickedCat)) : (prevCat = [...prevCat, clickedCat])
    console.log("*",clickedCat,prevCat) 
    setActiveCategories(prevCat)
  }
  const filterRate = (clickedRate) => {
    setActiveRates(clickedRate)
  }
  const selectedAuthor = (clickedAuthor) => {
    setFilterAuthor(clickedAuthor)
  }
  const selectedPriceRange = (clickedRange) => {
    setFilterPrice(clickedRange)
  }
  const filterAllCriteria = () => {
    let filteredData = (
      books.filter(item => activeCategories.includes(item.category))
      //&& (books.filter(item => calculateAverageRating(item.rate) > ((rate_list.indexOf(activeRates)) + 1)))
      //&& (books.filter(item => item.author === filterAuthor))
      //&& (books.filter(item => filterPrice[0] <= item.price <= filterPrice[1]))
    );
    console.log("**",activeCategories)
    setBooks(filteredData)
  }
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/book", { method: 'get' })
      if (!response.ok) { console.log("Network Error") }
      const data = await response.json()
      setBooks(data.books);
      console.log("responce messsage", data.message)

    }
    catch (error) {
      console.log("Error fetching data", error)

    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const calculateTotalReviews = (ratingReviews = []) => {
    return ratingReviews.reduce((total, num) => total + num, 0);
  };
  const calculateAverageRating = (ratingReviews = []) => {
    const totalReviews = calculateTotalReviews(ratingReviews);
    const totalStars = ratingReviews.reduce((total, count, index) => total + count * (index + 1), 0);
    return totalReviews ? (totalStars / totalReviews).toFixed(1) : 0;
  };
  const handleSearch = async (bookName) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/book/search/?Name=${bookName}`, { method: 'get' });
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="library-container">
      <div>
        <Navbar />
        <Search onSearch={handleSearch} />
      </div>

      <div className="library-sidebar">
        <Filter minPrice={0} maxPrice={1000} onFilter={{selectedCategories , filterRate, selectedAuthor, selectedPriceRange, filterAllCriteria}} />
      </div>

      <div className="main-content">


        {books.map((book) => (

          <Link to={`/library/${book._id}`}>
            <div>
              <Book
                key={book._id}
                bookImage={book.image}
                bookName={book.name}
                rating={calculateAverageRating(book.ratingReviews)}
                reviews={calculateTotalReviews(book.ratingReviews)}
                author={book.author}
                publisher={book.publisher}
                dateOfPublish={book.dateOfPublish}
                price={book.price}
              />
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}