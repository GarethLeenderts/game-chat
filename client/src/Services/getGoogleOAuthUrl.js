// Courtesy of TomDoesTech YouTube tutorial
// Google OAuth 2.0 With NodeJS (No Passport or googleapis): https://www.youtube.com/watch?v=Qt3KJZ2kQk0
// https://github.com/TomDoesTech/Google-OAuth-NodeJS/blob/main/ui/utils/getGoogleUrl.ts
//  sdcs

export const getGoogleOAuthURLRegister = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
    const options = {
      redirect_uri: process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL_register,
      client_id: process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
  
    const qs = new URLSearchParams(options); // converts options into a query string
    const queryString = qs.toString();
  
    // url = `${rootUrl}?${qs}`;
    return `${rootUrl}?${queryString}`;
    // return `${rootUrl}?${qs.toString()}`; //adds query string to rootUrl
    // return console.log(qs.toString());
  };

export const getGoogleOAuthURLLogin = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
    const options = {
      redirect_uri: process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL_login,
      client_id: process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
  
    const qs = new URLSearchParams(options); // converts options into a query string
  
    return `${rootUrl}?${qs.toString()}`; //adds query string to rootUrl
  };
  
  // export default getGoogleOAuthURL;