<template>
    <div class="optional">
        <Table border :columns="optional_columns" :data="myplans" class="default" @on-row-dblclick="onGoDeal">
            <template slot-scope="{row,index }" slot="attention">
                <Button @click="remove(row.security_id)" ghost type="error" size="small">取消关注</Button>
            </template>
        </Table>
        <div class="page">
            <Page :total="historyOrdersLength" show-elevator @on-change="onChancePage"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "optional",
    data() {
        return {
            optional_columns: [
                {
                    title: ' ',
                    width: 10,
                },
                {
                    title: '合约简称',
                    key: 'contract_str',
                    align: 'center',
                    width: 160,
                },
                {
                    title: '最新价',
                    key: 'current_price',
                    align: 'center',
                    sortable: true,
                },
                {
                    title: '涨跌幅',
                    key: 'amount_of_change',
                    align: 'center',
                    sortable: true,
                },
                {
                    title: '行权价',
                    key: 'exercise_price',
                    align: 'center',
                    sortable: true,
                },
                {
                    title: '买价',
                    key: 'buy_price',
                    align: 'center',
                    sortable: true,
                },
                {
                    title: '卖价',
                    key: 'sell_price',
                    align: 'center',
                    sortable: true,
                },
                {
                    title: "成交量",
                    key: "turnover",
                    align: "center",
                    className: 'demo-table-info-inventory'
                    
                },
                {
                    title: "持仓量",
                    key: "inventory",
                    align: "center",
                    className: 'demo-table-info-turnover'
                },
                {
                    title: '取关',
                    align: 'center',
                    slot:'attention'
                },
                {
                    title: ' ',
                    width: 10,
                },

            ],
            myplans: [],
            page:1,
            historyOrdersLength:0,
        }

    },
    computed: {
        contract_lists() {
            return this.$store.state.contract_lists
        },
        //所有合约
        arr_security_id: function() {
            return this.$store.state.arr_security_id
        },

    },
    mounted() {
        console.log(888888888888)
        this.init_optional_list()
    },
    methods:{
        onGoDeal(index) {
            this.$router.push(`/home/deal/${index.security_id}`)
            console.log("i");
            console.log(index);
            
        },
        init_optional_list() {
            let app = this
            app.get_optional_lists(app.page)
            .then((data) => {
                app.myplans = app.concat_arr_optional(data.results)
                console.log("app.myplans")
                console.log(app.myplans)
                app.resizeColor() //设置数据文字颜色
            })
            .catch((err) => {
                console.log(111)
                console.log(err)
            }) 
        },
        
        //把2个数据对象合并
        concat_arr_optional(data) {
            let app = this
            let arr_concat = []
            app.contract_lists.forEach((element,j)=> {
                data.forEach((item, i) => {
                if(element.security_id == item.security_id) {
                    let obj = Object.assign(item,element)
                    // console.log(element)
                    // console.log(item)
                    arr_concat.push(obj)
                }
                })
            });
            return arr_concat
            // console.log("app.myplans")
            // console.log(app.myplans)
        },
        get_optional_lists(page) {
            let app = this
            return new Promise(function(resolve, reject) {
                app.$api.get(`${app.$lib.host}/api/client_optional_contract/?page=${page}`)
                .then(function(res) {
                    console.log(444)
                    console.log(res)
                    if(res.status == 200) {
                        app.historyOrdersLength = res.data.count
                        resolve(res.data)
                    }
                })
                .catch((err) => {
                    console.log(112)
                    console.log(JSON.stringify(err))
                }) 
            })
        },
        remove(security_id) {
            let app = this            
            app.$api.mydelete(`${app.$lib.host}/api/client_optional_contract/${security_id}/`)
            .then(function(res) {
                console.log(111)
                console.log(res)
                if(res.status == 200) {
                    app.$Message.success('取关成功!');
                    app.init_optional_list()
                }
            })
            .catch((err) => {
                console.log(114)
                console.log(err)
            }) 
        },
        onChancePage(page) {
            this.page = page
            this.init_optional_list()
        },
        resizeColor() {

            this.myplans.forEach((element,index) => {
                console.log(element)
                if(element.amount_of_change >0) {
                    this.$set(element, 'cellClassName', {
                        buy_price: 'demo-table-info-cell-litre',
                        sell_price: 'demo-table-info-cell-litre',
                        amount_of_change: 'demo-table-info-cell-litre',
                        current_price: 'demo-table-info-cell-litre',
                    })
                }else if(element.amount_of_change <0) {
                    this.$set(element, 'cellClassName', {
                        buy_price: 'demo-table-info-cell-drop',
                        sell_price: 'demo-table-info-cell-drop',
                        amount_of_change: 'demo-table-info-cell-drop',
                        current_price: 'demo-table-info-cell-drop',
                    })
                } else {
                    this.$set(element, 'cellClassName', {
                        buy_price: 'demo-table-info-cell-normal',
                        sell_price: 'demo-table-info-cell-normal',
                        amount_of_change: 'demo-table-info-cell-normal',
                        current_price: 'demo-table-info-cell-normal',
                    })
                }
            }) 
        },
    }
};
</script>

<style scoped>
.page{
    text-align: right;
    margin: 10px;
}

</style>