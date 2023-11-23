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
  Descriptions,
  DescriptionsItem,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
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
  Descriptions,
  DescriptionsItem,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  // 设置默认按钮大小
  vue.prototype.$ELEMENT = { size: 'small' };
  vue.prototype.$message = Message;
};
