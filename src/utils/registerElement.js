import { Button, Carousel, CarouselItem } from "element-ui";

const elementsList = [Button, Carousel, CarouselItem];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
};
