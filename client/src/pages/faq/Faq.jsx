import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./faq.css";

export default function Faq() {
  return (
    <>
      <Topbar />
      <div className="faqContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
      <Sidebar />
    </>
  );
}
