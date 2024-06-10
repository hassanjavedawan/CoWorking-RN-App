import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { EventProps } from "constants/Types";
import EventItem from "components/EventItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { EventStackParamList } from "navigation/types";

interface Props {
  dataEvent: EventProps[];
}

const ForYou = memo(({ dataEvent }: Props) => {
  const { navigate } = useNavigation<NavigationProp<EventStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const onPress = (item: EventProps) =>
    navigate("EventDetails", { data: item });
  return (
    <View style={styles.container}>
      {dataEvent.map((item, i) => {
        return (
          <EventItem
            item={item}
            onPress={() => onPress(item)}
            key={i}
            style={{
              width: 311 * (width / 375),
              height: 302 * (width / 375),
              marginBottom: 24,
              marginLeft: 32,
            }}
          />
        );
      })}
    </View>
  );
});

export default ForYou;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
