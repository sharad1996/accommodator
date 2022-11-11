export default () => {
  process.appConfig = {
    emailDomains: process.env.EMAIL_DOMAINS || [],

    hashSaltKey: process.env.SALT_KEY || "kamallll",

    loginTokenExpTime: process.env.LOGIN_TOKEN_EXPIRY_TIME || "24h",
    activationTokenExpTime: process.env.ACTIVATION_TOKEN_EXPIRY_TIME || "24h",
    resetPassTokenExpTime:
      process.env.RESET_PASSWORD_TOKEN_EXPIRY_TIME || "24h",

    mail: {
      name: process.env.MAIL_NAME,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
    },

    webURL: process.env.WEB_URL || "http://127.0.0.1:3131",
    apiURL: process.env.API_URL || "http://192.168.0.112:3032",
    fetchDataLimit: process.env.FETCHED_DATA_COUNT || 10,
  };
};
