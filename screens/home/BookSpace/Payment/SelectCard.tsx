import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import CardPayment from "components/CardPayment";
import { Category_Card_Types_Enum } from "constants/Types";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList, SelectCardNavigationProp } from "navigation/types";
import { isEmpty } from "lodash";
import { View, Image } from "react-native";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";

const SelectCard = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isContinue, setContinue] = React.useState(false);
  const [data, setData] = React.useState(DATA);
  const { t } = useTranslation(["payment", "auth"]);
  const route = useRoute<SelectCardNavigationProp>();
  const TYPE = route.params.type;
  React.useEffect(() => {
    if (selectedIndex !== 0) {
      setContinue(false);
    } else setContinue(true);
  }, [selectedIndex]);
  const onSelect = React.useCallback((num) => {
    setSelectedIndex(num);
  }, []);
  const handlePayNowEvent = React.useCallback(() => {
    navigate("SuccessScr", {
      data: {
        title: t("payDoneTitle"),
        description: t("payDoneDes"),
        children: [
          {
            title: t("auth:goHomePage"),
            onPress: () => {
              navigate("Main", { screen: "HomeStack" });
            },
            status: "basic",
          },
        ],
      },
    });
  }, []);
  const handlePayNowSpace = React.useCallback(() => {
    navigate("SuccessScr", {
      data: {
        title: t("payDoneTitle1"),
        description: t("payDoneDes1"),
        children: [
          {
            title: t("auth:goHomePage"),
            onPress: () => {
              navigate("Main", { screen: "HomeStack" });
            },
            status: "basic",
          },
        ],
      },
    });
  }, []);

  const handleAddCreditCard = React.useCallback(() => {
    navigate("BookSpaceNavigator", { screen: "NewCard" });
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="back" status="primary" />}
        title={
          <Text category={"h8"} lineHeight={20} uppercase>
            {t("selectCard")}
          </Text>
        }
      />
      <Content contentContainerStyle={styles.content} level="2" padder>
        {isEmpty(data) ? (
          <Layout level="2" style={styles.empty}>
            <Image source={Images.noCard} />
            <Text category="h6" center marginTop={40} marginBottom={16}>
              {t("emptyTitle")}
            </Text>
            <Text category="h8-p" center marginBottom={32}>
              {t("emptyDes")}
            </Text>
            <Button
              children="Add Credit Card"
              size="giant"
              status="basic"
              onPress={handleAddCreditCard}
            />
          </Layout>
        ) : (
          <View>
            <CardPayment
              data={data[0].data}
              onChoose={() => onSelect(1)}
              checked={selectedIndex === 1}
            />
            <CardPayment
              data={data[1].data}
              onChoose={() => onSelect(2)}
              checked={selectedIndex === 2}
            />
            <CardPayment
              data={data[2].data}
              onChoose={() => onSelect(3)}
              checked={selectedIndex === 3}
            />
            <CardPayment
              data={data[3].data}
              onChoose={() => onSelect(4)}
              checked={selectedIndex === 4}
            />
          </View>
        )}
      </Content>
      {isEmpty(data) ? null : (
        <Layout style={[styles.bottom, { paddingBottom: bottom + 4 }]}>
          <Button
            disabled={isContinue}
            children={t("payNow").toString()}
            status="basic"
            size="giant"
            onPress={
              TYPE === "bookSpace" ? handlePayNowSpace : handlePayNowEvent
            }
            accessoryLeft={<Icon pack="assets" name="security" />}
          />
        </Layout>
      )}
    </Container>
  );
});

export default SelectCard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingVertical: 40,
  },
  bottom: {
    ...globalStyle.topBorder24,
    ...globalStyle.fitBottom,
    paddingTop: 16,
    paddingHorizontal: 32,
  },
});
const DATA = [
  { id: 0, data: { cardNumber: 5689, type: Category_Card_Types_Enum.Master } },
  { id: 1, data: { cardNumber: 6497, type: Category_Card_Types_Enum.Visa } },
  { id: 2, data: { cardNumber: 8973, type: Category_Card_Types_Enum.Master } },
  {
    id: 3,
    data: { cardNumber: 8973, type: Category_Card_Types_Enum.AmericanExpress },
  },
];
