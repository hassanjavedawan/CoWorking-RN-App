import React, { memo } from "react";
import { Image } from "react-native";
import {
  StyleService,
  useStyleSheet,
  ViewPager,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import TabBarAnimation from "components/TabBarAnimation";
import Login from "./Login";
import Register from "./Register";
import { Images } from "assets/images";
import { useRoute } from "@react-navigation/native";
import { AuthScreenNavigationProps } from "navigation/types";
import { useTranslation } from "react-i18next";
const Auth = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<AuthScreenNavigationProps>();
  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    0 || route?.params?.initialIndex
  );
  const { t } = useTranslation("auth");
  return (
    <Container style={styles.container}>
      <Image
        source={selectedIndex === 0 ? Images.bgAuth : Images.bgRegister}
        style={[globalStyle.absolute, { width: width, height: height / 5 }]}
      />
      <Layout
        style={[
          globalStyle.topBorder28,
          globalStyle.flexOne,
          { marginTop: 83 * (height / 812) },
        ]}
      >
        <TabBarAnimation
          data={["Log in", "register"]}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          style={styles.tabBar}
        />
        <ViewPager
          shouldLoadComponent={(index) => index === selectedIndex}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          style={globalStyle.flexOne}
          swipeEnabled={false}
        >
          <Login />
          <Register />
        </ViewPager>
        {selectedIndex === 1 ? (
          <Layout style={[globalStyle.fitBottom, globalStyle.padH32]}>
            <Text category="h8-p" status="body" center>
              {t("caption1")}
              <Text category="h8-p" status="body" underline>
                {t("caption2")}
              </Text>
              {t("caption3")}
              <Text category="h8-p" status="body" underline>
                {t('caption4')}
              </Text>
            </Text>
          </Layout>
        ) : null}
      </Layout>
    </Container>
  );
});

export default Auth;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    marginHorizontal: 32,
    marginTop: 32,
    marginBottom: 8,
  },
});
