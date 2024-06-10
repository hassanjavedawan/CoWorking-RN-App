import React, { memo } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Autocomplete,
  AutocompleteItem,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Data_Space } from "constants/Data";
import BookLab from "components/BookLab";
import keyExtractor from "utils/keyExtractor";
import { HomeStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const SpaceNearest = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
  const [data, setData] = React.useState(Data_Space);
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation("spaceNearest");
  const onSelect = (index: number) => {
    setValue(data[index].title);
  };
  const filter = (item: any, query: string) =>
    item.title.toLowerCase().includes(query.toLowerCase());
  const onChangeText = (query: string) => {
    setValue(query);
    setData(data.filter((item) => filter(item, query)));
  };

  const renderOption = (item: any, index: number) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      accessoryLeft={() => (
        <Icon pack="assets" name="pinMap" style={styles.pinMap} />
      )}
    />
  );

  const renderItem = React.useCallback(({ item }) => {
    return <BookLab item={item} />;
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      <TopNavigation
        style={[styles.topNav, { paddingTop: top + 8 }]}
        title={
          <Text marginTop={top} category="h8-s" uppercase>
            {t("title")}
          </Text>
        }
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <NavigationAction icon="filter" onPress={() => navigate("Filter")} />
        }
      />
      <Layout style={styles.inputHeader}>
        <Autocomplete
          status={"primary"}
          accessoryLeft={<Icon pack="assets" name="pinMap" />}
          size="small"
          onChangeText={onChangeText}
          value={value}
          style={styles.inputBox}
          keyboardType="email-address"
          placeholder={`${t("title")}...`}
          onSelect={onSelect}
          accessoryRight={() =>
            value ? (
              <TouchableOpacity
                onPress={() => {
                  onChangeText("");
                }}
              >
                <Icon
                  pack="assets"
                  name="resetSearch"
                  style={styles.resetSearch}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        >
          {data.map(renderOption)}
        </Autocomplete>
      </Layout>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          data.length >= 1 ? (
            <Text
              marginLeft={32}
              marginBottom={24}
              marginTop={32}
              category="h8-p"
            >
              {t("found")} {data.length} {t("spaces")}
            </Text>
          ) : null
        }
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <NavigationAction
        icon="pinMap"
        size="giant"
        status="secondary"
        onPress={() => navigate("NearestMapView")}
        style={[styles.absolutePin, { bottom: bottom + 32 }]}
      />
    </Container>
  );
});

export default SpaceNearest;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    paddingBottom: 16,
  },
  inputHeader: {
    paddingBottom: 24,
    paddingHorizontal: 32,
  },
  inputBox: {},
  resetSearch: {
    borderRadius: 99,
    width: 16,
    height: 16,
  },
  content: {
    backgroundColor: "background-basic-color-2",
    paddingBottom: 52,
  },
  pinMap: {
    tintColor: "text-main-color",
  },
  absolutePin: {
    position: "absolute",
    right: 24,
  },
});
