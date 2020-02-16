// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// vue 的引入为绝对路径引入，绝对路径的引入必须放在相对路径之前

import Vue from 'vue';
import 'babel-polyfill';
// import ElementUI from 'element-ui';

/* eslint-disable */
import '@theme/index.css';
import './styles/s1/css/common.css';
import App from './App';
import router from './router';
import store from './store';
import newsTree from '@/common/vue/newsTree';
import recruitTree from '@/common/vue/recruitTree';
import { MAX_TAB } from '@/common/js/config';

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Spinner)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(Scrollbar)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue组件时，若同时存在el和template，则el的内容会被替换成template
// { App }类似于 { 'App': App }
// .vue 文件即为组件，可以通过 import的方式去调用。并且单文件组件data必须是个函数
// 并且组件为单独的作用域，并且子组件无法访问父组件的内容，可以通过props和事件进行交互
// 通过调用 Vue.use(Vuex)，把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
// renderFn 是components中Template的更加底层的实现，使用render函数可以用编程的方式实现模板
// 直接使用template则是以字符串声明的方式来实现
// render: h => h(App)
const vm = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
	mounted() {
	}
});

// 拿到所有有效路由
const pathArr = [];
router.options.routes.forEach( (item, index) => {
	pathArr[index] = item.path;
});

// router处理逻辑，路由开始前
router.beforeEach((to, from, next) => {
	// canNext: 路由走向是否在有效路由中: true: 存在则可跳转, false: 不存在则不跳转
	const canNext = pathArr.some( item => item === to.path);
	if (canNext) {
		const maxTab = store.state.maxTab;
		const tabs = store.state.tabs;
		if (tabs.length >= maxTab
			&& tabs.findIndex(item => item.name === to.name) === -1
			&& to.meta.parentRoute === undefined
		) {
			vm.$message({
				type: 'warning',
				message: `打开的页面多于${MAX_TAB}个，请先关闭部分tabs页`,
				duration: 1500
			});
			next(false);
		} else {
			next();
		}
	} else {
		return next(false);
	}
});

// 路由导航后，即便是异步路由，afterEach时也能够获取路由对象
router.afterEach((to, from) => {
	store.commit('routeInfo', { from, to});
	if (!to.meta.noTabs) {
		store.commit('addTabs', to);
	}
});

// 页面的第一次路由导航，页面刚进入时的导航
router.onReady(() => {
	store.commit('addTabs', router.currentRoute);
});

// 重写$message方法，修改默认持续时间为1000ms
const Messages = Vue.prototype.$message;
Vue.prototype.$message = (option) => {
	if (typeof option === 'object' && option.duration === undefined) {
		option.duration = 1000;
	} else if (typeof option === 'string') {
		if (option.type && option.type === 'success') {
			option = {
				message: option,
				duration: 1000
			}
		} else {
			option = {
				message: option,
				duration: 3000
			}
		}
	}
	return Messages(option);
}
// success warning info error
['success', 'warning', 'info', 'error'].forEach(function (type) {
	Vue.prototype.$message[type] = function (option) {
		if (typeof option === 'string' && type !== 'success') {
			option = {
				message: option,
				duration: 3000
			}
		} else {
			option = {
				message: option
			}
		}
		option.type = type;
		return Vue.prototype.$message(option);
	}
});
// close closeAll
Vue.prototype.$message.close = Messages.close;
Vue.prototype.$message.closeAll = Messages.closeAll;


// 注册全局组件，给新闻类型树使用
Vue.component('newsTree', newsTree);
Vue.component('recruitTree', recruitTree);
