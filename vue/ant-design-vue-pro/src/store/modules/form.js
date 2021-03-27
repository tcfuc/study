import router from '../../router';
import request from '../../utils/request';

const state = {
    step: {
        payAccount: "123456",
        receiveAccount: {
            type: "alipay",
            number: ""
        }
    }
}

const actions = {
    async submitStepForm({ commit }, { payload }) {
        await request({
            url: "/api/form",
            method: "POST",
            data: payload
        });
        commit('saveStrpFormData', payload);
        router.push("/form/step-form/result");
    }
}

const mutations = {
    saveStrpFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload
        };
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
