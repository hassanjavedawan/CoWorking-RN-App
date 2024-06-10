import React, { memo } from "react";
import {
  View,
  ImageRequireSource,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import _ from "lodash";

interface Props {
  id: number;
  avatar: ImageRequireSource;
  name: string;
}
interface ItemProps {
  data?: Props[];
  style?: StyleProp<ViewStyle>;
}

const ListPerson = memo(({ data = [], style }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const [list, setList] = React.useState(data);

  // const handleRemove = React.useCallback(() => {}, []);
  const handleRemove = React.useCallback((item, data, setData) => {
    const arr = _.filter(data, (i) => {
      return i !== item;
    });
    setData(arr);
  }, []);

  return (
    <View style={[styles.container, style]}>
      {isEmpty(data) ? (
        <LoadingIndicator />
      ) : (
        list.map((item, index) => {
          const onPress = () => {
            let idx = _.find(list, (i) => i.id === item.id);

            if (!!idx) {
              handleRemove(item, list, setList);
            }
          };
          return (
            <View
              key={index}
              style={[
                globalStyle.flexSpaceBetween,
                { width: 263 * (width / 375) },
                globalStyle.itemsCenter,
              ]}
            >
              <View style={styles.item}>
                <Avatar source={item.avatar} size="tiny" />
                <Text center category="h7-p" marginLeft={16}>
                  {item.name}
                </Text>
              </View>
              <TouchableOpacity onPress={onPress}>
                <Icon pack="assets" name="moreActive" />
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </View>
  );
});

export default ListPerson;

const themedStyles = StyleService.create({
  container: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
});
