import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { RoomDetailsProps } from "constants/Types";
import { useTranslation } from "react-i18next";

interface RoomProps {
  item: RoomDetailsProps;
  onPress?(): void;
}

const Room = ({ item, onPress }: RoomProps) => {
  const { t } = useTranslation();
  let { image, title, seat, amenities, price } = item;
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const widthImg = 88 * (width / 375);
  const heighthImg = 112 * (width / 375);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Layout style={[styles.container]}>
        <Image
          source={image[0]}
          style={{
            width: widthImg,
            height: heighthImg,
            ...globalStyle.border12,
          }}
        />
        <View style={styles.title}>
          <Text category="h7" marginBottom={8}>
            {title}
          </Text>
          <View style={styles.status}>
            <Icon pack="assets" name="seat" style={styles.icon} />
            <Text status="body" marginLeft={4} category="h9-s">
              {seat} {t("seats")}
            </Text>
          </View>
          <View style={styles.status}>
            <Icon pack="assets" name="amenities" style={styles.icon} />
            <View style={styles.amenities}>
              {amenities.map((item, index) => {
                return (
                  <View style={globalStyle.flexDirection} key={index}>
                    <Text status="body" category="h9-s">
                      {item}
                    </Text>
                    <Text
                      status="body"
                      category="h9-s"
                      marginTop={-2}
                      marginHorizontal={4}
                    >
                      .
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.status}>
            <Icon pack="assets" name="price" style={styles.icon} />
            <Text status="body" marginLeft={4} category="h9-s">
              {t("from")} {price}
              {t("per")}
            </Text>
          </View>
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

export default Room;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    marginBottom: 24,
    borderRadius: 16,
    padding: 8,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
  },
  title: {
    marginLeft: 16,
    justifyContent: "center",
  },
  amenities: {
    flexDirection: "row",
    marginLeft: 4,
    marginTop: 2,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});
