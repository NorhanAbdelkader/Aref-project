import { useState,useRef,useEffect  } from "react";
import './Article.css';
import { AiFillLike ,AiFillDislike} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import CreateArticle from "./CreateArticle";

function Article({id,name,content,profilePhoto,images,numLikes,comments}) {
    
    return ( 
        <div className="article-container">

            <UserInfo name={name} profilePhoto={profilePhoto}/>
            <Content content={content} images={['logo512.png']}/>
           <LikeComment numLikes={numLikes} commentlist={comments}/>
           {/* <CommentList comments={["nice"]}/> */}
            
        </div>
      

    );
  }
  export function UserInfo({name,profilePhoto}){
    return (
        <div className="atricle-writer"> 
        <img src={profilePhoto}></img>
        <h2>{name}</h2>
       </div>
    )
  }

  export function Content(props){
    var images = props.images.map((image, index) => (
        <img key={index} src={image} alt="Post Image (Optional)" />
    ));
    return (
    <div className="post-content">
        <p>{props.content}</p>
        <div className="images">{images}</div>
    </div>
    )
  }


  export function LikeComment({numLikes,commentlist}){
    const [likes,setLike]=useState(numLikes)
    const [dislikes,setDisLike]=useState(0)
    const [reports,setReport]=useState(0)
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDisLikeClicked] = useState(false);
    const [reportClicked, setReportClicked] = useState(false);
    const [comments,setComment]=useState(0)
    const [showComments, setShowComments] = useState(false);

    // useEffect(() => { 
    //   fetch(`./posts.json`) 
    //     .then((response) => response.json()) 
    //     .then((data) => {
    //       const specificPost = data.find(post => post.id === id);
    //       setLike(specificPost.numlikes);
    //       setComment(specificPost.numcomments);

    //     }) 
    //     .catch((error) => console.log(error)); 
    // }, []); 
   
    const handleLike = () => {
        setLike(likes+1);
        setLikeClicked(true)
      }
      const handleDisLike = () => {
        setDisLike(dislikes+1);
        setDisLikeClicked(true)
      }
      const handleReport = () => {
        setReport(reports+1);
        setReportClicked(true)
      }
      const handleComment = () => {
        setShowComments(true);
      };
    //   const addcomment = () => {
    //     setComment(comments+1);
    //     setcommentList([
    //         ...commentList,
    //         {  }
    //       ]);
    //   };
      
    return (
        <>
     <div className="likes-comments-count">
        <span >{likes}اعجاب</span>
        
        <span>{comments} تعليقات</span>
    </div>
    
    <div className="likes-comments">
      <button onClick={handleLike} > 
        <AiFillLike color={likeClicked ? 'Maroon ' : 'gray'} size={30} /></button>

      <button onClick={handleDisLike} >
        <AiFillDislike color={dislikeClicked ? 'Maroon' : 'gray'} size={30} /></button>

      <button  onClick={handleComment}><FaRegComment  size={30} /></button>
      <button  onClick={handleReport}>< MdReportGmailerrorred color={reportClicked ? 'Maroon ' : 'gray'} size={30} /></button>
    </div>
    {showComments && <CommentList  commentlist={commentlist} addcomment={() => {
        setComment(comments+1);
        
      }} />}
        </>
       

    );
  }

  export function CommentList(props){
    const [commentList, setcommentList] = useState(props.commentlist);
    const inputRef = useRef(null);

    // useEffect(() => { 
    //   fetch(`./posts.json/${props.id}`) 
    //     .then((response) => response.json()) 
    //     .then((data) => setcommentList(data.comments)) 
    //     .catch((error) => console.log(error)); 
    // }, []); 
    
    var comments = commentList.map((comment, index) => (
      <div className="Whole-comment">
        <UserInfo name={comment.username} profilePhoto={'logo512.png'}/>
         <p className="comment">{comment.comment}</p>
        </div>
       
    ));

    const handleAddComment = () => {
        
        props.addcomment();
        setcommentList([
          ...commentList,
          {
            profilePhoto:"logo512.png",
            "username": "commenter3",
            "comment": inputRef.current.value
          }
          
        ]);
        inputRef.current.value = '';
    };
    return(
        <>
        
        {comments}
        <div className="currentComment">
        <input  ref={inputRef} type="text" placeholder="write you comment" />
        <button onClick={handleAddComment}>اضف تعليق</button>
        </div>
        
        </>
    )
  }
  
  
  export default Article;