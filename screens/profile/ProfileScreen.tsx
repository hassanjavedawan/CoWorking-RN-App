import React, { memo } from "react";
import { View, Image, FlatList } from "react-native";
import {
  StyleService,
  useStyleSheet,
  ViewPager,
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

import TabBar from "components/TabBar";
import PostView from "./PostView";
import keyExtractor from "utils/keyExtractor";
import { globalStyle } from "styles/globalStyle";
import Tag from "components/Tag";
import UserInfo from "./UserInfo";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Spaces from "./Spaces";
import Events from "./Events";
import ReadMore from "components/ReadMore";

const ProfileScreen = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const HEIGHT_TOP = 160 * (height / 812);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });
  const FlatListAnimated = Animated.createAnimatedComponent(FlatList);
  const input = [0, height * 0.1, height * 0.095, height * 0.098];
  const stylesAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, input, [1, 1, 0, 0]);
    const opacity = interpolate(
      translateY.value,
      input,
      [1, 1, 0.1, 0],
      Extrapolate.IDENTITY
    );

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      <Image
        source={Images.bgHome}
        style={[
          {
            width: width,
            height: HEIGHT_TOP,
          },
        ]}
      />
      <NavigationAction
        icon="back"
        status="primary"
        style={[styles.btnBack, { top: top + 8 }]}
      />

      <Animated.View style={[stylesAvatar, styles.avatarView]}>
        <Avatar
          source={Images.avatar}
          size="large"
          /* @ts-ignore */
          style={styles.avatar}
        />
      </Animated.View>
      <FlatListAnimated
        data={[1]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <Layout style={styles.top}>
              <View
                style={[globalStyle.flexSpaceBetween, globalStyle.alignSelfEnd]}
              >
                <View style={globalStyle.flexDirection}>
                  <Button
                    children="Edit Profile"
                    size="small"
                    style={styles.edit}
                    status="platinum"
                    accessoryLeft={() => (
                      <Icon pack="assets" name="edit16" style={styles.icon} />
                    )}
                  />
                  <Button
                    size="small"
                    style={styles.findFriend}
                    accessoryLeft={() => (
                      <Icon
                        pack="assets"
                        name="findFriend"
                        style={styles.icon}
                      />
                    )}
                  />
                </View>
              </View>
              <Text marginTop={16} category="h6" marginBottom={4}>
                Isaac Castillo
              </Text>
              <View style={globalStyle.flexDirection}>
                <Text category="h8-p">UX Designer</Text>
                <Text marginHorizontal={8}>.</Text>
                <Text category="h8-p">29yrs</Text>
              </View>
              <ReadMore
                numberOfLines={2}
                status="body"
                children="With over 8 years in various industries including
                high-technology, e-commerce,location-based marketing"
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
              <UserInfo numPost={24} numFollowers={"5.5K"} numFollowing={12} />
            </Layout>
          );
        }}
        renderItem={() => (
          <TabBar
            tabs={tabs}
            style={styles.tabBar}
            onChange={setActiveIndex}
            activeIndex={activeIndex}
          />
        )}
        ListFooterComponent={() => {
          return (
            <ViewPager
              shouldLoadComponent={(index) => index === activeIndex}
              selectedIndex={activeIndex}
              onSelect={setActiveIndex}
              style={styles.viewPager}
            >
              <PostView index={activeIndex} />
              <Spaces index={activeIndex} />
              <Events index={activeIndex} />
              <PostView index={activeIndex} />
              <PostView index={activeIndex} />
            </ViewPager>
          );
        }}
      />
    </Container>
  );
});

export default ProfileScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    paddingLeft: 32,
    backgroundColor: "text-white-color",
  },
  btnBack: {
    position: "absolute",
    left: 32,
  },
  top: {
    paddingHorizontal: 32,
    paddingBottom: 16,
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
  },
  avatarView: {
    top: -24,
    zIndex: 10,
  },
  edit: {
    height: 36,
    paddingRight: 16,
    paddingLeft: 12,
    marginTop: 16,
  },
  findFriend: {
    width: 40,
    height: 36,
    marginTop: 16,
    marginLeft: 8,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-main-color",
  },
  viewPager: {
    paddingBottom: 120,
  },
});
const tabs = [
  { id: 0, title: "post", icon: "communityActive" },
  { id: 1, title: "spaces", icon: "wishlistActive" },
  { id: 2, title: "events", icon: "event" },
  { id: 3, title: "ticket", icon: "event" },
  { id: 4, title: "meetings", icon: "wishlistActive" },
];
