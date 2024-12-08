import { Image, Pressable } from "react-native";

import sorterImage from "../assets/images/ui/duration-order.png";

const DurationSorter = ({ onChangeSortOrder, sortOrder = "desc" }) => {
  return (
    <Pressable
      onPress={() => {
        if (onChangeSortOrder) {
          onChangeSortOrder(sortOrder === "desc" ? "asc" : "desc");
        }
      }}
    >
      <Image
        className={`h-7 w-7 ${sortOrder === "asc" ? "scale-y-[-1]" : ""}`}
        source={sorterImage}
      />
    </Pressable>
  );
};

export default DurationSorter;
