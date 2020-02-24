// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Select,Input,Table,TableColumn,Upload,MessageBox,Message } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Upload.name, Upload);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
// Vue.use(Button);
// Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
