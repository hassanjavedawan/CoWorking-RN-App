import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BookSpaceStackParamList, RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const PaymentTickets = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(["payment", "event"]);
  const [numberTicket, setNumberTicket] = React.useState<number>(1);
  let priceTicket = 25;
  const onMinus = React.useCallback(() => {
    setNumberTicket(numberTicket - 1);
  }, [numberTicket, setNumberTicket]);
  const onPlus = React.useCallback(() => {
    setNumberTicket(numberTicket + 1);
  }, [numberTicket, setNumberTicket]);
  const onPurchase = React.useCallback(() => {
    return navigate("BookSpaceNavigator", {
      screen: "SelectCard",
      /* @ts-ignore */ 
      params: { type: "event" },
    });
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction status="primary" icon="back" />}
        title={
          <Text category="h8-s" uppercase>
            {t("title")}
          </Text>
        }
      />
      <Content level="2" padder contentContainerStyle={styles.content}>
        <Layout style={styles.item}>
          <Image
            source={Images.bg01}
            style={[
              /* @ts-ignore */
              styles.image,
              { width: 311 * (width / 375), height: 160 * (width / 375) },
            ]}
          />
          <View style={styles.title}>
            <View style={globalStyle.flexSpaceBetween}>
              <Text category="h9-s">Workshop</Text>
              <Text category="h9-s">$25</Text>
            </View>
            <Text category="h7" marginBottom={9}>
              Exploring the Evolution of UX - New York Perspective
            </Text>
            <View style={globalStyle.flexDirection}>
              <Icon pack="assets" name="calendar16" style={styles.calendar} />
              <Text category="h9-s" status="body">
                Tue, 21 Apr
              </Text>
              <Text marginHorizontal={8} marginTop={-2} category="h9-s">
                .
              </Text>
              <Text category="h9-s" status="body">
                4:40 PM - 7:00 PM
              </Text>
            </View>
            <Layout level="2" style={styles.line} />
            <Text category="h8-p" marginBottom={6}>
              {t("buyTicketFor")}
            </Text>
            <View style={globalStyle.flexSpaceBetween}>
              <Text category="h4" marginBottom={32}>
                {numberTicket} {numberTicket <= 1 ? "Person" : "People"}
              </Text>
              <View style={globalStyle.flexDirection}>
                <NavigationAction
                  icon="minus"
                  marginRight={16}
                  disabled={numberTicket === 1}
                  onPress={onMinus}
                />
                <NavigationAction icon="plus" onPress={onPlus} />
              </View>
            </View>
            <Button
              children={`${t("event:purchase")} - $${25 * numberTicket}`}
              status="basic"
              size="giant"
              onPress={onPurchase}
            />
          </View>
        </Layout>
      </Content>
    </Container>
  );
});

export default PaymentTickets;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 40,
  },
  image: {
    ...globalStyle.topBorder16,
    marginBottom: 16,
  },
  item: {
    borderRadius: 16,
    paddingBottom: 32,
  },
  calendar: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginRight: 6,
    marginTop: -2,
  },
  line: {
    marginTop: 24,
    marginBottom: 32,
    height: 1,
  },
  title: {
    marginHorizontal: 32,
  },
});
