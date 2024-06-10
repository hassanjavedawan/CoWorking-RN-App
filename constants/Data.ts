import {Images} from 'assets/images';
import {
  Category_Card_Types_Enum,
  Notification_Types_Enum,
  Post_Types_Enum,
  Time_Types_Enum,
} from './Types';

export const Data_Payment = [
  {
    type: Category_Card_Types_Enum.Master,
    cardNumber: 6497,
  },
  {
    type: Category_Card_Types_Enum.Visa,
    cardNumber: 6497,
  },
  {
    type: Category_Card_Types_Enum.Master,
    cardNumber: 6497,
  },
  {
    type: Category_Card_Types_Enum.Master,
    cardNumber: 6497,
  },
];
export const DATA_COUNTRY = [
  {
    id: 0,
    name: 'Afghanistan',
  },
  {
    id: 10,
    name: 'Albania',
  },
  {
    id: 1,
    name: 'Algeria',
  },
  {
    id: 2,
    name: 'Andorra',
  },
  {
    id: 3,
    name: 'Andorra',
  },
  {
    id: 4,
    name: 'Angola',
  },
  {
    id: 5,
    name: 'Antigua and Barbuda',
  },
  {
    id: 6,
    name: 'Argentina',
  },
  {
    id: 7,
    name: 'Armenia',
  },
  {
    id: 8,
    name: 'Australia',
  },
  {
    id: 9,
    name: 'Azerbaijan',
  },
];
export const Data_Post = [
  {
    id: 0,
    name: 'Isaac Castillo',
    avatar: Images.avatar,
    time: '16 Apr 2020',
    ability: 'UX Designer',
    type: Post_Types_Enum.jobHires,
    likes: '1.2K',
    commends: '16',
    content:
      'I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached.',
  },
  {
    id: 1,
    name: 'Eunice Hayes',
    avatar: Images.avatar8,
    time: '16 Apr 2020',
    ability: 'UX Designer',
    type: Post_Types_Enum.jobHires,
    likes: '1.2K',
    commends: '16',
    content:
      'I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached.',
  },
  {
    id: 2,
    name: 'Lura Barnes',
    avatar: Images.avatar4,
    time: '16 Apr 2020',
    ability: 'UX Designer',
    type: Post_Types_Enum.jobHires,
    likes: '1.2K',
    commends: '16',
    content:
      'I need someone to write a web post about an air conditioning business. It is pretty easy. It is 1300 words. The tone should be professional but casual. More information is attached.',
  },
];
export const Data_Workspace = [
  {
    id: 0,
    title: 'CoLabs by DVORA',
    image: Images.workplace2,
    isVerified: true,
    rate: '4.7',
    quantityRate: 234,
    location: '155 2nd Street, Jersey City',
  },
  {
    id: 1,
    title: 'Spark Labs',
    image: Images.place,
    isVerified: true,
    rate: '4.9',
    quantityRate: 104,
    location: '2390 Aric Inlet Apt. 721',
  },
  {
    id: 2,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.workplace1,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 3,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.otherPlace,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 4,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.place,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 5,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.otherPlace,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 6,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.workplace2,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 7,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.workplace1,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 8,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.place,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 9,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.otherPlace,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
  {
    id: 10,
    title: 'Serendipity Labs New York – Financial District',
    image: Images.place,
    isVerified: true,
    rate: '4.5',
    quantityRate: 234,
    location: '4992 Gretchen Station',
  },
];
export const Data_Space = [
  {
    id: 0,
    title: 'The Farm Soho',
    location: '447 Broadway, NY, 10013',
    rate: '4.8',
    image: Images.place,
    quantityRate: 104,
    isVerified: true,
    howFar: '0.5mil',
    book: true,
    mapLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 1,
    title: 'CoLabs by DVORA',
    location: '155 2nd Street, Jersey City',
    rate: '4.7',
    image: Images.otherPlace,
    quantityRate: 234,
    isVerified: false,
    howFar: '0.2mil',
    book: false,
    mapLocation: {
      latitude: 37.78335,
      longitude: -122.4314,
    },
  },
  {
    id: 2,
    title: 'CoLabs by DVORA',
    location: '447 Broadway 2nd floor, NY',
    rate: '5',
    image: Images.otherPlace,
    quantityRate: 124,
    isVerified: true,
    howFar: '0.5mil',
    book: true,
    mapLocation: {
      latitude: 37.72225,
      longitude: -122.4334,
    },
  },
  {
    id: 3,
    title: 'Hunters Point Studios',
    location: '447 Broadway 2nd floor, NY',
    rate: '5',
    image: Images.placeLab,
    quantityRate: 124,
    isVerified: true,
    howFar: '0.7mil',
    book: true,
    mapLocation: {
      latitude: 37.71125,
      longitude: -122.4354,
    },
  },
  {
    id: 4,
    title: 'Servcorp the Seagram Building',
    location: '447 Broadway 2nd floor, NY',
    rate: '5',
    image: Images.placeLab1,
    quantityRate: 753,
    isVerified: true,
    howFar: '1.5mil',
    book: true,
    mapLocation: {
      latitude: 37.71225,
      longitude: -122.4124,
    },
  },
];
export const DATA_CITY = [
  {
    id: 0,
    name: 'New York',
  },
  {
    id: 1,
    name: 'Ha Noi',
  },
  {
    id: 2,
    name: 'Ho chi minh',
  },
  {
    id: 3,
    name: 'nha trang',
  },
  {
    id: 4,
    name: 'da nang',
  },
  {
    id: 5,
    name: 'Antigua',
  },
  {
    id: 6,
    name: 'Barbuda',
  },
  {
    id: 7,
    name: 'Argentina',
  },
  {
    id: 8,
    name: 'Australia',
  },
  {
    id: 9,
    name: 'Armenia',
  },
];
export const Data_Messenger = [
  {
    id: 0,
    name: 'Aasiya Jayavant',
    mess: 'Are you there?',
    time: '1m',
    avatar: Images.avatar8,
    unread: true,
  },
  {
    id: 1,
    name: 'Nayara Delafuente',
    mess: 'OK. Let me know when you done',
    time: '2h',
    avatar: Images.avatar1,
    unread: false,
  },
  {
    id: 2,
    name: 'Shen Zhi',
    mess: "Hey, I've been in the cafe...",
    time: '2h',
    avatar: Images.avatar2,
    unread: true,
  },
  {
    id: 3,
    name: 'Chikanso Chima',
    mess: "Yes. I'm on the train now",
    time: '1d',
    avatar: Images.avatar3,
    unread: false,
  },
  {
    id: 4,
    name: 'Emmalynn Mazzia',
    mess: 'Amazing!!!',
    time: 'Sun',
    avatar: Images.avatar4,
    unread: false,
  },
  {
    id: 5,
    name: 'Vicente de la Cruz',
    mess: 'Ok. Let me check. I will send...',
    time: 'Apr 5',
    avatar: Images.avatar5,
    unread: false,
  },
  {
    id: 6,
    name: 'Hector Mariano',
    mess: 'Estoy muy feliz :)',
    time: 'Mar 29',
    avatar: Images.avatar6,
    unread: false,
  },
  {
    id: 7,
    name: 'Noori El Mansur',
    mess: 'Cool, see you later',
    time: 'Mar 12',
    avatar: Images.avatar7,
    unread: false,
  },
];
export const Data_WorkspaceNear = [
  {id: 0, title: 'Serendipity Labs New York', logo: Images.workplace},
  {id: 1, title: 'Servcorp One World Trade Center', logo: Images.workplace},
  {id: 2, title: 'Serendipity Labs New York', logo: Images.workplace},
];
export const Data_Notification = [
  {
    id: 0,
    title: '2 new responses',
    description: 'on your post Get a Advise',
    avatar: Images.avatar,
    time: '2m',
    unread: true,
    type: Notification_Types_Enum.responses,
  },
  {
    id: 1,
    title: 'Online Meeting with Dev Team',
    description: '30 mins left to start',
    avatar: Images.avatar,
    time: '41m',
    unread: false,
    type: Notification_Types_Enum.meeting,
  },
  {
    id: 2,
    title: 'Eunice Hayes',
    description: 'tagged you in a post Hire for a Project',
    avatar: Images.avatar,
    time: '2h',
    unread: true,
    type: Notification_Types_Enum.commend,
  },
  {
    id: 3,
    title: 'How to become UX Designer',
    description: 'start at 2:00 PM today! You’re going',
    avatar: Images.avatar,
    time: '4h',
    unread: false,
    type: Notification_Types_Enum.event,
  },
  {
    id: 4,
    title: 'Lura Barnes',
    description: 'commented on your post.',
    avatar: Images.avatar,
    time: '1d',
    unread: false,
    type: Notification_Types_Enum.commend,
  },
  {
    id: 5,
    title: 'Eunice Hayes',
    description: 'mentioned you in your post Get a Advise123',
    avatar: Images.avatar,
    time: 'Apr 3',
    unread: true,
    type: Notification_Types_Enum.commend,
  },
  {
    id: 6,
    title: 'Herbert Edwards',
    description: 'commented on your post.',
    avatar: Images.avatar,
    time: 'Apr 3',
    unread: true,

    type: Notification_Types_Enum.commend,
  },
];
export const Data_MeetingUpcoming = [
  {
    id: 0,
    title: 'Online Meeting with Dev Team',
    time: '58:21 mins left',
    color: '#FA4169',
    position: 'Room 6A, 2nd floor, 520 Broadway',
    numberCoworker: 3,
  },
  {
    id: 1,
    title: 'How to become UX Designer',
    time: '2:00 PM - 4:00 PM',
    color: '#FFCA62',
    position: 'Room 6A, 2nd floor, 520 Broadway',
    numberCoworker: 3,
  },
  {
    id: 2,
    title: 'How to become UX Designer',
    time: '2:00 PM - 4:00 PM',
    color: '#00D65B',
    position: 'Room 6A, 2nd floor, 520 Broadway',
    numberCoworker: 3,
  },
];
export const Data_JobSkill = [
  {id: 0, title: 'UX Research', isChoose: true},
  {id: 1, title: 'Collaboration', isChoose: true},
  {id: 2, title: 'Wireframing and UI Prototyping', isChoose: true},
  {id: 3, title: 'UX Writing', isChoose: true},
  {id: 4, title: 'Visual Communication', isChoose: true},
  {id: 6, title: 'Logic and Reasoning', isChoose: false},
  {id: 7, title: 'Appetite for Knowledge', isChoose: false},
  {id: 8, title: 'User Empathy', isChoose: true},
  {id: 9, title: 'Interaction Design', isChoose: true},
  {id: 10, title: 'Coding', isChoose: true},
  {id: 11, title: 'Communication Skills', isChoose: true},
  {id: 12, title: 'Visual Communication', isChoose: true},
  {id: 13, title: 'Curiosity', isChoose: false},
  {id: 14, title: 'Storytelling and Presentation', isChoose: false},
];
export const Data_Language = [
  {id: 0, title: 'English', isChoose: true},
  {id: 1, title: 'Japan', isChoose: true},
  {id: 2, title: 'Spanish', isChoose: true},
  {id: 3, title: 'Italy', isChoose: false},
  {id: 4, title: 'German', isChoose: false},
];
export const Data_Hour = [
  {id: 0, title: 'Mon', available: '9:00 AM - 5:00 PM'},
  {id: 1, title: 'Tue', available: '9:00 AM - 5:00 PM'},
  {id: 2, title: 'Wed', available: '9:00 AM - 5:00 PM'},
  {id: 3, title: 'Thu', available: '9:00 AM - 5:00 PM'},
  {id: 4, title: 'Fri', available: '9:00 AM - 5:00 PM'},
  {id: 5, title: 'Sat', available: 'Close'},
  {id: 6, title: 'Sun', available: 'Close'},
];
export const Data_Event = [
  {
    id: 0,
    title: 'Learn How To Plan Events Like A Pro: A Virtual Masterclass',
    date: 1555827082000,
    price: '$25',
    location: '447 Broadway 2nd floor, NY, 10013',
    timeStart: 4.68,
    timeEnd: 7,
    typeStart: Time_Types_Enum.pm,
    typeEnd: Time_Types_Enum.pm,
    image: [Images.room, Images.room01, Images.room02, Images.room03],
    book: true,
    phoneNumber: '+1 917-722-5027',
    email: 'destiney.rau@hotmail.com',
    linking: 'www.thefarmsoho.com',
    mapLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
    },

    description:
      'In this hour-long webinar we will explore the impacts of pandemic on the digital world via talks with Design Specialist.Join NYC’s most engaged community of designers, developers, social change agents, artists, thought-leaders and entrepreneurs that have converged to share ideas,',
  },
  {
    id: 1,
    title: 'Infinite Power of the Breath Meditation Event',
    date: 1555827082000,
    location: '447 Broadway 2nd floor, NY, 10013',
    price: '$25',
    timeStart: 4.68,
    timeEnd: 7,
    typeStart: Time_Types_Enum.pm,
    typeEnd: Time_Types_Enum.pm,
    phoneNumber: '+1 917-722-5027',
    email: 'destiney.rau@hotmail.com',
    linking: 'www.thefarmsoho.com',
    image: [Images.room02, Images.room, Images.room02, Images.room03],
    mapLocation: {
      latitude: 37.78335,
      longitude: -122.4314,
    },

    description:
      'In this hour-long webinar we will explore the impacts of pandemic on the digital world via talks with Design Specialist.Join NYC’s most engaged community of designers, developers, social change agents, artists, thought-leaders and entrepreneurs that have converged to share ideas,',
  },
  {
    id: 2,
    title: 'How to become UX Designer',
    date: 1555827082000,
    location: '447 Broadway 2nd floor, NY, 10013',
    price: '$25',
    timeStart: 4.68,
    timeEnd: 7,
    typeStart: Time_Types_Enum.pm,
    typeEnd: Time_Types_Enum.pm,
    image: [Images.room03, Images.room01, Images.room02, Images.room],
    phoneNumber: '+1 917-722-5027',
    email: 'destiney.rau@hotmail.com',
    linking: 'www.thefarmsoho.com',
    mapLocation: {
      latitude: 37.72225,
      longitude: -122.4334,
    },
    description:
      'In this hour-long webinar we will explore the impacts of pandemic on the digital world via talks with Design Specialist.Join NYC’s most engaged community of designers, developers, social change agents, artists, thought-leaders and entrepreneurs that have converged to share ideas,',
  },
];

