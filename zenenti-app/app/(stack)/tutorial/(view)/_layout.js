import { Stack } from "expo-router";

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
