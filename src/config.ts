// TODO : jest import.meta syntax babel?
import packagejson from "../package.json";

const HOMEPAGE = packagejson.homepage || "https://github.com/";
const MODE = process.env.NODE_ENV;
console.log(process.env.VITE_BACKEND_URL_DEV);
console.log(process.env.VITE_BACKEND_URL_PROD);
const BASEURL =
  MODE === "development"
    ? `${process.env.VITE_BACKEND_URL_DEV}/api/spotify`
    : `${process.env.VITE_BACKEND_URL_PROD}/api/spotify`;

const REFRESHURL = `${BASEURL}/refresh`;

const LOGINURL =
  MODE === "development"
    ? `${process.env.VITE_BACKEND_URL_DEV}/api/auth/login`
    : `${process.env.VITE_BACKEND_URL_PROD}/api/auth/login`;

/* console.log({ BASEURL });
console.log({ REFRESHURL });
console.log({ MODE });
console.log({ LOGINURL });
console.log({ HOMEPAGE }); */

export { BASEURL, REFRESHURL, MODE, LOGINURL, HOMEPAGE };
