
import { useState,useRef,useEffect  } from "react";
import { ProfileCard} from "../profileComponents/UserInfo";
import {UserInformationAndArticles} from "../profileComponents/UserArticles";
import Navbar from "../components/generalComponents/Navbar";


function UserProfile(){
    const [profilePhoto, setProfilePhoto] = useState("logo512.png");
    const [coverPhoto, setCoverPhoto] = useState("cover-image.jpg");
    const [Bio, setBio] = useState("Bio");
    const changeProfilePhoto = (file) => {
        setProfilePhoto(URL.createObjectURL(file));
    };
    const changeCoverPhoto = (file) => {
        setCoverPhoto(URL.createObjectURL(file));
    };
    const changeBio= (value) => {
        setBio(value);
    };
    return(
        <>
        <Navbar />
        <ProfileCard username="tasneem" bio={Bio} coverPhoto={coverPhoto} profilePhoto={profilePhoto} />
        <UserInformationAndArticles interests={["first interest","second interest"]} 
       coverPhoto={coverPhoto} profilePhoto={profilePhoto} changeProfilePhoto={changeProfilePhoto} 
         changeCoverPhoto={changeCoverPhoto} changeBio={changeBio}/>
        
        </>
    )
}

export default UserProfile;
