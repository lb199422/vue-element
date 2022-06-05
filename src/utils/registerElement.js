import { Button, Carousel, CarouselItem, Message } from "element-ui";

const elementsList = [Button, Carousel, CarouselItem];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  vue.prototype.$message = Message;
};
