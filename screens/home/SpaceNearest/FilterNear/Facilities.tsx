import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleService, useStyleSheet, CheckBox } from "@ui-kitten/components";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import CheckCustom from "./CheckCustom";

const Facilities = memo(() => {
  const { t } = useTranslation(["filter", "common"]);
  const [all, setAll] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState<boolean>();
  const [personalLockers, setPersonalLockers] = React.useState<boolean>();
  const [kitchen, setKitchen] = React.useState<boolean>();
  const [podcastingRoom, setPodcastingRoom] = React.useState<boolean>();
  const [skypeRoom, setSkypeRoom] = React.useState<boolean>();
  const [accommodation, setAccommodation] = React.useState<boolean>();

  const updateGroup = (...states: any[]) => {
    const someChecked = states.some((item) => item === true);
    const everyChecked = states.every((item) => item === true);

    if (someChecked && !everyChecked) {
      setAll(false);
      setIndeterminate(true);
    } else if (!someChecked && !everyChecked) {
      setAll(false);
      setIndeterminate(false);
    } else if (everyChecked) {
      setAll(true);
      setIndeterminate(false);
    }
  };
  const onPersonalLockers = React.useCallback(
    (checked: boolean) => {
      setPersonalLockers(!personalLockers);
      setIndeterminate(!indeterminate);
      updateGroup(checked, personalLockers);
    },
    [personalLockers, indeterminate]
  );

  const onKitchen = (checked: boolean) => {
    setKitchen(!kitchen);
    updateGroup(checked, kitchen);
  };
  const onPodcastingRoom = (checked: boolean) => {
    setPodcastingRoom(!podcastingRoom);
    updateGroup(checked, podcastingRoom);
  };
  const onSkypeRoom = (checked: boolean) => {
    setSkypeRoom(!skypeRoom);
    updateGroup(checked, skypeRoom);
  };
  const onAccommodation = (checked: boolean) => {
    setAccommodation(!accommodation);
    updateGroup(checked, accommodation);
  };
  const styles = useStyleSheet(themedStyles);
  return (
    <View>
      <Text category="h6" marginTop={48} marginBottom={24}>
        {t("facilities")}
      </Text>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onPersonalLockers(personalLockers)}
      >
        <Text
          marginTop={personalLockers ? 2 : 0}
          category={personalLockers ? "h8-s" : "h8-p"}
        >
          {t("lockerOption")}
        </Text>
        <CheckCustom checked={personalLockers} />
        {/* <CheckCustom checked={personalLockers} status="basic" /> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onKitchen(kitchen)}
      >
        <Text marginTop={kitchen ? 2 : 0} category={kitchen ? "h8-s" : "h8-p"}>
          {t("kittenOption")}
        </Text>
        <CheckCustom checked={kitchen} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onPodcastingRoom(podcastingRoom)}
      >
        <Text
          marginTop={podcastingRoom ? 2 : 0}
          category={podcastingRoom ? "h8-s" : "h8-p"}
        >
          {t("podcastingOption")}
        </Text>
        <CheckCustom checked={podcastingRoom} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onSkypeRoom(skypeRoom)}
      >
        <Text
          marginTop={skypeRoom ? 2 : 0}
          category={skypeRoom ? "h8-s" : "h8-p"}
        >
          {t("skypeOption")}
        </Text>
        <CheckCustom checked={skypeRoom} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onAccommodation(accommodation)}
      >
        <Text
          marginTop={accommodation ? 2 : 0}
          category={accommodation ? "h8-s" : "h8-p"}
        >
          {t("scannerOption")}
        </Text>
        <CheckCustom checked={accommodation} />
      </TouchableOpacity>

      <Text marginTop={8} category="h8-p" status="main">
        {t("common:showAll")} {t("facilities")}
      </Text>
    </View>
  );
});

export default Facilities;

const themedStyles = StyleService.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
