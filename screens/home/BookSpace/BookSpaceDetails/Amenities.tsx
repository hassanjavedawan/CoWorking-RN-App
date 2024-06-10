import React from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import NameTag from "./NameTag";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  title: string;
  data: string[];
}
interface DataProps {
  data: Props[];
}

const Amenities = ({ data }: DataProps) => {
  const { t } = useTranslation(["amenities", "facilities"]);
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const dataAmenities = [
    {
      id: 0,
      title: t("classicBasic"),
      data: [t("wifi"), t("airConditioning"), t("heating")],
    },
    {
      id: 1,
      title: t("seating"),
      data: [t("standingDesks"), t("ergonomicChairs")],
    },
    {
      id: 2,
      title: t("equipment"),
      data: [
        t("printer"),
        t("scanner"),
        t("photocopier"),
        t("projector"),
        t("appleTV"),
        t("microphone"),
      ],
    },
    {
      id: 3,
      title: t("facilities:title"),
      data: [
        t("facilities:kitchen"),
        t("facilities:skyRoom"),
        t("facilities:personalLock"),
        t("facilities:phoneBooth"),
        t("facilities:eventForRent"),
      ],
    },
    {
      id: 4,
      title: t("facilities:coolStuff"),
      data: [
        t("facilities:kitchen"),
        t("facilities:skyRoom"),
        t("facilities:personalLock"),
        t("facilities:phoneBooth"),
        t("facilities:eventForRent"),
      ],
    },
  ];
  return (
    <Content
      style={styles.contentAmenities}
      showsVerticalScrollIndicator={false}
    >
      {data.map((item, i) => {
        return (
          <View key={i}>
            <Text category="h7" marginBottom={24}>
              {item.title}
            </Text>
            <View style={styles.content}>
              {item.data.map((item) => {
                return (
                  <NameTag
                    key={item}
                    children={item}
                    widthItem={(width - 64) / 2}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </Content>
  );
};

export default Amenities;

const themedStyles = StyleService.create({
  contentAmenities: {
    paddingHorizontal: 32,
    marginTop: 32,
    paddingBottom: 40,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
