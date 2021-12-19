import { refreshToken } from "../API";

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshtoken = localStorage.getItem("refreshToken");
    if (refreshtoken) {
      const response = await refreshToken(refreshtoken);
      //@ts-ignore
      if (response.access_token) {
        console.log("SETTING NEW ACCESS TOKEN !");
        const expiryDate = new Date(
          new Date().setHours(new Date().getHours() + 1)
        ).valueOf();
        localStorage.setItem("expiryDate", expiryDate.toString());
        //@ts-ignore
        localStorage.setItem("user", response.access_token);
      } else {
        console.log("RESPONSE ERROR NO ACCESS TOKEN");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const isAccessTokenValid = (): boolean => {
  const expiryDate = localStorage.getItem("expiryDate");
  const epochNow = new Date().valueOf();
  if (expiryDate && +epochNow < +expiryDate) {
    console.log("access token valid");
    return true;
  } else {
    console.log("access token expired");
    return false;
  }
};
