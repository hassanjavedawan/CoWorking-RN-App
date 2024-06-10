import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import CardHightLight from "screens/account/JobInformation/CardHighLight";
import ModalPanel from "components/ModalPanel";
import useModalize from "hooks/useModalize";
import LocationItem from "./LocationItem";
import { RootStackParamList } from "navigation/types";

const PreviewPost = memo(() => {
  const { goBack, navigate } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { modalizeRef, open, close } = useModalize();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const editDetails = React.useCallback(() => {
    goBack();
    goBack();
  }, []);
  const editSkill = React.useCallback(() => {
    goBack();
  }, []);
  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        accessoryLeft={
          <NavigationAction
            marginBottom={8}
            backgroundColor={theme["background-basic-color-5"]}
          />
        }
      />
      <Content padder>
        <Text category="h5" marginTop={8} marginBottom={32}>
          Hire for a Project
        </Text>
        <View style={globalStyle.flexSpaceBetween}>
          <Text category="h6">Details</Text>
          <TouchableOpacity style={styles.editButton} onPress={editDetails}>
            <Text category="h8-p" status="main">
              Edit
            </Text>
            <Icon pack="assets" name="edit16" style={styles.iconEdit} />
          </TouchableOpacity>
        </View>
        <Text category="h7-p" marginTop={16} marginBottom={48}>
          I need someone to write a web post about an air conditioning business.
          It is pretty easy. It is 1300 words. The tone should be professional
          but casual. More information is attached.
        </Text>
        <View style={globalStyle.flexSpaceBetween}>
          <Text category="h6">Skills</Text>
          <TouchableOpacity style={styles.editButton} onPress={editSkill}>
            <Text category="h8-p" status="main">
              Edit
            </Text>
            <Icon pack="assets" name="edit16" style={styles.iconEdit} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardView}>
          {Data_Skill.map((item, index) => {
            return <CardHightLight item={item} key={index} />;
          })}
        </View>
      </Content>
      <Layout style={[styles.fitBottom, { paddingBottom: bottom + 4 }]}>
        <Button
          children="Post Now"
          size="giant"
          status="basic"
          onPress={open}
        />
      </Layout>
      <ModalPanel title="Location" ref={modalizeRef}>
        <Content padder>
          <Text category="h8-p" status="body" marginBottom={40}>
            Choose who your post will be share with
          </Text>
          <LocationItem
            location="Nearby Buildings"
            description="2,318 members may be able to help"
            icon="nearest"
            color={theme["color-main-100"]}
            onPress={() =>
              navigate("CommunityNavigator", { screen: "PostDetails" })
            }
          />
          <LocationItem
            location="CoLab by DVORA"
            description="28 members may be able to help"
            icon="building"
            color={theme["color-malachite-100"]}
            onPress={() =>
              navigate("CommunityNavigator", { screen: "PostDetails" })
            }
          />
          <LocationItem
            location="New York City"
            description="24,976 members may be able to help"
            icon="pinMap"
            color={theme["color-primary-100"]}
            onPress={() =>
              navigate("CommunityNavigator", { screen: "PostDetails" })
            }
          />
          <LocationItem
            location="Global Community"
            description="232,518 members may be able to help"
            icon="website"
            color={theme["color-blue-100"]}
            onPress={() =>
              navigate("CommunityNavigator", { screen: "PostDetails" })
            }
          />
          <LocationItem
            location="Choose Location"
            description="Search…"
            icon="search"
            color={theme["color-orange-100"]}
          />
        </Content>
      </ModalPanel>
    </Container>
  );
});

export default PreviewPost;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconEdit: {
    width: 16,
    height: 16,
    tintColor: "text-main-color",
    marginLeft: 5,
  },
  cardView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
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
];
