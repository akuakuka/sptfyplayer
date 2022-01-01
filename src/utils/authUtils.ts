import { refreshToken } from "../API/API";

// TODO: is this Right place for this function?
export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshtoken = localStorage.getItem("refreshToken");
    if (refreshtoken) {
      const response = await refreshToken(refreshtoken);
      if (response.access_token) {
        const expiryDate = new Date(
          new Date().setHours(new Date().getHours() + 1)
        ).valueOf();
        localStorage.setItem("expiryDate", expiryDate.toString());
        localStorage.setItem("accessToken", response.access_token);
        return response.access_token;
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};

export const isAccessTokenValid = (): boolean => {
  const expiryDate = localStorage.getItem("expiryDate");
  const epochNow = new Date().valueOf();
  if (expiryDate && +epochNow < +expiryDate) {
    return true;
  } else {
    return false;
  }
};
