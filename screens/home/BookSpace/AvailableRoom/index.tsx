import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import HeaderResult from "../BookSpaceResult/Header";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";
import Room from "./Room";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import { BookSpaceStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const AvailableRoom = memo(() => {
  const { t } = useTranslation("availableRoom");
  const { goBack, navigate } = useNavigation<
    NavigationProp<BookSpaceStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [data, setData] = React.useState(Data);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <Room
        item={item}
        onPress={() => navigate("RoomDetails", { room: item })}
      />
    );
  }, []);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <Text category="h8" marginTop={32} marginBottom={24}>
        {data.length}{" "}
        <Text category="h8-p" lineHeight={16}>
          {t("roomsAvailable")}
        </Text>
      </Text>
    );
  }, []);
  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        style={{ paddingTop: top + 8 }}
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
        title={
          <Text marginTop={top} category="h8-s">
            {t("title")}
          </Text>
        }
      />
      <HeaderResult
        time="9:00 AM - 10:30 AM"
        type="Meeting Room"
        date="Tue, 21 Apr 2020"
        people={4}
        location="New York, NY, USA"
      />
      {isEmpty(data) ? (
        <Layout
          level="2"
          style={[globalStyle.flexOne, globalStyle.justifyCenter]}
        >
          <LoadingIndicator size="giant" status="danger" />
        </Layout>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={ListHeaderComponent}
        />
      )}
    </Container>
  );
});

export default AvailableRoom;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
});
const Data = [
  {
    id: 0,
    title: "Dragonstone Room",
    image: [Images.room, Images.room01, Images.room02, Images.room03],
    seat: 6,
    amenities: ["TV", "White Board", "Webca..."],
    price: "$45",
    description:
      "In a coworking space on Broadway in the heart of Soho NYC, this beautiful conference room is perfect for your next meeting, or brainstorming. You will find dry erase walls, flatscreen Google TV, high-speed wifi, beautiful decor, snacks, drinks.",
  },
  {
    id: 1,
    title: "King's Landing Room",
    image: [Images.room01, Images.room, Images.room02, Images.room03],

    seat: 8,
    amenities: ["TV", "White Board", "Webca..."],
    price: "$48",
    description:
      "In a coworking space on Broadway in the heart of Soho NYC, this beautiful conference room is perfect for your next meeting, or brainstorming. You will find dry erase walls, flatscreen Google TV, high-speed wifi, beautiful decor, snacks, drinks.",
  },
  {
    id: 2,
    title: "Orange Room",
    image: [Images.room02, Images.room01, Images.room02, Images.room03],

    seat: 8,
    amenities: ["TV", "White Board", "Webca..."],
    price: "$56",
    description:
      "In a coworking space on Broadway in the heart of Soho NYC, this beautiful conference room is perfect for your next meeting, or brainstorming. You will find dry erase walls, flatscreen Google TV, high-speed wifi, beautiful decor, snacks, drinks.",
  },
  {
    id: 2,
    title: "Riverrun Room",
    image: [Images.room03, Images.room01, Images.room02, Images.room03],

    seat: 12,
    amenities: ["TV", "White Board", "Webca..."],
    price: "$65",
    description:
      "In a coworking space on Broadway in the heart of Soho NYC, this beautiful conference room is perfect for your next meeting, or brainstorming. You will find dry erase walls, flatscreen Google TV, high-speed wifi, beautiful decor, snacks, drinks.",
  },
];
