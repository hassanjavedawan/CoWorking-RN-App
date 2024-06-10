import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import RateStatus from "./RateStatus";
import PostReview from "./PostReview";
import { Images } from "assets/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BookSpaceStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const ReviewsDetails = memo(() => {
  const { t } = useTranslation("review");
  const Data_RateStatus = [
    { id: 0, rate: 4.8, title: t("location") },
    { id: 1, rate: 4.4, title: "WIFI" },
    { id: 2, rate: 4.8, title: t("environment") },
    { id: 3, rate: 4.6, title: t("comfort") },
    { id: 4, rate: 4.7, title: t("socialCommunity") },
    { id: 5, rate: 4.9, title: t("amenities") },
  ];
  const { navigate } = useNavigation<NavigationProp<BookSpaceStackParamList>>();
  const handleWriteReview = React.useCallback(() => {
    navigate("WriteReview");
  }, []);
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={<NavigationAction icon="search" marginBottom={8} />}
        accessoryLeft={<NavigationAction marginBottom={8} />}
      />
      <Text
        marginTop={8}
        marginLeft={32}
        category="h4"
        marginBottom={16}
        capitalize
      >
        {t("title")}
      </Text>
      <Content padder>
        <View style={[globalStyle.flexSpaceBetween, globalStyle.itemsCenter]}>
          <View style={[globalStyle.flexDirection, globalStyle.itemsCenter]}>
            <View style={[globalStyle.flexDirection]}>
              <Icon pack="assets" name="rate" style={styles.iconRate} />
              <Text category="h7" marginLeft={4} center>
                {4.7}
              </Text>
            </View>
            <Layout level="5" style={styles.line} />
            <Text category="h7" marginRight={4}>
              234
            </Text>
            <Text category="h8-p" marginTop={4} lineHeight={16} status="body">
              {t("title")}
            </Text>
          </View>
          <TouchableOpacity
            style={globalStyle.flexDirection}
            onPress={handleWriteReview}
          >
            <Text category="h8-p" lineHeight={16} status="main">
              {t("writeAReview")}
            </Text>
            <Icon pack="assets" name="edit16" style={styles.edit16} />
          </TouchableOpacity>
        </View>
        <Layout style={styles.stick} level="2" />
        <RateStatus data={Data_RateStatus} style={styles.rateStatus} />
        <View>
          {Data_PostReview.map((item, i) => {
            return <PostReview item={item} key={i} />;
          })}
        </View>
      </Content>
    </Container>
  );
});

export default ReviewsDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  rateStatus: {
    marginBottom: 28,
  },
  iconRate: {
    tintColor: "color-orange-100",
    marginTop: 4,
  },
  line: {
    height: 8,
    width: 1,
    alignSelf: "center",
    marginHorizontal: 12,
  },
  edit16: {
    width: 16,
    height: 16,
    alignSelf: "center",
    tintColor: "text-main-color",
  },
  stick: {
    height: 1,
    marginVertical: 24,
  },
});

const Data_PostReview = [
  {
    id: 0,
    name: "Theresa Cobb",
    job: "Artist",
    time: "16 Apr 2020",
    avatar: Images.avatar9,
    rate: 5,
    description:
      "The Farm SoHo has an incredible location, beautiful/spacious facilities with great natural lighting, and very helpful employees.",
  },
  {
    id: 1,
    name: "Sampson Totton",
    job: "UI/UX Designer",
    time: "16 Apr 2020",
    rate: 4,
    avatar: Images.avatar,
    description:
      "I love The Farm. The price point cannot be beat, the vibe is amazing - low key, charming, members are friendly and interesting, and the staff is awesome - you'll get help instantly if you ever have an issue (like with printing). I'm so grateful that I found this place. I've been a member for 2.5 years! Oh, and they are super dog friendly!",
  },
];
