import { Image, Pressable } from "react-native";

import sorterImage from "../assets/images/ui/duration-order.png";

const DurationSorter = ({ onChangeSortOrder, sortOrder = "descending" }) => {
  return (
    <Pressable
      onPress={() => {
        if (onChangeSortOrder) {
          onChangeSortOrder(
            sortOrder === "descending" ? "ascending" : "descending",
          );
        }
      }}
    >
      <Image
        className={`h-7 w-7 ${sortOrder === "ascending" ? "scale-y-[-1]" : ""}`}
        source={sorterImage}
      />
    </Pressable>
  );
};

export default DurationSorter;
