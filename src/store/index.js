import Vue from 'vue';
import Vuex from 'vuex';
import progress from "./module/progress";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        progress
    },

    getters: {
        progress: state => state.progress
    }
})
