import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";

interface Props {
  time: string;
  dayTime: string;
}
interface TimeLineProps {
  item: Props;
}

const TimeLineItem = memo(({ item }: TimeLineProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={{ height: 80, width: width, ...globalStyle.flexSpaceBetween }}>
      <View>
        <Text marginLeft={32} category="h9-s" status={"body"} marginTop={-8}>
          {item.time}
          {"\n   "}
          {item.dayTime}
        </Text>
      </View>
      <Layout style={{ height: 1, width: 287 * (width / 375) }} level="4" />
    </View>
  );
});

export default TimeLineItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
