import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
  Layout,
  Modal,
} from '@ui-kitten/components';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';

import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import InputSelect from '../BasicInfomation/InputSelect';
import Card from './Card';
import useModalize from 'hooks/useModalize';
import ModalPanel from 'components/ModalPanel';
import {Data_Building, Data_JobSkill, Data_Language} from 'constants/Data';
import _, {isEmpty} from 'lodash';
import Content from 'components/Content';
import {Images} from 'assets/images';
import {RootStackParamList} from 'navigation/types';
import {useTranslation} from 'react-i18next';
import ModalSkillInfo from './ModalAddInfo';
const JobInformation = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const {t} = useTranslation('information');
  const styles = useStyleSheet(themedStyles);
  const {navigate, dispatch} =
    useNavigation<NavigationProp<RootStackParamList>>();

  const [jobTitle, setJobTitle] = React.useState<string>('UX Designer');
  const [aboutYou, setAboutYou] = React.useState<string>(aboutMe);
  const [building, setBuilding] = React.useState<string>('');
  const [linking, setLinking] = React.useState<string>(
    'www.linkedin.com/in/lehieuds/',
  );

  const [popup, setPopup] = React.useState(false);
  const [dataSkill, setDataSkill] = React.useState(Data_JobSkill);
  const [dataLanguage, setDataLanguage] = React.useState(Data_Language);
  const [dataBuilding, setDataBuilding] = React.useState(Data_Building);

  const removeLanguage = React.useCallback((item, data) => {
    const arr = _.filter(data, i => {
      return i !== item;
    });
    setDataLanguage(arr);
  }, []);
  const {
    modalizeRef: modalSkill,
    open: openSkill,
    close: closeSkill,
  } = useModalize();
  const {
    modalizeRef: modalLanguage,
    open: openLanguage,
    close: closeLanguage,
  } = useModalize();
  React.useEffect(() => {
    if (popup === true) {
      let timer1 = setTimeout(() => setPopup(false), 2000);
      let timer2 = setTimeout(() => handleNextStep(), 2000);
      timer1;
      timer2;
    } else {
    }
  }, [popup]);
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
  const handleNextStep = React.useCallback(() => {
    setPopup(false), nextScreen('Main');
  }, []);
  const handleDone = React.useCallback(() => {
    setPopup(true);
  }, []);

  const handleRemove = React.useCallback((item, data, setData) => {
    const arr = _.filter(data, i => {
      return i !== item;
    });
    setData(arr);
  }, []);

  const RenderSkill = React.useCallback(
    ({item}) => {
      const onPress = () => {
        let idx = _.find(dataSkill, i => i.id === item.id);

        if (!!idx) {
          handleRemove(item, dataSkill, setDataSkill);
        }
      };

      return <Card item={item} onPress={onPress} />;
    },
    [dataSkill],
  );
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="back" status="purple" />}
        title={
          <View>
            <Text category="h9-s" center status="body" uppercase>
              {t('step')} 2
            </Text>
            <Text category="h8-s" center marginTop={8} uppercase>
              {t('aboutMyJob')}
            </Text>
          </View>
        }
      />
      <Content
        level="2"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}>
        <View style={[{width: width - 64}]}>
          <InputSelect
            style={styles.input}
            label={t('jobTitle').toString()}
            value={jobTitle}
            onPress={() => {}}
          />
          <Input
            placeholder={t('searchSkill')}
            label={t('jobSkill').toString()}
            style={styles.input}
            accessoryRight={() => {
              return (
                <NavigationAction
                  icon="plus"
                  size="medium"
                  status="primary"
                  marginRight={-8}
                  onPress={openSkill}
                />
              );
            }}
          />
          <View style={styles.list}>
            {dataSkill.map((item, index) => {
              return <RenderSkill item={item} key={index} />;
            })}
          </View>
        </View>
        <View style={[{width: width - 64}]}>
          <Input
            placeholder={t('searchLanguage').toString()}
            label={t('language').toString()}
            style={styles.input}
            accessoryRight={() => {
              return (
                <NavigationAction
                  icon="plus"
                  size="medium"
                  status="primary"
                  marginRight={-8}
                  onPress={openLanguage}
                />
              );
            }}
          />
          <View style={styles.list}>
            {dataLanguage.map((item, index) => {
              const onPress = () => {
                let idx = _.find(dataLanguage, i => i.id === item.id);

                if (!!idx) {
                  removeLanguage(item, dataLanguage);
                }
              };
              return <Card item={item} key={index} onPress={onPress} />;
            })}
          </View>
          <Input
            placeholder={t('aboutMeDescription')}
            label={t('aboutMe').toString()}
            style={[styles.inputAbout, {height: 216 * (height / 812)}]}
            value={aboutYou}
            onChangeText={value => {
              setAboutYou(value);
            }}
            multiline={true}
          />
          <Input
            placeholder={t('linking')}
            label={t('onlinePortfolio').toString()}
            value={linking}
            onChangeText={value => setLinking(value)}
          />
          <Text marginTop={40} marginBottom={12}>
            {t('titleWorking')}
          </Text>
          <Input
            placeholder={t('searchBuilding')}
            value={building}
            onChangeText={value => setBuilding(value)}
            accessoryLeft={() => (
              <Icon pack="assets" name="building" style={styles.iconBuilding} />
            )}
          />
          <View style={styles.list}>
            {dataBuilding.map((item, index) => {
              return <Card item={item} key={index} />;
            })}
          </View>
          <Text marginTop={16} status="body" category="h9-s">
            {t('descriptionWorking')}
          </Text>
        </View>
      </Content>
      <Layout
        style={[
          globalStyle.fitBottom,
          globalStyle.topBorder24,
          styles.bottom,
          {paddingBottom: bottom + 4},
        ]}>
        <Button
          children={t('completeProfile').toString()}
          status="success"
          size="giant"
          style={globalStyle.marH24}
          onPress={handleDone}
          accessoryLeft={<Icon pack="assets" name="checkMark" />}
        />
      </Layout>
      {/*  Modal skill */}
      <ModalPanel
        data={[]}
        modalHeight={height}
        noHeader={true}
        title={''}
        renderItem={null}
        ref={modalSkill}>
        <ModalSkillInfo
          title="UX Designer Skills"
          description="I have experience with"
          data={dataSkill}
          onPress={closeSkill}
          onDone={closeSkill}
        />
      </ModalPanel>
      {/*  Modal Language */}
      <ModalPanel
        data={[]}
        modalHeight={height}
        noHeader={true}
        title={'Language'}
        renderItem={null}
        ref={modalLanguage}>
        <ModalSkillInfo
          title="Language"
          description="I know the language"
          data={dataLanguage}
          onPress={closeLanguage}
          onDone={closeLanguage}
        />
      </ModalPanel>
      {/*  Modal done */}
      <Modal visible={popup} backdropStyle={styles.backdrop}>
        <Layout style={[globalStyle.center, styles.popup]}>
          <Image source={Images.completed} />
          <Text category="h8-p" marginHorizontal={40} marginTop={24}>
            {t('saveUrProfile')}
          </Text>
        </Layout>
      </Modal>
    </Container>
  );
});

export default JobInformation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
    paddingHorizontal: 32,
  },
  topNav: {
    marginBottom: 12,
  },
  input: {
    marginTop: 40,
  },
  footerSkillList: {
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  inputAbout: {
    marginTop: 40,
    height: 100,
    maxHeight: 216,
    marginBottom: 24,
  },
  iconBuilding: {
    tintColor: 'text-placeholder-color',
  },
  bottom: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  backdrop: {
    backgroundColor: 'text-black-color',
    opacity: 0.86,
  },
  popup: {
    height: 200,
    width: 200,
    borderRadius: 24,
  },
});
const aboutMe =
  'With over 8 years in various industries including high-technology, e-commerce, the gaming industry, and consumer-eccentric industry. These days I focus on my UI and UX design work, creating beautiful looking visuals for all types of interactive products, ranging from games to apps, websites to the software.';
