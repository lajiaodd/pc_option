<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">账户提现</span>
        </div>
         <Divider type="horizontal" />

         <div class="center-content">
                <Form   :label-width="150" :style="{marginTop:'30px'}">
                    <div class="tip"></div>
                    <FormItem label="可用资金" prop="account_fund">
                        <Input v-model="account_fund" disabled></Input>
                    </FormItem>
                    <FormItem label="提现金额" prop="amount">
                        <Input v-model="amount"></Input>
                    </FormItem>
                    <FormItem label="出金方式" prop="amount">
                        <Select v-model="addBankCard" clearable style="width:200px"  @on-change="onSelectWays">
                            <Option v-for="item in chineseCollectionWays " :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="onNextStep" :disabled="isdisabled">下一步</Button>
                    </FormItem>
                    
                    <Divider type="horizontal" dashed>温馨提示</Divider>
                    <div class="tip-con">
                        <p>1、出金前请进行实名认证与添加收款码或者银行卡</p>
                    </div>
                </Form>
         </div>
    </div>
</template>

<script>
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',
            amount: '',
            addBankCard:'',//当前收款方式值
            addBankCards:[],//收款方式id
            chineseCollectionWays:[], //收款方式中文
            isdisabled: true,
        };
    },
    computed: {
        account_fund() {
            return this.$store.state.user.account_fund
        },
        authentication_status() {
            return this.$store.state.user.status
        },
        bank_card() {
            return this.$store.state.user.bank_card
        },
        alipay_image() {
            return this.$store.state.user.alipay_image
        },
        wechat_image() {
            return this.$store.state.user.wechat_image
        },
    },
    created() {
        let app = this
        
        app.$api.get(`${app.$lib.host}/api/payment_channel/`)
        .then(function(res) {
            app.withdraw_ways = res.data.results.filter(item => {
                return item.deposit == false
            });

            app.withdraw_ways.forEach(element => {
                app.addBankCards.push(element.id)
                app.chineseCollectionWays.push(element.name)
                console.log(app.chineseCollectionWays)
            });
        })
    },
    mounted() {
    },
    methods: {
        onSelectWays(value) {
            console.log(value)
            if(this.addBankCard.indexOf("银行") != -1 ) {
                if(!this.bank_card) {
                    this.isdisabled = true
                    app.$Message.error('银行卡还未添加，请先添加银行卡');
                    return
                }
            }
            if(this.addBankCard.indexOf("微信") != -1 ) {
                if(!this.wechat_image) {
                    this.isdisabled = true
                    app.$Message.error('微信收款码还未添加，请先添加');
                    return
                }
            }
            if(this.addBankCard.indexOf("支付宝") != -1 ) {
                if(!this.alipay_image) {
                    app.$Message.error('支付宝收款码还未添加，请先添加');
                    this.isdisabled = true
                    return
                }
            }
            this.isdisabled = false
        },
        onNextStep() {
            let app = this
            if(!app.amount) {
                app.$Message.error('请输入金额');
            return
            }

            if(app.addBankCard.indexOf("微信") == -1 && app.addBankCard.indexOf("支付宝") == -1 && app.addBankCard.indexOf("银行") == -1 ) {
                app.$Message.error('请选择出金方式');
            return
            }

            let index = ''
            this.chineseCollectionWays.forEach((item,i)=> {
                if(item == this.addBankCard) {
                    index = i
                }
            })
            let id =  app.addBankCards[index]
            // console.log(id)
            //获取单个出金数据
            let data = ''
            app.withdraw_ways.forEach(item => {
                if(item.id == id) {
                data = item
                }
            })

            this.$Modal.confirm({
                title: '提示',
                content: `
                    <p>申请转出的金额为${app.amount}元</p>
                    <p>提现手续费率为${data.commission}%</p>
                    <p>提现金额${app.amount*(1-data.commission/100)}元`,
                onOk: () => {
                    let params = {
                        payment_channel: data.id,
                        deposit: data.deposit,
                        back: true,
                        amount: app.amount,
                    }
                
                    app.$api.post(`${app.$lib.host}/api/funds/`, params)
                        .then(function(res) {
                            console.log(res)
                            console.log(889)
                        }).catch((err) => {
                        console.log(789)
                        console.log(err)
                        if(err.status == 201) {
                                app.$Message.info('金额转出申请成功');
                            }
                        })
                    
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
            
        }
    },
    filters:  {
        changeChinese(value, chineseCollectionWays) {
            return chineseCollectionWays
        }
    }
};
</script>

<style scoped>
.title {
    font-size: 16px;
    color: rgb(162, 77, 19); 
    font-weight: bold;
    
}

</style>
