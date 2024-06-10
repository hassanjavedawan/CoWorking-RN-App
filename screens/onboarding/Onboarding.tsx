import React, { memo } from "react";
import { View, Image, ScrollView } from "react-native";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import { globalStyle } from "styles/globalStyle";
import { Images } from "assets/images";
import { RootStackParamList } from "navigation/types";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Dots from "components/Dots";
import { useTranslation } from "react-i18next";

const Onboarding = memo(() => {
  const { width, height } = useLayout();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const scrollRef = useAnimatedRef<ScrollView>();
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const { t } = useTranslation(["intro", "common"]);

  const data = [
    {
      id: 0,
      image: Images.boarding01,
      title: t("title1"),
    },
    {
      id: 1,
      image: Images.boarding02,
      title: t("title2"),
    },
    {
      id: 2,
      image: Images.boarding03,
      title: t("title3"),
    },
    {
      id: 3,
      image: Images.boarding04,
      title: t("title4"),
    },
  ];
  const handleLoginIn = React.useCallback(() => {
    /* @ts-ignore */
    navigate("Account", { screen: "Auth", params: { initialIndex: 0 } });
  }, []);
  const handleRegister = React.useCallback(() => {
    /* @ts-ignore */
    navigate("Account", { screen: "Auth", params: { initialIndex: 1 } });
  }, []);

  return (
    <Container style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef as any}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={width}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
        onScroll={scrollHandler}
        style={{ width: width }}
        contentContainerStyle={{ width: width * 4 }}
      >
        {data.map((i, index) => {
          return (
            <View style={{ width: width }} key={index}>
              <Image
                source={i.image}
                style={{ width: width, height: 484 * (height / 812) }}
              />
              <Text category="h6" center marginHorizontal={32} marginTop={40}>
                {i.title}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>
      <Dots data={data} translationValue={translationX} style={styles.dot} />
      <View style={[globalStyle.flexSpaceBetween, styles.bottomView]}>
        <Button
          children={t("common:login").toString()}
          style={globalStyle.flexOne}
          size="giant"
          onPress={handleLoginIn}
        />
        <Button
          children={t("common:register").toString()}
          status="basic"
          style={[globalStyle.flexOne, styles.register]}
          size="giant"
          onPress={handleRegister}
        />
      </View>
    </Container>
  );
});

export default Onboarding;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: "center",
  },
  bottomView: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  dot: {
    marginBottom: 76,
  },
  register: {
    marginLeft: 24,
  },
});
