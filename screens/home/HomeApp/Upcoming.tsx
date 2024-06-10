import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  title: string;
  time: string;
  color: string;
  position: string;
  numberCoworker: number;
}
interface UpcomingProps {
  data: Props[];
  onPress?(): void;
  pressCalendar?(): void;
}

const Upcoming = memo(({ data, onPress, pressCalendar }: UpcomingProps) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["home", "common"]);
  return (
    <View style={globalStyle.padH32}>
      <View style={[globalStyle.flexSpaceBetween]}>
        <Text category="h6">Upcomings</Text>
        <TouchableOpacity
          style={[globalStyle.flexDirection, globalStyle.center]}
          onPress={pressCalendar}
        >
          <Text category="h8-p" status="main" center marginRight={5}>
            {t("common:calendar")}
          </Text>
          <Icon name="calendar16" pack="assets" style={styles.iconCalendar} />
        </TouchableOpacity>
      </View>
      <Text category="h8-p" status="body" marginTop={8}>
        {t("common:today")}, {dayjs().format("DD MMM")}
      </Text>
      <View>
        {data.map((item, index) => {
          let { time, title, position, numberCoworker, color } = item;
          return (
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} key={index}>
              <Layout
                style={[globalStyle.flexDirection, styles.upcomingItem]}
                key={index}
              >
                <View style={[styles.tag, { backgroundColor: color }]} />
                <View>
                  <Text status="neon" marginBottom={4} category="h8-p">
                    {time}
                  </Text>
                  <Text category="h7">{title}</Text>
                  <View style={[styles.description]}>
                    <Icon pack="assets" name="pinMap" style={styles.icon} />
                    <Text category="h9-s" status="body" center>
                      {position}
                    </Text>
                  </View>
                  <View style={[styles.description]}>
                    <Icon pack="assets" name="seat" style={styles.icon} />
                    <Text category="h9-s" status="body" center>
                      {numberCoworker} Coworkers
                    </Text>
                  </View>
                </View>
              </Layout>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

export default Upcoming;

const themedStyles = StyleService.create({
  iconCalendar: {
    tintColor: "color-main-100",
    width: 16,
    height: 16,
  },
  tag: {
    width: 8,
    height: 37,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    marginRight: 16,
  },
  upcomingItem: {
    paddingTop: 16,
    paddingBottom: 18,
    marginTop: 24,
    borderRadius: 16,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginRight: 8,
  },
  description: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  },
});
