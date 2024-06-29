import React, { useState, useEffect } from 'react';
import Book from './Book';
import { fetchBooks } from './mockLibraryService';
import Filter from './Filter';
import './library.css';
import{ Search} from './Search';
import book2 from './assets/book2.jpg'
import {NavLink,Link} from 'react-router-dom'
export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then((fetchedBooks) => {
      setBooks(fetchedBooks);
      setFilteredBooks(fetchedBooks);
      setLoading(false);
    });
  }, []);

 
  const onFilter = (criteria) => {
    let filtered = books;

    if (criteria.category && criteria.category !== 'All') {
      filtered = filtered.filter(book => book.category === criteria.category);
    }

    if (criteria.author) {
      filtered = filtered.filter(book => book.author.toLowerCase().includes(criteria.author.toLowerCase()));
    }

    if (criteria.priceRange && criteria.priceRange !== 'All') {
      const [minPrice, maxPrice] = criteria.priceRange;
      filtered = filtered.filter(book => book.price >= minPrice && book.price <= maxPrice);
    }

    if (criteria.rating && criteria.rating !== 'All') {
      switch (criteria.rating) {
        case 'Above2':
          filtered = filtered.filter(book => book.rating > 2);
          break;
        case 'Above3':
          filtered = filtered.filter(book => book.rating > 3);
          break;
        case 'Above4':
          filtered = filtered.filter(book => book.rating > 4);
          break;
        case 'Equal5':
          filtered = filtered.filter(book => book.rating === 5);
          break;
        default:
          break;
      }
    }

    setFilteredBooks(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const calculateTotalReviews = (ratingReviews) => {
    return ratingReviews.reduce((total, num) => total + num, 0);
  };
  const calculateAverageRating = (ratingReviews) => {
    const totalReviews = calculateTotalReviews(ratingReviews);
    const totalStars = ratingReviews.reduce((total, count, index) => total + count * (index + 1), 0);
    return totalReviews ? (totalStars / totalReviews).toFixed(1) : 0;
  };
  return (
    <div className="library-container">
  
    
    
      <div className="columns">
          <div className="sidebar">
            <Filter minPrice={0} maxPrice={200} onFilter={onFilter} />
          </div>
          <div className="main-content">
          <Search/>
            {filteredBooks.map((book) => (
            
              <Link to={`/books/${book.id}`}>
                <div>
                 <Book
                key={book.id}
                bookImage={book2}
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
    </div>
  );
}