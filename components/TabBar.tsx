import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Icon, useTheme } from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import { isEmpty } from "lodash";

interface Props {
  id: number;
  icon?: string;
  title: string;
}
interface TabBarProps {
  tabs?: Props[];
  tabString?: string[];
  level?: string;
  style?: StyleProp<ViewStyle>;
  styleBtn?: StyleProp<ViewStyle>;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBar = ({
  style,
  tabString = [],
  activeIndex,
  onChange,
  tabs = [],
  styleBtn,
}: TabBarProps) => {
  const theme = useTheme();
  const AniButton = Animated.createAnimatedComponent(TouchableOpacity);
  const { width } = useLayout();
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeIndex]
  );
  const refScrollView = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 100 + 8 - (width - 100) / 2,
      animated: true,
    });
  }, [activeIndex]);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={refScrollView}
    >
      {isEmpty(tabs)
        ? null
        : tabs.map((item, i) => {
            return (
              <AniButton
                onLayout={(event) => event.nativeEvent.layout.width}
                key={i}
                style={[
                  styles.btn,
                  globalStyle.flexDirection,
                  {
                    borderBottomColor:
                      activeIndex === i
                        ? theme["text-main-color"]
                        : "transparent",
                  },
                  styleBtn,
                ]}
                onPress={() => changeIndex(i)}
                activeOpacity={0.7}
              >
                {item.icon ? (
                  <Icon
                    pack="assets"
                    name={item.icon}
                    style={[
                      styles.icon,
                      {
                        tintColor:
                          activeIndex === i
                            ? theme["text-main-color"]
                            : theme["text-platinum-color"],
                      },
                    ]}
                  />
                ) : null}
                <Text
                  uppercase
                  category="h9"
                  center
                  status={activeIndex === i ? "main" : "body"}
                >
                  {item.title}
                </Text>
              </AniButton>
            );
          })}
      {isEmpty(tabString)
        ? null
        : tabString.map((item, i) => {
            return (
              <AniButton
                onLayout={(event) => event.nativeEvent.layout.width}
                key={i}
                style={[
                  styles.btn,
                  globalStyle.flexDirection,
                  {
                    borderBottomColor:
                      activeIndex === i
                        ? theme["text-main-color"]
                        : "transparent",
                  },
                  styleBtn,
                ]}
                onPress={() => changeIndex(i)}
                activeOpacity={0.7}
              >
                <Text
                  uppercase
                  category="h9"
                  center
                  status={activeIndex === i ? "main" : "body"}
                >
                  {item}
                </Text>
              </AniButton>
            );
          })}
    </ScrollView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  boxAni: {
    height: 2,
    position: "absolute",
    bottom: 0,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    paddingTop: 16,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
});
