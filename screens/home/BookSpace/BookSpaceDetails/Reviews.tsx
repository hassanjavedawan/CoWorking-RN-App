import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { Images } from "assets/images";
import PostReview from "../ReviewsDetails/PostReview";
import { useTranslation } from "react-i18next";

interface Props {
  showMore?(): void;
}

const Reviews = ({ showMore }: Props) => {
  const { t } = useTranslation("spaceDetails");
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={[globalStyle.flexSpaceBetween, globalStyle.itemsCenter]}>
        <Text category="h6" marginBottom={20}>
          {t("reviews")}
        </Text>
        <View style={[globalStyle.flexDirection, { marginBottom: 20 }]}>
          <Icon pack="assets" name="rate" style={styles.iconRate} />
          <Text category="h8" marginHorizontal={4} center marginTop={2}>
            {4.7}
          </Text>
          <Text
            category="h9-s"
            status="body"
            marginTop={2}
            center
            children={`(${213})`}
          />
        </View>
      </View>
      <View>
        <PostReview
          item={{
            avatar: Images.avatar9,
            name: "Theresa Cobb",
            job: "Artist",
            time: "16 Apr 2020",
            rate: 5,
            description:
              "The Farm SoHo has an incredible location, beautiful spacious facilities with great natural lighting, and very helpful employees.",
          }}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={showMore}>
          <Text status="main" category="h8-p" lineHeight={16}>
            {t("showMore")}
          </Text>
        </TouchableOpacity>
      </View>
      <Layout level="6" style={styles.line} />
    </View>
  );
};

export default Reviews;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 32,
  },
  avatar: {
    marginRight: 16,
  },
  content: {
    marginTop: 20,
  },
  iconRate: {
    tintColor: "color-orange-100",
    width: 16,
    height: 16,
  },
  time: {
    position: "absolute",
    right: 0,
    bottom: 4,
  },
  rate: {
    marginTop: 12,
    marginBottom: 8,
  },
  line: {
    height: 1,
    marginVertical: 32,
  },
});
