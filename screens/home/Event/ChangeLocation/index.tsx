import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  AutocompleteItem,
  Icon,
  Autocomplete,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import EventItem from "components/EventItem";
import { Data_Event } from "constants/Data";
import { EventStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const ChangeLocation = memo(() => {
  const { t } = useTranslation("event");
  const { goBack, navigate } = useNavigation<
    NavigationProp<EventStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [data, setData] = React.useState(Data_AutoComplete);
  const [dataEvent, setDataEvent] = React.useState(Data_Event);
  const [value, setValue] = React.useState<string>("");

  const onSelect = (index: number) => {
    setValue(data[index]);
  };
  const filter = (item: any, query: string) =>
    item.toLowerCase().includes(query.toLowerCase());
  const onChangeText = (query: string) => {
    setValue(query);
    setData(data.filter((item) => filter(item, query)));
  };
  const handleMapView = React.useCallback(() => {
    return navigate("MapEvent");
  }, []);
  const renderOption = (item: any, index: number) => (
    <AutocompleteItem
      key={index}
      title={item}
      accessoryLeft={() => (
        <Icon pack="assets" name="search" style={styles.eventIc} />
      )}
    />
  );

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={
          <Text category="h8-s" uppercase>
            {t("findEvents")}
          </Text>
        }
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="filter" />}
      />
      <Layout>
        <Autocomplete
          status={"primary"}
          accessoryLeft={<Icon pack="assets" name="event" />}
          size="small"
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
          keyboardType="email-address"
          placeholder={`${t("findNearest")}...`}
          onSelect={onSelect}
          accessoryRight={() =>
            value ? (
              <TouchableOpacity
                onPress={() => {
                  onChangeText("");
                }}
              >
                <Icon pack="assets" name="resetSearch" />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        >
          {data.map(renderOption)}
        </Autocomplete>
      </Layout>
      {isEmpty(data) ? (
        <LoadingIndicator size="giant" status="danger" />
      ) : (
        <Content level="2" contentContainerStyle={styles.content}>
          <Text
            category="h8-p"
            lineHeight={16}
            marginVertical={32}
            marginLeft={32}
          >
            {t("found")} {dataEvent.length} {t("events")} in New York
          </Text>
          {dataEvent.map((item, index) => {
            return (
              <EventItem
                item={item}
                key={index}
                onPress={() => navigate("EventDetails", { data: item })}
                style={{
                  width: 311 * (width / 375),
                  height: 302 * (width / 375),
                  marginBottom: 24,
                  marginLeft: 32,
                }}
              />
            );
          })}
        </Content>
      )}
      <NavigationAction
        icon="pinMap"
        style={[styles.pinMap, { bottom: bottom + 16 }]}
        size="giant"
        status="warning"
        iconColor={theme["text-basic-color"]}
        onPress={handleMapView}
      />
    </Container>
  );
});

export default ChangeLocation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  input: {
    marginTop: 8,
    marginHorizontal: 32,
    marginBottom: 24,
  },
  eventIc: {
    tintColor: "text-main-color",
  },
  content: {
    paddingBottom: 40,
  },
  pinMap: {
    position: "absolute",
    right: 24,
  },
});
const Data_AutoComplete = [
  "yoga",
  "new york fashion show",
  "freelance",
  "cryptocurrency",
];
