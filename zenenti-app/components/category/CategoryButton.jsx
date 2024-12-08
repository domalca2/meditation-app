import { Image, Pressable, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { createQuery } from "../../query/query";

const CategoryButton = ({ category, selected, onPress }) => {
  const primaryIcon = useQuery({
    queryFn: createQuery(`/private/asset/${category.iconPrimaryUrl}`, {
      raw: true,
    }),
    queryKey: ["category", category.id, "iconPrimary"],
  });

  const secondaryIcon = useQuery({
    queryFn: createQuery(`/private/asset/${category.iconSecondaryUrl}`, {
      raw: true,
    }),
    queryKey: ["category", category.id, "iconSecondary"],
  });

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
            {primaryIcon.isSuccess && secondaryIcon.isSuccess && (
              <Image
                className="h-full w-full"
                source={selected ? primaryIcon.data : secondaryIcon.data}
              />
            )}
          </View>
        </View>
        <Text className="font-alegra-medium text-center">{category.title}</Text>
      </Pressable>
    </View>
  );
};

export default CategoryButton;
