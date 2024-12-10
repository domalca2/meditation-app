import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import { useState } from "react";
import PracticeTypeButton from "./PracticeTypeButton";
import { createQuery } from "../../query/query";

const PracticeTypeSelect = ({ onPracticeTypeSelect, className }) => {
  const [selectedTypeId, setSelectedTypeId] = useState(1);

  const practiceTypes = useQuery({
    queryFn: createQuery("/private/practice-type/all"),
    queryKey: ["practice-type", "all"],
  });

  if (!practiceTypes.isSuccess) return <View />;

  return (
    <View className={`${className}`}>
      {practiceTypes.isSuccess && (
        <FlatList
          contentContainerStyle={{ gap: 5 }}
          horizontal={true}
          data={practiceTypes.data}
          renderItem={({ item }) => (
            <PracticeTypeButton
              title={item.title}
              active={item.id === selectedTypeId}
              onPress={() => {
                setSelectedTypeId(item.id);

                if (onPracticeTypeSelect) {
                  onPracticeTypeSelect(item.id);
                }
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default PracticeTypeSelect;
