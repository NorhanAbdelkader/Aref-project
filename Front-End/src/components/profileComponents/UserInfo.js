import { useState,useRef,useEffect  } from "react";
import './UserInfo.css';
import { useAuth } from "../../hooks/AuthProvider";
// import UserArticles from "./UserArticles";
// import EditProfileWindow from "./EditProfileWindow";



export function ProfileCard({username,bio,coverPhoto,profilePhoto,personal,userId}){
    const auth = useAuth();
    const [following, setFollowing] = useState(auth.user.followingList.includes(userId));

    const followUser = async (userId) => {
        const data = { userId };
        const response = await fetch(`http://localhost:5000/api/user/followUser`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        setFollowing(true);
        auth.initialUser();
    }

    const unfollowUser = async (userId) => {
        const data = { userId };
        const response = await fetch(`http://localhost:5000/api/user/unfollowUser`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        setFollowing(false);
        auth.initialUser();
    }

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
                   { !personal && !following ? <button onClick={() => followUser(userId)}>متابعة </button> : <></>}
                   { !personal && following ? <button onClick={() => unfollowUser(userId)}> إلغاء المتابعة </button> : <></>}

                   {/* <button >إرسال رسالة</button> */}
               </div>
        </div>
   </div>
    )
}


      



