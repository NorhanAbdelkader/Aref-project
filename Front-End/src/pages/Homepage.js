import { useState, useRef, useEffect } from "react";
import CreateArticle from "../components/homeComponents/CreateArticle";
import Article from "../components/homeComponents/Article";
import './Homepage.css';
import Navbar from "../components/generalComponents/Navbar";
import Sidebar from "../components/homeComponents/Sidebar";



function HomePage() {
  const [posts, setPosts] = useState([]);

    const token = localStorage.getItem("auth-token");

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/article/viewArticles', {
          method: 'GET', // or 'POST' if you need to send data
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token, // Replace `your-token-here` with your actual token
          },
        });
        if (!token) {
          throw new Error('No auth token found in localStorage');
        } 
        
        if (!response.ok) {
          console.log(response)
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
   
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='home-components'>

        <CreateArticle className='create'addpost={fetchData} profile='false'/>
        <div>
          {posts.map(post => (
            <Article key={post.id} id={post._id} userId={post.userId._id} name={post.userId.name.firstName + " " + post.userId.name.lastName} content={post.content}
              profilePhoto={post.userId.profilePhoto} images={post.images} numLikes={post.likesNum}
               numComments={post.commentsNum}comments={post.comments} likedUsers={post.likedUsers}
               dislikedUsers={post.dislikedUsers} reportedUsers={post.reportedUsers}/>
          ))}
        </div>

      </div>
    </>

  )
}

export default HomePage;