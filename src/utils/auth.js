export function setToken(token) {  // for set token on login
  localStorage.setItem('token', token);
}

export function getToken() {    // for getting token
  return localStorage.getItem('token');
}

export function clearToken() {       // for clearing token on logout
  localStorage.removeItem('token');
}

export function isAuthenticated() {     // for checking if user is logged in
  return Boolean(getToken());
}

export const generateToken = () => Math.random().toString(36).slice(2);  // generate token


export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));   //for setting user details
}

export function getUser() {
  const u = localStorage.getItem('user');  // for getting user details
  return u ? JSON.parse(u) : null;
}

export const authFetch = (url) => {
  const token = getToken();     //for authenticated fetch requests
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
