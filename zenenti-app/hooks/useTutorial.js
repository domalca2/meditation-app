import tutorial from "../app/tutorial.js";
import { useLocalSearchParams } from "expo-router";

export default function useTutorial() {
  const { name } = useLocalSearchParams();
  return tutorial[name];
}
