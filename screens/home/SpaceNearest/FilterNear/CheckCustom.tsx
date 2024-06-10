import React, { memo } from "react";
import { View, Image, ViewStyle } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";

interface Props {
  checked?: boolean;
  style?: ViewStyle;
}

const CheckCustom = ({ checked, style }: Props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={style}>
      {checked ? (
        <View style={styles.checked}></View>
      ) : (
        <View style={styles.nonCheck}>
          <Icon pack="assets" name="checkMark" style={styles.icon} />
        </View>
      )}
    </View>
  );
};

export default CheckCustom;

const themedStyles = StyleService.create({
  checked: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#7D8699",
    backgroundColor: "text-white-color",
    borderRadius: 4,
    marginRight: 2,
  },
  nonCheck: {
    width: 20,
    height: 20,
    alignItems: "center",
    backgroundColor: "text-main-color",
    borderRadius: 99,
    justifyContent: "center",
  },
  icon: {
    width: 12,
    height: 8.23,
    tintColor: "text-white-color",
  },
});
