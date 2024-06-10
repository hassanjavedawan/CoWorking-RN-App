import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { BookSpaceProps } from "constants/Types";

interface Props {
  item: BookSpaceProps;
  onPress?(): void;
  nonBook?: boolean;
}
const BookLab = ({ item, onPress, nonBook }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {
    image,
    id,
    title,
    rate,
    quantityRate,
    howFar,
    isVerified,
    book,
  } = item;

  const [isBook, setIsBook] = React.useState(book);
  const handleBook = React.useCallback(() => {
    setIsBook(!isBook);
  }, [isBook]);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[globalStyle.flexDirection, styles.item, { width: width - 64 }]}
    >
      <Image
        source={image}
        style={[
          /* @ts-ignore */
          styles.img,
          { width: 88 * (width / 375), height: 112 * (width / 375) },
        ]}
      />
      <View style={globalStyle.alignSelfCenter}>
        <Text category="h7" marginRight={140} numberOfLines={1}>
          {title}
        </Text>
        <View style={[globalStyle.flexDirection, styles.location]}>
          <Icon pack="assets" name="pinMap" style={styles.icon} />
          <Text
            category="h9-s"
            status="body"
            marginTop={2}
            marginRight={140}
            numberOfLines={1}
          >
            {item?.location}
          </Text>
        </View>
        <View style={globalStyle.flexDirection}>
          <Icon pack="assets" name="rate" style={styles.iconRate} />
          <Text category="h8" marginTop={2} marginLeft={4}>
            {rate}
          </Text>
          <Text
            category="h9-s"
            status="body"
            marginLeft={2}
            marginTop={2}
            children={`(${quantityRate})`}
            marginBottom={8}
          />
        </View>
        <View style={[globalStyle.flexDirection]}>
          <View style={[globalStyle.flexDirection, styles.distance]}>
            <Icon pack="assets" name="distance" style={styles.icon} />
            <Text category="h9-s" status="body" marginTop={2}>
              {howFar}
            </Text>
          </View>
          {isVerified ? (
            <View style={globalStyle.flexDirection}>
              <Icon
                pack="assets"
                name={"verified"}
                style={[styles.iconCareTeam]}
              />
              <Text
                category="h9-s"
                marginTop={2}
                marginLeft={4}
                status={"green"}
              >
                Verified
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      {nonBook ? null : (
        <TouchableOpacity
          style={[
            styles.btnAddToHome,
            {
              backgroundColor: isBook
                ? theme["text-main-color"]
                : theme["background-basic-color-2"],
            },
          ]}
          activeOpacity={0.7}
          onPress={handleBook}
        >
          <Icon
            pack="assets"
            name="wishlistActive"
            style={[
              styles.wishlist,
              {
                tintColor: isBook
                  ? theme["text-white-color"]
                  : theme["text-body-color"],
              },
            ]}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default BookLab;

const themedStyles = StyleService.create({
  item: {
    marginBottom: 24,
    borderRadius: 16,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
  },
  img: {
    marginRight: 16,
    marginVertical: 8,
    marginLeft: 8,
    borderRadius: 12,
  },
  location: {
    marginVertical: 8,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginRight: 4,
  },
  iconRate: {
    width: 16,
    height: 16,
    tintColor: "text-warning-color",
  },
  distance: {
    marginRight: 16,
  },
  iconCareTeam: {
    width: 16,
    height: 16,
  },
  btnAddToHome: {
    width: 30,
    height: 30,
    position: "absolute",
    borderRadius: 8,
    right: 16,
    bottom: 16,
    justifyContent: "center",
    zIndex: 10,
  },
  wishlist: {
    width: 16,
    height: 16,
    alignSelf: "center",
  },
});
