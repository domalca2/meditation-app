import { Image, Pressable, Text, View } from "react-native";

const CategoryButton = ({ primary, secondary, title, selected, onPress }) => {
  return (
    <View>
      <Pressable
        className="flex flex-col items-center justify-center"
        onPress={onPress}
      >
        <View
          className={`h-16 w-16 flex items-center justify-center rounded-full overflow-hidden ${selected ? "bg-quaternary" : ""}`}
        >
          <View
            className={`flex justify-center items-center h-14 w-14 overflow-hidden rounded-full ${selected ? "" : "bg-primary"} p-2`}
          >
            <Image
              className="h-full w-full"
              source={selected ? primary : secondary}
            />
          </View>
        </View>
        <Text className="font-alegra-medium text-center">{title}</Text>
      </Pressable>
    </View>
  );
};

export default CategoryButton;
