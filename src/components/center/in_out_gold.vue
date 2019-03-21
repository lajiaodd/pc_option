<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">出入金</span>
        </div>
         <Divider type="horizontal" />

         <div class="center-content">
            <div class="serach-content">
                <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px" :confirm="true" v-model="currentDate" @on-change="onChanceDate"></DatePicker>
                <Select v-model="current_in_out_way" style="width:200px" @on-change="onSelectInOut">
                    <Option v-for="(item, index) in in_out_lists" :key="index" :value="item">{{ item}}</Option>
                </Select>
                <Button type="primary" @click="onRefer">查询</Button>
                <Button type="error" @click="onRefresh">刷新</Button>
            </div>
            <div class="in-out-table">
                <Table  :columns="in_out_columns" :data="historyOrders" border stripe ref="table"></Table>
            </div>
            <div class="page">
                <Page :total="historyOrdersLength" show-elevator @on-change="onChancePage"  :current.sync="current_page" />
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
            currentDate:[new Date(),new Date()],
            beginTime: this.$sd.format(new Date(), 'YYYY-MM-DD'),
            endTime: this.$sd.format(new Date(), 'YYYY-MM-DD'),
            in_out_lists: [
                "全部",
                "入金",
                "出金" 
            ],
            current_in_out_way:'全部',
            in_out_columns: [
                {
                    title: '编号',
                    key: 'id'
                },
                {
                    title: '金额',
                    key: 'amount'
                },
                {
                    title: '方式',
                    key: 'payment_channel.name',
                    render: (h, params) => {
                        let a = params.row.payment_channel.name
                        return h('div', [
                            h('div', {}, a),

                        ]);
                    }
                },
                {
                    title: '时间',
                    key: 'date_joined'
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        let a = params.row.status ? "审核通过" : "审核中"
                        return h('div', [
                            h('div', {}, a),

                        ]);
                    }

                },
            ],
            historyOrders: [],
            historyOrdersLength:0,
            page:1,
            deposit: 'all',
            current_page: 1, //当前页码
            allHistoryOrders:[]
        };
    },
    created() {
        this.initRefer()
    },
    methods: {
        initRefer() {
            let app = this
            console.log("mpage")
            console.log(app.page)
            
            app.getFundList(app.page,app.deposit).then((data) => {
                app.historyOrders = data.results
                
                console.log("app.historyOrders")
                console.log(app.historyOrders)
            })
        },
        getFundList(page, deposit) {
            let app = this
            return new Promise(function(resolve, reject) {
                console.log(deposit)
    
                if(deposit == 'all') {

                    app.$api.get(`${app.$lib.host}/api/funds/?begin=${app.beginTime}&end=${app.endTime}&page=${page}`)
                    .then(function(res) {
                        if(res.status == 200) {
                            console.log("res")
                            console.log(res)
                            app.historyOrdersLength = res.data.count
                            resolve(res.data)
                        }
                    })
                } else {
                    app.$api.get(`${app.$lib.host}/api/funds/?begin=${app.beginTime}&end=${app.endTime}&page=${page}&deposit=${deposit}`)
                    .then(function(res) {
                        if(res.status == 200) {
                            app.historyOrdersLength = res.data.count
                            resolve(res.data)
                        }
                    })
                }
            })
        },

        onSelectInOut(value) {
            app.page = 1
            if(value == this.in_out_lists[0]) {
                    this.deposit = 'all'
            } else if(value == this.in_out_lists[1]){
                    this.deposit =true
            } else {
                    this.deposit = false
            }
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
        onChancePage(page) {
            console.log("page")
            this.page = page
            console.log(app.page)
            this.initRefer()
        },
        onChanceDate(date) {
            app.page = 1
            
        },
        //刷新
        onRefresh() {
            this.initRefer()
        },

    }
};
</script>

<style scoped>
.title {
    font-size: 16px;
    color: rgb(162, 77, 19); 
    font-weight: bold;
    
}

.page{
    text-align: right;
}

.in-out-table{
    margin: 10px 0px;
}

</style>
