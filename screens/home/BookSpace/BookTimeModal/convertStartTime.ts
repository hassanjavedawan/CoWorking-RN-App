export const convertStartTime = (
  timeStart: number | 0,
  timeEnd: number | 0
) => {
  let hour = timeStart / 80 + 1;
  let min = Math.floor(((hour - Math.floor(hour)) * 100) / (100 / 60));
  let minString = "";
  let hourEnd = hour + timeEnd / 80;
  let minEnd = Math.floor(((hourEnd - Math.floor(hourEnd)) * 100) / (100 / 60));
  let minEndString = "";
  let hourEndString = "";
  let a = "AM";
  let p = "PM";

  if (min === 60) {
    minString = "00";
  } else if (min < 10) {
    minString = `0${min}`;
  } else {
    minString = `${min}`;
  }

  if (hourEnd < 10) {
    hourEndString = `0${Math.floor(hourEnd)}`;
  } else {
    hourEndString = `${Math.floor(hourEnd)}`;
  }

  if (minEnd === 60) {
    minEndString = "00";
  } else if (minEnd < 10) {
    minEndString = `0${minEnd}`;
  } else {
    minEndString = `${minEnd}`;
  }

  return `${
    hour < 10 ? `0${Math.floor(hour)}` : Math.floor(hour)
  }:${minString} ${hour < 12 ? a : p} -  ${hourEndString}:${minEndString} ${
    hourEnd < 13 ? a : p
  }`;
};
