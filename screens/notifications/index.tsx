import React, { memo } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import keyExtractor from "utils/keyExtractor";
import { NotificationProps, Notification_Types_Enum } from "constants/Types";
import { RefreshControl } from "react-native-web-refresh-control";
import { Data_Notification } from "constants/Data";
import { useTranslation } from "react-i18next";

interface Props {
  item: NotificationProps;
}
const Notifications = memo(() => {
  const { t } = useTranslation("common");
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(Data_Notification);
  const renderItem = React.useCallback(({ item }: Props) => {
    return (
      <TouchableOpacity
        style={[
          globalStyle.flexDirection,
          styles.item,
          { maxHeight: 62 * (height / 812) },
        ]}
        activeOpacity={0.7}
      >
        <Layout
          style={[
            styles.dot,
            {
              backgroundColor: item.unread
                ? theme["color-neon-100"]
                : theme["background-basic-color-2"],
            },
          ]}
        />
        {item.type === Notification_Types_Enum.commend ? (
          <Avatar
            source={item.avatar}
            size={"tiny"}
            resizeMode="contain"
            /* @ts-ignore */
            style={styles.avatar}
          />
        ) : (
          <NavigationAction
            icon={
              item.type === Notification_Types_Enum.event
                ? "event"
                : Notification_Types_Enum.meeting === item.type
                ? "seat"
                : "comment"
            }
            disabled
            status={
              item.type === Notification_Types_Enum.meeting
                ? "primary"
                : "warning"
            }
            marginRight={24}
          />
        )}
        <View>
          <Text category="h8">{item.title}</Text>
          <Text
            style={{ maxWidth: 250 * (width / 375) }}
            numberOfLines={1}
            category="h8-p"
            marginBottom={8}
          >
            {item.description}
          </Text>
          <Text category="h9-s" status="body">
            {item.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <Layout
        style={[
          globalStyle.padH32,
          globalStyle.center,
          globalStyle.flexSpaceBetween,
          styles.topNav,
        ]}
      >
        <Text category="h4">{t("notif")}</Text>
        <NavigationAction icon="setting" />
      </Layout>
      <FlatList
        data={data}
        style={[
          globalStyle.padV32,
          { backgroundColor: theme["background-basic-color-2"] },
        ]}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
    </Container>
  );
});

export default Notifications;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  item: {
    marginBottom: 24,
  },
  content: {
    paddingLeft: 12,
    paddingRight: 32,
    paddingBottom: 120,
  },
  avatar: {
    marginRight: 24,
  },
  dot: {
    backgroundColor: "text-neon-color",
    height: 8,
    width: 8,
    borderRadius: 99,
    marginTop: 16,
    marginRight: 12,
  },
});
