import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import HeaderResult from "./Header";
import { BookSpaceProps } from "constants/Types";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import keyExtractor from "utils/keyExtractor";
import BookLab from "components/BookLab";
import { Data_Space } from "constants/Data";
import { RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const BookSpaceResult = memo(() => {
  const { t } = useTranslation(["spaceResult", "spaceNearest"]);
  const { goBack, navigate } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState<BookSpaceProps[]>(Data_Space);

  const handleDetails = () => {
    navigate("BookSpaceNavigator", { screen: "BookSpaceDetails" });
  };
  const handleMapView = () => {
    navigate("HomeNavigator", { screen: "NearestMapView" });
  };

  const renderItem = React.useCallback(({ item }) => {
    return <BookLab item={item} onPress={handleDetails} />;
  }, []);
  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        style={{ paddingTop: top + 8 }}
        title={
          <Text marginTop={top} uppercase>
            {t("title")}
          </Text>
        }
        accessoryRight={<NavigationAction icon="filter" marginBottom={8} />}
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
      />
      <HeaderResult
        time="9:00 AM - 10:30 AM"
        type="Meeting Room"
        date="Tue, 21 Apr 2020"
        people={4}
        location="New York, NY, USA"
      />
      {isEmpty(data) ? (
        <Layout
          level="2"
          style={[globalStyle.flexOne, globalStyle.justifyCenter]}
        >
          <LoadingIndicator size="giant" status="danger" />
        </Layout>
      ) : (
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
                {t("spaceNearest:found")} {data.length}{" "}
                {t("spaceNearest:spaces")}
              </Text>
            ) : null
          }
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
      <NavigationAction
        onPress={handleMapView}
        icon="pinMap"
        style={[styles.pinMap, { bottom: bottom + 16 }]}
        size="giant"
        status="warning"
        iconColor={theme["text-basic-color"]}
      />
    </Container>
  );
});

export default BookSpaceResult;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "background-basic-color-2",
    paddingBottom: 40,
  },
  pinMap: {
    position: "absolute",
    right: 24,
  },
});
