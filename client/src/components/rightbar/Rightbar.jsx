import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Message } from "@mui/icons-material";
import EditProfile from "../editProfile/EditProfile";
import { useNavigate } from "react-router-dom";

export default function Rightbar({ user, forceUpdate }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const followedUpdated = currentUser.followings.includes(user?._id);
  const navigate = useNavigate();


  
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followedUpdated]);

  useEffect(() => {
    if (user && user._id) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }
    else {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + currentUser._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }
  }, [user]);

  const handleClickFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const handleClickMessage = () => {
    navigate("/messenger");
    //   try {
    //     if( !exista conversatie )
    //     {creeaza conversatie }
    //     else{o deschide pe cea existenta}
    //   } catch (err) {}
    // };
  };
  console.log(friends);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>"Birthdays" is a new feature to come</b>
          </span>
        </div>
        <img className="rightbarWelcome" src="assets/Welcome.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username ? (
          <div>
            <button
              className="rightbarFollowButton"
              onClick={handleClickFollow}
            >
              {followed ? "Unfollow " : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>

            {followed ? (
              <button
                className="rightbarMessageButton"
                onClick={handleClickMessage}
              >
                Send a message &nbsp; <Message />
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          <EditProfile user={user} forceUpdate={forceUpdate} />
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "In a relationship"
                : user.relationship === 3
                ? "Married"
                : "- "}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "black" }}
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
