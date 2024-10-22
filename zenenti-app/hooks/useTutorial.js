import tutorial from "../app/tutorial.js";
import { useLocalSearchParams } from "expo-router";

export default function useTutorial() {
  const { name } = useLocalSearchParams();

  const index = tutorial.findIndex((step) => step.name === name);

  return {
    tutorial: tutorial[index],
    hasNext: index < tutorial.length - 1,
    getNextTutorial: () => {
      return tutorial[index + 1];
    },
  };
}
