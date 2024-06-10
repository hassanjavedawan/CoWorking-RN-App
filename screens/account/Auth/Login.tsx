import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useToggle from "hooks/useToggle";
import { RuleEmail, RulePassword } from "utils/rules";
import { useTranslation } from "react-i18next";

const Login = memo(() => {
  const { dispatch } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [invisible, setInvisible] = useToggle(true);
  const { t } = useTranslation("auth");
  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
          params: undefined,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const login = () => {
    nextScreen("Main");
  };

  const forgotPass = () => {
    nextScreen("ForgotPassword");
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
      password: "12345678",
    },
  });
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[globalStyle.padH32]}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
    >
      <Text category="h8" marginTop={24} marginBottom={48}>
        {t("description").toString()}
      </Text>
      <Controller
        name="email"
        rules={RuleEmail}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            status={errors.email ? "warning" : undefined}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            keyboardType="email-address"
            onTouchStart={handleSubmit(() => {})}
            onTouchEnd={handleSubmit(() => {})}
            label={"EMAIL"}
            caption={errors.email?.message}
            style={styles.inputBox}
            placeholder={t("urEmail")}
            accessoryRight={(props) =>
              errors.email ? <></> : <Icon pack="assets" name="radioActive" />
            }
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={RulePassword}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.forgotPass}
              onPress={() => forgotPass()}
            >
              <Text category="h8-p" status="body" underline>
                {"Forgot Password"}
              </Text>
            </TouchableOpacity>
            <Input
              secureTextEntry={invisible}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              status={errors.password ? "warning" : undefined}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              keyboardType="default"
              label={"PASSWORD"}
              caption={errors.password?.message}
              style={styles.inputBox}
              placeholder={t("urPass")}
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
          </View>
        )}
      />
      <Button
        children={t("common:login").toString()}
        size="giant"
        status="basic"
        onPress={() => login()}
      />
      <Text category="h8-p" status="body" center marginTop={40}>
        {t("otherLogin")}
      </Text>
      <View style={[styles.bottom, globalStyle.flexSpaceBetween]}>
        <Button
          children="Facebook"
          size="giant"
          style={[globalStyle.flexOne, styles.fb]}
          accessoryLeft={() => (
            <Icon pack="assets" name="facebook" style={styles.iconFb} />
          )}
        />
        <Button
          children="Twitter"
          size="giant"
          style={[globalStyle.flexOne, styles.twitter]}
          accessoryLeft={() => (
            <Icon pack="assets" name="twitter" style={styles.iconTwitter} />
          )}
        />
      </View>
    </KeyboardAwareScrollView>
  );
});

export default Login;

const themedStyles = StyleService.create({
  inputBox: {
    marginBottom: 24,
  },
  forgotPass: {
    position: "absolute",
    right: 0,
    zIndex: 10,
    top: -4,
  },
  fb: {
    marginRight: 8,
  },
  iconFb: {
    tintColor: "color-blue-100",
  },
  iconTwitter: {
    tintColor: "color-blue-sky-100",
  },
  bottom: {
    marginTop: 32,
  },
  twitter: {
    marginLeft: 8,
  },
});
