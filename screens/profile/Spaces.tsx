import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { Data_Space } from "constants/Data";
import AnimatedAppearance from "components/AnimatedAppearance";
import { Animation_Types_Enum } from "constants/Types";
import BookLab from "components/BookLab";

interface Props {
  index: number;
}
const Spaces = memo(({ index }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(Data_Space);
  return (
    <AnimatedAppearance type={Animation_Types_Enum.SlideBottom} index={index}>
      <View style={styles.container}>
        {data.map((item, index) => {
          return <BookLab item={item} key={index} />;
        })}
      </View>
    </AnimatedAppearance>
  );
});

export default Spaces;

const themedStyles = StyleService.create({
  container: {
    marginTop: 32,
  },
});
