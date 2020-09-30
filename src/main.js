import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import Login from "./template/Login.vue";
import Index from "./template/Index.vue"
import Gallery from "./template/Gallery";
import Illustrator from "./template/Illustrator";
import Circle from "./template/Circle";
import Collection from "./template/Collection";
import Type from "./template/Type";
import Post from "./template/Post";
import Upload from "./template/Upload";
import Create from "./template/Create";

Vue.use(VueRouter);
Vue.use(ElementUI, { size: 'small'});

window.path = "";

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: path + "/login",
        name: "login",
        component: Login
    }, {
        path: path + "/index",
        name: "index",
        redirect: path + "/gallery",
        component: Index
    }, {
        path: path + "/",
        redirect: path + "/gallery",
        component: Index,
        children: [{
            path: path + "/gallery",
            name: "gallery",
            component: Gallery
        }, {
            path: path + "/illustrator",
            name: "illustrator",
            component: Illustrator
        }, {
            path: path + "/circle",
            name: "circle",
            component: Circle
        }, {
            path: path + "/collection",
            name: "collection",
            component: Collection
        }, {
            path: path + "/type",
            name: "type",
            component: Type
        }, {
            path: path + "/post",
            name: "post",
            component: Post
        }, {
            path: path + "/upload",
            name: "upload",
            component: Upload
        }, {
            path: path + "/create",
            name: "create",
            component: Create
        }]
    }]
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
