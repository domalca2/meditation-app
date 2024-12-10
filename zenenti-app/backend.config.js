import Constants from "expo-constants";

function getDevServerURL() {
  return Constants.expoConfig?.hostUri?.split(":").shift();
}

const development = {
  server: `http://${getDevServerURL()}:3000`,
};

const staging = {
  server:
    "https://devzenentiwebapp-g2h6athgfkgefdbg.spaincentral-01.azurewebsites.net",
};

const production = {
  server:
    "https://devzenentiwebapp-g2h6athgfkgefdbg.spaincentral-01.azurewebsites.net",
};

export default {
  ...(process.env.BACKEND_ENV === "production" ? production : {}),
  ...(process.env.BACKEND_ENV === "staging" ? staging : {}),
  ...(process.env.BACKEND_ENV === "development" ? development : {}),
};
