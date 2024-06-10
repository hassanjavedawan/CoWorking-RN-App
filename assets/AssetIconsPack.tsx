import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { IconPack, IconProvider } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";
import { Icons } from "./icons";

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: (props) => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetIconsPack: IconPack<ImageProps | SvgProps> = {
  name: "assets",
  icons: {
    moreActive: createIcon(Icons.moreActive),
    moreNormal: createIcon(Icons.moreNormal),
    back: createIcon(Icons.back),
    facebook: createIcon(Icons.facebook),
    twitter: createIcon(Icons.twitter),
    eyeOff: createIcon(Icons.eyeOff),
    eyeOn: createIcon(Icons.eyeOn),
    radioActive: createIcon(Icons.radioActive),
    edit16: createIcon(Icons.edit16),
    dob: createIcon(Icons.dob),
    search: createIcon(Icons.search),
    plus: createIcon(Icons.plus),
    building: createIcon(Icons.building),
    nearest: createIcon(Icons.nearest),
    event: createIcon(Icons.event),
    eventDate: createIcon(Icons.eventDate),
    calendar16: createIcon(Icons.calendar16),
    calendar: createIcon(Icons.calendar),
    pinMap: createIcon(Icons.pinMap),
    seat: createIcon(Icons.seat),
    homeNormal: createIcon(Icons.homeNormal),
    homeActive: createIcon(Icons.homeActive),
    communityActive: createIcon(Icons.communityActive),
    communityNormal: createIcon(Icons.communityNormal),
    inboxActive: createIcon(Icons.inboxActive),
    inboxNormal: createIcon(Icons.inboxNormal),
    notification: createIcon(Icons.notification),
    notificationActive: createIcon(Icons.notificationActive),
    setting: createIcon(Icons.setting),
    comment: createIcon(Icons.comment),
    option: createIcon(Icons.option),
    findFriend: createIcon(Icons.findFriend),
    wishlistActive: createIcon(Icons.wishlistActive),
    rate: createIcon(Icons.rate),
    careTeam: createIcon(Icons.careTeam),
    verified: createIcon(Icons.verified),
    unverified: createIcon(Icons.unverified),
    distance: createIcon(Icons.distance),
    like: createIcon(Icons.like),
    likeActive: createIcon(Icons.likeActive),
    commend: createIcon(Icons.commend),
    add16: createIcon(Icons.add16),
    roomIc: createIcon(Icons.roomIc),
    alarm: createIcon(Icons.alarm),
    note: createIcon(Icons.note),
    filter: createIcon(Icons.filter),
    resetSearch: createIcon(Icons.resetSearch),
    currentLocation: createIcon(Icons.currentLocation),
    trash: createIcon(Icons.trash),
    time: createIcon(Icons.time),
    share: createIcon(Icons.share),
    securePay: createIcon(Icons.securePay),
    amenities: createIcon(Icons.amenities),
    phone: createIcon(Icons.phone),
    website: createIcon(Icons.website),
    quote: createIcon(Icons.quote),
    price: createIcon(Icons.price),
    repeat: createIcon(Icons.repeat),
    security: createIcon(Icons.security),
    minus: createIcon(Icons.minus),
    close: createIcon(Icons.close),
    pencil: createIcon(Icons.pencil),
    project: createIcon(Icons.project),
    sale: createIcon(Icons.sale),
    attach: createIcon(Icons.attach),
    photoLibrary: createIcon(Icons.photoLibrary),
    cameraBlack: createIcon(Icons.cameraBlack),
    send: createIcon(Icons.send),
    help: createIcon(Icons.help),
    checkMark: createIcon(Icons.checkMark),
  },
};
export default AssetIconsPack;
