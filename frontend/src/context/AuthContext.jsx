import { useContext, createContext, useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import { fetchUserFromServer } from "../services/auth";
import { setUser as User } from "../utils/auth";

const AuthContext = createContext();

//// provider

export const AuthProvider = ({ Children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = getToken();
    if (!token) {
      return setLoading(false);
    }
    try {
      const user = await fetchUserFromServer();
      setUser(user);
      User(user);
    } catch (error) {
      console.log("error is fetching user ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {Children}
    </AuthContext.Provider>
  );
};

///// consume
export const useAuthContext = () => useContext(AuthContext);


