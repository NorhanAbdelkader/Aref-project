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
      icon: <FaHome />
    },
    {
      title: "المكتبة",
      link: "/library",
      icon: <IoLibrary />
    },
    {
      title: "الملف الشخصي",
      link: `/profile/${auth.user ? auth.user._id : ''}`,
      icon: <BiSolidUserCircle />
    },
    {
      title: "تسجيل الخروج",
      link: "/",
      icon: <MdLogout />
    }
  ];
};

export default SidebarElements;