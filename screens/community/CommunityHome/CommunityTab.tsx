import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import keyExtractor from "utils/keyExtractor";
import Post from "./Post";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import { PostProps } from "constants/Types";

interface Props {
  data: PostProps[];
}

const CommunityTab = memo(({ data }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <Post item={item} />;
  }, []);
  return (
    <View>
      {isEmpty(data) ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});

export default CommunityTab;

const themedStyles = StyleService.create({
  contentContainer: {
    paddingTop: 32,
    paddingBottom: 200,
  },
  content: {
    backgroundColor: "background-basic-color-2",
    paddingHorizontal: 32,
  },
});
