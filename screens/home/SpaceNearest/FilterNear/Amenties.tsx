import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import CheckCustom from "./CheckCustom";

const Amenties = memo(() => {
  const { t } = useTranslation(["filter", "common"]);
  const [all, setAll] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState<boolean>();
  const [dual, setDual] = React.useState<boolean>();
  const [soundRecording, setSoundRecording] = React.useState<boolean>();
  const [videoRecording, setVideoRecording] = React.useState<boolean>();
  const [printer, setPrinter] = React.useState<boolean>();
  const [scanner, setScanner] = React.useState<boolean>();

  const updateGroup = (...states: any[]) => {
    // must fix
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
  const onDual = React.useCallback(
    (checked: boolean) => {
      setDual(!dual);
      setIndeterminate(!indeterminate);
      updateGroup(checked, dual);
    },
    [dual, indeterminate]
  );

  const onSoundRecording = (checked: boolean) => {
    setSoundRecording(!soundRecording);
    updateGroup(checked, soundRecording);
  };
  const onVideoRecording = (checked: boolean) => {
    setVideoRecording(!videoRecording);
    updateGroup(checked, videoRecording);
  };
  const onPrinter = (checked: boolean) => {
    setPrinter(!printer);
    updateGroup(checked, printer);
  };
  const onScanner = (checked: boolean) => {
    setScanner(!scanner);
    updateGroup(checked, scanner);
  };
  const styles = useStyleSheet(themedStyles);
  return (
    <View>
      <Text category="h6" marginTop={48} marginBottom={24}>
        {t("amenties")}
      </Text>
      <TouchableOpacity
        style={[styles.item]}
        onPress={() =>
          /* @ts-ignore */
          onDual(dual)
        }
      >
        <Text marginTop={dual ? 2 : 0} category={dual ? "h8-s" : "h8-p"}>
          {t("monitorsOption")}
        </Text>
        <CheckCustom checked={dual} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onSoundRecording(soundRecording)}
      >
        <Text
          marginTop={soundRecording ? 2 : 0}
          category={soundRecording ? "h8-s" : "h8-p"}
        >
          {t("soundOption")}
        </Text>
        <CheckCustom checked={soundRecording} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onVideoRecording(videoRecording)}
      >
        <Text
          marginTop={videoRecording ? 2 : 0}
          category={videoRecording ? "h8-s" : "h8-p"}
        >
          {t("videoOption")}
        </Text>
        <CheckCustom checked={videoRecording} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onPrinter(printer)}
      >
        <Text marginTop={printer ? 2 : 0} category={printer ? "h8-s" : "h8-p"}>
          {t("printerOption")}
        </Text>
        <CheckCustom checked={printer} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item]}
        /* @ts-ignore */
        onPress={() => onScanner(scanner)}
      >
        <Text marginTop={scanner ? 2 : 0} category={scanner ? "h8-s" : "h8-p"}>
          {t("scannerOption")}
        </Text>
        <CheckCustom checked={scanner} />
      </TouchableOpacity>
      <Text marginTop={8} category="h8-p" status="main">
        {t("common:showAll")} {t("amenties")}
      </Text>
    </View>
  );
});

export default Amenties;

const themedStyles = StyleService.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
