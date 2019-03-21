import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/pcdist/',
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {name: '登录'}

        },
        {
            path: '/login',
            name: "登录",
            component: function (resolve) {
                require(['../components/login/login.vue'], resolve)
            }
        },
        {
            path: '/register',
            name: "注册",
            component: function (resolve) {
                require(['../components/login/register.vue'], resolve)
            }
        },
        {
            path: '/forget',
            name: "重置",
            component: function (resolve) {
                require(['../components/login/forget.vue'], resolve)
            }
        },
        {
            path: '/home',
            name: 'home',
            component: function (resolve) {
              require(['../components/home.vue'], resolve)
            },
            meta: {
                requiresAuth: true
            },
            children:[
                {
                    path: 'deal/:security_id',
                    name: '交易',
                    component: function (resolve) {
                      require(['../components/deal/deal.vue'], resolve)
                    }
                },
                {
                    path: 'market',
                    name: '行情',
                    component: function (resolve) {
                      require(['../components/market/market.vue'], resolve)
                    }
                },
                {
                    path: 'optional',
                    name: '自选',
                    component: function (resolve) {
                      require(['../components/optional/optional.vue'], resolve)
                    }
                },
                {
                    path: 'index',
                    name: '个人中心',
                    component: function (resolve) {
                      require(['../components/center/index.vue'], resolve)
                    },
                    children: [
                        {
                            path: 'center',
                            name: '交易',
                            component: function (resolve) {
                              require(['../components/center/center.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'recharge',
                            name: '转入',
                            component: function (resolve) {
                              require(['../components/center/recharge.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'withdraw',
                            name: '转出',
                            component: function (resolve) {
                              require(['../components/center/withdraw.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'bank',
                            name: '银行卡管理',
                            component: function (resolve) {
                              require(['../components/center/bank.vue'], resolve)
                            },
                            meta: {
                                requiresAuth: true
                            }
                        }, 
                        {
                            path: 'add_card',
                            name: '添加银行卡',
                            component: function (resolve) {
                              require(['../components/center/add_card.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'alter_card',
                            name: '修改银行卡',
                            component: function (resolve) {
                              require(['../components/center/alter_card.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'settlement',
                            name: '结算清单',
                            component: function (resolve) {
                              require(['../components/center/settlement.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'in_out_gold',
                            name: '出入金',
                            component: function (resolve) {
                              require(['../components/center/in_out_gold.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'profile',
                            name: '个人信息',
                            component: function (resolve) {
                              require(['../components/center/profile.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'security',
                            name: '账户安全',
                            component: function (resolve) {
                              require(['../components/center/security.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'real_user',
                            name: '账户安全',
                            component: function (resolve) {
                              require(['../components/center/real_user.vue'], resolve)
                            }
                        }, 
                        {
                            path: 'alter_password',
                            name: '修改密码',
                            component: function (resolve) {
                              require(['../components/center/alter_password.vue'], resolve)
                            }
                        }, 
                    ]
                }
                
            ]
        }
    ]
})
