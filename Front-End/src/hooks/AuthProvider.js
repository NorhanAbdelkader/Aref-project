import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const getUser = async (res) => {
    try {
      if (res.user) {
        setUser(res.user);
        console.log(res.user);
        localStorage.setItem("auth-token", res.accesstoken);
        navigate("/home");
        return res.user;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{  user, getUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};