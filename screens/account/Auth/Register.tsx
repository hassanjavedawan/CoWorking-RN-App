import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Icon,
} from "@ui-kitten/components";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootStackParamList } from "navigation/types";
import useToggle from "hooks/useToggle";
import { RuleEmail, RulePassword } from "utils/rules";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

const Register = memo(() => {
  const { navigate, dispatch } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { width } = useLayout();
  const { t } = useTranslation("auth");
  const styles = useStyleSheet(themedStyles);
  const [invisible, setInvisible] = useToggle(true);
  const [isContinue, setIsContinue] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("lehieuds@gmail.com");
  const [password, setPassword] = React.useState<string>("12345678");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      password: password,
    },
  });
  React.useEffect(() => {
    if (errors.email || errors.password) {
      setIsContinue(false);
    } else {
      setIsContinue(true);
    }
  }, [errors.email, errors.password, isContinue]);
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
  const handleRegister = React.useCallback(() => {
    navigate("SuccessScr", {
      data: {
        image: Images.logo,
        title: t("welcome"),
        buttonsViewStyle: { width: width - 64 },
        description: t("successRegister"),
        children: [
          {
            title: t("goHomePage"),
            onPress: () => login(),
            status: "primary",
          },
          {
            title: t("completeProfile"),
            onPress: () => navigate("Account", { screen: "BasicInformation" }),
            status: "basic",
          },
        ],
      },
    });
  }, []);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[globalStyle.padH32]}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
    >
      <Text category="h8" marginTop={24} marginBottom={48}>
        {t("welcome")}
      </Text>
      <Controller
        name="email"
        rules={RuleEmail}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
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
          );
        }}
      />

      <Controller
        name="password"
        control={control}
        rules={RulePassword}
        render={({ field: { onChange, onBlur, value } }) => (
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
            placeholder={"Your Password"}
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
      <Button
        children="Register"
        size="giant"
        status="basic"
        disabled={!isContinue}
        onPress={handleRegister}
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
          style={globalStyle.flexOne}
          accessoryLeft={() => (
            <Icon pack="assets" name="twitter" style={styles.iconTwitter} />
          )}
        />
      </View>
    </KeyboardAwareScrollView>
  );
});

export default Register;

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
    marginRight: 16,
  },
  iconFb: {
    tintColor: "color-blue-100",
  },
  iconTwitter: {
    tintColor: "color-blue-sky-100",
  },
  bottom: {
    marginTop: 32,
    marginBottom: 54,
  },
});
