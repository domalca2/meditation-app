import { View } from "react-native";
import tutorial from "../../tutorial";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";

const TutorialOverview = () => {
  const router = useRouter();

  return (
    <View>
      {Object.entries(tutorial).map(([name, tut]) => (
        <Button
          key={name}
          text={tut.title}
          onPress={() => {
            router.push(`/tutorial/${name}/start`);
          }}
        />
      ))}
    </View>
  );
};

export default TutorialOverview;
