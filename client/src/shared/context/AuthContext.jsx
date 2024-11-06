import { createContext, useContext, useState } from "react";
import { LocalStorageService } from "../localStorage.service";
import PropTypes from "prop-types";

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    LocalStorageService.getUserId() !== null
      ? {
          userId: LocalStorageService.getUserId(),
          role: LocalStorageService.getUserRole(),
          token: LocalStorageService.getToken(),
        }
      : null
  );

  const setUser = (user) => {
    setAuthUser({
      userId: user?._id || 0,
      role: user?.role || "",
      token: user?.token || "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
