
const MODE = import.meta.env.MODE
const BASEURL = MODE === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/spotify` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/spotify`
const REFRESHURL = MODE === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/auth/refresh` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/auth/refresh`
const LOGINURL = MODE === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/auth/login` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/auth/login`;

export {
    BASEURL,
    REFRESHURL,
    MODE,
    LOGINURL
};
