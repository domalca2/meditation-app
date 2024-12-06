import Constants from "expo-constants";

function getDevServerURL() {
  return Constants.expoConfig?.hostUri?.split(":").shift();
}

const development = {
  server: `http://${getDevServerURL()}:3000`,
};

const production = {
  server: "https://api.zenenti.es",
};

const config = process.env.BACKEND_ENV === "prod" ? production : development;

export default {
  ...config,
};