export const Data_Amenities = [
  {
    id: 0,
    title: 'Classic Basics',
    data: ['High-Speed WiFi', 'Heating', 'Air Conditioning'],
  },
  {
    id: 1,
    title: 'Seating',
    data: ['Standing Desks', 'Ergonomic Chairs'],
  },
  {
    id: 2,
    title: 'Equipment',
    data: [
      'Printer',
      'Scanner',
      'Photocopier',
      'Projector',
      'Apple TV',
      'Microphone',
    ],
  },
  {
    id: 3,
    title: 'Facilities',
    data: [
      'Kitchen',
      'Skype Room',
      'Personal Lockers',
      'Phone Booth',
      'Event Space For Rent',
    ],
  },
  {
    id: 4,
    title: 'Cool Stuff',
    data: [
      'Kitchen',
      'Skype Room',
      'Personal Lockers',
      'Phone Booth',
      'Event Space For Rent',
    ],
  },
];
export const Data_Building = [{id: 0, title: 'CoLab by DVORA', isChoose: true}];
export const dataTime = [
  {
    id: 1,
    time: '01',
    type: Time_Types_Enum.am,
  },
  {
    id: 2,
    time: '02',
    type: Time_Types_Enum.am,
  },
  {
    id: 3,
    time: '03',
    type: Time_Types_Enum.am,
  },
  {
    id: 4,
    time: '04',
    type: Time_Types_Enum.am,
  },
  {
    id: 5,
    time: '05',
    type: Time_Types_Enum.am,
  },
  {
    id: 6,
    time: '06',
    type: Time_Types_Enum.am,
  },
  {
    id: 7,
    time: '07',
    type: Time_Types_Enum.am,
  },
  {
    id: 8,
    time: '08',
    type: Time_Types_Enum.am,
  },
  {
    id: 9,
    time: '09',
    type: Time_Types_Enum.am,
  },
  {
    id: 10,
    time: '10',
    type: Time_Types_Enum.am,
  },
  {
    id: 11,
    time: '11',
    type: Time_Types_Enum.am,
  },
  {
    id: 12,
    time: '12',
    type: Time_Types_Enum.pm,
  },
  {
    id: 13,
    time: '13',
    type: Time_Types_Enum.pm,
  },
  {
    id: 14,
    time: '14',
    type: Time_Types_Enum.pm,
  },
  {
    id: 15,
    time: '15',
    type: Time_Types_Enum.pm,
  },
  {
    id: 16,
    time: '16',
    type: Time_Types_Enum.pm,
  },
  {
    id: 17,
    time: '17',
    type: Time_Types_Enum.pm,
  },
  {
    id: 18,
    time: '18',
    type: Time_Types_Enum.pm,
  },
  {
    id: 19,
    time: '19',
    type: Time_Types_Enum.pm,
  },
  {
    id: 20,
    time: '20',
    type: Time_Types_Enum.pm,
  },
  {
    id: 21,
    time: '21',
    type: Time_Types_Enum.pm,
  },
  {
    id: 22,
    time: '22',
    type: Time_Types_Enum.pm,
  },
  {
    id: 23,
    time: '23',
    type: Time_Types_Enum.pm,
  },
  {
    id: 24,
    time: '00',
    type: Time_Types_Enum.pm,
  },
];
