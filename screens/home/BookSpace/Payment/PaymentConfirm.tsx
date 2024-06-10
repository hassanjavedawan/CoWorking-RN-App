import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
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
import BookLab from "components/BookLab";
import { Images } from "assets/images";
import { BookSpaceStackParamList, RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const PaymentConfirm = memo(() => {
  const { t } = useTranslation("payment");
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const handleProceed = React.useCallback(() => {
    return navigate("BookSpaceNavigator", {
      screen: "SelectCard",
      /* @ts-ignore */
      params: { type: "bookSpace" },
    });
  }, []);

  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        style={{ paddingTop: top + 8 }}
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
        title={
          <Text category="h8" lineHeight={20} marginTop={top} uppercase>
            {t("title")}
          </Text>
        }
      />
      <Content
        padder
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
      >
        <BookLab
          nonBook={true}
          item={{
            id: 0,
            title: "The Farm Soho",
            location: "447 Broadway, NY, 10013",
            rate: 4.8,
            image: Images.workplace2,
            quantityRate: 104,
            isVerified: true,
            howFar: "0.5mil",
          }}
        />
        <Layout style={styles.ticket}>
          <View style={styles.title}>
            <Text category="h7-s">{t("totalRoom")}</Text>
            <Text category="h7-s">$224.00</Text>
          </View>
          <View style={styles.title}>
            <Text category="h7-s">{t("services")}</Text>
            <Text category="h7-s">$0.00</Text>
          </View>
          <View style={styles.title}>
            <Text category="h7-s">{t("taxes")}</Text>
            <Text category="h7-s">$0.00</Text>
          </View>
          <View style={globalStyle.flexSpaceBetween}>
            <Text category="h6">{t("total")}</Text>
            <Text category="h6">$224.00</Text>
          </View>
          <Text
            category="h9-s"
            style={globalStyle.alignSelfEnd}
            marginBottom={24}
            children={"($56/per. All tax incl.)"}
          />
          <Button
            children={t("proceed").toString()}
            status="basic"
            size={"giant"}
            onPress={handleProceed}
          />
        </Layout>
      </Content>
    </Container>
  );
});

export default PaymentConfirm;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 40,
  },
  ticket: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 16,
  },
  title: {
    ...globalStyle.flexSpaceBetween,
    marginBottom: 24,
  },
});
