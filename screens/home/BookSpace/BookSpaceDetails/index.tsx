import React, { memo } from "react";
import { View, ScrollView } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Header from "./Header";
import AboutThisSpace from "./AboutThisSpace";
import UpcomingEvent from "./UpcomingEvent";
import Reviews from "./Reviews";
import useModalize from "hooks/useModalize";
import ModalPanel from "components/ModalPanel";
import Amenities from "./Amenities";
import { BookSpaceStackParamList } from "navigation/types";
import { Data_Amenities, Data_Event, Data_Hour } from "constants/Data";
import { useTranslation } from "react-i18next";

const BookSpaceDetails = memo(() => {
  const { goBack, navigate } = useNavigation<
    NavigationProp<BookSpaceStackParamList>
  >();
  const { t } = useTranslation(["spaceDetails", "amenities"]);
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [state, setState] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
  });
  const {
    open: openHour,
    close: closeHour,
    modalizeRef: refHour,
  } = useModalize();
  const {
    open: openAmenities,
    close: closeAmenities,
    modalizeRef: refAmenities,
  } = useModalize();

  const showRateDetails = React.useCallback(() => {
    navigate("ReviewsDetails");
  }, []);
  const handleBookRoom = React.useCallback(() => {
    navigate("AvailableRoom");
  }, []);
  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        appearance="control"
        style={[styles.topNav, { top: top + 8 }]}
        accessoryLeft={<NavigationAction icon="back" status="primary" />}
        accessoryRight={
          <View style={globalStyle.flexDirection}>
            <NavigationAction icon="share" marginRight={24} status="outline" />
            <NavigationAction icon="wishlistActive" status="outline" />
          </View>
        }
      />
      <ScrollView
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Header
          dataImage={[Images.bg01, Images.bgAuth, Images.otherPlace]}
          title="The Farm Soho"
          rate={4.6}
          quantityRate={231}
          verified={true}
          location={"447 Broadway 2nd floor, NY, 10013"}
          openHour="9:00 AM - 5:00 PM"
          pressViewDetails={openHour}
          pressShowMoreAmenities={openAmenities}
        />
        <AboutThisSpace
          state={state}
          linking="info@thefarmsoho.com"
          phoneNumber="+1 917-722-5027"
          email="info@thefarmsoho.com"
          location="447 Broadway, 2nd Floor, NYC, United States"
        />
        <UpcomingEvent data={Data_Event} />
        <Reviews showMore={showRateDetails} />
        <Button
          children={t("inquireNow").toString()}
          size="giant"
          style={styles.inquire}
        />
        <Button
          children={t("bookATour").toString()}
          size="giant"
          style={styles.bookTour}
        />
      </ScrollView>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 4 }]}>
        <View>
          <Text category="h8-p" marginTop={8}>
            From{" "}
            <Text category="h8" lineHeight={24}>
              $45
            </Text>
            /per
          </Text>
          <View style={[globalStyle.flexDirection]}>
            <Icon pack="assets" name="rate" style={styles.iconRate} />
            <Text category="h8" marginLeft={4} center marginTop={2}>
              {4.7}
            </Text>
            <Text
              category="h9-s"
              status="body"
              marginTop={2}
              center
              children={`(${213})`}
            />
          </View>
        </View>
        <Button
          children={t("bookARoom").toString()}
          size="giant"
          status="basic"
          onPress={handleBookRoom}
        />
      </Layout>
      <ModalPanel title="Open Hours" ref={refHour} modalHeight={height / 1.5}>
        <View style={styles.itemHour}>
          <View>
            {Data_Hour.map((item, i) => {
              return (
                <View key={i}>
                  <Text marginBottom={24}>{item.title}</Text>
                </View>
              );
            })}
          </View>
          <View>
            {Data_Hour.map((item, i) => {
              return (
                <View key={i}>
                  <Text marginBottom={24}>{item.available}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ModalPanel>
      <ModalPanel title={t("amenities:title")} ref={refAmenities}>
        <Amenities data={Data_Amenities} />
      </ModalPanel>
    </Container>
  );
});

export default BookSpaceDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    ...globalStyle.absolute,
    bottom: undefined,
    zIndex: 10,
  },
  content: {
    paddingBottom: 44,
  },
  bookTour: {
    marginTop: 16,
    marginHorizontal: 32,
  },
  inquire: {
    marginHorizontal: 32,
  },
  bottom: {
    paddingHorizontal: 32,
    paddingTop: 16,
    ...globalStyle.topBorder24,
    ...globalStyle.flexSpaceBetween,
  },
  iconRate: {
    tintColor: "color-orange-100",
  },
  itemHour: {
    ...globalStyle.flexSpaceBetween,
    margin: 32,
  },
});
