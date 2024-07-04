import { useState, useRef, useEffect } from "react";
import CreateArticle from "../homeComponents/CreateArticle";
import Article from "../homeComponents/Article";
import './UserArticles.css'
import EditProfileWindow from "./EditProfileWindow";



export function UserInformationAndArticles({interests,coverPhoto,profilePhoto,changeProfilePhoto,changeCoverPhoto,changeBio, personal, userId}){
  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedInterst, setAddedInterst] = useState(false);
  const [interestList, setInterestList] = useState(interests);


  var interests = interestList.map((interest, index) => (
    <li key={index}>{interest}</li>

  ));

  const addInterest = async () => {
    const response = await fetch(`http://localhost:5000/api/user/addInterest`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token')
      },

      body: JSON.stringify({ interest: inputRef.current.value })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const message = await response.json();
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

  return (
    <div className="userInformation-Articles">
      <div class="user-information">
          <h2>معلومات عن المستخدم</h2>
          <h3>الاهتمامات</h3> 
          <ul>
              {interests}
          </ul>
          { personal ? <input ref={inputRef} type="text" placeholder="أضف إهتمامك...." /> : <></> }
          {/* {addedInterst &&  <input ref={inputRef} type="text" placeholder="add interset ....." />} */}
          { personal ? <button onClick={addInterest}>إضافة إهتمام جديد</button> : <></> }
          { personal ? <button onClick={handleOpenModal}>تعديل الملف الشخصي</button> : <></> }
      
      </div>
      {isModalOpen && <EditProfileWindow coverPhoto={coverPhoto} profilePhoto={profilePhoto}
       onClose={handleCloseModal} changeProfilePhoto={changeProfilePhoto} 
        changeCoverPhoto={changeCoverPhoto} changeBio={changeBio}/>}
      <UserArticles userId = {userId} personal = {personal}/>
  </div>
  )
}


export function UserArticles({userId, personal}){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem("auth-token");
  
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/viewUserArticles/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
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
  
      fetchData();
    }, [userId]);
  
    return(
      <div className="user-article">
        { personal ? <CreateArticle /> : <></> }
        <div>
            {posts.map(post => (
                    <Article key={post.id} id={post._id} name={post.userId.name.firstName + " " + post.userId.name.lastName} content={post.content}
                    profilePhoto={post.userId.profilePhoto} images={post.images} numLikes={post.likesNum}
                     numComments={post.commentsNum}comments={post.comments} />
                ))}
        </div>
      </div>
  )
}

