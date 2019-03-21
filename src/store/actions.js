import api from "../style/api"
import lib from "../style/lib"
// console.log(lib.host)
export default {
    icrement(context, Vue) {
        return new Promise((resolve, rejects) => {
            Vue.$axios.get("/api/exponents")
            .then(res => {
                resolve(res.data)
            })
            
        }) 
    },

    getUserInfo({commit}) {
        return new Promise((resolve,rejects) => {

            api.get(`${lib.host}/api/users/8/`)
            
            .then(function(res) {
                // console.log(res)
                if(res.status == 200) {
                    commit('SAVE_USER_INFO', res.data)
                    resolve()
                }
            })
        }) 
    },

    SAVE_MARKET (context, {list_month, market_data}) {
        // console.log(market_data)
        context.commit('SCORKETID',market_data)
        context.commit('SET_LIST_MONTH',list_month)
     
    },
    
    RESET_ID ({commit}) {
        commit('RESET')
    }
}