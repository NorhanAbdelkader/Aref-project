import { UserInfo } from "./Article";
import { useState, useRef } from "react";
import "./CreateArticle.css"
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

function CreateArticle({addpost}) {
    const [content, setContent] = useState('');
    const [Images, setImages] = useState([]);
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user
    console.log(user)

    const setImageList = (files) => {

        // const imageFiles = Array.from(files).map(file => URL.createObjectURL(file));

        setImages([
            ...Images,
            ...files
        ]);
    };

    const handlePost = async () => {
        const newPost = {

            userId: user._id,
            content: content,
            images: Images
        };
        console.log(newPost)
        const token = localStorage.getItem('auth-token');


        if (!token) {
            throw new Error('No auth token found in localStorage');
        }
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('content',content);

       
        Images.forEach((image, index) => {
            formData.append('images', image);
        });


        const response = await fetch(`http://localhost:5000/api/article/createArticle`, {
            method: 'POST',
            headers: {
                //  'Content-Type': 'multipart/form-data',
                'Authorization': token
            },

            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        console.log("savedddddd",post);
        addpost()
        
        navigate("/home");
        setContent('');
        setImages([]);
    };


    return (
        <div className="create-post">
            <UserInfo name={user.name.firstName +" "+user.name.lastName} profilePhoto={user.profilePhoto} />

            <PostContent images={Images} setContent={setContent} content={content} />
            <ImageIcon setImageList={setImageList} />

            <button onClick={handlePost} class="post-btn" >نشر</button>


        </div>
    );
};

function PostContent({ setContent, content, images }) {
    const handleContentChange = (e) => {
        setContent(e.target.value); // Update content state when textarea value changes
    };
    return (
        <>
            <textarea className="post-input" placeholder="بم تفكر؟" value={content} onChange={handleContentChange}></textarea>
            <div className="post-images">
                {images.map((image, index) => {
                    const imageUrl = URL.createObjectURL(image);
                    return (
                        <img key={index} src={imageUrl} alt={`Image ${index}`} />
                    );
                })}
            </div>
        </>
    );
}

export function ImageIcon({ setImageList }) {

    const fileInputRef = useRef(null);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setImageList(files);
        console.log('Selected file:', files);
    };


    return (
        <>
            <div class="add-to-post">
                <button class="add-btn" onClick={handleImageClick} ><img src="image-.png" alt="Image"></img></button>
                <span>اصافة صور</span>

            </div>
            <input type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

        </>
    )
}

export default CreateArticle;