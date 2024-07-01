import { useState,useRef,useEffect  } from "react";
import './Article.css';
import { AiFillLike ,AiFillDislike} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import { useAuth } from "../../hooks/AuthProvider";

function Article({id,name,content,profilePhoto,images,numLikes,numComments,comments}) {
    
    return ( 
        <div className="article-container">

            <UserInfo name={name} profilePhoto={profilePhoto}/>
            <Content content={content} images={images}/>
           <LikeComment articleId={id} numLikes={numLikes} numComments={numComments}commentlist={comments}/>
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


  export function LikeComment({numLikes,numComments,commentlist ,articleId}){
    const [likes,setLike]=useState(numLikes)
    const [dislikes,setDisLike]=useState(0)
    const [reports,setReport]=useState(0)
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDisLikeClicked] = useState(false);
    const [reportClicked, setReportClicked] = useState(false);
    const [comments,setComment]=useState(numComments)
    const [showComments, setShowComments] = useState(false);

  
   
    const handleLike = async (articleId) => {
      try {
       console.log(articleId)
        setLike(likes + 1);
        setLikeClicked(true);
    
        const token = localStorage.getItem('auth-token');
    
        
        if (!token) {
          throw new Error('No auth token found in localStorage');
        }
    

        const response = await fetch(`http://localhost:5000/api/article/likeArticle/${articleId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Replace with the retrieved token
          },
          // Include any additional data if necessary
          body: JSON.stringify({ like: true })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const message = await response.json();
        console.log(message);
      } catch (error) {
        // Revert optimistic update in case of an error
        setLike(likes - 1);
        setLikeClicked(false);
        console.error('Error liking the article:', error);
      }
    };
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
      <button onClick={() => handleLike(articleId)} > 
        <AiFillLike color={likeClicked ? '#014D4E' : 'gray'} size={30} /></button>

      <button onClick={() =>  handleDisLike(articleId)}>
        <AiFillDislike color={dislikeClicked ? 'Maroon' : 'gray'} size={30} /></button>

      <button  onClick={handleComment}><FaRegComment  size={30} /></button>
      <button  onClick={handleReport}>< MdReportGmailerrorred color={reportClicked ? 'Maroon ' : 'gray'} size={30} /></button>
    </div>
    {showComments && <CommentList articleId={articleId} commentlist={commentlist} addcomment={() => {
        setComment(comments+1);
        
      }} />}
        </>
       

    );
  }

  export function CommentList(props){
    const [commentList, setcommentList] = useState(props.commentlist);
    const inputRef = useRef(null);
    const auth = useAuth();
    
   

    
    
    var comments = commentList.map((comment, index) => (
      <div className="Whole-comment">
        <UserInfo name={comment.userId.name.firstName} profilePhoto={comment.userId.profilePhoto}/>
         <p className="comment">{comment.content}</p>
        </div>
       
    ));

    const handleAddComment = async (articleId) => {

      try {
        // console.log(articleId)
        
        
     
         const token = localStorage.getItem('auth-token');
     
         
         if (!token) {
           throw new Error('No auth token found in localStorage');
         }
     
 
         const response = await fetch(`http://localhost:5000/api/comment/addcomment`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': token 
           },
          
           body: JSON.stringify({ articleId: articleId,content:inputRef.current.value })
         });
     
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
     
         const newComment = await response.json();
         console.log(newComment);

        //  const user = await auth.getUser();
        const user=auth.user
         const enrichedComment = {
          ...newComment,
          userId: {
            ...newComment.userId,
            profilePhoto: user.profilePhoto,
            name: {
              firstName: user.name.firstName
            }
          }
        };
         setcommentList([
          ...commentList,
          enrichedComment
        
         
          // {
          //   profilePhoto:"logo512.png",
          //   "username": "commenter3",
          //   "comment": inputRef.current.value
          // }
          
        ]);
       } catch (error) {
         // Revert optimistic update in case of an error
         console.error('Error  adding comment the article:', error);
       }
        
        props.addcomment();
       
        inputRef.current.value = '';
    };
    return(
        <>
        
        {comments}
        <div className="currentComment">
        <input  ref={inputRef} type="text" placeholder="اكتب تعليقك" />
        <button onClick={() => handleAddComment(props.articleId)}>اضف تعليق</button>
        </div>
        
        </>
    )
  }
  
  
  export default Article;