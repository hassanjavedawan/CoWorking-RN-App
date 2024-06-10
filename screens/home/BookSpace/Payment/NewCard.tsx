import React, { memo } from "react";
import { View, Image, Animated } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import DotItem from "components/DotItem";
import useKeyboard from "hooks/useKeyboard";

const NewCard = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const { height: keyboardHeight } = useKeyboard();
  const styles = useStyleSheet(themedStyles);
  const [cardNumber, setCardNumber] = React.useState("46455686897");
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
      />
      <Content level="2">
        <View style={styles.content}>
          <Image
            source={Images.card}
            style={{
              width: 311 * (width / 375),
              height: 180 * (width / 375),
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          />
          <View style={globalStyle.flexSpaceBetween}>
            <Text marginTop={24} category="h7" uppercase>
              Hieu Le Quang
            </Text>
            <Image
              source={Images.visaCard}
              /* @ts-ignore */
              style={styles.logo}
            />
          </View>
          <View style={globalStyle.flexSpaceBetween}>
            <Text category="h6">{cardNumber.substring(0, 4)}</Text>
            <Text category="h6">{cardNumber.substring(4, 8)}</Text>
            <View style={[globalStyle.flexDirection, globalStyle.itemsCenter]}>
              <Text category="h6">{cardNumber.substring(8, 12)} </Text>
              <DotItem dotNumber={1} size="tiny-s" />
            </View>
            <DotItem dotNumber={4} size="tiny-s" style={styles.dot} />
          </View>
          <View style={styles.expDate}>
            <View>
              <Text uppercase category="h10">
                exp date
              </Text>
              <Text category="h7">12/22</Text>
            </View>
            <View>
              <Text uppercase category="h10">
                CVV
              </Text>
              <Text category="h7">468</Text>
            </View>
          </View>
        </View>
        <Input
          value={cardNumber}
          label="CARD NUMBER"
          style={styles.input}
          placeholder={"Your id card"}
          onChangeText={(value) => {
            setCardNumber(value);
          }}
        />
      </Content>
      <Animated.View
        style={[
          styles.btnDone,
          {
            bottom: Animated.subtract(keyboardHeight, 0),
          },
        ]}
      >
        <Button children="Done" status="basic" size="giant" />
      </Animated.View>
    </Container>
  );
});

export default NewCard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 32,
    paddingHorizontal: 24,
    marginTop: 40,
  },
  logo: {
    marginTop: 12,
    marginRight: -4,
    marginBottom: 20,
  },
  dot: {
    alignSelf: "center",
  },
  expDate: {
    ...globalStyle.flexSpaceBetween,
    marginTop: 21,
  },
  input: {
    marginTop: 48,
    marginHorizontal: 32,
  },
  btnDone: {
    marginHorizontal: 32,
    ...globalStyle.fitBottom,
    position: "absolute",
    right: 0,
    left: 0,
    marginBottom: 20,
  },
});
