const setUser = (user) => {
  sessionStorage.setItem("userId", user.userId);
  sessionStorage.setItem("role", user.role);
  sessionStorage.setItem("token", user.token);
};

const getToken = () => {
  return sessionStorage.getItem("token");
};

const getUserId = () => {
  return sessionStorage.getItem("userId");
};

const getUserRole = () => {
  return sessionStorage.getItem("role");
};

const removeUser = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
};

export const LocalStorageService = {
  setUser,
  getToken,
  getUserRole,
  removeUser,
  getUserId,
};
