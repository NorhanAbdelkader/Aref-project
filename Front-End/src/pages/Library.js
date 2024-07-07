import React, { useState, useEffect } from 'react';
import Book from '../components/libraryComponents/Book';
import Filter from '../components/libraryComponents/Filter';
import './library.css';
import { Search } from '../components/libraryComponents/Search';
import Navbar from '../components/generalComponents/Navbar';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
export default function Library() {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const auth = useAuth();
  const loggedInUser = auth.user;

  const id = useParams();
  const [isDeleted, setIsDeleted] = useState(false);

  const isAdmin = (loggedInUser.role === 'Admin');
  const categories = ['رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'];

  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/book/", { method: 'get' })
      if (!response.ok) { console.log("Network Error") }
      const data = await response.json()
      setBookData(data.books);
      setBooks(data.books)
      console.log("responce messsage", data.message)

    }
    catch (error) {
      console.log("Error fetching data", error)

    } finally {
      setLoading(false);
    }
  }

  const onFilter = (criteria, criteriaValue, isChosen) => {
    if (criteria === "category") {
      setSelectedCategories((prevCategories) => {
        const updatedCategories = isChosen
          ? [...prevCategories, criteriaValue]
          : prevCategories.filter(category => category !== criteriaValue);

        if (updatedCategories.length === 0 || updatedCategories.includes('الكل')) {
          setBooks(bookData);
        } else if (updatedCategories.includes('اهتماماتي')) {
          setBooks(bookData.filter(book => loggedInUser.interests.includes(book.category)));
        } else {
          setBooks(bookData.filter(book => updatedCategories.includes(book.category)));
        }
        return updatedCategories;
      });
    } else if (criteria === "author") {
      setBooks(bookData.filter(book => book.author.toLowerCase().includes(criteriaValue.toLowerCase())));
    } else if (criteria === "price") {
      const [minPrice, maxPrice] = criteriaValue;
      setBooks(bookData.filter(book => book.price >= minPrice && book.price <= maxPrice));
    } else if (criteria === "rating") {
      switch (criteriaValue) {
        case 'Above2':
          if (isChosen) {
            setBooks(books.filter(book => book.avgRate >= 2));
          }
          else {
            setBooks(books.filter(book => book.avgRate >= 0));
          }
          break;
        case 'Above3':
          if (isChosen) {
            setBooks(books.filter(book => book.avgRate >= 3));
          }
          else {
            setBooks(books.filter(book => book.avgRate >= 0));
          }
          break;
        case 'Above4':
          if (isChosen) {
            setBooks(books.filter(book => book.avgRate >= 4));
          }
          else {
            setBooks(books.filter(book => book.avgRate >= 0));
          }
          break;
        case 'Equal5':
          if (isChosen) {
            setBooks(books.filter(book => book.avgRate == 5));
          }
          else {
            setBooks(books.filter(book => book.avgRate >= 0));
          }
          break;
        default:
          setBooks(bookData);
          break;
      }
    }
  };

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
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/book/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      const data = await response.json();
      alert('Book deleted successfully');
      setIsDeleted(true)
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
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
        <Filter minPrice={0} maxPrice={1000} onFilter={onFilter} />
      </div>
      <div className="main-content">

        {books.map((book) => (
          <div>
          {/* //   {isAdmin && <div className="card-icons">
          //     <Link to={`/updateBook/${book._id}`} key={book._id}>
          //       <BiSolidPencil className='edit' size={30} color='#014D4E' /></Link>
          //     <button><BiTrash className='delete-icon' size={30} color='#014D4E' onClick={handleDelete} /></button>
          //   </div>} */}

            {loggedInUser ? <Link to={`/library/${book._id}`} key={book._id}>
              <div>
                <Book
                  bookImage={book.image}
                  bookName={book.name}
                  rating={calculateAverageRating(book.ratingReviews)}
                  reviews={calculateTotalReviews(book.ratingReviews)}
                  author={book.author}
                  publisher={book.publisher}
                  dateOfPublish={book.dateOfPublish}
                  price={book.price}
                />
              </div> </Link> : <div onClick={()=>{alert("سجل الدخول لقراءه الكتاب")}}>
              <Book
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
}
          </div>
        ))}
      </div>
    </div>
  );
}