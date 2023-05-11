import {
  Button,
  Carousel,
  CarouselItem,
  Message,
  DatePicker,
  Tree,
  Select,
  Option,
} from 'element-ui';

const elementsList = [
  Button,
  Carousel,
  CarouselItem,
  DatePicker,
  Tree,
  Select,
  Option,
];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  vue.prototype.$message = Message;
};
