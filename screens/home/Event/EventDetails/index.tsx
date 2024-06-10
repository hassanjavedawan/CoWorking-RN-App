import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Button,
} from '@ui-kitten/components';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";


import Text from 'components/Text';
import Container from 'components/Container';
import {
  EventDetailsNavigationProps,
  EventStackParamList,
} from "navigation/types";
import Carousel from "react-native-snap-carousel";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";
import { convertTime } from "utils/convertTime";
import AboutEvent from "./AboutEvent";
import { useTranslation } from "react-i18next";

const EventDetails = memo(() => {
  const { t } = useTranslation("event");
  const { goBack, navigate } =
    useNavigation<NavigationProp<EventStackParamList>>();
  const { height, width, top, bottom } = useLayout();

  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<EventDetailsNavigationProps>();
  const heightImg = 320 * (height / 812);

  const [currentId, setCurrentId] = React.useState(0);
  const {
    timeEnd,
    timeStart,
    title,
    typeEnd,
    typeStart,
    price,
    image = [],
    description = '',
    location,
    date,
    email,
    phoneNumber,
    mapLocation,
    linking,
  } = route.params.data;
  const renderImage = React.useCallback(({item}) => {
    return (
      <Image
        source={item}
        style={{width: width, height: 320 * (width / 375)}}
      />
    );
  }, []);
  let imgLength = route.params.data.image?.length;
  const [state, setState] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
  });
  const goBuy = React.useCallback(() => {
    navigate('PaymentTickets');
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      <TopNavigation
        appearance="control"
        style={[styles.topNav, {top: top + 8}]}
        accessoryRight={
          <View style={globalStyle.flexDirection}>
            <NavigationAction icon="share" marginRight={24} status="outline" />
            <NavigationAction icon="wishlistActive" status="outline" />
          </View>
        }
        accessoryLeft={<NavigationAction icon="back" status="primary" />}
      />
      <Content
        contentContainerStyle={{
          paddingBottom: 150 * (height / 812),
        }}
      >

        <View>
          <Carousel
            data={image}
            renderItem={renderImage}
            layout={"default"}
            sliderWidth={width}
            itemWidth={width}
            inactiveSlideShift={1}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            scrollEventThrottle={160}
            onSnapToItem={(index) => {

              setCurrentId(index);
            }}
          />
          <Layout
            style={[
              styles.countImage,
              { top: heightImg + 32, left: (width - 40) / 2 },
            ]}
          >

            <Text status="white" category="h9-s">
              {currentId + 1}/{imgLength}
            </Text>
          </Layout>
        </View>
        <View style={globalStyle.padH32}>

          <Text category="h5" marginTop={28}>
            {title}
          </Text>
          <Text category="h8-p">{location}</Text>
          <View style={globalStyle.flexDirection}>
            <Icon pack="assets" name="time" style={styles.icon} />
            <View>
              <Text category="h8" lineHeight={24} marginTop={36}>
                {dayjs(date).format("dddd, DD MMMM YYYY")}
              </Text>
              <View
                style={[globalStyle.flexSpaceBetween, { width: width - 88 }]}
              >
                <Text category="h8-p" lineHeight={16} marginTop={12}>
                  {convertTime(timeStart)} {typeStart} - {convertTime(timeEnd)}{" "}

                  {typeEnd}
                </Text>
                <TouchableOpacity style={styles.addCalendar}>
                  <Text category="h8-p" lineHeight={22} status="main">
                    {t("addCalendar")}

                  </Text>
                  <Icon
                    name="calendar16"
                    pack="assets"
                    style={styles.iconCalendar}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Layout style={styles.line} level="5" />
          <AboutEvent
            description={description}
            phoneNumber={phoneNumber}
            email={email}
            state={state}
            linking={linking}
            location={location}
          />
        </View>
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 4 }]}>

        <Text category="h8" lineHeight={24}>
          {price}
          <Text category="h8-p" lineHeight={24}>
            /{t('ticket')}
          </Text>
        </Text>
        <Button
          children={t('buyTicket').toString()}
          status="basic"
          size="giant"
          onPress={goBuy}
        />
      </Layout>
    </Container>
  );
});

export default EventDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},

  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  addCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 16,
    marginTop: 40,
  },
  iconCalendar: {
    width: 16,
    height: 16,
    tintColor: 'text-main-color',
    marginLeft: 4,
  },
  countImage: {
    width: 35,
    height: 22,
    borderRadius: 11,
    ...globalStyle.absolute,
    ...globalStyle.center,
    backgroundColor: 'rgba(30, 31, 32, 0.7)',
    paddingTop: 4,
  },
  line: {
    marginVertical: 32,
    height: 1,
  },
  bottom: {
    ...globalStyle.flexSpaceBetween,
    ...globalStyle.fitBottom,
    ...globalStyle.topBorder24,

    paddingTop: 16,
    paddingBottom: 4,
    paddingHorizontal: 32,
  },
});
