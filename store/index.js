import {get} from '~/plugins/axios'
export const state = () => ({
    users: []
})

export const mutations = {
    setUsers(state, data) {
        state.users = data
    }
}

export const actions = {
    // 获取公用信息
    async nuxtServerInit({ commit },{ req }) {
        try {
            return Promise.resolve(req)
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async getUsers({ commit, rootState }) {
        try {
            let { data } = await get('/api/users')
            commit('setUsers', data)
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
}