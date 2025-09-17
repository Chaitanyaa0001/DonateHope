import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRole, setLoading } from "@/redux/authSlice";
import { refreshToken } from "@/hooks/auth/uselogin";

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await refreshToken();
        if (res.data && res.data.role) {
          dispatch(setRole(res.data.role));
        } else {
          dispatch(setRole(null));
        }
      } catch (err) {
        dispatch(setRole(null), err);
      } finally {
        dispatch(setLoading(false)); 
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
