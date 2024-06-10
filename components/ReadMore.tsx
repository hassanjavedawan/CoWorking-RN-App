import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import Text from "components/Text";

interface ReadMoreProps {
  children: string;
  more?: string;
  less?: string;
  style?: ViewStyle;
  numberOfLines?: number;
  status?: string;
}

const ReadMore = ({
  children,
  more = "More...",
  less = "Less...",
  style,
  status,
  numberOfLines = 3,
}: ReadMoreProps) => {
  const [fullTextHeight, setFullTextHeight] = React.useState(0);
  const [trimmedTextHeight, setTrimmedTextHeight] = React.useState(0);
  const [isShowFullText, setShowFullText] = React.useState(false);
  const onLayoutFullText = (event: {
    nativeEvent: { layout: { height: any } };
  }) => {
    const { height } = event.nativeEvent.layout;
    setFullTextHeight(height);
  };

  const onLayoutTrimmedText = (event: {
    nativeEvent: { layout: { height: any } };
  }) => {
    const { height } = event.nativeEvent.layout;
    setTrimmedTextHeight(height);
  };

  const onShowMore = () => {
    setShowFullText(!isShowFullText);
  };

  const renderFullText = () => (
    <Text style={[styles.invisible, style]} onLayout={onLayoutFullText}>
      {children}
    </Text>
  );

  const renderTrimmedText = () => (
    <Text
      numberOfLines={numberOfLines}
      onLayout={onLayoutTrimmedText}
      status={status}
      style={[styles.invisible, style]}
    >
      {children}
    </Text>
  );

  return (
    <View style={style}>
      {renderFullText()}
      {renderTrimmedText()}
      <Text
        category="h8-p"
        lineHeight={24}
        status={status}
        numberOfLines={isShowFullText ? undefined : numberOfLines}
      >
        {children}
      </Text>
      {fullTextHeight > trimmedTextHeight && (
        <TouchableOpacity style={styles.buttonShowMore} onPress={onShowMore}>
          <Text status="main">{isShowFullText ? less : more}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMore;
const styles = StyleSheet.create({
  invisible: {
    position: "absolute",
    opacity: 0,
  },
  buttonShowMore: {
    marginTop: 16,
  },
});
