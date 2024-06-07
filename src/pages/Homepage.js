import { useState,useRef,useEffect  } from "react";
import CreateArticle from "../homeComponents/CreateArticle";
import Article from "../homeComponents/Article";
import './Homepage.css';


function HomePage(){
    const [posts, setPosts] = useState([]);
    useEffect(() => { 
      fetch(`/posts.json`) 
        .then((response) => response.json()) 
        .then((data) => setPosts(data)) 
        .catch((error) => console.log(error)); 
    }, []); 

     
    return(
      <div className="Homepage">
      <CreateArticle/>
      <div>
      {posts.map(post => (
                    <Article  key={post.id} id={post.id} name={post.username} content={post.content}
                     profilePhoto={post.profilePhoto} images={post.images} numLikes={post.numLikes} comments={post.comments}/>
                ))}
      </div>
      
      </div>
    )
  }

  export default HomePage;