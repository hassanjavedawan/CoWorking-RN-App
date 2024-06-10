import React from "react";
import { TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  isChoose: boolean;
  onPress: (num: number) => void;
  num: number;
  title: string;
}
const OptionSpace = ({ isChoose, onPress, num, title }: Props) => {
  const onSelect = React.useCallback(() => {
    onPress && onPress(num);
  }, [num, onPress]);
  const { height, width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const itemWidth = 93 * (width / 375);
  const itemHeight = 80 * (width / 375);

  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
      <Layout
        level={"1"}
        style={[
          styles.container,
          {
            width: itemWidth,
            height: itemHeight,
            borderColor: isChoose
              ? theme["text-main-color"]
              : theme["background-basic-color-1"],
          },
        ]}
      >
        <Text center children={title} category="h8" />
      </Layout>
    </TouchableOpacity>
  );
};

export default OptionSpace;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
