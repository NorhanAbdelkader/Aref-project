import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { useAuth } from "../../hooks/AuthProvider";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const auth = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');      
        if (token) {
            setIsLoggedIn(true);
        }
      }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        auth.logOut();
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/">
                    <img src={require('./11.png')} alt="website-logo" className="site-logo" />
                </Link>

                <ul className="navbar-links">

                    <NavbarElementLink to="/library" className="nav-item">المكتبة <IoLibrary className="nav-icon"/></NavbarElementLink>
                    {/* <NavbarElementLink to="/about" className="nav-item">عننا</NavbarElementLink> */}
                    {isLoggedIn ?
                        (<>
                            <NavbarElementLink to="/home" className="nav-item">المقالات <FaHome /></NavbarElementLink>
                            <NavbarElementLink to="/profile" className="nav-item">الملف الشخصي <BiSolidUserCircle className="nav-icon"/></NavbarElementLink>
                            
                            <li><button className="button logout" onClick={handleLogout}>تسجيل الخروج<MdLogout className="nav-icon logout"/></button></li>
                        </>):
                                            
                        (
                            <>
                                <li >
                                    <Link to="/signIn">
                                        <button className="button login">تسجيل الدخول</button>
                                    </Link>
                                </li>

                                <li >
                                    <Link to="/signUp">
                                        <button className="button register">إنشاء حساب جديد</button>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </div>
    );
}

function NavbarElementLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
export default Navbar;