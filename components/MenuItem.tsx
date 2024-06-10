import React from "react";
import { View, ColorValue, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
interface Props {
  color: string | ColorValue;
  icon: string;
  title: string;
  onPress?(): void;
}
const MenuItem = ({ onPress, color, icon, title }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.button, { backgroundColor: color }]}>
        <Icon pack="assets" name={icon} style={styles.icon} />
      </View>
      <Text category="h8-p" lineHeight={16}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "text-white-color",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    ...globalStyle.center,
    marginRight: 24,
  },
});
