import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "../views/Login.vue";
import Index from "../views/Index.vue"
import Gallery from "../views/main/Gallery";
import Illustrator from "../views/secondary/Illustrator";
import Work from "../views/secondary/Work";
import Circle from "../views/secondary/Circle";
import Book from "../views/secondary/Book";
import Collection from "../views/secondary/Collection";
import Pool from "../views/secondary/Pool";
import Type from "../views/secondary/Type";
import List from "../views/secondary/List";
import Post from "../views/main/Post";
import Upload from "../views/main/Upload";
import Create from "../views/main/Create";
import store from "../store/index"
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

window.host = "";
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
            path: path + "/work/:name",
            name: "work",
            component: Work
        }, {
            path: path + "/circle",
            name: "circle",
            component: Circle
        }, {
            path: path + "/book/:name",
            name: "book",
            component: Book
        }, {
            path: path + "/collection",
            name: "collection",
            component: Collection
        }, {
            path: path + "/pool/:seq",
            name: "pool",
            component: Pool
        }, {
            path: path + "/type",
            name: "type",
            component: Type
        }, {
            path: path + "/list/:name",
            name: "list",
            component: List
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

router.beforeEach(async (to, from, next) => {
    if (store.getters.progress.inLoad) {
        NProgress.configure({parent: '.main'});
    } else {
        NProgress.configure({parent: 'body'});
    }
    NProgress.start();
    next();
    NProgress.done();
});

export default router;
