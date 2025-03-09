import React, { forwardRef } from "react";
import SlickSlider, { Settings } from "react-slick";

interface MySliderProps extends Settings {
  className?: string;
}

const MySlider = forwardRef<SlickSlider, MySliderProps>((props, ref) => {
  return <SlickSlider ref={ref} {...props} />;
});

export default MySlider;
