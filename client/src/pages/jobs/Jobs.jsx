import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import "./jobs.css";

export default function Groups() {
  return (
    <>
      <Topbar />
      <div className="jobsContainer">
        <Sidebar />
        {/* <Feed />
        <Rightbar /> */}
      </div>
    </>
  );
}
