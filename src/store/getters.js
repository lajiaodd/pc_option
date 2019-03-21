export default {
    //获取单个月份行情
    marketOne: (state, getters) => (id) =>{
        return (state.market_data[id])
    },
    getEtf: (state, getters) => (id, i) =>{
        if(state.market_data) {
            return (state.market_data[id][i])
        }else {
            return ['']
        }
    },
    //获取单个页面合约数据
    security: (state, getters) => (security_id) => {
        let data = ''
        if(state.market_data) {
            state.market_data.forEach(element => {
                  element.forEach((item)=> {
                        item.forEach((e)=> {
                            if(e.security_id == security_id) {
                                data = e
                            }
                        });
                  });
            })
        }

        return data
    },

}