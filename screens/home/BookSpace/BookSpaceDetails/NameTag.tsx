import React from "react";
import { View } from "react-native";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface NameTagProps {
  children: string;
  widthItem?: number;
}
const NameTag = ({ children, widthItem }: NameTagProps) => {
  const { width } = useLayout();
  return (
    <View
      style={[
        globalStyle.flexDirection,
        {
          marginBottom: 16,
          width: widthItem ? widthItem : 124 * (width / 375),
        },
      ]}
    >
      <Text category="h8-p" marginTop={-8} marginRight={8}>
        .
      </Text>
      <Text category="h8-p" lineHeight={16}>
        {children}
      </Text>
    </View>
  );
};

export default NameTag;
