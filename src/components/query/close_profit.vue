<template>
    <div class="center">

            <div class="serach-content">
                <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px" v-model="currentDate" @on-change="onChanceDate"></DatePicker>

                <Button type="primary" @click="onRefer">查询</Button>
                <Button type="error" @click="onRefresh">刷新</Button>
            </div>
            <div class="in-out-table">
                <Table  :columns="in_out_columns" :data="historyOrders" border stripe ref="table" :height='table_height'></Table>
            </div>
            <div class="page">
                <Page :total="historyOrdersLength" show-elevator @on-change="onChancePage"  :current.sync="current_page" />
            </div>
    </div>
</template>

<script>
export default {
    name: "close_profit",
    data() {
        return {
            buttonSize: 'large',
            currentDate:[new Date(),new Date()],
            beginTime: this.$sd.format(new Date(), 'YYYY-MM-DD'),
            endTime: this.$sd.format(new Date(), 'YYYY-MM-DD'),
            in_out_columns: [
                {
                    title: '合约简称',
                    key: 'contract_str'
                },
                {
                    title: '方向',
                    render: (h, params) => {
                        let a = params.row.long_position
                        if(a) {
                            a= '多头'
                        }else{
                            a= '空头'
                        }
                        return h('div', [
                            h('div', {}, a),

                        ]);
                    }
                },
                {
                    title: '盈亏',
                    key: 'profit'
                },
                {
                    title: '买入日期',
                    key: 'open_date'
                },
                {
                    title: '卖出日期',
                    key: 'close_date'
                },
                {
                    title: '买入价格',
                    key: 'open_price'
                },
                {
                    title: '卖出价格',
                    key: 'close_price'
                },
                {
                    title: '买入数量',
                    key: 'open_num'
                },
                {
                    title: '卖出数量',
                    key: 'close_num'
                },
                {
                    title: '买入时间',
                    key: 'open_date'
                },
                {
                    title: '卖出时间',
                    key: 'close_date'
                },
            ],
            historyOrders: [],
            historyOrdersLength:0,
            page:1,
            deposit: 'all',
            current_page: 1, //当前页码
            allHistoryOrders:[],
            table_height: '300'
        };
    },
    props: ['is_full_screen'],
    created() {
        this.initRefer()
    },
    mounted () {

    },
    methods: {
        initRefer() {
            let app = this
 
            app.getFundList(app.page).then((data) => {
                app.historyOrders = data.results

            })
        },
        getFundList(page) {
            let app = this
            return new Promise(function(resolve, reject) {
                app.$api.get(`${app.$lib.host}/api/close_fund/?begin=${app.beginTime}&end=${app.endTime}&page=${page}`)
                .then(function(res) {
                    if(res.status == 200) {
                        app.historyOrdersLength = res.data.count

                        resolve(res.data)
                    }
                })
                
            })
        },

        //查询
        onRefer() {
            let app = this
            app.page = 1
            app.current_page = 1
            app.beginTime = app.$sd.format(app.currentDate[0], 'YYYY-MM-DD')
            app.endTime = app.$sd.format(app.currentDate[1], 'YYYY-MM-DD')
            app.initRefer()
        },
        //改变页码
        onChancePage(page) {
            this.page = page
            this.initRefer()
        },
        //改变日期
        onChanceDate(date) {
            app.page = 1
            
        },
        //刷新
        onRefresh() {
            this.initRefer()
        },

    },
    watch: {
        is_full_screen(curVal, oldVal) {
            if(!curVal) {
                this.table_height = 300
            }else{
                this.table_height = undefined
            }
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
.center{
    min-height: 300px;
}
.page{
    text-align: right;
}

.in-out-table{
    margin: 10px 0px;
}

</style>



