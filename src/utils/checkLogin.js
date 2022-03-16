
export const checkLogin = () => {
  if (localStorage.getItem("accessToken")) return true;
  return false
};



