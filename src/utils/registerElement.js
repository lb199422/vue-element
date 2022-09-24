import { Button, Carousel, CarouselItem, Message, Radio, Form, FormItem, Input, Select, Option, Row, Col, Slider, Drawer, Dialog, Upload, Tree, Table, TableColumn, Icon, Steps, Step } from "element-ui";

const elementsList = [Button, Carousel, CarouselItem, Radio, Form, FormItem, Input, Select, Option, Row, Col, Slider, Drawer, Dialog, Upload, Tree, Table, TableColumn, Icon, Steps, Step];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  vue.prototype.$message = Message;
};
