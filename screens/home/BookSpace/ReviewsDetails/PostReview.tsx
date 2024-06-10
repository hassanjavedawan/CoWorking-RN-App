import React from "react";
import { View, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Rate from "components/Rate";

interface Props {
  avatar: ImageRequireSource;
  name: string;
  job: string;
  time: string;
  description: string;
  rate: number;
}
interface ItemProps {
  item: Props;
}
const PostReview = ({ item }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.content}>
      <View style={[globalStyle.flexDirection, globalStyle.itemsCenter]}>
        <Avatar
          source={item.avatar}
          size="small"
          /* @ts-ignore */
          style={styles.avatar}
        />
        <View>
          <Text category="h7">{item.name}</Text>
          <Text category="h8-p" status="body" lineHeight={16}>
            {item.job}
          </Text>
        </View>
        <Text category="h9-s" status="body" style={styles.time}>
          {item.time}
        </Text>
      </View>
      <Rate
        size="small"
        defaultRate={item.rate}
        setDefaultRate={() => null}
        disable
        style={styles.rate}
      />
      <Text category="h8-p" marginRight={40} marginBottom={32}>
        {item.description}
      </Text>
    </View>
  );
};

export default PostReview;

const themedStyles = StyleService.create({
  rate: {
    marginTop: 12,
    marginBottom: 8,
  },
  avatar: {
    marginRight: 16,
  },
  time: {
    position: "absolute",
    right: 0,
    bottom: 4,
  },
  content: {
    // marginTop: 20,
  },
});
