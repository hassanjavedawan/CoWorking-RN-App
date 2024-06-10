import React, { memo } from "react";
import { View, Image, StyleProp, ViewStyle } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";

interface Props {
  numPost: number | string;
  numFollowers: number | string;
  numFollowing: number | string;
  style?: StyleProp<ViewStyle>;
}

const UserInfo = ({ numFollowers, numFollowing, numPost, style }: Props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[style, globalStyle.flexDirection]}>
      <View style={[globalStyle.flexDirection, styles.item]}>
        <Text category="h7" center marginRight={2}>
          {numPost}
        </Text>
        <Text category="h8-p" marginTop={0.5}>
          posts
        </Text>
      </View>
      <View style={[globalStyle.flexDirection, styles.item]}>
        <Text category="h7" marginRight={2}>
          {numFollowers}
        </Text>
        <Text category="h8-p" marginTop={0.5}>
          follower
        </Text>
      </View>
      <View style={globalStyle.flexDirection}>
        <Text category="h7" marginRight={2}>
          {numFollowing}
        </Text>
        <Text category="h8-p" center marginTop={0.5}>
          following
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;

const themedStyles = StyleService.create({
  item: {
    marginRight: 24,
  },
});
