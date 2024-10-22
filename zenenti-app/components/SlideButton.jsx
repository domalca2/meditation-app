import { Image, Pressable } from "react-native";

const SlideButton = ({ onPress }) => {
  const slide = require("../assets/images/slide.png");

  return (
    <Pressable onPress={onPress}>
      <Image source={slide} />
    </Pressable>
  );
};

export default SlideButton;
