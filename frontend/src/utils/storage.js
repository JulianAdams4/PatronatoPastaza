export const saveTokenInStorage = (token) => {
  window.localStorage.setItem("sessionToken", token);
};
export const getTokenFromStorage = () => {
  if (window.localStorage.getItem("sessionToken") !== "null") {
    return window.localStorage.getItem("sessionToken");
  }
  return undefined;
};
export const deleteSessionToken = () => {
  window.localStorage.removeItem("sessionToken");
  window.localStorage.removeItem('currentProject');
};

// Project
export const saveCurrentProject = projectCode => {
  window.localStorage.setItem('currentProject', projectCode);
};
export const getCurrentProject = () => {
  if (window.localStorage.getItem("currentProject") !== "null") {
    return window.localStorage.getItem("currentProject");
  }
  return undefined;
};

// Rol
export const saveUserRol = rol => {
  window.localStorage.setItem('userRol', rol);
};
export const getUserRol = () => {
  if (window.localStorage.getItem("userRol") !== "null") {
    return window.localStorage.getItem("userRol");
  }
  return undefined;
};

// Nombres
export const saveUserName = rol => {
  window.localStorage.setItem('userName', rol);
};
export const getUserName = () => {
  if (window.localStorage.getItem("userName") !== "null") {
    return window.localStorage.getItem("userName");
  }
  return undefined;
};