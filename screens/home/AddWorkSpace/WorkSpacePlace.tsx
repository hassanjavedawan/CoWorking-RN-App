import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { WorkSpaceItemProps } from "constants/Types";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";

interface ItemProps {
  item: WorkSpaceItemProps;
  onPress?(): void;
}

const WorkSpacePlace = memo(({ item, onPress }: ItemProps) => {
  const { title, image, isVerified, rate, quantityRate, location } = item;
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const { t } = useTranslation("common");
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      style={[globalStyle.flexDirection, styles.item, { width: width - 64 }]}
    >
      <Image
        source={image || Images.workplace1}
        style={[
          /* @ts-ignore */
          styles.img,
          { height: 112 * (height / 812), width: 88 * (width / 375) },
        ]}
      />
      <View style={globalStyle.alignSelfCenter}>
        <Text category="h7" marginRight={120} numberOfLines={1}>
          {title}
        </Text>
        <View style={[globalStyle.flexDirection, styles.location]}>
          <Icon pack="assets" name="pinMap" style={styles.icon} />
          <Text category="h9-s" status="body" marginTop={2}>
            {location}
          </Text>
        </View>
        <View style={globalStyle.flexDirection}>
          <Icon pack="assets" name="rate" style={styles.iconRate} />
          <Text category="h8" marginTop={2} marginLeft={4}>
            {rate}
          </Text>
          <Text
            category="h9-s"
            status="body"
            marginLeft={2}
            marginTop={2}
            children={`(${quantityRate})`}
            marginBottom={8}
          />
        </View>
        <View style={[globalStyle.flexDirection]}>
          <View style={globalStyle.flexDirection}>
            <Icon
              pack="assets"
              name={isVerified ? "verified" : "unverified"}
              style={[styles.iconCareTeam]}
            />
            <Text
              category="h9-s"
              marginTop={2}
              marginLeft={4}
              status={isVerified ? "green" : "body"}
            >
              {t("verified")}
            </Text>
          </View>
        </View>
      </View>
      <Button
        style={styles.btnAdd}
        status="basic"
        size="tiny"
        children={t("add").toString()}
        accessoryRight={<Icon pack="assets" name="add16" />}
      />
    </Layout>
  );
});

export default WorkSpacePlace;

const themedStyles = StyleService.create({
  item: {
    marginBottom: 24,
    borderRadius: 16,
    alignSelf: "center",
  },
  img: {
    marginRight: 16,
    marginVertical: 8,
    marginLeft: 8,
    borderRadius: 12,
  },
  location: {
    marginVertical: 8,
  },
  btnAdd: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginRight: 4,
  },
  iconRate: {
    width: 16,
    height: 16,
    tintColor: "text-warning-color",
  },
  distance: {
    marginRight: 16,
  },
  iconCareTeam: {
    width: 16,
    height: 16,
  },

  wishlist: {
    width: 16,
    height: 16,
    alignSelf: "center",
    tintColor: "text-white-color",
  },
});
