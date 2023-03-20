import { Button, Carousel, CarouselItem, Message, DatePicker } from "element-ui";

const elementsList = [Button, Carousel, CarouselItem, DatePicker];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  vue.prototype.$message = Message;
};
