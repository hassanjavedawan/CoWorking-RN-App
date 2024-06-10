import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { RuleConfirmPassword, RulePassword, RuleResetCode } from "utils/rules";
import { RootStackParamList } from "navigation/types";
import useToggle from "hooks/useToggle";
import { useTranslation } from "react-i18next";

const ChangePassword = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const { t } = useTranslation("changePassword");
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [invisible, setInvisible] = useToggle(true);
  const [correct, setCorrect] = React.useState(false);
  const [isContinue, setIsContinue] = React.useState(false);
  const [code, setCode] = React.useState<string>("297932");
  const [password, setPassword] = React.useState<string>("12345678");
  const [confirmPassword, setConfirmPassword] = React.useState<string>(
    "12345678"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resetCode: code,
      password: password,
      passwordConfirm: confirmPassword,
    },
  });
  React.useEffect(() => {
    if (
      confirmPassword.length >= 8 &&
      password.length >= 8 &&
      password === confirmPassword
    ) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    if (correct === true && code.length === 6) {
      setIsContinue(true);
    } else {
      setIsContinue(false);
    }
  }, [password, confirmPassword, code, correct]);
  React.useEffect(() => {
    if (correct === true && code.length === 6) {
      setIsContinue(true);
    } else {
      setIsContinue(false);
    }
  }, [isContinue, code, correct]);

  const handleSendEmail = React.useCallback(() => {
    navigate("SuccessScr", {
      data: {
        title: t("congrats"),
        description: t("completeChangePassword"),
        children: [
          {
            title: "Log In Now",
            onPress: () =>
              navigate("Account", {
                screen: "Auth",
                /* @ts-ignore */
                params: { initialIndex: 0 },
              }),
            status: "basic",
          },
        ],
      },
    });
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
            name="resetCode"
            rules={RuleResetCode}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.resetCode ? "warning" : undefined}
                onChangeText={(value) => {
                  onChange(value);
                  setCode(value);
                }}
                onBlur={onBlur}
                value={value}
                maxLength={6}
                keyboardType="number-pad"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                label={"RESET CODE"}
                caption={errors.resetCode?.message}
                style={styles.inputBox}
                placeholder={"Enter Code"}
              />
            )}
          />
          <Controller
            name="password"
            rules={RulePassword}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.password ? "warning" : undefined}
                onChangeText={(value) => {
                  onChange(value), setPassword(value);
                }}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                label={"NEW PASSWORD"}
                caption={errors.password?.message}
                style={styles.inputBox}
                secureTextEntry={invisible}
                placeholder={"New Password"}
                accessoryRight={(props) => (
                  <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                    <Icon
                      {...props}
                      pack="assets"
                      name={invisible ? "eyeOn" : "eyeOff"}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            rules={RuleConfirmPassword}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.passwordConfirm ? "warning" : undefined}
                onChangeText={(value) => {
                  onChange(value), setConfirmPassword(value);
                }}
                onBlur={onBlur}
                value={value}
                secureTextEntry={invisible}
                keyboardType="email-address"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                label={"CONFIRM PASSWORD"}
                caption={correct ? undefined : errors.passwordConfirm?.message}
                style={styles.inputBox}
                placeholder={"Confirm Password"}
                /* @ts-ignore */
                accessoryRight={(props) =>
                  correct ? <Icon pack="assets" name="radioActive" /> : null
                }
              />
            )}
          />
          <Button
            size="giant"
            children={t("title").toString()}
            status="success"
            style={styles.button}
            disabled={!isContinue}
            onPress={handleSendEmail}
          />
        </KeyboardAwareScrollView>
      </Layout>
    </Container>
  );
});

export default ChangePassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  inputBox: {
    marginBottom: 24,
  },
  button: {
    position: "absolute",
    bottom: -48,
    left: 32,
    right: 32,
  },
});
