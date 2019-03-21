<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">个人中心</span>
        </div>
         <Divider type="horizontal" />

         <div class="center-content">
            <div class="center-content-list" style="">
                <Row>
                    <Col span="6">
                        <p>权益</p>
                        <p>{{rights_interests}}</p>
                    </Col>
                    <Col span="6">
                        <p>可用资金</p>
                        <p>{{account_fund}}</p>
                    </Col>
                    <Col span="6">
                        <p>平盈</p>
                        <p>{{flatSurpkus}}</p>
                    </Col>
                    <Col span="6">
                        <p>入金</p>
                        <p>{{golden}}</p>
                    </Col>
                </Row>
                <Divider type="horizontal" />
                <Row>
                    <Col span="6">
                        <p>昨结</p>
                        <p>{{yes_fund}}</p>
                    </Col>
                    <Col span="6">
                        <p>税费</p>
                        <p>{{taxes_dues}}</p>
                    </Col>
                    <Col span="6">
                        <p>浮盈</p>
                        <p>{{float_profit}}</p>
                    </Col>
                    <Col span="6">
                        <p>出金</p>
                        <p>{{withdraw}}</p>
                    </Col>
                </Row>
                <div class="buy-sell-btn">
                    <Button :size="buttonSize" type="success" to="/home/index/recharge">转入</Button>
                    <Button :size="buttonSize" type="warning" to="/home/index/withdraw">转出</Button>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',
            merge_hold_postions:[],
            flatSurpkus:'--',//平盈
            golden:'--', //入金
            taxes_dues:'--',// 税费
            floating_profit: '--', //浮盈
            withdraw: '--', //出金
            time:1000,
            pageTimer: {},

        };
    },
    computed: {
        account_fund() {
            return this.$store.state.user.account_fund
        },
        securityData: {
            get () {
                // console.log(555)
                // console.log(this.$store.getters.security(this.security_id))
                return this.$store.getters.security(this.security_id)
            },
            set (value) {}
        },
        // 获取合并持仓市值
        merge_market_value () {
            return function (security_id, sum_position, avg_price) {
                //市值 = 当前价* 合约笔数*合约单位
                let security = this.$store.getters.security(security_id)
                console.log("security")
                console.log(security)
                let market_value  = (sum_position*security.current_price*security.contract_unit).toFixed(2)
                return market_value
            }
        },
        //权益
        rights_interests() {
            let result_rights_interests = 0
            this.merge_hold_postions.forEach(item => {
                let result = this.merge_market_value(item.security_id, item.sum_position, item.avg_price)
                result_rights_interests += Number(result)
            });
            console.log(result_rights_interests)
            result_rights_interests += Number(this.account_fund)
            return result_rights_interests.toFixed(2)

        },
        //昨结
        yes_fund: function() {
            if(this.$store.state.user.yes_fund) {
                return Number(this.$store.state.user.yes_fund).toFixed(2)
            }else {
                return 0.00
            }
        },
        // 获取合并盈亏
        merge_profit_loss () {
            return function (security_id, sum_position, avg_price) {
                let security = this.$store.getters.security(security_id)
                let market_value  = (Math.round((security.current_price-avg_price)*sum_position*security.contract_unit*100)/100).toFixed(2)
                return market_value
            }
        },
        //浮盈
        float_profit() {
            let result_float_profit = 0.00
            this.merge_hold_postions.forEach(item => {
                let result = this.merge_profit_loss(item.security_id, item.sum_position, item.avg_price)
                result_float_profit += Number(result)
            });
            return result_float_profit.toFixed(2)
        },
    },
    created() {
        this.getPositionsMergeList() //合并持仓
        this.get_close_fund_group()
        this.get_fund_deposit_group()
        this.get_fund_withdraw_group()
        this.get_trans_commission_group()
    },
    methods: {
        getPositionsMergeList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/position_group/`)
            .then(function(res) {
                if(res.status == 200) {
                    app.merge_hold_postions = res.data
                    app.pageTimer.timer_0 = setTimeout(function() {
                        app.getPositionsMergeList()
                    }, app.time)
                    console.log(33)
                }
            }).catch(function(err) {
                console.log(err)
            })
        },
        //获取当天平仓盈亏合计
        get_close_fund_group() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/close_fund_group/`)
            .then(function(res) {
                if(res.status == 200) {
                console.log("dd")
                console.log(res)
                    if(res.data.length > 0 ) {
                    app.flatSurpkus = res.data[0].sum_profit
                        app.pageTimer.timer_1 = setTimeout(function() {
                            app.get_close_fund_group()
                        }, app.time)
                    }else {
                    app.flatSurpkus = "0.00"
                    }
                }

            }).catch(function(err) {
                console.log(err)
            })
        },
        //获取客户'当日'入金数合计
        get_fund_deposit_group() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/fund_deposit_group/`)
            .then(function(res) {
                if(res.status == 200) {
                console.log("dd")
                console.log(res)
                    if(res.data.length > 0 ) {
                    app.golden = Number(res.data[0].sum_amount).toFixed(2)
                    app.pageTimer.timer_2 = setTimeout(function() {
                        app.get_fund_deposit_group()
                    }, app.time)
                    }else {
                    app.golden = "0.00"
                    }
                }

            }).catch(function(err) {
                console.log(err)
            })
        },
        //获取客户'当日'出金数合计
        get_fund_withdraw_group() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/fund_withdraw_group/`)
            .then(function(res) {
                if(res.status == 200) {
                // console.log("dds")
                // console.log(res)
                    if(res.data.length > 0 ) {
                    app.withdraw = res.data[0].sum_amount
                    app.pageTimer.timer_3 = setTimeout(function() {
                        app.get_fund_withdraw_group()
                    }, app.time)
                    }else {
                    app.withdraw = "0.00"
                    }
                }

            }).catch(function(err) {
                console.log(err)
            })
        },
        //获取客户当日成交手续费合计
        get_trans_commission_group() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/trans_commission_group/`)
            .then(function(res) {
                if(res.status == 200) {
                // console.log("dds")
                // console.log(res)
                    if(res.data.length > 0 ) {
                    app.taxes_dues = res.data[0].sum_commission
                    app.pageTimer.timer_4 = setTimeout(function() {
                        app.get_trans_commission_group()
                    }, app.time)
                    }else {
                    app.taxes_dues = "0.00"
                    }
                }

            }).catch(function(err) {
                console.log(err)
            })
        },
    },
    destroyed () {
        let app =this
        for(var each in app.pageTimer){
            window.clearTimeout(app.pageTimer[each]);
        }
        
    },
};
</script>

<style scoped>
.title {
    font-size: 16px;
    color: rgb(162, 77, 19); 
    font-weight: bold;
    
}

.center-content-list {
    text-align:center;
    width: 70%;
    margin:40px auto 0;
    font-size : 14px;
}

.buy-sell-btn {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}
</style>
