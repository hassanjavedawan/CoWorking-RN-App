import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import { Images } from "assets/images";
import { WorkSpaceItemProps } from "constants/Types";

interface WorkSpaceProps {
  data: WorkSpaceItemProps[];
  pressAddWorkSpace?(): void;
  onPress?(): void;
}

const Workspace = ({ data, onPress, pressAddWorkSpace }: WorkSpaceProps) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const widthItem = 140 * (width / 375);
  const heightItem = 132 * (height / 812);
  return (
    <Content
      horizontal
      scrollEventThrottle={16}
      contentContainerStyle={styles.contentWorkSpace}
    >
      {data.map((item, index) => {
        const { title, id, logo } = item;
        return (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7} key={index}>
            <Layout
              style={[
                styles.workspaceItem,
                { width: widthItem, height: heightItem },
              ]}
            >
              <Image
                source={logo || Images.workplace}
                /* @ts-ignore */
                style={styles.img}
              />
              {title ? (
                <Text marginTop={16} category="h9-s" center>
                  {title}
                </Text>
              ) : null}
            </Layout>
          </TouchableOpacity>
        );
      })}
      {data.length <= 3 ? (
        <TouchableOpacity onPress={pressAddWorkSpace} activeOpacity={0.7}>
          <Layout
            style={[
              styles.workspaceItem,
              { width: widthItem, height: heightItem },
            ]}
          >
            <Image
              source={Images.addPlace}
              /* @ts-ignore */
              style={styles.img}
            />
          </Layout>
        </TouchableOpacity>
      ) : null}
    </Content>
  );
};

export default Workspace;

const themedStyles = StyleService.create({
  contentWorkSpace: {
    paddingHorizontal: 32,
    marginTop: 32,
    marginBottom: 48,
  },
  workspaceItem: {
    paddingHorizontal: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
  },
  img: {
    width: 40,
    height: 40,
  },
});
