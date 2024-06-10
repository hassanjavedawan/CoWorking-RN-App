import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import SliderDistance from "screens/home/SpaceNearest/FilterNear/SliderDistance";
import CardHightLight from "screens/account/JobInformation/CardHighLight";
import { useTranslation } from "react-i18next";

const FilterMapEvent = memo(() => {
  const { t } = useTranslation(["event", "filter", "common"]);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [isPaid, setIsPaid] = React.useState(true);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction marginBottom={8} />}
        title={<Text category="h8-s" uppercase children="FILTER" />}
      />
      <Content level="2" padder contentContainerStyle={styles.content}>
        <Text category="h6" marginBottom={18}>
          {t("filter:distance")} ({t("filter:mile")})
        </Text>
        <SliderDistance />
        <Text marginTop={40} marginBottom={16} category="h6">
          {t("when")}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Data_When.map((item, index) => {
            return <CardHightLight item={item} key={index} />;
          })}
        </View>
        <Text marginTop={48} marginBottom={16} category="h6">
          {t("category")}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Data_Category.map((item, index) => {
            return <CardHightLight item={item} key={index} />;
          })}
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text category="h8-p" lineHeight={16} marginTop={24} status="main">
            {t("common:showAll")} {t("categories")}
          </Text>
        </TouchableOpacity>
        <Text marginBottom={16} marginTop={48} category="h6">
          {t("format")}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Data_Format.map((item, index) => {
            return <CardHightLight item={item} key={index} />;
          })}
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text category="h8-p" lineHeight={16} marginTop={24} status="main">
            {t("common:showAll")} {t("formats")}
          </Text>
        </TouchableOpacity>
        <Text marginBottom={16} marginTop={48} category="h6">
          {t("format")}
        </Text>
        <View style={globalStyle.flexDirection}>
          <CardHightLight item={{ title: "Paid", isChoose: isPaid, id: 0 }} />
          <CardHightLight item={{ title: "Free", isChoose: !isPaid, id: 1 }} />
        </View>
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 4 }]}>
        <TouchableOpacity>
          <Text category="h8-p" lineHeight={16} status="body">
            {t("common:resetAll")}
          </Text>
        </TouchableOpacity>
        <Button
          children="Show 20+ Events"
          status="basic"
          size="giant"
          onPress={goBack}
        />
      </Layout>
    </Container>
  );
});

export default FilterMapEvent;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 40,
    paddingBottom: 160,
  },
  bottom: {
    paddingTop: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    ...globalStyle.flexSpaceBetween,
    ...globalStyle.topBorder24,
    alignItems: "center",
    paddingHorizontal: 32,
  },
});
const Data_When = [
  { id: 0, title: "Today", isChoose: false },
  { id: 1, title: "Tomorrow", isChoose: false },
  { id: 2, title: "This weekend", isChoose: true },
  { id: 3, title: "This week", isChoose: false },
  { id: 4, title: "Next week", isChoose: false },
  { id: 5, title: "This month", isChoose: false },
  { id: 6, title: "Next month", isChoose: false },
  { id: 7, title: "Pick a date...", isChoose: false },
];
const Data_Category = [
  { id: 0, title: "Business", isChoose: false },
  { id: 1, title: "Food & Drink", isChoose: false },
  { id: 2, title: "Community", isChoose: true },
  { id: 3, title: "Health", isChoose: false },
  { id: 4, title: "Music", isChoose: false },
  { id: 5, title: "Auto, Boat & Air", isChoose: false },
  { id: 6, title: "Charity & Causes", isChoose: false },
  { id: 7, title: "Fashion", isChoose: false },
];
const Data_Format = [
  { id: 0, title: "Class", isChoose: false },
  { id: 1, title: "Conference", isChoose: false },
  { id: 2, title: "Workshop", isChoose: true },
  { id: 3, title: "Festival", isChoose: false },
  { id: 4, title: "Music", isChoose: true },
];
