import { QueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import backendConfig from "../backend.config";

export const queryClient = new QueryClient();

export function createQuery(route, options) {
  return async () => {
    const bearerToken = await SecureStore.getItemAsync("zenenti-auth-token");

    const result = await fetch(`${backendConfig.server}${route}`, {
      ...(options?.http ? options.http : {}),
      method: "GET",
      headers: {
        Authorization: bearerToken ? `bearer ${bearerToken}` : "",
      },
    });

    if (result.ok) {
      return await result.json();
    }
  };
}

export function createMutation(route, options) {
  return async (payload) => {
    const bearerToken = await SecureStore.getItemAsync("zenenti-auth-token");

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
