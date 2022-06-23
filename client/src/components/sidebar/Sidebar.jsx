import "./sidebar.css";
import { RssFeed, Chat } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </Link>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
      </div>
    </div>
  );
}
