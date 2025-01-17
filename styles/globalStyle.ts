import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  itemsCenter: {
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fitBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  //Shadow
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,
  },
  shadowFade: {
    shadowColor: "rgba(120, 121, 121, 0.06)",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 10,
  },

  //Border
  border12: {
    borderRadius: 12,
  },
  border16: {
    borderRadius: 16,
  },
  topBorder16: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomBorder16: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topBorder24: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomBorder24: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topBorder28: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  bottomBorder28: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  //margin , padding
  padH24: {
    paddingHorizontal: 24,
  },
  padH16: {
    paddingHorizontal: 16,
  },
  marH24: {
    marginHorizontal: 24,
  },
  padH32: {
    paddingHorizontal: 32,
  },
  marH32: {
    marginHorizontal: 32,
  },
  padV24: {
    paddingVertical: 24,
  },
  marV24: {
    marginVertical: 24,
  },
  padV32: {
    paddingVertical: 32,
  },
  marV32: {
    marginVertical: 32,
  },

  //flex
  flexSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexDirection: {
    flexDirection: "row",
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
});
