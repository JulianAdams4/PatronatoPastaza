export const saveTokenInStorage = (token) => {
  sessionStorage.setItem("sessionToken", token);
};

export const getTokenFromStorage = () => sessionStorage.getItem("sessionToken");
