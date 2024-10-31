import { Stack } from "expo-router";
import React from "react";

const TutorialViewerLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    />
  );
};

export default TutorialViewerLayout;
