
import { useState, useRef, useEffect } from "react";
import { ProfileCard } from "../components/profileComponents/UserInfo";
import { UserInformationAndArticles } from "../components/profileComponents/UserArticles";
import Navbar from "../components/generalComponents/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router-dom";


function UserProfile() {
    const [personal, setPersonal] = useState(false);
    const [profileUser, setProfileUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [Bio, setBio] = useState(null);
    const { userId } = useParams();
    const auth = useAuth();
    const loggedInUser = auth.user;
    // console.log(userId)
    useEffect(() => {
        if (String(loggedInUser._id) === String(userId)) {
            setPersonal(true);
            setProfileUser(loggedInUser);
            setProfilePhoto(loggedInUser.profilePhoto);
            setCoverPhoto(loggedInUser.coverPhoto);
            setBio(loggedInUser.bio);
        } else {
            const viewProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/user/profile/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('auth-token'),
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setProfileUser(data.user);
                    setProfilePhoto(data.user.profilePhoto);
                    setCoverPhoto(data.user.coverPhoto);
                    setBio(data.user.bio);
                } catch (error) {
                    console.error(error);
                }
            };
            viewProfile();
        }
    }, [userId, loggedInUser]);

    if (!profileUser) {
        return <div>Loading...</div>;
    }


    const changeProfilePhoto = async (file) => {
        const formData = new FormData();
        formData.append('profile photo', file);
        const response = await fetch(`http://localhost:5000/api/user/profilePhoto`, {
            method: 'PATCH',
            headers: {
                //  'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('auth-token')
            },

            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();

        setProfilePhoto(URL.createObjectURL(file));
    };
    const changeCoverPhoto = async (file) => {
        const formData = new FormData();
        formData.append('cover photo', file);
        const response = await fetch(`http://localhost:5000/api/user/CoverPhoto`, {
            method: 'PATCH',
            headers: {
                //  'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('auth-token')
            },

            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        setCoverPhoto(URL.createObjectURL(file));
    };
    const changeBio = async (value) => {
        console.log(value)
        const response = await fetch(`http://localhost:5000/api/user/Bio`, {
            method: 'PATCH',
            headers: {
                 'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth-token')
            },

            body: JSON.stringify({ bio: value })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const message = await response.json();
        setBio(value);
    };
    return (
        <>
            <Navbar />
            <ProfileCard username={profileUser.name.firstName + " " + profileUser.name.lastName} bio={Bio} coverPhoto={coverPhoto} profilePhoto={profilePhoto} personal={personal} />
            <UserInformationAndArticles interests={profileUser.interests}
                coverPhoto={coverPhoto} profilePhoto={profilePhoto} changeProfilePhoto={changeProfilePhoto}
                changeCoverPhoto={changeCoverPhoto} changeBio={changeBio} personal={personal} />

        </>
    )
}

export default UserProfile;
