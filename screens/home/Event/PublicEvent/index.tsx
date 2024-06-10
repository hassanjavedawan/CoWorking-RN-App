import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
  useTheme,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Images } from "assets/images";
import TabBarAnimation from "components/TabBarAnimation";
import { Data_Event } from "constants/Data";
import ForYou from "./ForYou";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { EventStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const PublicEvent = memo(() => {
  const { t } = useTranslation("event");

  const { height, width, top, bottom } = useLayout();
  const { navigate } = useNavigation<NavigationProp<EventStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const imgWidth = 295 * (width / 375);
  const imgHeight = 200 * (width / 375);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);
  const [dataEvent, setDataEvent] = React.useState(Data_Event);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ width: imgWidth, height: imgHeight, borderRadius: 12 }}
        />
        <View style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
          <Text status="white" category="h6">
            {item.title}
          </Text>
          <Text category="h9-s" status="white" marginTop={8}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  }, []);
  const handleSearch = React.useCallback(() => {
    navigate("ChangeLocation");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        title={<Text category="h8-s">NEW YORK CITY</Text>}
        accessoryLeft={<NavigationAction icon="back" status="primary" />}
        accessoryRight={
          <NavigationAction icon="search" onPress={handleSearch} />
        }
      />
      <Content level="2" contentContainerStyle={styles.content}>
        <Layout>
          <Carousel
            layout={"default"}
            data={data}
            sliderWidth={width}
            itemWidth={width - 80}
            loop
            onSnapToItem={(slideIndex) => setActiveIndex(slideIndex)}
            inactiveSlideScale={0.85}
            inactiveSlideOpacity={1}
            renderItem={renderItem}
            scrollEventThrottle={160}
          />
          <View>
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeIndex}
              dotStyle={styles.dotStyle}
              inactiveDotStyle={styles.inActiveDot}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            />
          </View>
        </Layout>
        <TabBarAnimation
          style={styles.tabBar}
          statusActive={"control"}
          statusInactive={"white"}
          data={[t("forYou").toString(), t("trending").toString()]}
          selectedIndex={activeTab}
          onChange={setActiveTab}
        />
        <ViewPager
          shouldLoadComponent={(index) => index === activeTab}
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          style={globalStyle.flexOne}
          swipeEnabled={false}
        >
          <ForYou dataEvent={dataEvent} />
          <ForYou dataEvent={dataEvent} />
        </ViewPager>
      </Content>
      <NavigationAction
        icon="pinMap"
        style={[styles.pinMap, { bottom: bottom + 16 }]}
        size="giant"
        status="warning"
        iconColor={theme["text-basic-color"]}
        onPress={() => navigate("MapEvent")}
      />
    </Container>
  );
});

export default PublicEvent;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  inActiveDot: {
    width: 8,
    height: 8,
    backgroundColor: "#E0E0E0",
  },
  dotStyle: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: "text-main-color",
  },
  ww: { height: 4, width: 4 },
  topNav: {
    marginBottom: 8,
  },
  content: {
    marginTop: 24,
    paddingBottom: 120,
  },
  tabBar: {
    marginHorizontal: 32,
    marginTop: 32,
    marginBottom: 24,
    backgroundColor: "white",
  },
  pinMap: {
    position: "absolute",
    right: 24,
  },
});
const data = [
  {
    id: 0,
    image: Images.event01,
    title: "UX Design Lunch & Learn: Personas",
    description: "Tomorrow 9:00 AM at The Farm Soho",
  },
  {
    id: 1,
    image: Images.event02,
    title: "Lunch and Learn: Raising Venture Capital",
    description: "Tomorrow 9:00 AM at AK Yoga Plus",
  },
  {
    id: 2,
    image: Images.event03,
    title: "Infinite Power of the Breath Meditation Event",
    description: "Tomorrow 9:00 AM at AK Yoga Plus",
  },
  {
    id: 3,
    image: Images.event03,
    title: "Infinite Power of the Breath Meditation Event",
    description: "Tomorrow 9:00 AM at AK Yoga Plus",
  },
  {
    id: 4,
    image: Images.event03,
    title: "Infinite Power of the Breath Meditation Event",
    description: "Tomorrow 9:00 AM at AK Yoga Plus",
  },
];
