import React, { memo } from "react";
import { ImageRequireSource, TouchableOpacity, View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "navigation/types";

interface Props {
  userName: string;
  userJob: string;
  avatar: ImageRequireSource;
  time: string;
  titlePost: string;
  descriptionPost: string;
  shareStatus: string;
  likeNumber?: number;
  commentNumber?: number;
  isLike?: boolean;
}

const CommunityPost = memo(
  ({
    userName,
    avatar,
    userJob,
    time,
    titlePost,
    descriptionPost,
    shareStatus,
    likeNumber = 0,
    commentNumber = 0,
    isLike,
  }: Props) => {
    const { width } = useLayout();
    const theme = useTheme();
    const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();
    const styles = useStyleSheet(themedStyles);
    const [like, setLike] = React.useState(isLike);
    return (
      <View>
        <View style={styles.user}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate("UserProfile")}
          >
            <Avatar
              source={avatar}
              size="small"
              /* @ts-ignore */
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View>
            <Text category="h7" marginBottom={2}>
              {userName}
            </Text>
            <View
              style={[globalStyle.flexSpaceBetween, { width: width - 128 }]}
            >
              <Text category="h8-p" lineHeight={16} status="body">
                {userJob}
              </Text>
              <Text category="h9-s" status="body">
                {time}
              </Text>
            </View>
          </View>
        </View>
        <Text category="h9" uppercase status="body" marginTop={24}>
          {titlePost}
        </Text>
        <Text category="h7-p" marginVertical={16}>
          {descriptionPost}
        </Text>
        <Text category="h9-s" status="body" marginBottom={16}>
          {shareStatus}
        </Text>
        <Layout style={styles.line} level="6" />
        <View style={styles.likeView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setLike(!like)}
            style={[globalStyle.flexDirection, globalStyle.alignItemsCenter]}
          >
            <Icon
              pack="assets"
              name="likeActive"
              style={[
                styles.icon,
                {
                  tintColor: like
                    ? theme["text-neon-color"]
                    : theme["text-body-color"],
                },
              ]}
            />
            <Text
              marginRight={56}
              category="h9-s"
              status={like ? "neon" : "body"}
              marginTop={4}
              children={`${like ? likeNumber + 1 : likeNumber} Like`}
            />
          </TouchableOpacity>
          <View
            style={[globalStyle.flexDirection, globalStyle.alignItemsCenter]}
          >
            <Icon pack="assets" name="comment" style={styles.icon} />
            <Text category="h9-s" status="body" marginTop={4}>
              {commentNumber} Comment
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

export default CommunityPost;

const themedStyles = StyleService.create({
  avatar: {
    marginRight: 16,
  },
  user: {
    flexDirection: "row",
  },
  line: {
    height: 1,
    marginBottom: 16,
  },
  likeView: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: "text-body-color",
  },
});
