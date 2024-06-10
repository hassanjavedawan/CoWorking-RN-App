import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import { ChatDetailsNavigationProp } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import {
  Bubble,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  Message,
  Send,
  SendProps,
} from "react-native-gifted-chat";
import { RenderActions } from "./InputTool";

const ChatScreen = memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<ChatDetailsNavigationProp>();
  const { user } = route.params;
  const [messages, setMessages] = React.useState<IMessage[]>();
  React.useEffect(() => {
    setMessages([
      {
        _id: 0,
        text: "At King Coffee after lunch",
        createdAt: new Date(),
        user: {
          _id: 3,
          /* @ts-ignore */
          avatar: user?.avatar,
        },
      },
      {
        _id: 1,
        text: "Of course, where shall we meet?",
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      },
      {
        _id: 2,
        createdAt: new Date(),
        text: "Me too, will you meet me tomorrow?",
        user: {
          _id: 2,
          /* @ts-ignore */
          avatar: user?.avatar,
        },
      },
    ]);
  }, []);
  const renderInputToolbar = React.useCallback((props) => {
    return <InputToolbar {...props} containerStyle={globalStyle.flexOne} />;
  }, []);
  const onSend = React.useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );
  const renderBubble = React.useCallback((props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.wrapperLeftStyle,
          right: styles.wrapperRightStyle,
        }}
        textStyle={{
          left: styles.textLeftStyle,
          right: styles.textRightStyle,
        }}
      />
    );
  }, []);
  const renderMessage = React.useCallback((props) => {
    return (
      <View style={{ marginBottom: 40 }}>
        <Message
          {...props}
          containerStyle={{
            left: { marginLeft: 8 },
            right: { marginRight: 40 },
          }}
        />
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
        accessoryRight={<NavigationAction icon="option" marginBottom={8} />}
        title={<Text>{user.name}</Text>}
      />

      <GiftedChat
        user={{ _id: 1 }}
        scrollToBottom
        messages={messages}
        messagesContainerStyle={styles.contentChatView}
        onSend={(message) => onSend(message)}
        renderBubble={(props) => renderBubble(props)}
        renderMessage={(props) => renderMessage(props)}
        timeFormat={"HH:MM A"}
        renderActions={() => <RenderActions />}
        renderSend={(props) => (
          <Send alwaysShowSend {...props} containerStyle={styles.sendStyle}>
            <Icon
              pack="assets"
              name="send"
              style={{ tintColor: theme["text-main-color"] }}
            />
          </Send>
        )}
        timeTextStyle={{
          right: styles.timeTextStyle,
          left: styles.timeTextStyle,
        }}
        renderInputToolbar={(props) => renderInputToolbar(props)}
        infiniteScroll
      />
    </Container>
  );
});

export default ChatScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  timeTextStyle: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
  },
  textLeftStyle: {
    color: "text-black-color",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Avenir-Medium",
  },
  sendStyle: {
    marginBottom: 12,
    marginRight: 16,
  },
  textRightStyle: {
    color: "text-white-color",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Avenir-Medium",
  },
  wrapperLeftStyle: {
    backgroundColor: "background-basic-color-1",
    borderBottomLeftRadius: 0,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  wrapperRightStyle: {
    borderBottomRightRadius: 0,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "color-main-100",
  },
  contentChatView: {
    backgroundColor: "background-basic-color-2",
  },
});
