import { LOCAL_STORAGE_KEYS } from '../context/appcontext';

const baseUrl = process.env.REACT_APP_SERVER_URL;

export const login = async (email: string, password: string) => {
  const loginResponse = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => response.json());
  console.log('login', loginResponse);
  if (loginResponse.message) {
    alert(loginResponse.message);
    return false;
  } else {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
      loginResponse.accessToken,
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER,
      JSON.stringify(loginResponse.user),
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LAST_LOGGED_IN,
      new Date().getTime().toString(),
    );
    setTimeout(() => login(email, password), 3000000);
    return true;
  }
};

export const capitalizeFirstLetter = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const formatFeatureKey = (s: string) => {
  if (s.includes('_')) {
    return s
      .split('_')
      .map((s) => capitalizeFirstLetter(s))
      .join(' ');
  }
  return capitalizeFirstLetter(s);
};
