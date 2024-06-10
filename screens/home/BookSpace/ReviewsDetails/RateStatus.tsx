import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import ProgressBar from "components/ProgressBar";
import { RateStatusProps } from "constants/Types";

interface Props {
  data: RateStatusProps[];
  style?: StyleProp<ViewStyle>;
}

const RateStatus = ({ data, style }: Props) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const RenderItem = React.useCallback(({ item }) => {
    return (
      <View style={[styles.item]}>
        <Text category="h8-p" lineHeight={16}>
          {item.title}
        </Text>
        <View style={globalStyle.flexDirection}>
          <ProgressBar
            total={5}
            didDone={4.8}
            style={[styles.bar, { width: 136 * (width / 375) }]}
          />
          <Text category="h8-p" lineHeight={16} marginLeft={8}>
            {item.rate}
          </Text>
        </View>
      </View>
    );
  }, []);
  return (
    <View style={[styles.container, style]}>
      {data.map((item, i) => {
        return <RenderItem item={item} key={i} />;
      })}
    </View>
  );
};

export default RateStatus;

const themedStyles = StyleService.create({
  container: {
    justifyContent: "center",
  },
  bar: {
    alignSelf: "center",
  },
  item: {
    ...globalStyle.flexSpaceBetween,
    ...globalStyle.itemsCenter,
    marginBottom: 12,
  },
});
