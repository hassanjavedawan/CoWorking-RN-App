import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
  Button,
  Icon,
} from "@ui-kitten/components";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import TabBar from "components/TabBar";
import { Images } from "assets/images";
import CommunityTab from "./CommunityTab";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Animated from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const CommunityHome = memo(() => {
  const { t } = useTranslation("community");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { bottom, height } = useLayout();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const tab = [
    t("latest"),
    t("jobHires"),
    t("adice"),
    t("forSale"),
    t("others"),
  ];
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<Text category="h4">{t("title")}</Text>}
        accessoryRight={<NavigationAction icon="search" />}
      />
      <View style={[styles.absoluteBtn, { bottom: bottom + 90 }]}>
        <Button
          onPress={() => navigate("CreatePostModal")}
          status="warning"
          size="medium"
          accessoryRight={() => (
            <Animated.View>
              <Icon pack="assets" name="plus" />
            </Animated.View>
          )}
          style={styles.btnPlus}
        />
      </View>
      <View>
        <TabBar
          onChange={setActiveIndex}
          activeIndex={activeIndex}
          styleBtn={styles.btnTabBar}
          style={[styles.tabBar]}
          tabString={tab}
        />
      </View>
      <ViewPager
        selectedIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
      >
        <CommunityTab data={dataLatest} />
        <CommunityTab data={dataLatest} />
        <CommunityTab data={dataLatest} />
        <CommunityTab data={dataLatest} />
        <CommunityTab data={dataLatest} />
      </ViewPager>
    </Container>
  );
});

export default CommunityHome;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  btnTabBar: {
    marginRight: 32,
  },
  tabBar: {
    paddingLeft: 32,
    marginTop: 16,
  },
  absoluteBtn: {
    right: 24,
    height: 48,
    width: 48,
    position: "absolute",
    zIndex: 20,
  },
  btnPlus: {
    ...globalStyle.flexOne,
    borderRadius: 16,
  },
});
const dataLatest = [
  {
    id: 0,
    title: "Job Hires",
    ability: "Artist",
    name: "Theresa Cobb",
    avatar: Images.avatar6,
    date: 1587027024000,
    like: 1600,
    commend: 16,
    description:
      "We’re looking for a graphic designer to create a logo for our wellness brand. Timeline is flexible and we have an idea…",
  },
  {
    id: 1,
    title: "For Sale",
    ability: "Freelancer",
    name: "Jordanna Kitchener",
    avatar: Images.avatar5,
    image: Images.post,
    like: 1600,
    commend: 3200,
    date: 1587027024000,
    description:
      "We’re looking for a graphic designer to create a logo for our wellness brand. Timeline is flexible and we have an idea…",
  },
];
