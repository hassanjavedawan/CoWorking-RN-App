import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Container from "components/Container";
import dayjs from "utils/dayjs";
import { Notification_Types_Enum } from "constants/Types";
import { useTranslation } from "react-i18next";

const CalendarSearch = memo(() => {
  const { t } = useTranslation(["calendar", "common"]);
  const { goBack } = useNavigation();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(DATA);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <View style={[globalStyle.flexDirection, styles.item]}>
        <View>
          <Text category="h9-s" center>
            {dayjs(item.date).format("MMM")}
          </Text>
          <Text category="h6" center>
            {dayjs(item.date).format("DD")}
          </Text>
        </View>
        <Layout
          style={[
            styles.layout,
            {
              backgroundColor:
                item.type === "meeting"
                  ? theme["color-neon-500"]
                  : item.type === "event"
                  ? theme["color-orange-500"]
                  : item.type === "responses"
                  ? theme["color-main-500"]
                  : "red",
            },
          ]}
        >
          <Text category="h8-s" marginHorizontal={16} marginRight={96}>
            {item.title}
          </Text>
        </Layout>
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <View style={[styles.topNav, globalStyle.flexDirection]}>
        <Input
          style={styles.input}
          size="small"
          status="primary"
          accessoryLeft={<Icon pack="assets" name="search" />}
        />
        <Text category="h8-s" marginLeft={17} status="main" onPress={goBack}>
          {t("common:cancel")}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
    </Container>
  );
});

export default CalendarSearch;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  input: {
    flex: 1,
  },
  content: {
    marginTop: 40,
  },
  item: {
    paddingLeft: 32,
    marginBottom: 32,
  },
  layout: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginLeft: 28,
    width: "100%",
    paddingVertical: 16,
  },
});
const DATA = [
  {
    id: 0,
    title: "Online Meeting with Dev Team",
    date: 1618563600000,
    type: Notification_Types_Enum.meeting,
  },
  {
    id: 1,
    title: "Meeting with the management",
    date: 1618304400000,
    type: Notification_Types_Enum.responses,
  },
  {
    id: 2,
    title: "Project Red: Retrospective Meeting",
    date: 1618045200000,
    type: Notification_Types_Enum.event,
  },
];
