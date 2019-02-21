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
  window.localStorage.clear();
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
export const saveUserRol = (rol, proyUni) => {
  window.localStorage.setItem('userRol', rol);
  window.localStorage.setItem('proyUni', proyUni);
};
export const getUserRol = () => {
  const value = window.localStorage.getItem("userRol");
  if ( value!=="null" || value!=="undefined" ) {
    return value;
  }
  return undefined;
};
export const getProyUni = () => {
  const value = window.localStorage.getItem("proyUni");
  if ( value!=="null" || value!=="undefined" ) {
    return value;
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