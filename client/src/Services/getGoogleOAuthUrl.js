// Courtesy of TomDoesTech YouTube tutorial
// Google OAuth 2.0 With NodeJS (No Passport or googleapis): https://www.youtube.com/watch?v=Qt3KJZ2kQk0
// https://github.com/TomDoesTech/Google-OAuth-NodeJS/blob/main/ui/utils/getGoogleUrl.ts

const getGoogleOAuthURL = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
    const options = {
      redirect_uri: process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: process.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
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
  
  export default getGoogleOAuthURL;