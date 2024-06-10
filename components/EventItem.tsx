import React, {memo} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import {EventProps} from 'constants/Types';
import {Images} from 'assets/images';
import dayjs from 'dayjs';
import {convertTime} from 'utils/convertTime';

interface Props {
  item: EventProps;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
}

const EventItem = memo(({item, style, onPress}: Props) => {
  let {
    image,
    title,
    timeEnd = 0,
    timeStart = 0,
    typeEnd,
    typeStart,
    date,
    book,
  } = item;

  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [isBook, setIsBook] = React.useState(book);
  const handleBook = React.useCallback(() => {
    setIsBook(!isBook);
  }, [isBook]);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Layout
        style={[
          {
            width: 280 * (width / 375),
            height: 294 * (width / 375),
          },
          style,
          styles.container,
          globalStyle.border16,
        ]}>
        <Image
          /* @ts-ignore */
          source={image[0] || Images.bg01}
          style={[
            {width: '100%', height: 160 * (width / 375)},
            globalStyle.topBorder16,
          ]}
        />
        <View style={styles.content}>
          <View style={globalStyle.flexSpaceBetween}>
            <Text category="h9-s">Workshop</Text>
            <Text category="h9-s">$25</Text>
          </View>
          <Text marginVertical={9} category="h7">
            {title}
          </Text>
          <View style={globalStyle.flexDirection}>
            <Icon name="calendar16" pack="assets" style={styles.calendar} />
            <Text category="h9-s" status="body">
              {dayjs(date).format('ddd, DD MMM')}
            </Text>
            <Layout style={styles.dot} level="6" />
            <Text category="h9-s" status="body" uppercase>
              {convertTime(timeStart)} {typeStart} -{convertTime(timeEnd)}{' '}
              {typeEnd}
            </Text>
          </View>
        </View>
      </Layout>
      <TouchableOpacity
        style={[
          styles.btnAddToHome,
          {
            backgroundColor: isBook
              ? theme['text-main-color']
              : theme['background-basic-color-2'],
          },
        ]}
        activeOpacity={0.7}
        onPress={handleBook}>
        <Icon
          pack="assets"
          name="wishlistActive"
          style={[
            styles.wishlist,
            {
              tintColor: isBook
                ? theme['text-white-color']
                : theme['text-body-color'],
            },
          ]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default EventItem;

const themedStyles = StyleService.create({
  container: {
    marginRight: 24,
  },
  btnAddToHome: {
    width: 30,
    height: 30,
    position: 'absolute',
    borderRadius: 8,
    right: 60,
    top: 16,
    justifyContent: 'center',
    zIndex: 10,
  },
  wishlist: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  calendar: {
    width: 16,
    height: 16,
    tintColor: 'text-platinum-color',
    marginTop: -2,
    marginRight: 6,
  },
  dot: {
    width: 2,
    height: 2,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
