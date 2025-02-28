import React, { useEffect, useState } from 'react'
import './BackgroungImg.css'
import { Link } from "react-router-dom";

const BackgroundImg = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  });

  return (
    <div className='background-img-landing'>
      <div className='page-content'>
        <h1>قارئ اليوم قائد الغد.</h1>
        <p>
          اهلا بك معنا! <br />
          مكان يجمع العديد من القراء لمشاركة ارائهم و نشر مقالات مفيد للغير , بالإضافة إلي مكتبة ضخمة تضم العديد من الكتب المتميزة
        </p>
        {!isLoggedIn ? 
        <Link to="signUp">
          <button className="button register" id="light">إنضم إلينا الأن!</button>
        </Link>
          :
          <>
          </>
        }

      </div>
    </div>

  )
}

export default BackgroundImg
