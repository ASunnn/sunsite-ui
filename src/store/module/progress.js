import store from "../index";

const state = {
    inLoad: false
};

const mutations = {
    SET_LOAD: state => {
        state.inLoad = true;
    }
};

const actions = {
    inLoad({commit}) {
        commit('SET_LOAD');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
