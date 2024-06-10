import React, { memo } from "react";
import { TouchableOpacity, Animated } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CommunityPost from "./CommunityPost";
import useKeyboard from "hooks/useKeyboard";

const PostDetails = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { height: keyboardHeight } = useKeyboard();

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        accessoryRight={
          <NavigationAction
            marginBottom={8}
            icon="option"
            backgroundColor={theme["background-basic-color-5"]}
          />
        }
        accessoryLeft={
          <NavigationAction
            marginBottom={8}
            backgroundColor={theme["background-basic-color-5"]}
          />
        }
      />
      <Content contentContainerStyle={styles.content} padder>
        <CommunityPost
          userName="Isaac Castillo"
          avatar={Images.avatar}
          userJob="UX Designer"
          time="1m"
          titlePost="Hire for a Project"
          descriptionPost="I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached."
          shareStatus="Shared with members in CoLab by DVORA"
          likeNumber={0}
          commentNumber={0}
        />
      </Content>
      <Animated.View
        style={[
          {
            bottom: Animated.subtract(keyboardHeight, bottom),
          },
        ]}
      >
        <Layout style={styles.inputBar}>
          <Input
            style={{ paddingBottom: bottom + 24 }}
            size="outline"
            status="outline"
            multiline={true}
            placeholder="Write a response…"
            accessoryRight={
              <TouchableOpacity>
                <Icon pack="assets" name="send" style={styles.iconSend} />
              </TouchableOpacity>
            }
          />
        </Layout>
      </Animated.View>
    </Container>
  );
});

export default PostDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 24,
  },
  iconSend: {
    tintColor: "text-main-color",
  },
  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
