import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import AnimatedAppearance from "components/AnimatedAppearance";
import { Animation_Types_Enum, PostProps } from "constants/Types";
import { Data_Post } from "constants/Data";

interface Props {
  index: number;
}
const PostView = memo(({ index }: Props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [dataPost, setDataPost] = React.useState(Data_Post);
  return (
    <AnimatedAppearance type={Animation_Types_Enum.SlideBottom} index={index}>
      <Layout level="2">
        {dataPost.map((item, index) => {
          const {
            avatar,
            name,
            content,
            time,
            type,
            ability,
            likes,
            commends,
          } = item;
          return (
            <Layout style={styles.item} key={index}>
              <View style={[globalStyle.flexSpaceBetween]}>
                <View style={globalStyle.flexDirection}>
                  <Avatar source={avatar} size="small" />
                  <View style={styles.name}>
                    <Text category="h7">{name}</Text>
                    <Text marginTop={2} category="h8-s" status="body">
                      {ability}
                    </Text>
                  </View>
                </View>
                <Text
                  style={globalStyle.alignSelfEnd}
                  status="body"
                  category="h9-s"
                >
                  {time}
                </Text>
              </View>
              <Text uppercase marginTop={16} category="h9" status="body">
                {type}
              </Text>
              <Text category="h8-p" marginTop={8} marginBottom={16}>
                {content}
              </Text>
              <View style={globalStyle.flexDirection}>
                <View style={globalStyle.flexDirection}>
                  <Icon pack="assets" name="likeActive" style={styles.icon} />
                  <Text
                    category="h9-s"
                    status="body"
                    marginTop={2}
                    marginRight={28}
                  >
                    {likes}
                  </Text>
                </View>
                <View style={globalStyle.flexDirection}>
                  <Icon pack="assets" name="commend" style={styles.icon} />
                  <Text category="h9-s" status="body" marginTop={2}>
                    {commends}
                  </Text>
                </View>
              </View>
            </Layout>
          );
        })}
      </Layout>
    </AnimatedAppearance>
  );
});

export default PostView;

const themedStyles = StyleService.create({
  item: {
    borderRadius: 16,
    padding: 16,
    marginTop: 32,
    marginHorizontal: 32,
  },
  name: {
    marginLeft: 16,
    alignSelf: "flex-end",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
  },
});
