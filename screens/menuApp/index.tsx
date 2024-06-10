import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import MenuItem from "components/MenuItem";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "navigation/types";

const MenuApp = memo(() => {
  const { t } = useTranslation("common");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <Image
        source={Images.bgHome}
        style={{ width: 296 * (width / 375), alignSelf: "flex-end" }}
      />

      <Content
        level="2"
        style={[
          styles.content,
          {
            width: 296 * (width / 375),
          },
        ]}
        padder
      >
        <MenuItem
          title={t("paymentMethod")}
          icon="project"
          color={theme["color-malachite-100"]}
        />
        <MenuItem
          title={t("support")}
          icon="comment"
          color={theme["color-primary-100"]}
        />
        <MenuItem title="FAQ" icon="help" color={theme["color-orange-100"]} />
        <MenuItem
          title={t("setting")}
          icon="setting"
          color={theme["color-main-100"]}
        />
        <TouchableOpacity
          onPress={() => navigate("Profile", { screen: "ProfileScreen" })}
          style={[globalStyle.center, { marginTop: 56 * (width / 375) }]}
        >
          <Avatar source={Images.avatar} size={"medium"} />
          <Text center category="h7" marginTop={8} marginBottom={4}>
            Isaac Castillo
          </Text>
          <Text center category="h8-p" lineHeight={16} status="body">
            UX Designer
          </Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
});

export default MenuApp;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 31, 32, 0.85)",
  },
  content: {
    paddingTop: 48,
    alignSelf: "flex-end",
  },
});
