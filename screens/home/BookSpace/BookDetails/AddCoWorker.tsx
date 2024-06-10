import React, { memo } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
} from "@ui-kitten/components";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CoworkerItem from "./CoworkerItem";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AddCoWorker = memo(() => {
  const { t } = useTranslation(["addCoworker", "common"]);
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(Data);
  const [dataAdded, setDataAdded] = React.useState(DataAdded);
  const [search, setSearch] = React.useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const renderItemAdded = React.useCallback(({ item }) => {
    return <CoworkerItem item={item} canDelete={true} />;
  }, []);
  const renderItem = React.useCallback(({ item }) => {
    return <CoworkerItem item={item} />;
  }, []);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <Text category="h9" status="body" marginLeft={32} marginBottom={24}>
        {t("added")}
      </Text>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction marginBottom={8} />}
        title={
          <Text category="h8" lineHeight={20}>
            {t("title")}
          </Text>
        }
        accessoryRight={
          <TouchableOpacity>
            <Text category="h7" lineHeight={20} status="main">
              {t("common:done")}
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <Controller
          name="search"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size="small"
              onChange={onChange}
              onBlur={onBlur}
              onChangeText={(value) => setSearch(value)}
              status="primary"
              value={search}
              placeholder="Add Coworker"
              style={styles.input}
              accessoryLeft={<Icon name="seat" pack="assets" />}
            />
          )}
        />
      </View>
      {search === "" ? (
        <FlatList
          data={DataAdded}
          renderItem={renderItemAdded}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={Data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
});

export default AddCoWorker;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 32,
  },
});
const DataAdded = [
  { id: 0, avatar: Images.avatar, name: "Mildred Garner", job: "UX Designer" },
];
const Data = [
  { id: 1, avatar: Images.avatar1, name: "Frank Ortiz", job: "Accountants" },
  {
    id: 2,
    avatar: Images.avatar2,
    name: "Frankin Snyder",
    job: "Architectural Drafters",
  },
  { id: 3, avatar: Images.avatar3, name: "Frank Patrick", job: "Artist" },
  { id: 4, avatar: Images.avatar4, name: "Frank Marsh", job: "Art Directors" },
];
