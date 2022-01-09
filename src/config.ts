// TODO : jest import.meta syntax babel?
import packagejson from "../package.json";

const HOMEPAGE = packagejson.homepage || "https://github.com/";
const MODE = process.env.NODE_ENV;

const BASEURL = `${process.env.VITE_BACKEND_URL}/api/spotify`;
const AUTHURL = `${process.env.VITE_BACKEND_URL}/api/auth/`;

/* console.log({ BASEURL });

console.log({ MODE });
console.log({ AUTHURL });
console.log({ HOMEPAGE }); */

export { BASEURL, AUTHURL, MODE, HOMEPAGE };
