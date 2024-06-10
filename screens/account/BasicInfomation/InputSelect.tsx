import React, { memo } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageProps,
} from "react-native";
import { Icon, Input, InputProps } from "@ui-kitten/components";
import { RenderProp } from "@ui-kitten/components/devsupport";

interface InputSelectProps extends InputProps {
  iconStyle?: ViewStyle;
  onPress?: () => void;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
}

const InputSelect = memo(
  ({
    onPress,
    iconStyle,
    disabled,
    style,
    eva,
    accessoryLeft,
    ...props
  }: InputSelectProps) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.container} />
        <Input
          accessoryLeft={accessoryLeft}
          {...props}
          disabled={disabled}
          style={style}
        />
      </TouchableOpacity>
    );
  }
);

export default InputSelect;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
