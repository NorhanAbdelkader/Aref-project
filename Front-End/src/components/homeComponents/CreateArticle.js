import { UserInfo } from "./Article";
import { useState,useRef  } from "react";
import "./CreateArticle.css"

function CreateArticle({ addPost }){
    const [content, setContent] = useState('');
    const [Images, setImages] = useState([]);
   
    const setImageList = (files) => {
        
        const imageFiles = Array.from(files).map(file => URL.createObjectURL(file));
        setImages([
            ...Images,
            ...imageFiles
        ]);
    };

    const handlePost = () => {
        const newPost = {
            id: 3, 
            username: 'تسنيم',
            content: content,
            profilePhoto: 'logo192.png', 
            images: Images,
            numLikes: 0,
           
            comments: [] 
        };
        console.log(newPost)
        addPost(newPost);
        // Reset form after adding the post
        setContent('');
        setImages([]);
    };

    
    return(
        <div className="create-post">
        <UserInfo name="تسنيم" profilePhoto="logo192.png"/>
        
        <PostContent images={Images} setContent={setContent} content={content}/>
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
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                ))}
            </div>
        </>
    );
}

export function ImageIcon({setImageList}){
    
    const fileInputRef = useRef(null);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setImageList(files);
        console.log('Selected file:', files);
    };
    

    return(
   <>
        <div class="add-to-post">
            <button class="add-btn" onClick={handleImageClick} ><img src="image-.png" alt="Image"></img></button>
            <span>اصافة صور</span>
        
        </div>
            <input  type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
        />

   </>
    )
}

export default CreateArticle;