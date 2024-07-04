import { useState,useRef,useEffect  } from "react";
import './UserInfo.css';
// import UserArticles from "./UserArticles";
import EditProfileWindow from "./EditProfileWindow";



export function ProfileCard({username,bio,coverPhoto,profilePhoto,personal}){
    
    return(
        <div className="profile-card">
        <div className="coverPhoto" style={{ backgroundImage: `url(${coverPhoto})` }}></div>
       
        <div className="profile-info_social-icons">
               <div className="profile-info">
                   <img  src={profilePhoto} alt="User Profile"></img> 
                   <div className="username-bio">
                       <h2>{username}</h2>
                       <p>{bio}</p>
                   </div>
               
               </div>
               <div className="social-icons">
                   { !personal ? <button >متابعة </button> : <></>} 
                   {/* <button >إرسال رسالة</button> */}
               </div>
        </div>
   </div>
    )
}


      



