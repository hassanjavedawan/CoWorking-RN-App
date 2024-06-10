import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import SliderDistance from "./SliderDistance";
import CardHightLight from "screens/account/JobInformation/CardHighLight";
import Amenties from "./Amenties";
import Facilities from "./Facilities";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import CheckCustom from "./CheckCustom";

const FilterNear = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const { t } = useTranslation(["filter", "common"]);
  const styles = useStyleSheet(themedStyles);
  const [verified, setVerified] = React.useState(true);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction marginBottom={8} />}
        title={<Text uppercase>Filter</Text>}
      />
      <Content level="2" contentContainerStyle={styles.content} padder>
        <Text category="h6" marginBottom={24}>
          {t("distance")} ({t("mile")})
        </Text>
        <SliderDistance />
        <Text category="h6" marginTop={48} marginBottom={16}>
          {t("lookingFor")}
        </Text>
        <View style={globalStyle.flexDirection}>
          {Data_Tag.map((item, index) => {
            return (
              <CardHightLight item={item} key={index} onPress={() => {}} />
            );
          })}
        </View>

        <Amenties />
        <Facilities />
        <Text category="h6" marginTop={48} marginBottom={26}>
          {t("common:other")}
        </Text>
        <TouchableOpacity
          style={globalStyle.flexSpaceBetween}
          onPress={() => setVerified(!verified)}
        >
          <Text category={verified ? "h8-s" : "h8-p"}>
            {t("common:verified")}
          </Text>
          <CheckCustom checked={verified} />
        </TouchableOpacity>
      </Content>
      <Layout style={[styles.bottom, { bottom: bottom + 4 }]}>
        <Text category="h8-p" center status="body">
          {t("common:resetAll")}
        </Text>
        <Button
          children={t("show20Space").toString()}
          status="basic"
          size="giant"
          style={styles.showBtn}
          onPress={() => {
            navigate("HomeNavigator", { screen: "NearestMapView" });
          }}
        />
      </Layout>
    </Container>
  );
});

export default FilterNear;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 40,
    paddingBottom: 120,
  },
  bottom: {
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 24,
    paddingLeft: 32,
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  showBtn: {
    marginTop: 16,
  },
});

const Data_Tag = [
  { id: 0, title: "Desk", isChoose: false },
  { id: 1, title: "Private Office", isChoose: false },
  { id: 2, title: "Meeting Room", isChoose: true },
];
