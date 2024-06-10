import React from "react";
import Text, { MyTextProps } from "components/Text";
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { StyleProp, View, ViewStyle } from "react-native";

export interface TagProps extends MyTextProps {
  level: "1" | "2" | "3" | "4" | "5" | "6";
  style?: StyleProp<ViewStyle>;
  tags: Array<string>;
}
const Tag = ({ level, style, tags, ...props }: TagProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const Item = React.useCallback(({ children }) => {
    return (
      <Layout level={level} style={[style, styles.tag]}>
        <Text
          numberOfLines={1}
          status="body"
          {...props}
          children={children}
          category="h9-s"
          center
        />
      </Layout>
    );
  }, []);
  return (
    <>
      <Item children={tags[0]} />
      <Item children={tags[1]} />
      <Item children={tags[2]} />
      {tags.length > 4 ? (
        <Layout level={"1"} style={[style, styles.lastTag]}>
          <Text
            numberOfLines={1}
            status="body"
            children={`+${tags.length - 3} skills`}
            category="h9-s"
            center
          />
        </Layout>
      ) : null}
    </>
  );
};
export default Tag;
const themedStyles = StyleService.create({
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    borderRadius: 4,
    minWidth: 59,
  },
  lastTag: {
    padding: 4,
    marginRight: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "color-isabel-line-100",
    minWidth: 59,
  },
});
