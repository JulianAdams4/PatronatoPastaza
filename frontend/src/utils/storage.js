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

export const saveCurrentProject = projectCode => {
  window.localStorage.setItem('currentProject', projectCode);
};

export const getCurrentProject = () => {
  if (window.localStorage.getItem("currentProject") !== "null") {
    return window.localStorage.getItem("currentProject");
  }
  return undefined;
};