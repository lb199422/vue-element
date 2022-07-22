import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./scss/base.scss";
import "element-ui/lib/theme-chalk/index.css";
import registerElement from "./utils/registerElement.js";
import { Message, MessageBox } from "element-ui";
const { confirm } = MessageBox;
Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = confirm;

registerElement(Vue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
