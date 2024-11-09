//Change animation to none
import { Stack } from "expo-router";
import React from "react";

const TutorialViewerLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    />
  );
};


export default TutorialViewerLayout;
