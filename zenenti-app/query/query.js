import { QueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import {getBackendConfig} from "../backend.config";

export const queryClient = new QueryClient();

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export function createQuery(route, options) {
  return async () => {
    const bearerToken = await SecureStore.getItemAsync("zenenti-auth-token");
    // console.log('bearerToken: ',  );
    const result = await fetch(`${backendConfig.server}${route}`, {
      ...(options?.http ? options.http : {}),
      method: "GET",
      headers: {
        Authorization: bearerToken ? `bearer ${bearerToken}` : "",
      },
    },
    // console.log("Resultado de la solicitud:", await result)
  );
   
    if (result.ok) {
      if (options?.raw) {
        const raw = await result.blob();
        return {
          uri: await blobToBase64(raw),
        };
      } else {
        return await result.json();
      }
    } else {
      return null;
    }
  };
}

export function createMutation(route, options) {
  return async (payload) => {
    const bearerToken = await SecureStore.getItemAsync("zenenti-auth-token");

    const backendConfig = getBackendConfig();
    console.log('backendConfig:', backendConfig);
    const result = await fetch(`${backendConfig.server}${route}`, {
      ...(options?.http ? options.http : {}),
      method: "POST",
      headers: {
        Authorization: bearerToken ? `bearer ${bearerToken}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (result.ok) {
      return await result.json();
    }
  };
}
