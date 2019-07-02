import { Easing, Animated } from "react-native";

export const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 650,
      easing: Easing.out(Easing.poly(5)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const inputRange = [index - 1, index, index + 1];
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0]
      });
      const slideFromRight = { transform: [{ translateX }] };
      return slideFromRight;
    }
  };
};
