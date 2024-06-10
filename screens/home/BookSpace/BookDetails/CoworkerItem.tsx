import React from "react";
import { View, ImageSourcePropType, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import Text from "components/Text";

interface Props {
  id: number;
  name: string;
  avatar: ImageSourcePropType;
  job: string;
}
interface ItemProps {
  item: Props;
  canDelete?: boolean;
}

const CoworkerItem = ({ item, canDelete }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Avatar
        source={item.avatar}
        /* @ts-ignore */
        style={styles.avatar}
      />
      <View>
        <Text category="h7">{item.name}</Text>
        <Text category="h8-p" lineHeight={16}>
          {item.job}
        </Text>
      </View>
      {canDelete ? (
        <TouchableOpacity style={styles.delete}>
          <Icon pack="assets" name="moreActive" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CoworkerItem;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 34,
    marginLeft: 30,
    marginBottom: 24,
  },
  avatar: {
    marginRight: 16,
  },
  delete: {
    position: "absolute",
    right: 0,
  },
});
