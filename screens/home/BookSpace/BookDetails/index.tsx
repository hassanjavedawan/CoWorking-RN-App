import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Layout,
  Icon,
  Button,
  useTheme,
} from "@ui-kitten/components";
import dayjs from "dayjs";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { globalStyle } from "styles/globalStyle";
import useLayout from "hooks/useLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BookSpaceStackParamList } from "navigation/types";
import { Images } from "assets/images";
import ListPerson from "screens/home/CalendarScreen/CalendarDetails/ListPerson";
import { useTranslation } from "react-i18next";

const BookDetails = memo(() => {
  const { t } = useTranslation(["bookDetails", "addCoworker", "common"]);
  const { navigate } = useNavigation<NavigationProp<BookSpaceStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { bottom, top } = useLayout();
  const theme = useTheme();

  const [isFocused, setIsFocused] = React.useState(true);
  const [title, setTitle] = React.useState("Retrospetive with Dev Team");
  const handleAddCoworker = React.useCallback(() => {
    navigate("AddCoWorker");
  }, []);
  const handleContinue = React.useCallback(() => {
    navigate("PaymentConfirm");
  }, []);
  return (
    <Container style={[styles.container]} useSafeArea={false}>
      <TopNavigation
        style={{
          paddingTop: top + 8,
          backgroundColor: isFocused
            ? theme["background-basic-color-1"]
            : theme["color-white-transparent"],
        }}
        accessoryLeft={<NavigationAction marginBottom={8} />}
      />
      <KeyboardAwareScrollView
        style={{
          backgroundColor: isFocused
            ? theme["background-basic-color-1"]
            : theme["color-white-transparent"],
        }}
        contentContainerStyle={[styles.content]}
        showsVerticalScrollIndicator={false}
      >
        <Input
          size="large"
          status="outline"
          onChangeText={(value) => setTitle(value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus
          value={title}
          placeholder="Enter Title"
          style={styles.input}
        />
        <View style={styles.title}>
          <View style={[styles.status]}>
            <Icon pack="assets" name="eventDate" style={styles.icon} />
            {/* 1587453631000  is timestamp in milliseconds*/}
            <Text center category="h7-p" marginLeft={24}>
              {dayjs(1587453631000).format("dddd, DD MMMM DDDD")}
            </Text>
          </View>
          <Text category="h7-p" marginLeft={80}>
            {dayjs(1619013617000).format("hh:mm A")} -{" "}
            {dayjs(1619019017000).format("hh:mm A")}
          </Text>
          <View style={[styles.status]}>
            <Icon pack="assets" name="repeat" style={styles.icon} />
            <Text
              center
              category="h7-s"
              marginLeft={24}
              status="main"
              marginTop={6}
              lineHeight={18}
              children={t("notRepeat")}
            />
          </View>
        </View>
        <View style={styles.title}>
          <View style={[styles.status]}>
            <Icon pack="assets" name="building" style={styles.icon} />
            <Text center category="h7-p" marginLeft={24}>
              The Farm Soho
            </Text>
          </View>
          <Text center category="h7-p" marginLeft={40}>
            447 Broadway 2nd floor, NY, 10013
          </Text>
          <View style={[styles.status]}>
            <Icon pack="assets" name="roomIc" style={styles.icon} />
            <Text center category="h7-p" marginLeft={24}>
              Orange Room
            </Text>
          </View>
        </View>
        <View style={styles.title}>
          <View style={styles.status}>
            <Icon pack="assets" name="alarm" style={styles.icon} />
            <Text center category="h7-p" marginLeft={24}>
              30 mins before
            </Text>
          </View>
        </View>
        <View style={styles.title}>
          <View style={styles.status}>
            <Layout style={styles.iconColor} level="4" />
            <Text center category="h7-p" marginLeft={24} status="main">
              Default color
            </Text>
          </View>
        </View>
        <View style={styles.title}>
          <View style={styles.seat}>
            <Icon pack="assets" name="seat" style={styles.icon} />
            <View>
              <ListPerson data={DataListPerson} style={styles.listPerson} />
              <TouchableOpacity activeOpacity={0.7} onPress={handleAddCoworker}>
                <Text category="h7-p" marginLeft={24} status="main" capitalize>
                  {t("addCoworker:title")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.title}>
          <View style={styles.status}>
            <Icon pack="assets" name="note" style={styles.icon} />
            <Text center category="h7-p" marginLeft={24} status="main">
              {t("addSpecial")}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* {isFocused ? null : ( */}
      <Layout style={[styles.bottom, { paddingBottom: bottom + 4 }]}>
        <View>
          <Text category="h7-p" lineHeight={24}>
            Total<Text category="h7"> ${56 * DataListPerson.length}</Text>
          </Text>
          <Text category="h9-s">($56/per. All tax incl.)</Text>
        </View>
        <Button
          children={t("common:continue").toString()}
          size="giant"
          status="basic"
          onPress={handleContinue}
        />
      </Layout>
      {/* )} */}
    </Container>
  );
});

export default BookDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: "transparent",
  },
  content: {
    paddingBottom: 140,
  },
  input: {
    marginHorizontal: 8,
    marginBottom: 40,
  },
  title: {
    marginBottom: 16,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 32,
  },
  seat: {
    flexDirection: "row",
    marginHorizontal: 32,
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 10,
    tintColor: "text-body-color",
  },
  iconColor: {
    width: 24,
    height: 24,
    marginVertical: 10,
    borderRadius: 4,
  },
  listPerson: {
    marginLeft: 16,
  },
  bottom: {
    ...globalStyle.flexSpaceBetween,
    paddingTop: 16,
    paddingHorizontal: 32,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.topBorder24,
    ...globalStyle.shadowFade,
  },
});
const DataListPerson = [
  { id: 0, name: "Mildred Garner", avatar: Images.avatar6 },
  { id: 1, name: "Luvleen Lawrence", avatar: Images.avatar2 },
  { id: 2, name: "Balveer Bhadiar", avatar: Images.avatar4 },
  { id: 3, name: "Jushawn McDowell", avatar: Images.avatar },
];
