import { useState } from "react";
import "./Authentication.css";
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { validateEmail, validatePasswoed } from "./utils";

function Authentication() {
    const [isLogin, setIsLogin] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    const getIsFormValid = () => {
        if (isLogin) {
            return (
                validateEmail(email) &&
                validatePasswoed(password)
            );
        }
        // register
        return (
            firstName &&
            lastName &&
            validateEmail(email) &&
            validatePasswoed(password) &&
            String(password) === String(confirmPassword)
        );
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Submit the form 
        if (isLogin) {
            const data = { email, password };
            console.log('Logging in with', data);
        } else {
            const data = { firstName, lastName, email, password };
            console.log('Registering in with', data);
        }
        clearForm();
    };

    return (
        <div className="container">

            <div className="form-box">
                <h1>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</h1>
                <form onSubmit={handleSubmit}>

                {!isLogin && (
                    <div className="input-field">
                        <label htmlFor="first-name"> <FaUserLarge className="icon" /> اسم المستخدم <sup>*</sup> </label>
                        <input type="text" id="first-name" name="first-name" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} required />
                    </div> 
                )}

                {!isLogin && (
                    <div className="input-field">
                        <label htmlFor="last-name"> <FaUserLarge className="icon" /> اسم العائلة <sup>*</sup> </label>
                        <input type="text" id="last-name" name="last-name" value={lastName} onChange={(e) => { setLastName(e.target.value); }} required />

                    </div>
                )}
                    <div className="input-field">
                        <label htmlFor="email"> <FaUserLarge className="icon" /> البريد الإلكتروني <sup>*</sup>  </label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pwd"> <FaLock className="icon" /> كلمة السر <sup>*</sup> </label>
                        <input type="password" id="pwd" name="pwd" value={password} onChange={(e) => { setPassword(e.target.value); }} required />
                        
                    </div>
                    {!isLogin && (
                        <div className="input-field">
                            <label htmlFor="confirmPassword"> <FaLock className="icon" />  تأكيد كلمة السر <sup>*</sup></label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} required />
                        </div>
                    )}
                    <button type="submit" disabled={!getIsFormValid()}> {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'} </button>

                    <div className="switch-form" onClick={switchForm}>
                        {isLogin ? "ليس لديك حساب؟ إنشاء حساب جديد" : 'لديك بالفعل حساب؟ سجل الدخول الي حسابك'}
                    </div>

                </form>
            </div>
            <div className="auth-image">
                <img src={require('./books-img.jpg')} alt="background with books" />
            </div>
        </div>
    );
}

export default Authentication;