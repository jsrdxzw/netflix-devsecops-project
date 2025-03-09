import React, { forwardRef } from "react";
import SlickSlider, { Settings } from "react-slick";

interface MySliderProps extends Settings {
  className?: string;
}

const MySlider = forwardRef<SlickSlider, MySliderProps>((props, ref) => {
  return React.createElement(SlickSlider as any, { ...props, ref });
});

export default MySlider;
