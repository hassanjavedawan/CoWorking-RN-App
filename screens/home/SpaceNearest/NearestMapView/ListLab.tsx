import React, { memo } from "react";
import { StyleService } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { BookSpaceProps } from "constants/Types";
import BookLab from "components/BookLab";
import Carousel from "react-native-snap-carousel";

interface Props {
  data: BookSpaceProps[];
}

const ListLap = memo(({ data }: Props) => {
  const { width } = useLayout();
  const itemWidth = width - 80;
  const renderItem = React.useCallback(({ item }) => {
    return <BookLab item={item} />;
  }, []);

  return (
    <Carousel
      layout={"default"}
      data={data}
      sliderWidth={width}
      itemWidth={itemWidth}
      loop
      inactiveSlideShift={1}
      renderItem={renderItem}
      inactiveSlideScale={0.82}
      inactiveSlideOpacity={1}
      scrollEventThrottle={160}
    />
  );
});

export default ListLap;

const themedStyles = StyleService.create({});
