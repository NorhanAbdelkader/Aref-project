import { FaHome } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";

export const SidebarElements = [
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
        link: "/profile",
        icon: <BiSolidUserCircle />
    },
    {
        title: "تسجيل الخروج",
        link: "/",
        icon: <MdLogout />
    }
]