import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';

import Text from 'components/Text';
import AnimatedAppearance from 'components/AnimatedAppearance';
import {Animation_Types_Enum} from 'constants/Types';
import {Images} from 'assets/images';

interface Props {
  index: number;
}

const Events = memo(({index}: Props) => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(Data_Events);
  return (
    <AnimatedAppearance index={index} type={Animation_Types_Enum.SlideBottom}>
      <View style={styles.container}>
        {data.map((item, i) => {
          return (
            <Layout style={[styles.item, {width: width - 64}]} key={i}>
              <Image
                source={item.image}
                style={{width: width - 64, ...globalStyle.topBorder16}}
              />
              <View style={globalStyle.padH16}>
                <View style={[globalStyle.flexSpaceBetween]}>
                  <Text category="h9-s" marginTop={16}>
                    {item.type}
                  </Text>
                  <Text category="h9-s" marginTop={16}>
                    {item.price}$
                  </Text>
                </View>
                <Text category="h7" marginTop={16}>
                  {item.title}
                </Text>
              </View>
              <View
                style={[
                  globalStyle.flexDirection,
                  globalStyle.itemsCenter,
                  globalStyle.padH16,
                ]}>
                <Icon pack="assets" name="calendar16" style={styles.calendar} />
                <Text status="body" category="h9-s" center marginTop={2}>
                  {item.time}
                </Text>
                <Text
                  marginHorizontal={8}
                  marginBottom={2}
                  center
                  status="body"
                  category="h9-s">
                  .
                </Text>
                <Text status="body" category="h9-s" marginTop={2} center>
                  {item.timeTake}
                </Text>
              </View>
            </Layout>
          );
        })}
      </View>
    </AnimatedAppearance>
  );
});

export default Events;

const themedStyles = StyleService.create({
  container: {
    marginTop: 32,
  },
  item: {
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 24,
    paddingBottom: 16,
  },
  calendar: {
    width: 16,
    height: 16,
    tintColor: 'text-platinum-color',
    marginVertical: 8,
    marginRight: 8,
  },
});
const Data_Events = [
  {
    id: 0,
    title: 'Exploring the Evolution of UX - New York Perspective',
    price: 25,
    time: 'Sun, 21 Apr',
    type: 'Workshop',
    timeTake: '4:40 PM - 7:00 PM',
    image: Images.event,
  },
  {
    id: 1,
    title: 'Exploring the Evolution of UX - New York Perspective',
    price: 30,
    type: 'Workshop',
    time: 'Sun, 25 Apr',
    timeTake: '2:40 PM - 5:00 PM',
    image: Images.event,
  },
];
