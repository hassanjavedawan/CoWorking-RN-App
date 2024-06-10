import React, { memo } from "react";
import { View, Image, ScrollView, ImageRequireSource } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { Images } from "assets/images";
import NameTag from "./NameTag";
import Carousel from "react-native-snap-carousel";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  location: string;
  openHour: string;
  rate: number;
  quantityRate: number;
  pressViewDetails?(): void;
  pressTakeATour?(): void;
  pressShowMoreAmenities?(): void;
  verified: boolean;
  dataImage: ImageRequireSource[];
}

const Header = memo(
  ({
    title,
    dataImage,
    rate,
    quantityRate,
    pressShowMoreAmenities,
    pressTakeATour,
    location,
    verified,
    pressViewDetails,
    openHour,
  }: Props) => {
    const { t } = useTranslation(["spaceDetails", "common"]);
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    const heightImg = 320 * (height / 812);
    const [current, setCurrent] = React.useState<number>(0);
    const renderImage = React.useCallback(({ item }) => {
      return (
        <Image source={item} style={{ width: width, height: heightImg }} />
      );
    }, []);
    return (
      <View>
        <Carousel
          data={dataImage}
          renderItem={renderImage}
          layout={"default"}
          sliderWidth={width}
          itemWidth={width}
          itemHeight={320 * (height / 812)}
          inactiveSlideShift={1}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          scrollEventThrottle={160}
          onSnapToItem={(index) => {
            setCurrent(index);
          }}
        />
        <Layout
          style={[
            styles.countImage,
            { top: heightImg - 34, left: (width - 40) / 2 },
          ]}
        >
          <Text status="white" category="h9-s">
            {current + 1}/{dataImage.length}
          </Text>
        </Layout>
        <View style={styles.container}>
          {verified ? (
            <View style={globalStyle.flexDirection}>
              <Icon pack="assets" name={"verified"} style={[styles.icon]} />
              <Text
                category="h9-s"
                marginTop={2}
                marginLeft={4}
                status={"green"}
                children="Verified"
              />
            </View>
          ) : null}
          <Text category="h4" marginVertical={8}>
            {title}
          </Text>
          <Text category="h8-s" marginBottom={16}>
            {location}
          </Text>
          <View style={globalStyle.flexDirection}>
            <Icon pack="assets" name="rate" style={styles.iconRate} />
            <Text category="h8" marginTop={2} marginLeft={4}>
              {rate}
            </Text>
            <Text
              category="h9-s"
              status="body"
              marginLeft={2}
              marginTop={2}
              children={`(${quantityRate})`}
              marginBottom={32}
            />
          </View>
          <View style={[globalStyle.flexDirection]}>
            <Icon pack="assets" name="time" style={styles.iconTitle} />
            <View>
              <Text category="h7">{t("openHour")}</Text>
              <Text category="h8-p" marginTop={12} marginBottom={16}>
                {openHour} (24/7 {t("memberAccess")})
              </Text>
              <Text
                status="main"
                category="h8"
                marginBottom={32}
                onPress={pressViewDetails}
                children={t("viewDetails").toString()}
              />
            </View>
          </View>
          <View style={[globalStyle.flexDirection]}>
            <Icon pack="assets" name="roomIc" style={styles.iconTitle} />
            <View>
              <Text category="h7">{t("roomList")}</Text>
              <Text category="h8-p" marginTop={12} marginBottom={16}>
                6 {t("room")}
              </Text>
              <Text
                status="main"
                category="h8"
                marginBottom={32}
                onPress={pressTakeATour}
                children={t("takeATour")}
              />
            </View>
          </View>
          <View style={[globalStyle.flexDirection]}>
            <Icon pack="assets" name="amenities" style={styles.iconTitle} />
            <View>
              <Text category="h7">{t("amenitiesFacilities")}</Text>
              <View style={[styles.tagName, { width: width - 80 }]}>
                {Data_Amenities.map((item, id) => {
                  return <NameTag children={item.title} key={id} />;
                })}
              </View>
              <Text
                category="h8-p"
                status="main"
                marginBottom={32}
                onPress={pressShowMoreAmenities}
                children={`${t("common:showAll")} ${t("amenitiesFacilities")}`}
              />
            </View>
          </View>
          <View style={[globalStyle.flexDirection]}>
            <Icon pack="assets" name="securePay" style={styles.iconTitle} />
            <Text category="h7">{t("privateOffice")}</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {Data_Office.map((item, i) => {
            return (
              <Layout
                key={i}
                style={[styles.itemOffice, { width: 160 * (width / 375) }]}
              >
                <Image source={Images.privateOffice} />
                <Text category="h8-p" marginTop={11} marginBottom={5}>
                  {item.title}
                </Text>
                <Text category="h8-p" status="body">
                  {item.seat} {t("seats")}
                </Text>
              </Layout>
            );
          })}
        </ScrollView>
        <Layout style={styles.line} level="6" />
      </View>
    );
  }
);

export default Header;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 32,
    marginTop: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
  iconTitle: {
    width: 16,
    height: 16,
    marginTop: 4,
    marginRight: 16,
  },
  iconRate: {
    tintColor: "text-warning-color",
  },
  listAmenities: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginRight: 120,
    justifyContent: "space-between",
  },
  tagName: {
    marginTop: 12,
    flexWrap: "wrap",
    ...globalStyle.flexSpaceBetween,
  },
  itemOffice: {
    padding: 16,
    marginRight: 16,
    borderRadius: 16,
  },
  content: {
    paddingLeft: 64,
    marginTop: 16,
    paddingRight: 32,
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
  line: {
    height: 1,
    margin: 32,
  },
});
const Data_Office = [
  { id: 0, title: "Private Office 1", seat: 8 },
  { id: 1, title: "Private Office 2", seat: 10 },
  { id: 2, title: "Private Office 3", seat: 8 },
  { id: 3, title: "Private Office 4", seat: 8 },
];
const Data_Amenities = [
  { id: 0, title: "High-Speed WiFi" },
  { id: 1, title: "Air Conditioning" },
  { id: 1, title: "Front desk" },
  { id: 1, title: "Whiteboard" },
  { id: 1, title: "Heating" },
  { id: 1, title: " Sofa" },
];
