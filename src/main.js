import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/fontawesome-free-5.13.0-web/css/all.min.css';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue';
import routes from './route';


import Rest from './rest/rest_js';


Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);


// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading);



Vue.config.productionTip = false;

const rest = new Rest();

Vue.prototype.$rest = rest;


const router = new VueRouter({
    routes: routes
});


const paths = [
    '/',
    '/reg'
];


router.beforeEach(async (to, from, next) => {    
    if (paths.includes(from.path) || paths.includes(to.path)) {
        next();
        return;
    }
    
    const resp = await rest.checkLogin();
    if (resp.errorText) {
        next('/');
    } else {
        next();
    }
});




const instance = new Vue({
    extends: App,
    router: router
});

instance.$mount('#app');