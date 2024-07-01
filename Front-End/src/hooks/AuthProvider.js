import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('auth-token');
//   const [token, setToken] = useState(localStorage.getItem("auth-token") || "");
//   const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token, // Replace `your-token-here` with your actual token
          },
        // body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.user) {
        setUser(res.user);
        console.log(res.user)
        // setToken(res.token);
        // localStorage.setItem("auth-token", res.token);
        // navigate("/dashboard");
        return res.user;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     navigate("/login");
//   };

  return (
    <AuthContext.Provider value={{  user, getUser }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};