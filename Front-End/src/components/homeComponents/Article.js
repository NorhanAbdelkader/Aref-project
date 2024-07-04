import { useState, useRef, useEffect } from "react";
import './Article.css';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import { useAuth } from "../../hooks/AuthProvider";
import { Link } from "react-router-dom";

function Article({ id,userId, name, content, profilePhoto, images, numLikes, numComments, comments, likedUsers, dislikedUsers, reportedUsers }) {
  console.log(userId._id)
  return (
    <div className="article-container">

      <UserInfo  userId={userId} name={name} profilePhoto={profilePhoto} />
      <Content content={content} images={images} />
      <LikeComment articleId={id} numLikes={numLikes} numComments={numComments} commentlist={comments}
        likedUsers={likedUsers} dislikedUsers={dislikedUsers} reportedUsers={reportedUsers} />
      {/* <CommentList comments={["nice"]}/> */}

    </div>


  );
}
export function UserInfo({ userId,name, profilePhoto }) {
  
  return (
    <div className="atricle-writer">
      <img src={profilePhoto}></img>
      <h2>
        <Link to={`/profile/${String(userId)}`}>{name}</Link>
      </h2>
    </div>
  )
}

export function Content(props) {
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

async function handleReact(react, articleId) {

  const token = localStorage.getItem('auth-token');


  if (!token) {
    throw new Error('No auth token found in localStorage');
  }


  const response = await fetch(`http://localhost:5000/api/article/${react}/${articleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token // Replace with the retrieved token
    },
    // Include any additional data if necessary
    // body: JSON.stringify({ like: true })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const message = await response.json();
  console.log(message);
}


export function LikeComment({ numLikes, numComments, commentlist, articleId, likedUsers, dislikedUsers, reportedUsers }) {
  const auth = useAuth();
  const [likes, setLike] = useState(numLikes)
  const [dislikes, setDisLike] = useState(0)
  const [reports, setReport] = useState(0)
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDisLikeClicked] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);
  const [comments, setComment] = useState(numComments)
  const [showComments, setShowComments] = useState(false);
  const user = auth.user

  useEffect(() => {
    if (likedUsers.includes(user._id)) {
      setLikeClicked(true);
    }
  }, [likedUsers, user._id]); useEffect(() => {
    if (likedUsers.includes(user._id)) {
      setLikeClicked(true);
    }
    if (dislikedUsers.includes(user._id)) {
      setDisLikeClicked(true);
    }
    if (reportedUsers.includes(user._id)) {
      setReportClicked(true);
    }
  }, [likedUsers, dislikedUsers, reportedUsers, user._id]);

  const handleLike = async (articleId) => {
    try {
      if (likeClicked) {
        alert("you have already liked the article")
      } else {
        setLike(likes + 1);
        setLikeClicked(true);


        handleReact(`likeArticle`, articleId)
        if (dislikeClicked) {
          setDisLikeClicked(false);
          setDisLike(dislikes - 1);
        }
      }
      // console.log(articleId)


    } catch (error) {
      // Revert optimistic update in case of an error
      setLike(likes - 1);
      console.error('Error liking the article:', error);
    }
  };
  const handleDisLike = (articleId) => {
    try {
      console.log(articleId)
      if (dislikeClicked) {
        alert("you have already disliked the article")
      } else {
        setDisLike(dislikes + 1);
        setDisLikeClicked(true)
        handleReact(`dislikeArticle`, articleId)

        if (likeClicked) {
          setLike(likes - 1);
          setLikeClicked(false);
        }
      }


    } catch (error) {
      // Revert optimistic update in case of an error
      setDisLike(dislikes - 1);
      setDisLikeClicked(false)
      console.error('Error disiking the article:', error);
    }

  }
  const handleReport = (articleId) => {
    try {
      console.log(articleId)
      if (reportClicked) {
        alert("you have already reported the article")
      } else {
        setReport(reports + 1);
        setReportClicked(true)

        handleReact(`reportArticle`, articleId)
      }


    } catch (error) {
      // Revert optimistic update in case of an error
      setReport(reports - 1);
      setReportClicked(false)
      console.error('Error reporting the article:', error);
    }


  }
  const handleComment = () => {
    setShowComments(true);
  };


  return (
    <>
      <div className="likes-comments-count">
        <span >{likes}اعجاب</span>

        <span>{comments} تعليقات</span>
      </div>

      <div className="likes-comments">
        <button onClick={() => handleLike(articleId)} >
          <AiFillLike color={likeClicked ? '#014D4E' : 'gray'} size={30} /></button>

        <button onClick={() => handleDisLike(articleId)}>
          <AiFillDislike color={dislikeClicked ? 'Maroon' : 'gray'} size={30} /></button>

        <button onClick={handleComment}><FaRegComment size={30} /></button>
        <button onClick={() => handleReport(articleId)}>< MdReportGmailerrorred color={reportClicked ? 'Maroon ' : 'gray'} size={30} /></button>
      </div>
      {showComments && <CommentList articleId={articleId} commentlist={commentlist} addcomment={() => {
        setComment(comments + 1);

      }} />}
    </>


  );
}

export function CommentList(props) {
  const [commentList, setcommentList] = useState(props.commentlist);
  const inputRef = useRef(null);
  const auth = useAuth();





  var comments = commentList.map((comment, index) => (
    <div className="Whole-comment">
      <UserInfo name={comment.userId.name.firstName +" "+comment.userId.name.lastName} profilePhoto={comment.userId.profilePhoto} />
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

        body: JSON.stringify({ articleId: articleId, content: inputRef.current.value })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newComment = await response.json();
      console.log(newComment);

      //  const user = await auth.getUser();
      const user = auth.user
      const enrichedComment = {
        ...newComment,
        userId: {
          ...newComment.userId,
          profilePhoto: user.profilePhoto,
          name: {
            firstName: user.name.firstName,
            lastName: user.name.lastName
          }
        }
      };
      setcommentList([
        ...commentList,
        enrichedComment



      ]);
    } catch (error) {

      console.error('Error  adding comment the article:', error);
    }

    props.addcomment();

    inputRef.current.value = '';
  };
  return (
    <>

      {comments}
      <div className="currentComment">
        <input ref={inputRef} type="text" placeholder="اكتب تعليقك" />
        <button onClick={() => handleAddComment(props.articleId)}>اضف تعليق</button>
      </div>

    </>
  )
}


export default Article;