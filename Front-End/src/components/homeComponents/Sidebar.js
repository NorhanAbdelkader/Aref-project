import React from 'react'
import SidebarElements from "./SidebarElements";
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  const sidebarElements = SidebarElements();
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        {
          sidebarElements.map((val, key) => {
            return (
              <Link to={val.link}>
                <li key={key} 
                    className='sidebar-item'
                    id={window.location.pathname === val.link ? 'active': ''}
                >
                  <div id='sidebar-icon'>
                    {val.icon}
                  </div>
                  <div id='sidebar-title'>
                    {val.title}
                  </div>
                </li>
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
