import { Icon, useTheme } from "@ui-kitten/components";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  ActionsProps,
  InputToolbarProps,
  ComposerProps,
  SendProps,
} from "react-native-gifted-chat";

export const renderInputToolbar = (props: InputToolbarProps) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: "#222B45",
      paddingTop: 6,
    }}
    primaryStyle={{ alignItems: "center" }}
  />
);
export const RenderActions = () => {
  const theme = useTheme();
  
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 16,
        marginBottom: 12,
      }}
    >
      <TouchableOpacity>
        <Icon
          pack="assets"
          name="cameraBlack"
          style={{ tintColor: theme["text-main-color"] }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          pack="assets"
          name="photoLibrary"
          style={{
            tintColor: theme["text-main-color"],
            marginHorizontal: 12,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          pack="assets"
          name="attach"
          style={{ tintColor: theme["text-main-color"], marginRight: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const renderComposer = (props: ComposerProps) => (
  <Composer
    {...props}
    textInputStyle={{
      color: "#222B45",
      backgroundColor: "#EDF1F7",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#E4E9F2",
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = (props: any) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    }}
  >
    <Image
      style={{ width: 32, height: 32 }}
      source={{
        uri: "https://placeimg.com/32/32/any",
      }}
    />
  </Send>
);
