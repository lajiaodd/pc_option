export default {
    changeLogin (state, token) {
        state.token = token;

        localStorage.setItem('TOKEN', token)
        
    },
    SCORKETID (state, market_data) {
        state.market_data = market_data
        // console.log("market_data")
        // console.log(market_data)
        
        let data = []//储存合约IDh和期权合约简称
        let contract_lists = []
        if(market_data) {
            market_data.forEach(element => {
                element.forEach((item)=> {
                    item.forEach((e)=> {
                        if(e.security_id !== undefined ) {//去掉执行价 50ETF生成的未定义
                            //获取所有合约id
                            let m = {security_id: '' , contract_str: ''} 
                            m.security_id = e.security_id
                            m.contract_str = e.contract_str
                            data.push(m)
                            //把所有合约数据放入一个数组
                            contract_lists.push(e)
                        }
                    });
                });
            })
        }
        // console.log(contract_lists)
        // console.log(2222)
        state.arr_security_id = data
        state.contract_lists = contract_lists
    },
    RESET (state) {
        state.market_data = null;
        state.list_month = null;
    },
    SET_LIST_MONTH(state, arr_list_month) {
        state.list_month = arr_list_month
    },
    //个体头部margin-top 加一个系统状态栏高度
    HEADER_PAD_TOP(state, t) {
        // console.log("t")
        // console.log(t)
        state.header_padding_top = t
    },
    //监听plusReady
    SET_PLUSREADY(state, p) {
        state.isplusReady = p
    },

    SAVE_USER_INFO(state, users) {

        // console.log("users")
        // console.log(users)
        state.user.first_name = users.first_name
        state.user.is_active = users.is_active
        state.user.username = users.username
        state.user.account_fund = Number(users.account_fund).toFixed(2)
        state.user.yes_fund = users.yes_fund

        state.user.status = users.status
        state.user.status_before = users.status_before
        state.user.identity_card = users.identity_card
        state.user.id_front_image = users.id_front_image
        state.user.id_back_image = users.id_back_image

        state.user.bank_card = users.bank_card
        state.user.bank_name = users.bank_name
        state.user.open_city = users.open_city
        state.user.open_city_pc_id = users.open_city_pc_id
        state.user.bank_branch = users.bank_branch
        state.user.alipay_image = users.alipay_image
        state.user.wechat_image = users.wechat_image

        
        
    },

    RESET_USER_INFO(state) {
        state.user.first_name = ''
        state.user.username = '点击跳转登录'
        state.user.account_fund = '0.0000'

        state.user.status = '未开户'
        state.user.status_before = ''
        state.user.identity_card = ''
        state.user.id_front_image = ''
        state.user.id_back_image = ''

        state.user.bank_card = ''
        state.user.bank_name = ''
        state.user.open_city = ''
        state.user.bank_branch = ''
        state.user.alipay_image = ''
        state.user.wechat_image = ''
    }


}