import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Button,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import {
  BookSpaceStackParamList,
  RoomDetailsNavigationProp,
} from "navigation/types";
import Carousel from "react-native-snap-carousel";
import { useTranslation } from "react-i18next";

const RoomDetails = memo(() => {
  const { goBack, navigate } = useNavigation<
    NavigationProp<BookSpaceStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("availableRoom");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const route = useRoute<RoomDetailsNavigationProp>();
  const {
    image,
    title,
    seat,
    amenities,
    price,
    description,
  } = route.params.room;

  let heightImg = 320 * (width / 375);
  const renderItem = React.useCallback(({ item }) => {
    return (
      <View>
        <Image
          source={item || Images.bg01}
          style={{ width: width, height: heightImg }}
        />
      </View>
    );
  }, []);

  const handleBookARoom = React.useCallback(() => {
    navigate("BookDetails");
  }, []);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNav, { top: top + 8 }]}
        appearance={"control"}
        accessoryLeft={<NavigationAction icon="back" status="primary" />}
      />
      <Carousel
        layout={"default"}
        data={image}
        sliderWidth={width}
        itemWidth={width}
        loop
        inactiveSlideShift={1}
        renderItem={renderItem}
        inactiveSlideScale={0.82}
        inactiveSlideOpacity={1}
        scrollEventThrottle={160}
        onSnapToItem={(index) => {
          setCurrentIndex(index);
        }}
      />
      <Layout
        style={[
          styles.countImage,
          { top: heightImg - 48, left: (width - 40) / 2 },
        ]}
      >
        <Text status="white" category="h9-s">
          {currentIndex + 1}/{image.length}
        </Text>
      </Layout>
      <Content padder level="2" contentContainerStyle={styles.content}>
        <Text category="h4" marginTop={24} marginBottom={16}>
          {title}
        </Text>
        <View style={[styles.seat]}>
          <Icon pack="assets" name="seat" style={styles.icon} />
          <Text marginLeft={16} lineHeight={16} category="h8-p">
            {seat} {t("seatsMax")}
          </Text>
        </View>
        <View style={[globalStyle.flexDirection, globalStyle.itemsCenter]}>
          <Icon pack="assets" name="price" style={styles.icon} />
          <View style={styles.amenities}>
            {amenities.map((item, index) => {
              return (
                <View style={globalStyle.flexDirection} key={index}>
                  <Text lineHeight={16} category="h8-p">
                    {item}
                  </Text>
                  <Text
                    lineHeight={16}
                    category="h8-p"
                    marginTop={-2}
                    marginHorizontal={4}
                  >
                    .
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <Layout style={styles.line} level="2" />
        <Text category="h6" marginBottom={16}>
          {t("aboutThisRoom")}
        </Text>
        <Text category="h8-p">{description}</Text>
      </Content>
      <Layout style={[styles.bottom, { bottom: bottom + 4 }]}>
        <View>
          <Text category="h7-s">
            {t("from")}{" "}
            <Text category="h7" lineHeight={24}>
              {price}
            </Text>
            {t("per")}
          </Text>
          <Text category="h9-s">(tax incl.)</Text>
        </View>
        <Button
          children="Book a Room"
          status="basic"
          size="giant"
          onPress={handleBookARoom}
        />
      </Layout>
    </Container>
  );
});

export default RoomDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
  topNav: {
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  seat: {
    ...globalStyle.flexDirection,
    ...globalStyle.itemsCenter,
    marginBottom: 16,
  },
  icon: {
    height: 16,
    width: 16,
  },
  amenities: {
    flexDirection: "row",
    marginLeft: 16,
    marginTop: 2,
  },
  line: {
    height: 1,
    marginVertical: 32,
  },
  bottom: {
    ...globalStyle.flexSpaceBetween,
    paddingTop: 16,
    paddingHorizontal: 32,
    ...globalStyle.topBorder24,
  },
  countImage: {
    width: 35,
    height: 22,
    borderRadius: 11,
    ...globalStyle.absolute,
    ...globalStyle.center,
    backgroundColor: "rgba(30, 31, 32, 0.7)",
    paddingTop: 4,
  },
});
