import React, { memo } from "react";
import { View, ColorValue } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { TouchableOpacity } from "react-native";

interface Props {
  location: string;
  description: string;
  icon: string;
  color: string | ColorValue;
  onPress?(): void;
}

const LocationItem = memo(
  ({ location, description, icon, color, onPress }: Props) => {
    const styles = useStyleSheet(themedStyles);

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.item, { backgroundColor: color }]}>
          <Icon pack="assets" name={icon} style={styles.icon} />
        </View>
        <View>
          <Text category="h8" marginBottom={4}>
            {location}
          </Text>
          <Text category="h9-s" status="body">
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default LocationItem;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  item: {
    width: 40,
    height: 40,
    ...globalStyle.center,
    marginRight: 24,
    borderRadius: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "text-white-color",
  },
});
