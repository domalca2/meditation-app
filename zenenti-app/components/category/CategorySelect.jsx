import { View } from "react-native";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createQuery } from "../../query/query";

const CategorySelect = ({ className, onCategorySelect }) => {
  const [selectedId, setSelectedId] = useState(1);
  const categories = useQuery({
    queryFn: createQuery("/private/category/all"),
    queryKey: ["category", "all"],
  });

  if (!categories.isSuccess) {
    return <View></View>;
  }

  return (
    <View
      className={`${className} flex flex-row justify-between items-center w-full`}
    >
      {categories.data.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
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
