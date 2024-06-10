import { useState,useRef,useEffect  } from "react";
import './EditProfileWindow.css';

 function EditProfileWindow({ onClose,coverPhoto,profilePhoto ,changeProfilePhoto,changeCoverPhoto,changeBio}) {
    
    const fileInputRef = useRef(null);
    const BioInputRef = useRef(null);
    const [profilePhotoEdited, setProfilePhotoEdited] = useState(false);
    const [profileCoverEdited, setCoverPhotoEdited] = useState(false);

    const editBio = () => {
        // fileInputRef.current.value();
        
        changeBio(BioInputRef.current.value)
        BioInputRef.current.value = '';
    };
    
    const editProfilePhoto = () => {
        fileInputRef.current.click();
        setProfilePhotoEdited(true)
    };
    const editCoverPhoto = () => {
        fileInputRef.current.click();
        
        setCoverPhotoEdited(true)
    };

    const handleFileChange = (event) => {
        const file= event.target.files[0];
        console.log('Selected file:', file);
        profilePhotoEdited && changeProfilePhoto(file)
        setProfilePhotoEdited(false)
        profileCoverEdited && changeCoverPhoto(file)
        setCoverPhotoEdited(false)

        
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Edit Profile</h2>
                
                    <div className="profile-section">
                        <h3>Profile picture</h3>
                        <div className="profile-picture">
                            <img src={profilePhoto} alt="Profile" /> {/* Replace with actual profile picture */}
                            <button onClick={editProfilePhoto}>Add</button>
                        </div>
                    </div>
                    <div className="profile-section">
                        <h3>Cover photo</h3>
                        <div className="cover-photo">
                            <img src={coverPhoto} alt="Cover" /> {/* Replace with actual cover photo */}
                            <button onClick={editCoverPhoto}>Edit</button>
                        </div>
                    </div>
                    <div className="profile-section">
                        <h3>Bio</h3>
                        <div className="Bio">
                            <input  type="text" ref={BioInputRef} placeholder="Describe your self ....." />
                            <button onClick={editBio} >Create</button>
                        </div>
                        
                    </div>
             <input  type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} />
        
            </div>
        </div>
    );
}


export default EditProfileWindow;