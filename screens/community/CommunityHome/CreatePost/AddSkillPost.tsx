import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Card from "screens/account/JobInformation/Card";
import _ from "lodash";
import CardHightLight from "screens/account/JobInformation/CardHighLight";
import useLayout from "hooks/useLayout";
import { RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const AddSkillPost = memo(() => {
  const { t } = useTranslation(["addSkill", "community"]);
  const { goBack, navigate } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [dataSkill, setDataSkill] = React.useState(Data_Skill);
  const handleRemove = React.useCallback((item, data) => {
    const arr = _.filter(data, (i) => {
      return i !== item;
    });
    setDataSkill(arr);
  }, []);
  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
      />
      <Content padder>
        <Text category="h5" marginTop={8} marginBottom={16}>
          {t("title")}
        </Text>
        <Text category="h8-p" status="body" marginBottom={24}>
          {t("description")}
        </Text>
        <Input
          placeholder="Search language..."
          accessoryRight={() => {
            return (
              <NavigationAction
                icon="plus"
                size="medium"
                status="primary"
                marginRight={-8}
              />
            );
          }}
        />
        <View style={styles.list}>
          {dataSkill.map((item, index) => {
            const onPress = () => {
              let idx = _.find(dataSkill, (i) => i.id === item.id);

              if (!!idx) {
                handleRemove(item, dataSkill);
              }
            };
            return <Card item={item} key={index} onPress={onPress} />;
          })}
        </View>
        <Text category="h8" marginTop={40} marginBottom={16}>
          {t("suggestSkill")}:
        </Text>
        <View style={styles.listSuggest}>
          {Data_Suggest.map((item, index) => {
            return <CardHightLight item={item} key={index} />;
          })}
        </View>
      </Content>
      <Layout style={[styles.fitBottom, { paddingBottom: bottom + 4 }]}>
        <Button
          children={t("community:previewPost").toString()}
          size="giant"
          status="basic"
          onPress={() =>
            navigate("CommunityNavigator", { screen: "PreviewPost" })
          }
        />
      </Layout>
    </Container>
  );
});

export default AddSkillPost;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  listSuggest: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fitBottom: {
    paddingHorizontal: 32,
    paddingTop: 16,
    ...globalStyle.topBorder24,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
const Data_Skill = [
  { id: 0, title: "UX Research", isChoose: true },
  { id: 1, title: "UX Writing", isChoose: true },
  { id: 2, title: "Collaboration", isChoose: false },
  { id: 3, title: "Logic and Reasoning", isChoose: false },
  { id: 4, title: "Wireframing and UI Prototyping", isChoose: false },
];
const Data_Suggest = [
  { id: 1, title: "Collaboration", isChoose: false },
  { id: 2, title: "Logic and Reasoning", isChoose: false },
  { id: 3, title: "Wireframing and UI Prototyping", isChoose: false },
  { id: 4, title: "Analytics", isChoose: false },
  { id: 5, title: "Appetite for Knowledge", isChoose: false },
  { id: 6, title: "User Empathy", isChoose: false },
  { id: 7, title: "Interaction Design", isChoose: false },
  { id: 8, title: "Communication Skills", isChoose: false },
  { id: 9, title: "Visual Communication", isChoose: false },
  { id: 11, title: "Curiosity", isChoose: false },
  { id: 10, title: "Storytelling and Presentation", isChoose: false },
  { id: 12, title: "Coding", isChoose: false },
];
