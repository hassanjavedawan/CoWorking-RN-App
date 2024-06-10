import React, {memo} from 'react';
import {View} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  Input,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';

import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import OptionSpace from './OptionSpace';
import InputSelect from 'screens/account/BasicInfomation/InputSelect';
import dayjs from 'utils/dayjs';
import useModalize from 'hooks/useModalize';
import ModalPanel from 'components/ModalPanel';
import Calendar from 'components/CalendarComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackParamList} from 'navigation/types';
import {useTranslation} from 'react-i18next';

const BookSpace = memo(() => {
  const {t} = useTranslation(['bookSpace', 'common']);
  const {goBack, navigate} =
    useNavigation<NavigationProp<RootStackParamList>>();
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {
    open: openDate,
    close: closeDate,
    modalizeRef: refDate,
  } = useModalize();
  const {
    open: openTime,
    close: closeTime,
    modalizeRef: refTime,
  } = useModalize();

  const [space, setSpace] = React.useState('New York, NY, USA');
  const [timeRange, setTimeRange] = React.useState('09:00 AM - 10:30 AM');
  const [numberOfPerson, setNumberOfPerson] = React.useState<number>(4);
  const [date, setDate] = React.useState(new Date(1618118793000));
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isContinue, setContinue] = React.useState(false);
  React.useEffect(() => {
    if (selectedIndex !== 0) {
      setContinue(false);
    } else setContinue(true);
  }, [selectedIndex]);
  const onSelect = React.useCallback(num => {
    setSelectedIndex(num);
  }, []);

  const handleCheckAvailability = React.useCallback(() => {
    navigate('BookSpaceNavigator', {screen: 'BookSpaceResult'});
  }, []);
  const openBookTime = React.useCallback(() => {
    navigate('BookTimeModal');
  }, []);
  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        style={{paddingTop: top + 8}}
        accessoryLeft={
          <NavigationAction icon="back" status="primary" marginBottom={8} />
        }
        title={
          <Text uppercase category="h8-s" marginTop={40}>
            {t('title')}
          </Text>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text category="h9" status="body" uppercase>
          {t('roomCaption')}
        </Text>
        <View style={[styles.bookOption, globalStyle.flexSpaceBetween]}>
          <OptionSpace
            title={t('desk')}
            isChoose={selectedIndex === 1}
            num={1}
            onPress={onSelect}
          />
          <OptionSpace
            title={t('privateOffice')}
            isChoose={selectedIndex === 2}
            num={2}
            onPress={onSelect}
          />
          <OptionSpace
            title={t('meetingRoom')}
            isChoose={selectedIndex === 3}
            num={3}
            onPress={onSelect}
          />
        </View>
        <InputSelect
          label={t('spaceCaption').toString()}
          value={space}
          status="primary"
          size="medium"
          style={styles.btnModal}
          accessoryLeft={<Icon pack="assets" name="pinMap" />}
        />
        <InputSelect
          label={t('dateCaption').toString()}
          status="primary"
          size="medium"
          value={dayjs(date).format('ddd, DD MMM YYYY')}
          style={styles.btnModal}
          accessoryLeft={<Icon pack="assets" name="calendar" />}
          onPress={openDate}
        />
        <InputSelect
          label={t('timeCaption').toString()}
          value={timeRange}
          status="primary"
          size="medium"
          style={styles.btnModal}
          accessoryLeft={<Icon pack="assets" name="time" />}
          onPress={openBookTime}
        />
        <Input
          label={t('personCaption').toString()}
          size="medium"
          status="primary"
          value={numberOfPerson.toString()}
          accessoryLeft={<Icon pack="assets" name="seat" />}
        />
        <Button
          children={t('button').toString()}
          status="basic"
          size="giant"
          style={styles.checkAvai}
          onPress={handleCheckAvailability}
        />
      </KeyboardAwareScrollView>

      <ModalPanel
        data={[]}
        title={dayjs(date).format('ddd, DD MMM YYYY')}
        ref={refDate}
        modalHeight={height / 1.48}
        renderItem={() => null}>
        <View>
          <Calendar current="2021-11-04" />
          <Button
            children={t('common:done').toString()}
            size="giant"
            status="basic"
            style={styles.btnDone}
            onPress={closeDate}
          />
        </View>
      </ModalPanel>
    </Container>
  );
});

export default BookSpace;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 40,
    backgroundColor: 'background-basic-color-2',
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  bookOption: {
    marginTop: 16,
    marginBottom: 24,
  },
  btnModal: {
    marginBottom: 24,
  },
  btnDone: {
    marginHorizontal: 32,
    bottom: 24,
  },
  checkAvai: {
    marginTop: 24,
  },
});
