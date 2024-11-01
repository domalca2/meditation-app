import { View } from "react-native";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../mock/mock";
import { useState } from "react";

const CategorySelect = ({ onCategorySelect }) => {
  const [selectedId, setSelectedId] = useState(0);
  const categories = useQuery({
    queryFn: mockQuery("practice/categories"),
    queryKey: ["practice", "categories"],
  });

  if (!categories.isSuccess) {
    return <View></View>;
  }

  return (
    <View className="flex flex-row justify-between items-center w-full">
      {categories.data.map((category) => (
        <CategoryButton
          title={category.title}
          primary={category.icon.primary}
          secondary={category.icon.secondary}
          selected={category.id === selectedId}
          onPress={() => {
            setSelectedId(category.id);

            if (onCategorySelect) {
              onCategorySelect(category.id);
            }
          }}
        />
      ))}
    </View>
  );
};

export default CategorySelect;
