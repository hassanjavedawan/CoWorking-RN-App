import React from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";

interface Props {
  title: string;
  id: number;
  isChoose: boolean;
}
interface CardProps {
  item: Props;
  onPress?(): void;
}
const Card = ({ item }: CardProps) => {
  const styles = useStyleSheet(themedStyles);
  const [isChoose, setIsChoose] = React.useState(item.isChoose);
  const onPress = () => setIsChoose(!isChoose);
  return (
    <>
      {isChoose ? (
        <Layout style={[styles.container]}>
          <Text category="h9" center marginHorizontal={4} status="body">
            {item.title}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Icon pack="assets" name="moreActive" style={styles.icon} />
          </TouchableOpacity>
        </Layout>
      ) : null}
    </>
  );
};

export default Card;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 5,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderColor: "background-basic-color-5",
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 8,
  },
  icon: {
    tintColor: "text-body-color",
    width: 16,
    height: 16,
  },
});
