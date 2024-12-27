import Constants from "expo-constants";


function getDevServerURL() {
  
  return Constants.expoConfig?.hostUri?.split(":").shift();
}
export function getBackendConfig (){
const backendEnv = Constants.expoConfig?.extra?.BACKEND_ENV || "development";

console.log("BACKEND_ENV desde Constantes:", backendEnv)

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

const config =  {
  ...(backendEnv === "staging" ? staging : {}),
  ...(backendEnv === "production" ? production : {}),
  ...(backendEnv === "development" ? development : {}),
};
console.log("Configuración generada:", config);

  return config;
}