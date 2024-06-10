import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  icon: string;
  marginTop?: number;
  marginBottom?: number;
}
interface HeaderProps {
  type: string;
  location: string;
  people: number;
  time: string;
  date: string;
}
const HeaderResult = ({ time, type, date, people, location }: HeaderProps) => {
  const { t } = useTranslation(["spaceResult", "common"]);
  const styles = useStyleSheet(themedStyles);
  const Item = React.useCallback(
    ({ title, icon, marginTop, marginBottom }: Props) => {
      return (
        <View
          style={[
            globalStyle.flexDirection,
            { marginTop: marginTop, marginBottom: marginBottom },
          ]}
        >
          <Icon pack="assets" name={icon} style={styles.icon} />
          <Text status="body" category="h9-s">
            {title}
          </Text>
        </View>
      );
    },
    []
  );
  return (
    <Layout style={styles.title} level="1">
      <View style={globalStyle.flexSpaceBetween}>
        <View style={globalStyle.flexDirection}>
          <Text category="h8-p">{t("bookMeA")}</Text>
          <Text category="h7">{type}</Text>
        </View>
        <TouchableOpacity
          style={[globalStyle.flexDirection, globalStyle.itemsCenter]}
        >
          <Text category="h8-p" status="main" marginRight={5}>
            {t("common:change")}
          </Text>
          <Icon pack="assets" name="edit16" style={styles.edit} />
        </TouchableOpacity>
      </View>
      <View style={globalStyle.flexSpaceBetween}>
        <View>
          <Item title={location} icon="pinMap" marginTop={12} />
          <Item title={date} icon="calendar" marginTop={14} />
        </View>
        <View>
          <Item title={`${people} peoples`} icon="seat" marginTop={12} />
          <Item title={time} icon="time" marginTop={14} />
        </View>
      </View>
    </Layout>
  );
};

export default HeaderResult;

const themedStyles = StyleService.create({
  title: {
    paddingTop: 16,
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  icon: {
    tintColor: "text-platinum-color",
    width: 16,
    height: 16,
    marginRight: 4,
  },
  edit: {
    width: 16,
    height: 16,
    tintColor: "text-main-color",
  },
});
