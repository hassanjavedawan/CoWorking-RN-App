import React, {memo} from 'react';
import {View} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {CalendarDetailsNavigationProps} from 'navigation/types';
import NavigationAction from 'components/NavigationAction';
import dayjs from 'dayjs';
import {convertTime} from 'utils/convertTime';
import ListPerson from './ListPerson';
import {useTranslation} from 'react-i18next';

interface ItemProps {
  title?: string;
  icon: string;
  marginBottom?: number;
  marginTop?: number;
}

const CalendarDetails = memo(() => {
  const {t} = useTranslation('calendar');
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<CalendarDetailsNavigationProps>();
  const data = route.params.data;
  const Item = React.useCallback(
    ({title, icon, marginTop, marginBottom}: ItemProps) => {
      return (
        <View
          style={[
            globalStyle.flexDirection,
            globalStyle.itemsCenter,
            {
              height: 42 * (width / 375),
              marginTop: marginTop,
              marginBottom: marginBottom,
            },
          ]}>
          <Icon pack="assets" name={icon} style={styles.icon} />
          <Text category="h7-p" marginLeft={24} marginTop={10}>
            {title}
          </Text>
        </View>
      );
    },
    [],
  );
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={<NavigationAction icon={'option'} />}
        accessoryLeft={<NavigationAction />}
      />
      <View style={[globalStyle.flexDirection]}>
        <View style={styles.tag} />
        <Text category="h6" marginTop={32} marginLeft={24}>
          {data.title}
        </Text>
      </View>
      <Content padder contentContainerStyle={styles.content}>
        <Item
          title={dayjs(data.date).format('dddd, DD MMM YYYY')}
          icon="eventDate"
        />
        <View style={[globalStyle.flexDirection]}>
          <Text
            category="h7-p"
            marginLeft={48}
            marginTop={14}
            marginBottom={24}>
            {convertTime(data.timeStart)} - {convertTime(data.timeEnd)}
          </Text>
        </View>
        <View style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="building" style={styles.icon} />
          <View>
            <Text category="h7-p" marginLeft={24}>
              {data.building}
            </Text>
            <Text category="h7-p" marginLeft={24}>
              {data.location}
            </Text>
          </View>
        </View>
        <Item title={data.room} icon="roomIc" marginBottom={16} />
        <Item title={'30 mins before'} icon="alarm" marginBottom={16} />
        <View style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="seat" style={[styles.iconSeat]} />
          <ListPerson data={data.personInEvent} style={styles.listPerson} />
        </View>
        <View style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="note" style={[styles.icon]} />
          <Text category="h7-p" marginLeft={24}>
            {t('prepareReport')}
          </Text>
        </View>
      </Content>
    </Container>
  );
});

export default CalendarDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 28,
    paddingBottom: 120,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'text-body-color',
  },
  iconSeat: {
    width: 24,
    height: 24,
    tintColor: 'text-body-color',
    marginTop: 12,
  },
  room: {
    marginTop: 10,
    marginBottom: 24,
  },
  listPerson: {
    marginLeft: 24,
    marginBottom: 16,
  },
  tag: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    width: 16,
    height: 37,
    marginLeft: -8,
    marginTop: 27,
    backgroundColor: 'text-neon-color',
  },
});
