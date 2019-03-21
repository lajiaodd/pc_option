<template>
    <div class="market">
        <div class="zhishu" ref="headpositon">
            <!-- <Row >
                <Col span="6" v-for="(item, index) in sc" :key="index">
                    <div class="title">{{item[0]}}</div>
                    <div class="zsnum" :style="{color: activeColor[index]}">{{item[1]}}</div>
                    <div class="zf" :style="{color: activeColor[index]}">
                        <span>{{item[2]}}</span>
                        <span>{{item[3]}}%</span>
                    </div>
                </Col>

            </Row> -->
            <Row>
                <Col span="6" v-for="(item, index) in sc" :key="index">
                    <div>
                        <Row class="father-con">
                            <Col span="6" >{{item[0]}}</Col>
                            <Col span="6" :style="{color: activeColor[index]}">{{item[1]}}</Col>
                            <Col span="6" :style="{color: activeColor[index]}">
                                {{item[2]}}
                            </Col>
                            <Col span="6" :style="{color: activeColor[index]}">
                                {{item[3]}}%
                            </Col>
                        </Row> 
                    </div>
                </Col>

            </Row>
        </div>
        <div class="market-table">
            <!-- <div class="head-title" ref="headpositon">
                <div class="market-tit-left">认购</div>

                <div class="market-tit-center">
                    <Dropdown @on-click="onChanceMonth">
                        <a href="javascript:void(0)" name="0">
                            {{monNumber | chanceMonth}}
                            <span class="san"></span>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem
                                v-for="(item, index) in months"
                                :key="index"
                                :name="index"
                            >{{item}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="market-tit-right">认沽</div>
            </div> -->

            <div class="market-data">
                <Table border :height="tableHeight" :columns="marketColumns" :data="marketDatas" class="default">

                    <template slot-scope="{ row, index }" slot="buy">
                        <Button type="primary" size="small" style="margin-right: 5px"    @click="onBuyTrade(row, index)">交易</Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="sell">
                        <Button type="primary" size="small" style="margin-right: 5px"  @click="onSellTrade(row, index)">交易</Button>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
import exercise_price from '../expands/exercise_price'

export default {
    name: "market",
    data() {
        return {
            sc: [],
            time: 1000,
            activeColor: [], //控制升降颜色
            bianhao: 0,
            tableHeight: 0,
            average_num: 0,
            oldMarketDatas:'', //市场行情旧数据
            marketColumns: [
                {
                    title: "认购",
                    align: "center",
                    children: [
                        {
                            title: '操作',
                            slot: 'buy',
                            align: 'center',

                        },
                        {
                            title: "当前价",
                            key: "current_price",
                            align: "center"
                        },
                        {
                            title: "涨跌幅",
                            key: "amount_of_change",
                            align: "center"
                        },
                        {
                            title: "卖价",
                            key: "sell_price",
                            align: "center"
                        },
                        {
                            title: "买价",
                            key: "buy_price",
                            align: "center"
                        },
                        {
                            title: "成交量",
                            key: "turnover",
                            align: "center"
                        },
                        {
                            title: "持仓量",
                            key: "inventory",
                            align: "center"
                        },
                    ]
                },
                {
                    title: "执行价",
                    align: "center",
                    renderHeader:(h, params,store,_self) => {
                        return h(exercise_price,{
                            on: {
                                onselect: this.onChanceMonth
                            }
                        });
                    },
                    children: [
                        {
                            title: "执行价",
                            key: "exercise_price",
                            align: "center",
                            className: "demo-table-info-column"
                        },
                    ]
                },
                {
                    title: "执行价",
                    align: "center",
                    children: [


                        {
                            title: "持仓量",
                            key: "sell_inventory",
                            align: "center"
                        },
                        {
                            title: "成交量",
                            key: "sell_turnover",
                            align: "center"
                        },
                        {
                            title: "买价",
                            key: "sell_buy_price",
                            align: "center"
                        },
                        {
                            title: "卖价",
                            key: "sell_sell_price",
                            align: "center"
                        },
                        {
                            title: "涨跌幅",
                            key: "sell_amount_of_change",
                            align: "center"
                        },
                        {
                            title: "当前价",
                            key: "sell_current_price",
                            align: "center"
                        },
                        {
                            title: '操作',
                            slot: 'sell',
                            align: 'center'
                        }
                    ]
                },
            ],
            isColorChanged: false,

        };
    },
    created() {
        this.getZhiShuDate();
    },
    mounted() {
        this.getBCR();
        window.onresize = this.getBCR;
    },
    computed: {
        marketDatas: {
            get() {
                let market_data = this.$store.getters.marketOne(this.bianhao)
                // console.log(market_data)
                if(market_data) {
                    //更改认沽key值
                    var sell_result = market_data[2].map(o => {
                        return {
                            sell_inventory: o.inventory,
                            sell_turnover: o.turnover,
                            sell_buy_price: o.buy_price,
                            sell_sell_price: o.sell_price,
                            sell_amount_of_change: o.amount_of_change,
                            sell_current_price: o.current_price,
                            sell_security_id: o.security_id,
                        };
                    });

                    //把认购认沽执行价数据合并
                    var market_result = []
                    for (let index = 0; index < sell_result.length; index++) {
                        //认沽每一项数据
                        const e = sell_result[index];
                        //认购每一项数据
                        const b = market_data[0][index]
                        let obj = Object.assign(e, b)
                        market_result.push(obj)
                        
                    }
                    // console.log("result");
                    // console.log(market_result);
                    
                    //计算执行价平均值
                    let etf50_current_price = market_data[3][0].current_price
                    
                    let i  = this.approach(market_data[1], etf50_current_price)//获取最小值索引
                    market_result.forEach((element, index)=> {

                        

                       if(element.amount_of_change >0) {
                           this.$set(element, 'cellClassName', {
                               inventory: 'demo-table-info-cell-litre',
                               turnover: 'demo-table-info-cell-litre',
                               buy_price: 'demo-table-info-cell-litre',
                               sell_price: 'demo-table-info-cell-litre',
                               amount_of_change: 'demo-table-info-cell-litre',
                               current_price: 'demo-table-info-cell-litre',
                           })
                       }else if(element.amount_of_change <0) {
                            this.$set(element, 'cellClassName', {
                               inventory: 'demo-table-info-cell-drop',
                               turnover: 'demo-table-info-cell-drop',
                               buy_price: 'demo-table-info-cell-drop',
                               sell_price: 'demo-table-info-cell-drop',
                               amount_of_change: 'demo-table-info-cell-drop',
                               current_price: 'demo-table-info-cell-drop',
                           })
                       } else {
                            this.$set(element, 'cellClassName', {
                               inventory: 'demo-table-info-cell-normal',
                               turnover: 'demo-table-info-cell-normal',
                               buy_price: 'demo-table-info-cell-normal',
                               sell_price: 'demo-table-info-cell-normal',
                               amount_of_change: 'demo-table-info-cell-normal',
                               current_price: 'demo-table-info-cell-normal',
                           })
                       }
                       
                       if(element.sell_amount_of_change >0) {
                            this.$set(element.cellClassName, 'sell_inventory', 'demo-table-info-cell-litre')
                            this.$set(element.cellClassName, 'sell_turnover', 'demo-table-info-cell-litre')
                            this.$set(element.cellClassName, 'sell_buy_price', 'demo-table-info-cell-litre')
                            this.$set(element.cellClassName, 'sell_sell_price', 'demo-table-info-cell-litre')
                            this.$set(element.cellClassName, 'sell_amount_of_change', 'demo-table-info-cell-litre')
                            this.$set(element.cellClassName, 'sell_current_price', 'demo-table-info-cell-litre')
                            
                       }else if(element.sell_amount_of_change <0) {
                            this.$set(element.cellClassName, 'sell_inventory', 'demo-table-info-cell-drop')
                            this.$set(element.cellClassName, 'sell_turnover', 'demo-table-info-cell-drop')
                            this.$set(element.cellClassName, 'sell_buy_price', 'demo-table-info-cell-drop')
                            this.$set(element.cellClassName, 'sell_sell_price', 'demo-table-info-cell-drop')
                            this.$set(element.cellClassName, 'sell_amount_of_change', 'demo-table-info-cell-drop')
                            this.$set(element.cellClassName, 'sell_current_price', 'demo-table-info-cell-drop')
                       }else {
                            this.$set(element.cellClassName, 'sell_inventory', 'demo-table-info-cell-normal')
                            this.$set(element.cellClassName, 'sell_turnover', 'demo-table-info-cell-normal')
                            this.$set(element.cellClassName, 'sell_buy_price', 'demo-table-info-cell-normal')
                            this.$set(element.cellClassName, 'sell_sell_price', 'demo-table-info-cell-normal')
                            this.$set(element.cellClassName, 'sell_amount_of_change', 'demo-table-info-cell-normal')
                            this.$set(element.cellClassName, 'sell_current_price', 'demo-table-info-cell-normal')
                       }

                        if(i == index) {
                            this.$set(element.cellClassName, 'exercise_price', 'demo-table-info-cell-address')
                            // console.log(444444)
                            // this.$set(element, 'cellClassName', {
                            //     exercise_price: 'demo-table-info-cell-address'
                            // })
                            // console.log(element)
                        }
                    });
                }
                return market_result;


            },
            set(value) {}
        },

        // marketData: {
        //     get () {
        //         return this.$store.getters.marketOne(this.bianhao)
        //         },
        //     set (value) {}
        // },
        months: function() {
            if (!this.$store.state.list_month) {
                return [];
            } else {
                return this.$store.state.list_month;
            }
        },
        monNumber: {
            get() {
                if (!this.$store.state.list_month) {
                    return "";
                } else {
                    return this.$store.state.list_month[this.bianhao];
                }
            },
            set(value) {}
        }
    },
    watch: {
        marketDatas: {
            handler(newValue, oldValue) {
                let n = newValue
                let o = oldValue
                if(this.isColorChanged) {
                    n = o = []
                    this.isColorChanged = false
                }
              
                if(o != undefined && o.length) {

                    for (let i = 0; i < n.length; i++) {
                        for(let j in n[i]) {
                            
                            if(j !== 'cellClassName' && n[i][j] !== o[i][j] ) {
                                this.$set(n[i].cellClassName, j, 'demo-table-info-chance')
                            }
                            
                        }
    
                        
                    }
                }
                
            },
            deep: true
        }
    },
    methods: {
        //获取指数数据
        getZhiShuDate() {
            let app = this;
            app.$axios
                .get("/apis", {
                    params: {
                        list: "s_sh000001,s_sz399001,s_sh000016,s_sh510050"
                    }
                })
                .then(res => {
                    window.eval(res.data);
                    app.sc = [
                        hq_str_s_sh000001.split(","),
                        hq_str_s_sz399001.split(","),
                        hq_str_s_sh000016.split(","),
                        hq_str_s_sh510050.split(",")
                    ];

                    for (let [index, val] of app.sc.entries()) {
                        if (val[2] >= 0) {
                            app.activeColor[index] = "#FF3C3C";
                            val[1] = `▲${val[1]}`;
                        } else {
                            app.activeColor[index] = "#00E600";
                            val[1] = `▼${val[1]}`;
                        }
                    }
                    // console.log("app.sc")
                    // console.log(app.sc)
                    let zhi_shu_timer = setTimeout(function() {
                        app.getZhiShuDate();
                    }, app.time);
                });
        },

        onChanceMonth(index) {
            // console.log(222);
            // this.monNumber = this.months[index];
            this.isColorChanged = true
            this.bianhao = index;
        },

        getBCR() {
            let windowHeight = document.documentElement.clientHeight;
            let rectObject = this.$refs.headpositon.getBoundingClientRect();
            let bottomDistance = windowHeight - rectObject.bottom-20;

            this.tableHeight = bottomDistance ;

        },

        approach(arr, num){
            var newArr = [];
            arr.map(function(x){
                // 对数组各个数值求差值
                newArr.push(Math.abs(parseFloat(x.exercise_price) - num));
            });
            // 求最小值的索引
            var index = newArr.indexOf(Math.min.apply(null, newArr));
            return index;
        },

        onBuyTrade (row,index) {
            this.$router.push(`/home/deal/${row.security_id}`)
            console.log("row")
            console.log(row)
            console.log(index)
        },

        onSellTrade (row,index) {
            this.$router.push(`/home/deal/${row.sell_security_id}`)
            console.log("row")
            console.log(row)
            console.log(index)
        },
    }
};
</script>

<style>
.market-data .ivu-table-header {
    overflow: hidden;
    border-top: 1px solid #800000;
}
.market {
    text-align: center;
}

.zhishu {
    padding: 15px;
    line-height: 20px;
}

.father-con{
    display: flex;
    justify-content: center;
    align-items: center;
}

.head-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
}

.market-tit-left {
    flex: 7;
    height: 30px;
    line-height: 30px;
    background-color: #FF3C3C;
}
.market-tit-center {
    flex: 1;
    height: 30px;
    line-height: 30px;
    background-color: #69b6fe;
}
.market-tit-right {
    flex: 7;
    height: 30px;
    line-height: 30px;
    background-color: #00E600;
}

.san {
    vertical-align: middle;
    display: inline-block;
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-top: 6px solid #fff;
}

</style>
