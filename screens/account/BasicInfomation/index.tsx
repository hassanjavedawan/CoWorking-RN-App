import React, {memo} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker';
import {View, TouchableOpacity} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Input,
  Icon,
  CheckBox,
  Datepicker,
  Layout,
  Button,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';

import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AccountStackParamList} from 'navigation/types';

import {Images} from 'assets/images';
import {Controller, useForm} from 'react-hook-form';
import dayjs from 'utils/dayjs';
import InputSelect from './InputSelect';
import {isEmpty} from 'lodash';
import {DATA_CITY, DATA_COUNTRY} from 'constants/Data';
import ModalPanel from 'components/ModalPanel';
import useModalize from 'hooks/useModalize';
import {useTranslation} from 'react-i18next';
import {Action} from 'constants/Types';

const BasicInformation = memo(() => {
  const [response, setResponse] = React.useState<ImagePickerResponse>();
  const onButtonPress = React.useCallback((type, options) => {
    ImagePicker.launchImageLibrary(options, setResponse);
  }, []);
  const actions: Action = {
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const {
    modalizeRef: modalizeCountry,
    open: openCountry,
    close: closeCountry,
  } = useModalize();
  const {
    modalizeRef: modalizeCity,
    open: openCity,
    close: closeCity,
  } = useModalize();
  const {bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [date, setDate] = React.useState(new Date());
  const themes = useTheme();
  const {navigate} = useNavigation<NavigationProp<AccountStackParamList>>();

  const [valueCountry, setValueCountry] = React.useState<string>('Viet Nam');
  const [valueCity, setValueCity] = React.useState<string>('Ha Noi');
  const [gender, setGender] = React.useState<boolean>(true);
  // const [takePhoto, choosePhoto] = useImagePicker();
  // const [image, setImage] = React.useState<CameraCapturedPicture>();
  const {t} = useTranslation('information');
  const handleNextStep = React.useCallback(() => {
    navigate('JobInformation');
  }, []);
  const {
    control,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      fullname: 'Isaac Castillo',
      phoneNumber: '414-753-4679',
      instagram: '',
      facebook: '',
      twitter: '',
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction />}
        title={
          <View>
            <Text category="h9-s" center status="body" uppercase>
              {t('step')} 1
            </Text>
            <Text category="h8-s" center marginTop={8} uppercase>
              {t('myInfo')}
            </Text>
          </View>
        }
      />
      <Layout level="2">
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>
            {response?.assets ? (
              <Avatar source={{uri: response.assets[0].uri}} size="giant" />
            ) : (
              <Avatar source={Images.avatar} size="giant" />
            )}
            <TouchableOpacity
              onPress={() => onButtonPress(actions.type, actions.options)}
              activeOpacity={0.7}
              style={[
                styles.pickImg,
                {backgroundColor: themes['color-main-100']},
              ]}>
              <Icon name="edit16" pack="assets" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={t('fullName').toString()}
                style={styles.input}
                placeholder="Your Name"
              />
            )}
            name="fullname"
          />
          <Text
            marginLeft={32}
            marginTop={32}
            category="h9"
            status="body"
            uppercase>
            {t('gender')}
          </Text>
          <View style={styles.checkboxView}>
            <CheckBox
              onChange={() => setGender(true)}
              checked={gender === true ? true : false}
              style={styles.checkbox}
              children={t('male').toString()}
            />
            <CheckBox
              onChange={() => setGender(false)}
              checked={!gender}
              children={t('female').toString()}
            />
          </View>
          <Datepicker
            style={globalStyle.marH32}
            size="medium"
            label={t('dob').toString()}
            status="basic"
            placeholder=""
            onSelect={nextDate => setDate(nextDate)}
            accessoryLeft={props => (
              <View style={globalStyle.flexDirection}>
                <Icon {...props} name="dob" pack="assets" />
                <Text center marginLeft={12} category="h8-s" marginTop={4}>
                  {dayjs(date).format('DD/MM/YYYY')}
                </Text>
              </View>
            )}
          />
          <InputSelect
            style={styles.input}
            label={t('countryRegion').toString()}
            value={valueCountry}
            onPress={() => openCountry()}
          />
          <InputSelect
            style={styles.input}
            label={t('city').toString()}
            value={valueCity}
            onPress={() => openCity()}
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="number-pad"
                label={t('mobilePhone').toString()}
                style={styles.input}
                placeholder={'Your Phone'}
                textContentType="telephoneNumber"
                // autoCompleteType="tel"
                dataDetectorTypes="phoneNumber"
              />
            )}
            name="phoneNumber"
          />
          <Text category="h6" status="black" marginLeft={32} marginTop={56}>
            {t('socialAccount')}
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                accessoryRight={
                  isEmpty(watch('facebook'))
                    ? () => (
                        <Text status="platinum" category="h9-s">
                          {t('optional')}
                        </Text>
                      )
                    : undefined
                }
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.input}
                keyboardType="email-address"
                label={'FACEBOOK'}
              />
            )}
            name="facebook"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={'INSTAGRAM'}
                style={styles.input}
                accessoryRight={
                  isEmpty(watch('instagram'))
                    ? () => (
                        <Text status="platinum" category="h9-s">
                          {t('optional')}
                        </Text>
                      )
                    : undefined
                }
              />
            )}
            name="instagram"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={'TWITTER'}
                style={styles.input}
                accessoryRight={
                  isEmpty(watch('twitter'))
                    ? () => (
                        <Text status="platinum" category="h9-s">
                          {t('optional')}
                        </Text>
                      )
                    : undefined
                }
              />
            )}
            name="twitter"
          />
        </KeyboardAwareScrollView>
      </Layout>
      <ModalPanel
        ref={modalizeCountry}
        data={DATA_COUNTRY}
        title={t('country')}
        searchProps={{
          accessoryLeft: props => (
            <Icon {...props} pack="assets" name="search" />
          ),
          placeholder: 'Search...',
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalButton}
            onPress={() => {
              setValueCountry(item.name), closeCountry();
            }}>
            <Text status="black" category="h7-p">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ModalPanel
        data={DATA_CITY}
        title={t('city')}
        searchProps={{
          accessoryLeft: props => (
            <Icon {...props} pack="assets" name="search" />
          ),
          placeholder: 'Search...',
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalButton}
            onPress={() => {
              setValueCity(item.name), closeCity();
            }}>
            <Text capitalize status="black" category="h7-p">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ref={modalizeCity}
      />
      <Layout
        style={[
          globalStyle.fitBottom,
          globalStyle.topBorder24,
          styles.bottom,
          {paddingBottom: bottom + 4},
        ]}>
        <Button
          children={t('aboutMyJob').toString()}
          status="basic"
          size="giant"
          style={globalStyle.marH24}
          onPress={handleNextStep}
        />
      </Layout>
    </Container>
  );
});

export default BasicInformation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    marginBottom: 12,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52,
    marginBottom: 56,
  },
  checkboxView: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingTop: 16,
    marginBottom: 32,
  },
  pickImg: {
    width: 32,
    height: 32,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    position: 'absolute',
    bottom: -16,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: 'color-basic-100',
  },
  iconModal: {
    marginRight: 8,
  },
  checkbox: {
    paddingRight: 91,
  },
  modalButton: {
    marginVertical: 24,
  },
  input: {
    marginTop: 24,
    marginHorizontal: 32,
    borderWidth: 0,
  },
  contentContainerStyle: {
    paddingBottom: 180,
  },
  bottom: {
    paddingTop: 16,
  },
});
