import { createContext, useContext, useEffect, useState } from 'react';
import axios from "../api/axios";

// step 1: create a context
const AuthContext = createContext();


// step 2: create a provider component (which hold's the data)
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get('/auth/verify');
      setIsLoggedIn(true);
      setUser(res.data.user);
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    // giving values to Provider using context
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// step 3: now we can use values busing useContext, but need to pass context
export const useAuth = () => useContext(AuthContext);
