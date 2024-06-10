import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { EventTicketNavigationProps } from "navigation/types";
import Dot from "./Dot";
import dayjs from "dayjs";
import { convertTime } from "utils/convertTime";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";

const EventTicket = memo(() => {
  const { t } = useTranslation("calendar");
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<EventTicketNavigationProps>();
  const {
    timeEnd,
    timeStart,
    title,
    type,
    typeEnd,
    typeStart,
    id,
    price,
    location,
    building,
    date,
    room,
  } = route.params.data;

  return (
    <Container style={styles.container} level="4">
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        appearance={"control"}
      />
      <Content contentContainerStyle={styles.content}>
        <Layout level="1" style={styles.ticket}>
          <Dot level="4" left={-12} top={-12} />
          <Dot level="4" right={-12} top={-12} />

          <Text category="h6" marginBottom={16}>
            {title}
          </Text>
          <View style={[globalStyle.flexDirection, globalStyle.itemsCenter]}>
            <Icon pack="assets" name="calendar16" style={styles.icon} />
            <Text category="h8-p" center>
              {dayjs(date).format("dddd, MMM DD")}
            </Text>
            <Text center> . </Text>
            <Text category="h8-p" center>
              {convertTime(timeStart)} {typeStart} -{convertTime(timeEnd)}{" "}
            </Text>
            <Text category="h8-p" center>
              {typeEnd}
            </Text>
          </View>
          <View style={[globalStyle.flexDirection, styles.building]}>
            <Icon
              pack="assets"
              name="building"
              style={[styles.icon, { marginTop: 4 }]}
            />
            <View>
              <Text category="h7">{building}</Text>
              <Text category="h8-p">{location}</Text>
            </View>
          </View>
          <View style={[globalStyle.flexDirection]}>
            <Icon
              pack="assets"
              name="event"
              style={[styles.icon, { marginTop: 4 }]}
            />
            <Text category="h8-p">1 {t("ticket")} - </Text>
            <Text category="h8-p" marginBottom={42}>
              {price}
            </Text>
          </View>
        </Layout>
        <Layout>
          <Dot level="4" left={-12} bottom={-12} />
          <Dot level="4" right={-12} bottom={-12} />

          <Image source={Images.ticketLine} style={{ width: width - 64 }} />
        </Layout>
        <Layout style={styles.bottomTicket}>
          <Dot level="4" left={-12} top={-12} />
          <Dot level="4" right={-12} top={-12} />
          <Dot level="4" left={-12} bottom={-12} />
          <Dot level="4" right={-12} bottom={-12} />
          <Image
            source={Images.qrCode}
            /* @ts-ignore */
            style={styles.qr}
          />
          <Text category="h8-p" center marginBottom={24}>
            {t("inviteFriend")}
          </Text>
          <View style={styles.bottom}>
            <NavigationAction icon="comment" marginRight={16} status="green" />
            <NavigationAction
              icon="inboxActive"
              marginRight={16}
              iconColor={theme["text-white-color"]}
              status="neon"
            />
            <NavigationAction icon="facebook" marginRight={16} status="blue" />
            <NavigationAction
              icon="twitter"
              marginRight={16}
              status="blue-sky"
            />
          </View>
        </Layout>
      </Content>
    </Container>
  );
});

export default EventTicket;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  ticket: {
    marginTop: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginRight: 8,
  },
  building: {
    marginVertical: 16,
  },
  content: {
    marginTop: 48,
    marginHorizontal: 32,
  },
  qr: {
    alignSelf: "center",
    marginVertical: 24,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  bottomTicket: {
    paddingBottom: 32,
  },
});
