import { FaHome } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { useAuth } from "../../hooks/AuthProvider";

const SidebarElements = () => {
  const auth = useAuth();

  return [
    {
      title: "المقالات",
      link: "/home",
      icon: <FaHome />,
      logOut: false
    },
    {
      title: "المكتبة",
      link: "/library",
      icon: <IoLibrary />,
      logOut: false
    },
    {
      title: "الملف الشخصي",
      link: `/profile/${auth.user ? auth.user._id : ''}`,
      icon: <BiSolidUserCircle />,
      logOut: false
    },
    {
      title: "تسجيل الخروج",
      link: "/",
      icon: <MdLogout />,
      logOut: true
    }
  ];
};

export default SidebarElements;