import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
  Icon,
  Button,
  Modal,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Data_Workspace } from "constants/Data";
import WorkSpacePlace from "./WorkSpacePlace";
import { filter } from "lodash";
import { WorkSpaceItemProps } from "constants/Types";
import ModalResult from "./ModalResult";
import useModal from "hooks/useModal";
import { useTranslation } from "react-i18next";

const AddWorkSpace = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["addWorkSpace", "common"]);
  const [data, setData] = React.useState<WorkSpaceItemProps[]>([]);
  const [workspaceName, setWorkspaceName] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const { modalRef, hide, show } = useModal();
  const renderItem = React.useCallback(({ item }) => {
    return <WorkSpacePlace item={item} />;
  }, []);

  const handleSearchLocation = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(Data_Workspace, (item) => {
      return (
        contains(item.title, formattedQuery) ||
        contains(item.location, formattedQuery)
      );
    });
    setData(filteredData);
    setLocation(text);
  };

  const handleSearchWorkSpace = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(Data_Workspace, (item) => {
      return (
        contains(item.title, formattedQuery) ||
        contains(item.location, formattedQuery)
      );
    });
    setData(filteredData);
    setWorkspaceName(text);
  };
  const contains = (title: string, location: string) => {
    if (title.includes(title) || location.includes(location)) {
      return true;
    }

    return false;
  };

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        style={{ paddingTop: top }}
        accessoryLeft={<NavigationAction status="primary" icon="back" />}
        title={() => (
          <Text category="h8-s" uppercase marginTop={top - 8}>
            {t("title")}
          </Text>
        )}
      />
      <Layout style={globalStyle.padH32} level="1">
        <Input
          size="small"
          status="primary"
          style={styles.input}
          accessoryLeft={<Icon pack="assets" name="pinMap" />}
          placeholder={t("where")}
          value={location}
          onChangeText={(text) => handleSearchLocation(text)}
        />
        <Input
          size="small"
          status="primary"
          style={styles.input}
          placeholder={t("workspaceName")}
          value={workspaceName}
          onChangeText={(text) => handleSearchWorkSpace(text)}
          accessoryLeft={<Icon pack="assets" name="building" />}
        />
        <Button
          children={t("common:search").toString()}
          status="basic"
          style={styles.search}
          size="giant"
          onPress={show}
        />
      </Layout>

      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={() => {
          return (
            <>
              {data.length > 0 ? (
                <Text
                  category="h8-p"
                  marginTop={32}
                  marginLeft={32}
                  marginBottom={24}
                >
                  Found {data.length} spaces
                </Text>
              ) : null}
            </>
          );
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
      <ModalResult data={data} ref={modalRef} />
    </Container>
  );
});

export default AddWorkSpace;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  input: {
    marginBottom: 16,
  },
  search: {
    marginBottom: 24,
  },
  content: {
    backgroundColor: "background-basic-color-2",
  },
});
