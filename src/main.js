import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import Login from "./views/Login.vue";
import Index from "./views/Index.vue"
import Gallery from "./views/primary/Gallery";
import Illustrator from "./views/secondary/Illustrator";
import Circle from "./views/secondary/Circle";
import Collection from "./views/secondary/Collection";
import Type from "./views/secondary/Type";
import Post from "./views/primary/Post";
import Upload from "./views/primary/Upload";
import Create from "./views/primary/Create";

Vue.use(VueRouter);
Vue.use(ElementUI, { size: 'small'});

window.host = "http://localhost:8086";
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
            path: path + "/post/:seq",
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
}).$mount('#app');
