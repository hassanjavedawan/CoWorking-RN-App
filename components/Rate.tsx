import React from "react";
import { View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";

interface Props {
  defaultRate: number;
  setDefaultRate: React.Dispatch<React.SetStateAction<number>>;
  style?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
  disable?: boolean;
  size: "small" | "medium";
}
const Rate = ({
  defaultRate,
  setDefaultRate,
  style,
  disable,
  size = "small",
  styleButton,
}: Props) => {
  const theme = useTheme();
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, style]}>
      {maxRating.map((item, _) => {
        return (
          <TouchableOpacity
            disabled={disable}
            key={_}
            style={[styles.button, styleButton]}
            onPress={() => setDefaultRate(_ + 1)}
            activeOpacity={0.7}
          >
            <Icon
              pack="assets"
              name="rate"
              style={[
                {
                  width: size === "small" ? 16 : 30,
                  height: size === "small" ? 16 : 30,
                },
                {
                  tintColor:
                    item < defaultRate + 1
                      ? theme["color-orange-100"]
                      : theme["text-placeholder-color"],
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Rate;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
  },
  star: {
    height: 16,
    width: 16,
  },
  button: {
    backgroundColor: "transparent",
  },
});
