import {
  Button,
  Carousel,
  CarouselItem,
  Message,
  DatePicker,
  Tree,
  Select,
  Option,
  Popover,
  Icon,
  Drawer,
  Input,
  Form,
  FormItem,
} from 'element-ui';

const elementsList = [
  Button,
  Carousel,
  CarouselItem,
  DatePicker,
  Tree,
  Select,
  Option,
  Popover,
  Icon,
  Drawer,
  Input,
  Form,
  FormItem,
];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  vue.prototype.$message = Message;
};
