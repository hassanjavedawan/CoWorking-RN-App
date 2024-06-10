import React, { memo } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Input,
  Layout,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { RootStackParamList, WritePostNavigationProp } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import useKeyboard from "hooks/useKeyboard";
import { useTranslation } from "react-i18next";

const WritePost = memo(() => {
  const { t } = useTranslation(["community", "common"]);
  const { goBack, navigate } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<WritePostNavigationProp>();
  const { height: keyboardHeight } = useKeyboard();
  const [writePost, setWritePost] = React.useState("");
  return (
    <Container style={styles.container} level="5">
      <TopNavigation
        appearance="control"
        accessoryLeft={<NavigationAction status="basic" marginBottom={8} />}
        accessoryRight={
          <Text
            status="main"
            category="h8"
            lineHeight={20.5}
            onPress={() =>
              navigate("CommunityNavigator", { screen: "AddSkillPost" })
            }
          >
            {t("common:next")}
          </Text>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Text marginLeft={32} marginBottom={16} category="h5">
          {route.params.title}
        </Text>
        <Icon pack="assets" name="quote" style={styles.quote} />
        <Input
          autoFocus
          placeholder="Write your post here..."
          style={[styles.input]}
          value={writePost}
          status="outline"
          textStyle={styles.textStyleInput}
          size="outline"
          maxLength={300}
          onChangeText={(value) => {
            setWritePost(value);
          }}
          multiline={true}
        />
      </Content>
      <Animated.View
        style={[
          {
            bottom: Animated.subtract(keyboardHeight, bottom),
          },
        ]}
      >
        <Layout style={[styles.inputBar, { paddingBottom: bottom }]}>
          <View style={globalStyle.flexDirection}>
            <TouchableOpacity>
              <Icon
                pack="assets"
                name="cameraBlack"
                style={styles.iconInputBar}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                pack="assets"
                name="photoLibrary"
                style={styles.iconInputBar}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon pack="assets" name="attach" style={styles.iconInputBar} />
            </TouchableOpacity>
          </View>
          <Text category="h9-s" status="body">
            {writePost.length}/300
          </Text>
        </Layout>
      </Animated.View>
    </Container>
  );
});

export default WritePost;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 8,
  },
  textStyleInput: {
    fontSize: 16,
    fontFamily: "Avenir-Heavy",
    lineHeight: 28,
    fontWeight: "500",
  },
  quote: {
    width: 24,
    height: 24,
    tintColor: "text-platinum-color",
    marginLeft: 32,
  },
  inputBar: {
    ...globalStyle.flexSpaceBetween,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    marginLeft: 8,
  },
  iconInputBar: {
    width: 24,
    height: 24,
    tintColor: "color-main-100",
    marginRight: 24,
  },
});
