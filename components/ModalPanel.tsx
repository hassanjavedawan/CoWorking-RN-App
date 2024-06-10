import React from "react";
import {
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  RefreshControlProps,
} from "react-native";
import { useTheme, Input, InputProps } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "./Text";
import NavigationAction from "./NavigationAction";
import LoadingIndicator from "./LoadingIndicator";

import { Modalize } from "react-native-modalize";

interface BottomSheetProps<T> {
  modalHeight?: number | undefined;
  title: string;
  categoryTitle?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h7-p"
    | "h7-s"
    | "h8"
    | "h8-p"
    | "h8-s"
    | "h9"
    | "h9-s"
    | undefined;
  description?: string;
  data?: Array<T>;
  onEndReached?(): void;
  keyExtractor?: (item: any, index: number) => string; // must fix
  renderItem?: ListRenderItem<any> | undefined | null;
  ListHeaderComponent?:
    | React.ReactElement<any, any>
    | React.ComponentType<any>
    | null;
  ListFooterComponent?:
    | React.ReactElement<any, any>
    | React.ComponentType<any>
    | null;
  ListEmptyComponent?: React.ReactElement<any, any> | null;
  refreshControl?:
    | Animated.WithAnimatedObject<
        React.ReactElement<
          RefreshControlProps,
          | string
          | ((props: any) => React.ReactElement<any, any> | null)
          | (new (props: any) => React.Component<any, any, any>)
        >
      >
    | undefined;
  children?: React.ReactElement<any, any> | React.ComponentType<any> | null;
  contentContainerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  styleFlatList?: ViewStyle;
  noHeader?: boolean;
  loading?: boolean;
  searchProps?: InputProps;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  numColumns?: number;
}

function ModalizePanel<T>(
  {
    modalHeight,
    title,
    description,
    data,
    onEndReached,
    renderItem,
    noHeader,
    refreshControl,
    ListFooterComponent,
    ListHeaderComponent,
    ListEmptyComponent,
    contentContainerStyle,
    children,
    horizontal,
    numColumns,
    headerStyle,
    categoryTitle = "h4",
    styleFlatList,
    loading,
    searchProps,
    scrollEnabled = true,
  }: BottomSheetProps<T>,
  ref: React.ForwardedRef<Modalize>
) {
  const theme = useTheme();
  const { height, bottom } = useLayout();

  const modalizeRef = React.useRef<Modalize>();

  React.useImperativeHandle(ref, () => ({
    open: () => {
      modalizeRef.current?.open();
    },
    close: () => {
      modalizeRef.current?.close();
    },
  }));

  const close = React.useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  const headerComponent = React.useCallback(() => {
    return (
      <View style={[styles.headerModal, headerStyle]}>
        <NavigationAction onPress={close} status="basic" />
        <Text marginTop={32} category={categoryTitle} capitalize>
          {title}
        </Text>
        {description ? (
          <Text marginTop={16} category="h8-p" capitalize status="body">
            {description}
          </Text>
        ) : null}
        {searchProps && (
          <View
            style={[
              styles.searchBox,
              { backgroundColor: theme["background-search-box"] },
            ]}
          >
            <Input {...searchProps} size="small" status="primary" />
          </View>
        )}
      </View>
    );
  }, [title, searchProps]);

  return loading ? (
    <Modalize
      ref={modalizeRef}
      modalHeight={modalHeight ? modalHeight : height * 0.901}
      HeaderComponent={noHeader ? null : headerComponent}
      handleStyle={styles.handleStyle}
      modalStyle={[
        styles.modalStyle,
        { backgroundColor: theme["background-basic-color-1"] },
      ]}
    >
      <LoadingIndicator size="giant" />
    </Modalize>
  ) : children ? (
    <Modalize
      ref={modalizeRef}
      HeaderComponent={noHeader ? null : headerComponent}
      modalHeight={modalHeight ? modalHeight : height * 0.901}
      handleStyle={styles.handleStyle}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        scrollEventThrottle: 16,
      }}
      modalStyle={[
        styles.modalStyle,
        { backgroundColor: theme["background-basic-color-1"] },
      ]}
    >
      {children}
    </Modalize>
  ) : (
    <Modalize
      ref={modalizeRef}
      modalHeight={modalHeight ? modalHeight : height * 0.901}
      flatListProps={{
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: [
          { paddingBottom: bottom },
          contentContainerStyle,
        ],
        ListHeaderComponent: ListHeaderComponent,
        ListFooterComponent: ListFooterComponent,
        ListEmptyComponent: ListEmptyComponent,
        refreshControl: refreshControl,
        style: styleFlatList ? styleFlatList : styles.styleFlatList,
        data: data,
        numColumns: numColumns,
        horizontal: horizontal,
        scrollEnabled: scrollEnabled,
        showsVerticalScrollIndicator: false,
        keyExtractor: (item: any, index: number) => index.toString(),
        renderItem: renderItem,
        onEndReached: onEndReached,
      }}
      HeaderComponent={noHeader ? null : headerComponent}
      handleStyle={styles.handleStyle}
      modalStyle={[
        styles.modalStyle,
        { backgroundColor: theme["background-basic-color-1"] },
      ]}
    />
  );
}

export default React.forwardRef(ModalizePanel) as <T>(
  props: BottomSheetProps<T> & { ref?: React.ForwardedRef<Modalize> }
) => ReturnType<typeof ModalizePanel>;

const styles = StyleSheet.create({
  modalStyle: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  handleStyle: {
    height: 0,
  },
  headerModal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  styleFlatList: {
    flex: 1,
    paddingHorizontal: 32,
  },
  searchBox: {
    marginTop: 35,
  },
});
