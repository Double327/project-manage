import {getToken, removeToken, setToken} from '@/utils/token';
import {getUserInfo, login, logout} from "@/api/login";

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: '',
        permissions: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },
    actions: {
        Login({commit}, info) {
            return new Promise((resolve, reject) => {
                login(info).then(res => {
                    setToken(res.token);
                    commit('SET_TOKEN', res.token);
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            });
        },
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(res => {
                    const user = res.user;
                    const avatar = user.avatar == "" ? 'default.gif' : user.avatar;
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles);
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.name);
                    commit('SET_AVATAR', avatar);
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    commit('SET_PERMISSIONS', []);
                    removeToken();

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
}

export default user;
