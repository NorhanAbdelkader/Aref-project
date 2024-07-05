import React from 'react'
import SidebarElements from "./SidebarElements";
import { Link } from "react-router-dom";
import './Sidebar.css';
import { useAuth } from '../../hooks/AuthProvider';

const Sidebar = () => {
  const auth = useAuth();
  const sidebarElements = SidebarElements();
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        {
          sidebarElements.map((val, key) => {
            return (
              <Link to={val.link}>
                < div onClick={val.logOut? auth.logOut : () => {} }>
                  <li key={key}
                    className='sidebar-item'
                    id={window.location.pathname === val.link ? 'active' : ''}
                  >
                    <div id='sidebar-icon'>
                      {val.icon}
                    </div>
                    <div id='sidebar-title'>
                      {val.title}
                    </div>
                  </li>
                </div>

              </Link>
            )
          }
          )
        }
      </ul>
    </div>
  )
}

export default Sidebar
