import React, { memo } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

import Text from "./Text";
import Container from "./Container";

import { Images } from "assets/images";
import useAppTheme from "hooks/useAppTheme";
import { SuccessScreenType } from "constants/Types";
import { globalStyle } from "styles/globalStyle";
import useLayout from "hooks/useLayout";

const NotificationScreen = memo(
  ({
    image,
    title,
    description,
    children,
    buttonStyle,
    buttonsViewStyle,
  }: SuccessScreenType) => {
    const styles = useStyleSheet(themedStyles);
    const { height } = useLayout();
    const theme = useTheme();
    return (
      <Container style={[styles.container, globalStyle.padH32]}>
        <View style={[styles.top, { marginTop: 120 * (height / 812) }]}>
          <Image
            /* @ts-ignore */
            style={styles.image}
            source={image ? image : Images.success}
          />
          <Text marginTop={40} center category="h6" status="black">
            {title}
          </Text>
          <Text category="h8-p" status="body" marginTop={16} center>
            {description}
          </Text>
        </View>
        <View style={[styles.bottom, buttonsViewStyle]}>
          {!!children &&
            children.map((i, index: number) => {
              const { status, title, onPress } = i;
              return (
                <TouchableOpacity
                  style={[
                    styles.button,
                    buttonStyle,
                    {
                      backgroundColor:
                        status === "primary"
                          ? theme["color-isabel-line-100"]
                          : theme["color-main-100"],
                    },
                  ]}
                  key={index}
                  onPress={onPress}
                >
                  <Text
                    center
                    marginVertical={16}
                    marginHorizontal={32}
                    status={status === "basic" ? "white" : "black"}
                    children={title}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </Container>
    );
  }
);

export default NotificationScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  top: {
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  bottom: {
    justifyContent: "flex-start",
  },
  button: {
    marginTop: 24,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "color-main-100",
  },
});
