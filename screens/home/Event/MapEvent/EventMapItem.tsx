import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {StyleService, useStyleSheet, Layout, Icon} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import {Data_Event} from 'constants/Data';
import dayjs from 'dayjs';
import {convertTime} from 'utils/convertTime';
import Carousel from 'react-native-snap-carousel';
import {EventStackParamList} from 'navigation/types';
import {EventProps} from 'constants/Types';
import {Images} from 'assets/images';

interface Props {
  item: EventProps;
}

const EventMapItem = memo(({item}: Props) => {
  const styles = useStyleSheet(themedStyles);
  const {goBack, navigate} =
    useNavigation<NavigationProp<EventStackParamList>>();
  const {height, width, top, bottom} = useLayout();

  const onPress = () => navigate('EventDetails', {data: item});
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Layout style={[styles.item, {width: 311 * (width / 375)}]}>
        <Image
          source={Images.room}
          style={[
            /* @ts-ignore */
            styles.image,
            {
              width: 88 * (width / 375),
              height: 112 * (width / 375),
            },
          ]}
        />
        <View>
          <Text category="h9-s" marginTop={8}>
            Workshop
          </Text>
          <Text category="h9-s" style={styles.price}>
            {item.price}
          </Text>
          <Text category="h7" marginRight={120} numberOfLines={1} marginTop={8}>
            {item.title}
          </Text>
          <View style={styles.timeTitle}>
            <Icon pack="assets" name="calendar" style={styles.icon} />
            <Text category="h9-s" marginTop={4} status="body">
              {dayjs(item.date).format('ddd, DD MMM')}
            </Text>
          </View>
          <View style={styles.timeTitle}>
            <Icon pack="assets" name="time" style={styles.icon} />
            <Text category="h9-s" marginTop={4} status="body">
              {convertTime(item.timeStart)} {item.typeStart} -
              {convertTime(item.timeEnd)} {item.typeEnd}
            </Text>
          </View>
        </View>
      </Layout>
    </TouchableOpacity>
  );
});

export default EventMapItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },

  price: {
    position: 'absolute',
    right: 100,
    top: 8,
  },
  timeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    marginRight: 16,
    borderRadius: 16,
  },
  item: {
    borderRadius: 16,
    ...globalStyle.flexDirection,
    padding: 8,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: 'text-platinum-color',
    marginRight: 4,
  },
});

