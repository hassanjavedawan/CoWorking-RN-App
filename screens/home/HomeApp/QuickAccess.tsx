import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Modal,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";
import Text from "components/Text";
import { WorkSpaceItemProps } from "constants/Types";
import Carousel from "react-native-snap-carousel";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";

interface QuickAccessProps {
  data: WorkSpaceItemProps[];
  title: string;
  description: string;
  onSave?(): void;
}

function QuickAccess(
  { data, title, description, onSave }: QuickAccessProps,

  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { theme } = useAppTheme();
  const modalRef = React.useRef<Modal>(null);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const hide = React.useCallback(() => {
    modalRef.current?.hide();
  }, []);
  const styles = useStyleSheet(themedStyles);

  const { width, height, top, bottom } = useLayout();

  const handleAdd = React.useCallback(() => {}, []);
  const widthItem = 140 * (width / 375);
  const heightItem = 132 * (height / 812);
  const RenderItem = React.useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity activeOpacity={0.7}>
          <Button
            accessoryRight={<Icon pack="assets" name="trash" />}
            status="danger"
            style={styles.trash}
          />
          <Layout
            level="2"
            style={[
              styles.workspaceItem,
              { width: widthItem, height: heightItem },
            ]}
          >
            <Image
              source={item.image || Images.workplace}
              /* @ts-ignore */
              style={styles.img}
            />
            <Text marginTop={16} category="h9-s" center>
              {item.title}
            </Text>
          </Layout>
        </TouchableOpacity>
      );
    },
    [data]
  );

  return (
    <Modal
      ref={modalRef}
      style={[
        {
          width: width,
          height: 662 * (height / 812),
          marginTop: (120 - top) * (height / 812),
        },
      ]}
      onBackdropPress={hide}
      backdropStyle={[
        {
          backgroundColor:
            theme === "light"
              ? "rgba(30, 31, 32, 0.86)"
              : "rgba(0, 0, 0, 0.86)",
        },
      ]}
    >
      <Layout
        style={[
          globalStyle.topBorder24,
          {
            width: width,
            height: 662 * (height / 812),
          },
        ]}
      >
        <Button
          style={styles.closeModal}
          size="medium"
          status="primary"
          onPress={hide}
          accessoryRight={<Icon pack="assets" name="moreActive" />}
        />
        <Text category="h4" marginHorizontal={32} marginBottom={12}>
          {title}
        </Text>
        <Text category="h9-s" status="body" marginHorizontal={32}>
          {description}
        </Text>
        <View style={styles.container}>
          {data.length >= 1 ? (
            <RenderItem item={data[0]} />
          ) : (
            <TouchableOpacity activeOpacity={0.7}>
              <Layout
                level="2"
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
          )}
          {data.length >= 2 ? (
            <RenderItem item={data[1]} />
          ) : (
            <TouchableOpacity activeOpacity={0.7}>
              <Layout
                level="2"
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
          )}
          {data.length >= 3 ? (
            <RenderItem item={data[2]} />
          ) : (
            <TouchableOpacity activeOpacity={0.7}>
              <Layout
                level="2"
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
          )}
          {data.length >= 4 ? (
            <RenderItem item={data[3]} />
          ) : (
            <TouchableOpacity activeOpacity={0.7}>
              <Layout
                level="2"
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
          )}
        </View>
        <Button
          children="Save"
          status="basic"
          size="giant"
          style={styles.btnSave}
          onPress={onSave}
        />
      </Layout>
    </Modal>
  );
}

export default React.forwardRef(QuickAccess) as (
  props: QuickAccessProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof QuickAccess>;

const themedStyles = StyleService.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 32,
    marginTop: 32,
  },
  closeModal: {
    width: 40,
    height: 40,
    marginVertical: 32,
    marginLeft: 32,
  },
  workspaceItem: {
    paddingHorizontal: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  img: {
    width: 40,
    height: 40,
  },
  trash: {
    position: "absolute",
    zIndex: 10,
    width: 32,
    height: 32,
    right: -8,
    top: -8,
  },
  btnSave: {
    marginHorizontal: 32,
  },
});
