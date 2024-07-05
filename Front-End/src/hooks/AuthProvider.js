import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const initialUser = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      if (!response.ok) {
        console.log(response)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const initialuser = await response.json();
      setUser(initialuser.user);
      setLoading(false); // ->
    }
    else {
      setLoading(false); // ->
    }
  }

  useEffect(() => {
    initialUser()
  }, []);

  const getUser = async (res) => {
    try {
      if (res.user) {
        setUser(res.user);
       
        localStorage.setItem("auth-token", res.accesstoken);
        navigate("/home");
        return res.user;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(user);
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
    navigate("/");
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{  user, getUser, logOut, initialUser }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};