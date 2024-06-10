import React from "react";
import { View, Image } from "react-native";
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
import { useTranslation } from "react-i18next";

interface ModalResultProps {
  data: WorkSpaceItemProps[];
}

function ModalResult(
  { data }: ModalResultProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { theme } = useAppTheme();
  const { t } = useTranslation("common");
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
  const imgWidth = width - 80;
  const imgHeight = 200 * (height / 812);
  const itemWidth = width - 80;
  const itemHeight = 422 * (height / 812);

  const handleAdd = React.useCallback(() => {}, []);

  const RenderItem = React.useCallback(({ item }) => {
    return (
      <View>
        <Layout
          style={[
            {
              height: itemHeight,
              width: itemWidth,
            },
            globalStyle.border16,
          ]}
        >
          <Image
            source={item.image}
            style={[
              { width: imgWidth, height: imgHeight },
              globalStyle.topBorder16,
            ]}
          />
          <View style={globalStyle.padH24}>
            <Text category="h7" marginTop={24}>
              {item.title}
            </Text>
            <View style={globalStyle.flexDirection}>
              <Icon pack="assets" name="pinMap" style={styles.icon} />
              <Text category="h9-s" marginTop={12}>
                {item.location}
              </Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Icon pack="assets" name="rate" style={styles.icon} />
              <Text category="h8" marginTop={12}>
                {item.rate}
              </Text>
              <Text category="h9-s" marginTop={12} status="body">
                ({item.quantityRate})
              </Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Icon
                pack="assets"
                name={item.isVerified ? "verified" : "unverified"}
                style={styles.iconVerified}
              />
              <Text
                category="h9-s"
                marginTop={12}
                marginLeft={4}
                status={item.isVerified ? "green" : "body"}
              >
                Verified
              </Text>
            </View>
          </View>
        </Layout>
        <Button
          children={t("add").toString()}
          status="basic"
          size="giant"
          onPress={handleAdd}
          style={styles.btnAdd}
          accessoryRight={<Icon pack="assets" name="add16" />}
        />
      </View>
    );
  }, []);

  return (
    <Modal
      ref={modalRef}
      onBackdropPress={hide}
      backdropStyle={[
        globalStyle.flexOne,
        {
          backgroundColor:
            theme === "light"
              ? "rgba(30, 31, 32, 0.86)"
              : "rgba(0, 0, 0, 0.86)",
        },
      ]}
    >
      <View style={globalStyle.flexOne}>
        <Carousel
          layout={"default"}
          data={data}
          sliderWidth={width}
          itemWidth={itemWidth}
          loop
          inactiveSlideShift={0}
          renderItem={RenderItem}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={1}
        />
        <Button
          style={[styles.closeModal, { marginTop: 151 * (height / 812) }]}
          size="medium"
          status="danger"
          onPress={hide}
          accessoryRight={<Icon pack="assets" name="moreActive" />}
        />
      </View>
    </Modal>
  );
}

export default React.forwardRef(ModalResult) as (
  props: ModalResultProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof ModalResult>;

const themedStyles = StyleService.create({
  modal: {
    borderRadius: 24,
    paddingTop: 48,
    paddingBottom: 40,
    alignSelf: "center",
    marginHorizontal: 32,
  },
  closeModal: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginRight: 4,
    marginTop: 10,
  },
  iconVerified: {
    width: 16,
    height: 16,
    marginTop: 10,
  },
  btnAdd: {
    alignSelf: "center",
    marginTop: -25,
  },
});
