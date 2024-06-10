import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useTheme, Layout, Button } from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";

interface Props {
  data: string[];
  style?: ViewStyle;
  statusActive?: string;
  statusInactive?: string;
  disabled?: boolean;
  selectedIndex: number;
  onChange(index: number): void;
}

const TabBarAnimation = ({
  data,
  style,
  selectedIndex,
  disabled,
  statusActive = "control",
  statusInactive = "platinum",
  onChange,
}: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transX.value,
      [0, widthItem * 1],
      [theme["color-basic-100"], theme["color-platinum-100"]]
    );

    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 19,
          }),
        },
      ],
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Layout level="5" style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / data.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
      {data.map((item, index) => {
        return (
          <Button
            key={index}
            disabled={disabled}
            size="medium"
            onPress={() => onChange(index)}
            status={selectedIndex === index ? statusActive : statusInactive}
            style={globalStyle.flexOne}
          >
            <Text uppercase>{item}</Text>
          </Button>
        );
      })}
    </Layout>
  );
};

export default TabBarAnimation;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: 12,
  },
  boxAni: {
    height: 48,
    position: "absolute",
    borderRadius: 24,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
