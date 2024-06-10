import React, { memo } from "react";
import { Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { RuleEmail } from "utils/rules";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AccountStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";

const ForgotPassword = memo(() => {
  const { height } = useLayout();
  const { t } = useTranslation("forgotPassword");
  const styles = useStyleSheet(themedStyles);
  const [isContinue, setIsContinue] = React.useState(false);
  const { navigate } = useNavigation<NavigationProp<AccountStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
    },
  });
  const handleSendEmail = React.useCallback(() => {
    navigate("ChangePassword");
  }, []);
  return (
    <Container style={styles.container}>
      <Image source={Images.bgAuth} style={globalStyle.absolute} />

      <TopNavigation
        appearance="control"
        accessoryLeft={<NavigationAction icon="back" status="primary" />}
      />
      <Layout
        style={[
          globalStyle.topBorder24,
          globalStyle.flexOne,
          { marginTop: 20 * (height / 812) },
        ]}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={globalStyle.padH32}
        >
          <Text category="h5" marginTop={40} marginBottom={16}>
            {t("title")}
          </Text>
          <Text status="primary" category="h8-p" marginBottom={40}>
            {t("description")}
          </Text>
          <Controller
            name="email"
            rules={RuleEmail}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              if (errors.email) {
                setIsContinue(false);
              } else {
                setIsContinue(true);
              }
              return (
                <Input
                  status={errors.email ? "warning" : undefined}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoFocus={true}
                  value={value}
                  keyboardType="email-address"
                  onTouchStart={handleSubmit(() => {})}
                  onTouchEnd={handleSubmit(() => {})}
                  label={"EMAIL"}
                  caption={errors.email?.message}
                  style={styles.inputBox}
                  placeholder={"Your Email"}
                  accessoryRight={(props) =>
                    errors.email ? (
                      <></>
                    ) : (
                      <Icon pack="assets" name="radioActive" />
                    )
                  }
                />
              );
            }}
          />
          <Button
            size="giant"
            children={t("send").toString()}
            status="basic"
            onPress={handleSendEmail}
            disabled={!isContinue}
          />
        </KeyboardAwareScrollView>
      </Layout>
    </Container>
  );
});

export default ForgotPassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  inputBox: {
    marginBottom: 24,
  },
});
