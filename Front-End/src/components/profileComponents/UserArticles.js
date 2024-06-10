import { useState,useRef,useEffect  } from "react";
import CreateArticle from "../homeComponents/CreateArticle";
import Article from "../homeComponents/Article";
import './UserArticles.css'
import EditProfileWindow from "./EditProfileWindow";



export function UserInformationAndArticles({interests,coverPhoto,profilePhoto,changeProfilePhoto,changeCoverPhoto,changeBio}){
  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedInterst, setAddedInterst] = useState(false);
  const [interestList, setInterestList] = useState(interests); 
  

  var interests = interestList.map((interest, index) => (
      <li key={index}>{interest}</li>
     
  ));

  const addInterest = () => {
      setAddedInterst(true);
      setInterestList([
          ...interestList,
          inputRef.current.value
        ]);
        inputRef.current.value = '';
  };

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  return(
      <div className="userInformation-Articles">
      <div class="user-information">
          <h2>User Information</h2>
          <h3>interests</h3> 
          <ul>
              {interests}
          </ul>
          <input ref={inputRef} type="text" placeholder="add interset ....." />
          {/* {addedInterst &&  <input ref={inputRef} type="text" placeholder="add interset ....." />} */}
          <button onClick={addInterest}>Add interests</button>
          <button onClick={handleOpenModal}>Edit profile</button>
      
      </div>
      {isModalOpen && <EditProfileWindow coverPhoto={coverPhoto} profilePhoto={profilePhoto}
       onClose={handleCloseModal} changeProfilePhoto={changeProfilePhoto} 
        changeCoverPhoto={changeCoverPhoto} changeBio={changeBio}/>}
      <UserArticles/>
  </div>
  )
}




export function UserArticles({id}){
    const [posts, setPosts] = useState([]);
    useEffect(() => { 
      fetch(`/posts.json`) 
        .then((response) => response.json()) 
        .then((data) => setPosts(data)) 
        .catch((error) => console.log(error)); 
    }, []); 
      

    const addPost = (newPost) => {
      setPosts([...posts, newPost]);
  };

     console.log(`post ${posts}`)
    return(
      <div className="user-article">
      <CreateArticle   addPost={addPost}/>
      <div>
      {posts.map(post => (
                    <Article  key={post.id} id={post.id} name={post.username} content={post.content}
                     profilePhoto={post.profilePhoto} images={post.images} numLikes={post.numLikes} comments={post.comments}/>
                ))}
      </div>
      
      </div>
    )
  }

  