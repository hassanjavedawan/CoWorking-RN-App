import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import Text from "components/Text";

interface Props {
  title: string;
  id: number;
  isChoose: boolean;
}
interface CardProps {
  item: Props;
  onPress?(): void;
  minWidth?: number;
}
const CardHightLight = ({ item, onPress, minWidth }: CardProps) => {
  const styles = useStyleSheet(themedStyles);
  const [isChoose, setIsChoose] = React.useState(item.isChoose);
  const Press = () => {
    setIsChoose(!isChoose);
  };
  return (
    <TouchableOpacity
      style={[isChoose ? styles.container : styles.content]}
      onPress={Press}
    >
      <Text
        category="h9"
        center
        marginHorizontal={4}
        status={isChoose ? "white" : "body"}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardHightLight;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "background-basic-color-4",
    borderColor: "background-basic-color-4",
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginBottom: 8,
    minWidth: 73,
  },
  content: {
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "background-basic-color-1",
    borderColor: "background-basic-color-5",
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginBottom: 8,
    minWidth: 73,
  },
  icon: {
    tintColor: "text-body-color",
    width: 16,
    height: 16,
  },
});
