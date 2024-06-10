import {useTheme} from '@ui-kitten/components';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  CalendarList,
  CalendarProvider,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales.fr = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
LocaleConfig.defaultLocale = 'fr';

interface CalendarProps {
  onPress?(): void;
  current?: string;
  selected?: string;
}

const CalendarComponent = memo(
  ({selected, current = '2021-11-04', onPress}: CalendarProps) => {
    const [dateSelected, setDateSelected] = useState<any>(selected);
    const [active, setActive] = useState<boolean>(false);
    const [markedDates, setMarkedDates] = useState('');
    const theme = useTheme();
    const event = {
      key: 'event',
      color: theme['text-main-color'],
      selectedDotColor: active
        ? theme['text-white-color']
        : theme['text-main-color'],
    };
    const meeting = {
      key: 'meeting',
      color: theme['text-warning-color'],
      selectedDotColor: active ? 'white' : 'blue',
    };
    const community = {
      key: 'community',
      color: theme['color-crayola-100'],
      selectedDotColor: active ? 'white' : 'blue',
    };
    const appointment = {
      key: 'appointment',
      color: theme['color-neon-100'],
      selectedDotColor: active ? 'white' : 'blue',
    };
    return (
      <View>
        <CalendarList
          style={styles.container}
          /* @ts-ignore */
          current={current}
          renderHeader={() => null}
          onDayPress={day => {
            setMarkedDates(day.dateString);
            setDateSelected(day.dateString);
            setActive(true);
          }}
          markingType={'multi-dot'}
          hideExtraDays={true}
          horizontal={true}
          pagingEnabled={true}
          markedDates={{
            [markedDates]: {
              selected: true,
              customStyles: {
                container: {
                  width: 32,
                  height: 32,
                  borderRadius: 12,
                },
              },
            },
            '2021-11-05': {
              dots: [event, meeting, community],
              selected: dateSelected === '2021-11-05',
            },
            '2021-11-08': {
              marked: true,
              selected: dateSelected === '2021-11-08',
              dots: [event, meeting],
            },
            '2021-11-09': {
              marked: true,
              selected: dateSelected === '2021-11-09',
              dots: [event],
            },
            '2021-11-10': {
              marked: true,
              selected: dateSelected === '2021-11-10',
              dots: [event],
            },
            '2021-11-11': {
              marked: true,
              selected: dateSelected === '2021-11-11',
              dots: [event, meeting, appointment],
            },
            '2021-11-16': {
              marked: true,
              selected: dateSelected === '2021-11-16',
              dots: [event, meeting],
            },
            '2021-11-17': {
              marked: true,
              selected: dateSelected === '2021-11-17',
              dots: [event, appointment],
            },
          }}
          theme={{
            calendarBackground: theme['background-basic-color-1'],
            selectedDayBackgroundColor: theme['text-main-color'],
            textDayFontFamily: 'Avenir-Medium',
            textDayHeaderFontWeight: '500',
            textDayFontWeight: '500',
            textDayHeaderFontSize: 12,
            textDayFontSize: 14,
            textDayHeaderFontFamily: 'Avenir-Medium',
            textMonthFontSize: 14,
            textMonthFontWeight: '500',
            // todayTextColor: theme["color-malachite-100"],
            todayTextColor: 'red',
            arrowWidth: 12,
            arrowHeight: 12,
          }}
        />
      </View>
    );
  },
);

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: 'rgba(141, 151, 158, 0.2)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    paddingBottom: 32,
  },
});
