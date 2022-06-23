import "./post.css";
import { MoreVert, Delete, Edit } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IconButton } from "@mui/material";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [comments, setComments] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handlerDelete = () => {
    try {
      axios.delete("/posts/" + post._id, { data: { userId: currentUser._id } });
      window.location.reload();
    } catch (err) {
      console.log("N-a mers");
    }
  };

  const handlerEdit = () => {};

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>

          {/* <Edit /> */}
          {post.userId === currentUser._id && (
            <div className="postTopRight">
              <IconButton type="submit" onClick={handlerEdit}>
                <Edit className="editIcon" type="submit" />
              </IconButton>
              <IconButton type="submit" onClick={handlerDelete}>
                <Delete className="deleteIcon" />
              </IconButton>
            </div>
          )}
          {/* <MoreVert /> */}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {/* <img className="postImg" src={PF + post.img} alt="" /> */}

          {post.img && <img className="postImg" src={PF + post.img} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
