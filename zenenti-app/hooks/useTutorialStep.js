import useTutorial from "./useTutorial";
import { useLocalSearchParams } from "expo-router";

export default function useTutorialStep() {
  const tutorial = useTutorial();
  const { step } = useLocalSearchParams();
  const index = Number(step);

  return {
    index,
    step: tutorial.steps[index],
    hasNextStep: tutorial.steps.length > index + 1,
  };
}
