import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export interface ISimpleSlider {
  [x: string]: any;
}

export default function SimpleSlider(props: ISimpleSlider) {
  const { className, settings, children, selector } = props;

  return (
    <Slider ref={selector} className={`${className || ""}`} {...settings}>
      {children}
    </Slider>
  );
}
