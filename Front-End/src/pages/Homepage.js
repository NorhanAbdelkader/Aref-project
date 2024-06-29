import { useState, useRef, useEffect } from "react";
import CreateArticle from "../components/homeComponents/CreateArticle";
import Article from "../components/homeComponents/Article";
import './Homepage.css';
import Navbar from "../components/generalComponents/Navbar";
import Sidebar from "../components/homeComponents/Sidebar";


function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`/posts.json`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='home-components'>

        <CreateArticle className='create'/>
        <div>
          {posts.map(post => (
            <Article key={post.id} id={post.id} name={post.username} content={post.content}
              profilePhoto={post.profilePhoto} images={post.images} numLikes={post.numLikes} comments={post.comments} />
          ))}
        </div>

      </div>
    </>

  )
}

export default HomePage;