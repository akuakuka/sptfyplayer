// TODO : jest import.meta syntax babel?
import packagejson from "../package.json";

const HOMEPAGE = packagejson.homepage || "https://github.com/";
const MODE = process.env.NODE_ENV;
/* 
const BASEURL =
  MODE === "development"
    ? `${process.env.VITE_BACKEND_URL_DEV}/api/spotify`
    : `${process.env.VITE_BACKEND_URL_PROD}/api/spotify`;

const REFRESHURL =
  MODE === "development"
    ? `${process.env.VITE_BACKEND_URL_DEV}/api/auth/refresh`
    : `${process.env.VITE_BACKEND_URL_PROD}/api/auth/refresh`;

const LOGINURL =
  MODE === "development"
    ? `${process.env.VITE_BACKEND_URL_DEV}/api/auth/login`
    : `${process.env.VITE_BACKEND_URL_PROD}/api/auth/login`; */

const BASEURL = `${process.env.VITE_BACKEND_URL}/api/spotify`;
const REFRESHURL = `${process.env.VITE_BACKEND_URL}/api/auth/refresh`;
const LOGINURL = `${process.env.VITE_BACKEND_URL}/api/auth/login`;

console.log({ BASEURL });
console.log({ REFRESHURL });
console.log({ MODE });
console.log({ LOGINURL });
console.log({ HOMEPAGE });

export { BASEURL, REFRESHURL, MODE, LOGINURL, HOMEPAGE };
