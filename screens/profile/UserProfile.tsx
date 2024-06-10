import React, { memo } from "react";
import { View, Image, ScrollView } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Avatar,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";

import PostView from "./PostView";
import { globalStyle } from "styles/globalStyle";
import Tag from "components/Tag";
import UserInfo from "./UserInfo";

import ReadMore from "components/ReadMore";
import { Post_Types_Enum } from "constants/Types";

const UserProfile = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const HEIGHT_TOP = 160 * (height / 812);
  const [follow, setFollow] = React.useState(true);
  const onFollow = React.useCallback(() => {
    setFollow(!follow);
  }, [follow]);
  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      <NavigationAction
        icon="back"
        status="primary"
        style={[styles.btnBack, { top: top + 8 }]}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Layout>
          <Image
            source={Images.bgHome}
            style={[
              {
                width: width,
                height: HEIGHT_TOP,
              },
            ]}
          />
          <View style={styles.avatarView}>
            <Avatar
              source={Images.avatar5}
              size="large"
              /* @ts-ignore */
              style={styles.avatar}
            />
          </View>
          <View
            style={[globalStyle.flexSpaceBetween, globalStyle.alignSelfEnd]}
          >
            <View style={globalStyle.flexDirection}>
              <Button
                onPress={onFollow}
                children={follow ? "Following" : "Follow"}
                size="small"
                style={[styles.follow, { width: 132 * (width / 375) }]}
                status={follow ? "basic" : "platinum"}
                accessoryLeft={(props) => (
                  <Icon {...props} pack="assets" name="checkMark" />
                )}
              />
              <Button
                size="small"
                style={styles.commend}
                accessoryLeft={() => (
                  <Icon pack="assets" name="commend" style={styles.icon} />
                )}
              />
            </View>
          </View>
          <Text marginTop={16} category="h6" marginBottom={4} marginLeft={32}>
            Theresa Cobb
          </Text>
          <View style={globalStyle.flexDirection}>
            <Text category="h8-p" marginLeft={32}>
              Artist
            </Text>
            <Text marginHorizontal={8}>.</Text>
            <Text category="h8-p">23yrs</Text>
          </View>
          <ReadMore
            style={styles.readMore}
            numberOfLines={2}
            status="body"
            children="Although it is something very personal, for me the most important thing is passion, location-based marketing"
          />
          <View style={styles.tagView}>
            <Tag
              level="2"
              tags={[
                "UX Research",
                "Collaboration",
                "Wireframi...",
                "Collaboration",
                "Collaboration",
                "Collaboration",
                "Collaboration",
                "Collaboration",
                "Collaboration",
                "Collaboration",
              ]}
            />
          </View>
          <UserInfo
            numPost={5}
            numFollowers={"5.5K"}
            numFollowing={12}
            style={styles.userInfo}
          />
        </Layout>
        <PostView index={0} />
      </ScrollView>
    </Container>
  );
});

export default UserProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  readMore: {
    marginHorizontal: 32,
  },
  btnBack: {
    position: "absolute",
    left: 32,
    zIndex: 10,
  },
  content: {
    paddingBottom: 120,
  },
  userInfo: {
    marginHorizontal: 32,
    marginBottom: 24,
  },
  avatar: {
    borderWidth: 3,
    borderColor: "background-basic-color-1",
    left: 32,
    position: "absolute",
  },
  tagView: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 24,
    marginLeft: 32,
  },
  avatarView: {
    top: -24,
    zIndex: 10,
  },
  follow: {
    paddingRight: 16,
    paddingLeft: 12,
    marginTop: 16,
  },
  commend: {
    width: 40,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 32,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-main-color",
  },
});

export const Data_Post = [
  {
    id: 0,
    name: "Isaac Castillo",
    avatar: Images.avatar5,
    time: "16 Apr 2020",
    ability: "UX Designer",
    type: Post_Types_Enum.jobHires,
    likes: "1.2K",
    commends: "16",
    content:
      "I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached.",
  },
  {
    id: 1,
    name: "Eunice Hayes",
    avatar: Images.avatar5,
    time: "16 Apr 2020",
    ability: "UX Designer",
    type: Post_Types_Enum.jobHires,
    likes: "1.2K",
    commends: "16",
    content:
      "I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached.",
  },
  {
    id: 2,
    name: "Lura Barnes",
    avatar: Images.avatar6,
    time: "16 Apr 2020",
    ability: "UX Designer",
    type: Post_Types_Enum.jobHires,
    likes: "1.2K",
    commends: "16",
    content:
      "I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached.",
  },
];
