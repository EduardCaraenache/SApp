import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const [openNotFoundSnackbar, setOpenNotFoundSnackbar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotFoundSnackbar(false);
  };

  const logoutCall = async () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const handleClickLogout = () => {
    logoutCall();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    getUser();
  };

  const getUser = async () => {
    try {
      await axios.get("/users?username=" + searchText);
      navigate("/");
      navigate(`/profile/${searchText}`);
      setSearchText("");
    } catch (err) {
      setOpenNotFoundSnackbar(true);
    }
  };

  const action = (
    <IconButton size="small" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">OurSpace</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <form onSubmit={handleSubmit}>
          <div className="searchbar">
            <IconButton type="submit">
              <Search className="searchIcon" type="button" />
            </IconButton>
            <input
              value={searchText}
              placeholder="Search for friend, post or video"
              className="searchInput"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Profile</span>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink" onClick={handleClickLogout}>
              Logout
            </span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
      <Snackbar
        open={openNotFoundSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Utilizatorul nu a fost găsit"
        action={action}
      />
    </div>
  );
}
