import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    //  新增修改页面状态数据
    addChangeData:{
        pageState:'新增',
        changeData:{}
    }
});

export default store;
