import React from "react";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";

interface Props {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  level?: "1" | "2" | "3" | "4" | "5";
  width?: number;
  height?: number;
}

const Dot = ({ top, left, right, bottom, level, width, height }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      level={level}
      style={[
        styles.container,
        { top: top, left: left, right: right, bottom: bottom },
      ]}
    />
  );
};

export default Dot;

const themedStyles = StyleService.create({
  container: {
    width: 24,
    height: 24,
    position: "absolute",
    borderRadius: 99,
  },
});
