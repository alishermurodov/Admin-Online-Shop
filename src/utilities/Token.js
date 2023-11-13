export function saveToken(access_token) {
    localStorage.setItem("access_token", access_token);
  }
  
  function getToken() {
    try {
      return jwt_decode(localStorage.getItem("access_token"));
    } catch (error) {}
  }