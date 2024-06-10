import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Input,
  Layout,
  CheckBox,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Rate from "components/Rate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "navigation/types";

const WriteReview = memo(() => {
  const { goBack, navigate } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["review", "common"]);
  const [rate, setRate] = React.useState(0);
  const [rateAmenities, setRateAmenities] = React.useState(0);
  const [rateSocial, setRateSocial] = React.useState(0);
  const [rateComfort, setRateComfort] = React.useState(0);
  const [rateWifi, setRateWifi] = React.useState(0);
  const [rateProductive, setRateProductive] = React.useState(0);
  const [rateLocation, setRateLocation] = React.useState(0);
  const [comeAgain, setComeAgain] = React.useState(true);
  const handlePost = React.useCallback(() => {
    navigate("Main", { screen: "HomeStack" });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction marginBottom={8} />}
        accessoryRight={
          <TouchableOpacity activeOpacity={0.7} onPress={handlePost}>
            <Text status="main" category="h7" marginBottom={8}>
              {t("post")}
            </Text>
          </TouchableOpacity>
        }
      />
      <Text category="h6" marginVertical={24} marginHorizontal={32}>
        {t("whatUThink")}
      </Text>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        enableOnAndroid
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Input
          numberOfLines={10}
          status="outline"
          size="outline"
          multiline
          label={
            <View>
              <Icon pack="assets" name="quote" style={styles.quote} />
            </View>
          }
          caption={<Text marginTop={80}>{t("ruleWrite")}</Text>}
          placeholder="Tell people about your experience: the atmosphere, the WiFi, the members, any good events, etc.  "
        />
        <Layout style={styles.line} level="2" />
        <Text category="h7-p" marginBottom={16}>
          {t("rateTitle")}
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRate}
          defaultRate={rate}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Layout style={styles.line} level="2" />
        <Text category="h6" marginBottom={16}>
          {t("ratings")}
        </Text>

        <Text category="h7-p" marginBottom={18}>
          {t("location")}
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRateLocation}
          defaultRate={rateLocation}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Text category="h7-p" marginBottom={18} marginTop={24}>
          WIFI
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRateWifi}
          defaultRate={rateWifi}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Text category="h7-p" marginBottom={18} marginTop={24}>
          {t("productiveEnvironment")}
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRateProductive}
          defaultRate={rateProductive}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Text category="h7-p" marginBottom={18} marginTop={24}>
          {t("comfort")}
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRateComfort}
          defaultRate={rateComfort}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Text category="h7-p" marginBottom={18} marginTop={24}>
          {t("socialCommunity")}
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRateSocial}
          defaultRate={rateSocial}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Text category="h7-p" marginBottom={18} marginTop={24}>
          {t("amenities")}
        </Text>
        <Rate
          size="medium"
          setDefaultRate={setRateAmenities}
          defaultRate={rateAmenities}
          styleButton={styles.star}
          style={globalStyle.alignSelfCenter}
        />
        <Layout style={styles.line} level="2" />
        <Text category="h7-p" marginBottom={24}>
          {t("askIfBack")} The Farm Soho?
        </Text>
        <View style={globalStyle.flexSpaceBetween}>
          <CheckBox
            checked={!comeAgain}
            children={<Text category="h8-p">{t("common:no")}</Text>}
            onChange={() => setComeAgain(!comeAgain)}
          />
          <CheckBox
            checked={comeAgain}
            onChange={setComeAgain}
            children={<Text category="h8-p">{t("common:yes")}</Text>}
          />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default WriteReview;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 80,
    paddingHorizontal: 32,
  },
  quote: {
    width: 24,
    height: 24,
    tintColor: "text-platinum-color",
  },
  line: {
    marginVertical: 32,
    height: 1,
  },
  star: {
    marginRight: 8,
  },
});
