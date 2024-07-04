import { useState } from "react";
import "./Authentication.css";
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { validateEmail, validatePasswoed } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

function Authentication(props) {
    const [isLogin, setIsLogin] = useState(props.signIn);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [responseError, setResponseError] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    const getIsFormValid = () => {
        let newErrors = {};
        console.log("not valid email");
        if (!validateEmail(email)) {
            
            newErrors.email = "يرجى التأكد من أن البريد الإلكتروني صحيح";
        }
        if ((!validatePasswoed(password) || !validateEmail(email)) && isLogin) {
            newErrors.password = "يرجي التأكد من كلمة السر و البريد الإلكتروني, ثم المحاولة مرة أخرى";
        }
        if (!isLogin) {
            if(!validatePasswoed(password)) {
                newErrors.password = "تأكد أن كلمة السر يجب ان تحتوي علي 8 حرف ,الارقام, الحروف,الرموز";
            }
            if (password !== confirmPassword) {
                newErrors.confirmPassword = "يرجى التأكد من كلمة المرور";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setEmail("");
        setPassword("");
        if (!isLogin) {
            setFirstName("");
            setLastName("");
            setConfirmPassword("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!getIsFormValid()) {
            return;
        }
        try {
            if (isLogin) {
                const data = { email, password };
    
                let response = await fetch('http://localhost:5000/api/user/login',
                    {
                        method: 'post',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                response = await response.json();
                if (response.error) {
                    setResponseError("حدث خطأ, برجاء المحاولة مرة أخرى");
                } else {
                    auth.getUser(response);
                }
            } else {
    
                const data = { firstName, lastName, email, password };
                let response = await fetch('http://localhost:5000/api/user/register',
                    {
                        method: 'post',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                response = await response.json();
                console.log(`Response: ${response}`);
                setIsLogin(true);
                navigate("/signIn");
            }
            clearForm();
        }
        catch (error) {
            console.error("Error during form submission:", error);
            setResponseError("حدث خطأ, برجاء المحاولة مرة أخري لاحقاً");
        }
        
    };

    return (
        <div className="container">
            <div className="form-box">
                <Link to="/">
                    <img src='https://res.cloudinary.com/doxzf3r3o/image/upload/v1720035423/11_filw09.png' alt="website-logo" className="site-logo" />
                </Link>
                <h1>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</h1>
                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <div className="input-field">
                            <label htmlFor="first-name"> <FaUserLarge className="icon" /> اسم المستخدم <sup>*</sup> </label>
                            <input type="text" id="first-name" name="first-name" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} required />
                            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                        </div>
                    )}

                    {!isLogin && (
                        <div className="input-field">
                            <label htmlFor="last-name"> <FaUserLarge className="icon" /> اسم العائلة <sup>*</sup> </label>
                            <input type="text" id="last-name" name="last-name" value={lastName} onChange={(e) => { setLastName(e.target.value); }} required />
                            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                        </div>
                    )}
                    <div className="input-field">
                        <label htmlFor="email"> <FaUserLarge className="icon" /> البريد الإلكتروني <sup>*</sup>  </label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="pwd"> <FaLock className="icon" /> كلمة السر <sup>*</sup> </label>
                        <input type="password" id="pwd" name="pwd" value={password} onChange={(e) => { setPassword(e.target.value); }} required />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                    {!isLogin && (
                        <div className="input-field">
                            <label htmlFor="confirmPassword"> <FaLock className="icon" />  تأكيد كلمة السر <sup>*</sup></label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} required />
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>
                    )}
                    <button type="submit" id="submit-button" > {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'} </button>
                    {responseError && <div className="error-message">{responseError}</div>}
                    <div className="switch-form" onClick={switchForm}>

                        {!isLogin && (
                            <Link to="/signIn">
                                لديك بالفعل حساب؟ سجل الدخول الي حسابك
                            </Link>
                        )}
                        {isLogin && (
                            <Link to="/signUp">
                                ليس لديك حساب؟ إنشاء حساب
                            </Link>
                        )}
                        {/* {isLogin ? "ليس لديك حساب؟ إنشاء حساب جديد" : 'لديك بالفعل حساب؟ سجل الدخول الي حسابك'} */}
                    </div>

                </form>
            </div>
            <div className="auth-image">
                <img src='https://res.cloudinary.com/doxzf3r3o/image/upload/v1720057048/books-img_isxvez.jpg' alt="background with books" />
            </div>
        </div>
    );
}

export default Authentication;