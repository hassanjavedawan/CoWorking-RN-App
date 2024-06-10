import React from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import Text from "components/Text";
import { Slider } from "@miblanchard/react-native-slider";
import { globalStyle } from "styles/globalStyle";

const SliderDistance = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  return (
    <View>
      <Slider
        value={5}
        minimumValue={0}
        maximumValue={20}
        minimumTrackTintColor={theme["text-main-color"]}
        maximumTrackTintColor={theme["color-platinum-100"]}
        containerStyle={styles.slider}
        thumbStyle={styles.thumbStyle}
      />
      <View style={globalStyle.flexSpaceBetween}>
        {data.map((item, index) => {
          return <Layout key={index} style={styles.line} level="3" />;
        })}
      </View>
      <View style={globalStyle.flexSpaceBetween}>
        <Text category="h9-s" status="body" marginRight={8}>
          0
        </Text>
        <Text category="h9-s" status="body">
          5
        </Text>
        <Text category="h9-s" status="body">
          10
        </Text>
        <Text category="h9-s" status="body">
          15
        </Text>
        <Text category="h9-s" status="body">
          20
        </Text>
      </View>
    </View>
  );
};

export default SliderDistance;

const themedStyles = StyleService.create({
  line: {
    height: 8,
    width: 1,
    marginBottom: 8,
    marginLeft: 10,
  },
  slider: {
    marginBottom: -8,
    zIndex: 10,
  },
  thumbStyle: {
    height: 32,
    width: 32,
    backgroundColor: "#FFF",
    borderRadius: 99,
  },
});
const data = ["", "", "", "", ""];
