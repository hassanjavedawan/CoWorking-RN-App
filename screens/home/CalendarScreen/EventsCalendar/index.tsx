import React, { memo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { dataTime } from "constants/Data";
import { EventProps } from "constants/Types";
import { isEmpty } from "lodash";
import { HomeStackParamList } from "navigation/types";
import { convertTime } from "utils/convertTime";
interface Props {
  currentTime: number;
  data: EventProps[];
}
const EventCalendar = memo(({ currentTime, data }: Props) => {
  const { width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const refScrollView = React.useRef<ScrollView>(null);
  const heightItem = 80;
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();

  const handleEvent = React.useCallback((item: EventProps) => {
    if (item.type === "meeting") {
      return navigate("CalendarDetails", { data: item });
    } else if (item.type === "event") {
      return navigate('EventDetails', { data: item });
    }
  }, []);
  React.useEffect(() => {
    if (currentTime) {
      refScrollView.current?.scrollTo({
        y: (currentTime - 1) * 80,
        animated: true,
      });
    }
  }, [currentTime, refScrollView]);

  return (
    <ScrollView
      ref={refScrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {dataTime.map((item, index) => {
        return (
          <View key={index} style={{ height: heightItem }}>
            <View style={globalStyle.flexDirection}>
              <View style={styles.timeView}>
                <Text
                  status="body"
                  uppercase
                  category="h9-s"
                  marginTop={32}
                  center
                >
                  {item.time}:00
                </Text>
                <Text status="body" uppercase category="h9-s">
                  {item.type}
                </Text>
              </View>
              <View style={styles.line} />
            </View>
          </View>
        );
      })}
      <View style={styles.eventView}>
        {isEmpty(data)
          ? null
          : data.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleEvent(item)}
                  activeOpacity={0.7}
                  key={index}
                  style={{
                    height: (item.timeEnd - item.timeStart) * heightItem,
                    position: "absolute",
                    top: item.timeStart * heightItem - 40,
                    width: width - heightItem,
                    backgroundColor:
                      item.type === "meeting"
                        ? theme["color-neon-500"]
                        : theme["color-primary-500"],
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <Text marginTop={16} marginLeft={16} status="neon">
                    {convertTime(item.timeStart)} - {convertTime(item.timeEnd)}
                  </Text>

                  <Text marginTop={4} marginLeft={16} category="h8">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
      </View>
      <Layout
        level="4"
        style={[styles.lineTime, { width: width - 64, top: currentTime * 80 }]}
      >
        <Layout style={styles.dot} level="4" />
      </Layout>
    </ScrollView>
  );
});

export default EventCalendar;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: dataTime.length * 12,
    backgroundColor: "background-basic-color-2",
  },
  line: {
    backgroundColor: "text-platinum-color",
    marginLeft: 24,
    width: "100%",
    height: 1,
    marginTop: 40,
  },
  dot: {
    width: 8,
    borderRadius: 99,
    height: 8,
  },
  lineTime: {
    alignSelf: "flex-end",
    position: "absolute",
    height: 2,
    justifyContent: "center",
  },
  timeView: {
    alignItems: "flex-end",
    marginLeft: 31,
  },
  eventView: {
    position: "absolute",
    alignItems: "flex-end",
    right: 0,
  },
});
