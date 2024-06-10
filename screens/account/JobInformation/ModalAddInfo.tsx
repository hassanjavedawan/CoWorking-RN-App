import React, { memo } from "react";
import { View } from "react-native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import CardHightLight from "./CardHighLight";
import NavigationAction from "components/NavigationAction";

interface Props {
  title: string;
  id: number;
  isChoose: boolean;
}

interface ModalProps {
  data: any[];
  onPress?(): void;
  onDone?(): void;
  title?: string;
  description?: string;
}

const ModalSkillInfo = memo(
  ({ data, onPress, onDone, title, description }: ModalProps) => {
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    return (
      <Layout
        level="5"
        style={[
          styles.container,
          { paddingTop: top + 8, height: height - top - 8 },
        ]}
      >
        <NavigationAction onPress={onPress} />
        <Text category="h5" marginTop={24}>
          {title}
        </Text>
        <Text category="h8-p" lineHeight={16} status="body" marginTop={16}>
          {description}
        </Text>
        <View style={styles.footerSkillList}>
          {data.map((item, index) => {
            return (
              <CardHightLight item={item} key={index} onPress={() => {}} />
            );
          })}
        </View>
        <Layout style={[styles.modalBtn, { paddingBottom: bottom + 8 }]}>
          <Button
            children="Done"
            size="giant"
            status="basic"
            onPress={onDone}
          />
        </Layout>
      </Layout>
    );
  }
);

export default ModalSkillInfo;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  footerSkillList: {
    marginTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modalBtn: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    ...globalStyle.topBorder24,
    paddingHorizontal: 32,
  },
});
