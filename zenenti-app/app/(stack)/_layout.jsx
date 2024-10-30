import React from "react";
import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../query/query";

const StackLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="splash/index" options={{ headerShown: false }} />
        <Stack.Screen name="home/index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome/index" options={{ title: "Welcome" }} />
        <Stack.Screen name="greeting/index" options={{ title: "Greeting" }} />
        <Stack.Screen name="register/index" options={{ title: "Register" }} />
        <Stack.Screen name="tutorial/index" options={{ title: "Tutorial" }} />
        <Stack.Screen name="tutorial/(view)" options={{ headerShown: false }} />
        <Stack.Screen
          name="welcome3/index"
          options={{ title: "Welcome user" }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default StackLayout;
