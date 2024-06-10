import React from "react";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { View } from "react-native";

interface Props {
  level?: "1" | "2" | "3" | "4" | "5";
  straight?: boolean;
  height?: string | number;
  width?: string | number;
  marginHorizontal?: number;
  marginVertical?: number;
}

const Stick = ({
  level = "2",
  straight,
  marginHorizontal,
  marginVertical,
}: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      {straight ? (
        <Layout
          level={level}
          style={[
            styles.straight,
            {
              marginHorizontal: marginHorizontal,
              marginVertical: marginVertical,
            },
          ]}
        />
      ) : (
        <Layout
          level={level}
          style={[
            styles.horizontal,
            {
              marginHorizontal: marginHorizontal,
              marginVertical: marginVertical,
            },
          ]}
        />
      )}
    </>
  );
};

export default Stick;

const themedStyles = StyleService.create({
  straight: {
    width: 1,
  },
  horizontal: {
    height: 1,
  },
});
