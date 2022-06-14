import { Button, Carousel, CarouselItem, Message, Radio, Form, FormItem, Input, Select, Option, Row, Col, Slider } from "element-ui";

const elementsList = [Button, Carousel, CarouselItem, Radio, Form, FormItem, Input, Select, Option, Row, Col, Slider];

export default (vue) => {
  elementsList.forEach((item) => {
    vue.use(item);
  });
  vue.prototype.$message = Message;
};
