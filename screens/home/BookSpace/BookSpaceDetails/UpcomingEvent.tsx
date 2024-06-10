import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import { EventProps } from "constants/Types";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import EventItem from "components/EventItem";
import { useTranslation } from "react-i18next";

interface Props {
  data: EventProps[];
}

const UpcomingEvent = memo(({ data }: Props) => {
  const { t } = useTranslation("spaceDetails");
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Text category="h6" marginLeft={32} marginBottom={8}>
        {t("upcomingEvent")}
      </Text>
      <Text category="h8-p" marginLeft={32} marginBottom={24} status="body">
        13/04/2020 - 26/04/2020
      </Text>
      {isEmpty(data) ? (
        <Layout
          level="2"
          style={[globalStyle.flexOne, globalStyle.justifyCenter]}
        >
          <LoadingIndicator size="giant" status="danger" />
        </Layout>
      ) : (
        <Content
          horizontal
          contentContainerStyle={styles.content}
          scrollEventThrottle={16}
        >
          {data.map((item, i) => {
            return <EventItem item={item} key={i} />;
          })}
        </Content>
      )}
      <Layout style={styles.line} level="6" />
    </View>
  );
});

export default UpcomingEvent;

const themedStyles = StyleService.create({
  container: {},
  content: {
    paddingHorizontal: 32,
  },
  line: {
    height: 1,
    margin: 32,
  },
});
