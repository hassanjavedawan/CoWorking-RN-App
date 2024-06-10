import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  CheckBox,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Category_Card_Types_Enum } from "constants/Types";
import { Images } from "assets/images";

interface Props {
  cardNumber: number;
  type: Category_Card_Types_Enum;
}
interface DataProps {
  data: Props;
  checked: boolean;
  onChoose?(): void;
}

const CardPayment = ({ data, checked, onChoose }: DataProps) => {
  const getImg = (
    type:
      | Category_Card_Types_Enum.Master
      | Category_Card_Types_Enum.Visa
      | Category_Card_Types_Enum.AmericanExpress
  ): string => {
    switch (type) {
      case Category_Card_Types_Enum.Master:
        return Images.masterCard;
      case Category_Card_Types_Enum.Visa:
        return Images.visaCard;
      case Category_Card_Types_Enum.AmericanExpress:
        return Images.amexCard;
      default:
        return Images.visaCard;
    }
  };
  const { cardNumber, type } = data;
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const img = getImg(type);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        globalStyle.flexDirection,
        {
          borderColor: checked
            ? theme["text-main-color"]
            : theme["background-basic-color-1"],
        },
      ]}
      onPress={onChoose}
    >
      <CheckBox checked={checked} />
      <Image
        source={img || Images.masterCard}
        /* @ts-ignore */
        style={styles.image}
      />
      <View>
        <Text category="h7">{type}</Text>
        <Text category="h9-s" status="body" marginTop={4}>
          xxxx - xxxx - xxxx - {cardNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardPayment;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  image: {
    marginVertical: 24,
    marginLeft: 16,
    marginRight: 24,
  },
});
