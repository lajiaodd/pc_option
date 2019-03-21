<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">账户充值</span>
        </div>
        <Divider type="horizontal" />

        <div class="center-content">
        <Tabs type="card" @on-click="onSelectPayWay" value="1">
            <TabPane v-for="way in pay_ways" :key="way.id" :label="way.name" :name="way.id.toString()">
                <Form   :label-width="150" :style="{marginTop:'30px'}">

                    <div class="tip"></div>
                    <FormItem label="可用资金" prop="account_fund">
                        <Input v-model="account_fund"  disabled ></Input>
                    </FormItem>
                    <FormItem label="充值金额" prop="account_fund">
                        <Input v-model="amount"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="onShowPayModal(way.name)">下一步</Button>
                    </FormItem>
                    
                    <Divider type="horizontal" dashed>温馨提示</Divider>
                    <div class="tip-con">
                        <p>1、单笔金额不能小于{{pay_info.min_money}}元，高于{{pay_info.max_money}}元</p>
                        <p>2、付款时请备注<span style="color:#EC5F65">{{remark}}</span></p>
                    </div>
                </Form>
            </TabPane>
            <!-- 支付信息对话框 -->

            <Modal
                title="微信扫码支付"
                v-model="pay_modal_0"
                ok-text="支付完成"
                cancel-text="取消支付"
                @on-ok="onFinishPay"	
                class-name="vertical-center-modal">
                <div class="buy-box">
                    <h2>请扫码</h2>
                    <p style="text-align: center;">扫码支付金额为: <span style="font-weight: bold; color: red;">{{amount}}</span>元</p>
                    <p style="text-align: center; font-size: 13px;">支付时请备注: {{remark}}</p>
                    <div class="img-code-wrap"><img :src="pay_info.qr_code"></div>
                    <p style="text-align: center; font-size: 13px;">注意:若没有支付,此次申请无效</p>
                </div>
            </Modal>
            <Modal
                title="支付宝扫码支付"
                v-model="pay_modal_1"
                ok-text="支付完成"
                cancel-text="取消支付"
                @on-ok="onFinishPay"	
                class-name="vertical-center-modal">
                <div class="buy-box">
                    <h2>请扫码</h2>
                    <p style="text-align: center;">扫码支付金额为: <span style="font-weight: bold; color: red;">{{amount}}</span>元</p>
                    <p style="text-align: center; font-size: 13px;">支付时请备注: {{remark}}</p>
                    <div class="img-code-wrap"><img :src="pay_info.qr_code"></div>
                    <p style="text-align: center; font-size: 13px;">注意:若没有支付,此次申请无效</p>
                </div>
            </Modal>
            <Modal
                title="银行转账支付"
                v-model="pay_modal_2"
                ok-text="支付完成"
                cancel-text="取消支付"
                @on-ok="onFinishPay"	
                class-name="vertical-center-modal">
                <div class="buy-box">
                    <p style="text-align: center;">扫码支付金额为: <span style="font-weight: bold; color: red;">{{amount}}</span>元</p>
                    <p style="text-align: center; font-size: 13px;">支付时请备注: {{remark}}</p>
                    <div class="bank my-relative" >
                        <img src="../../assets/images/bankbg.png"> 
                        <div class="bank-card-info">
                            <div class="space-between"><div class="my-inline-block my-valign-m my-pdl-5">
                            <p class="my-font-14">{{pay_info.bank_name}} {{pay_info.open_city}}{{pay_info.bank_branch}}</p>
                            <p class="my-font-16">{{pay_info.payee}}</p> 
                            <p><span class="bank-num card">{{pay_info.bank_card | addBlank}}</span></p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <p style="text-align: center; font-size: 13px;">注意:若没有支付,此次申请无效</p>
                </div>
            </Modal>
        </Tabs>
        </div>


    </div>
</template>

<script>
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',
            pay_ways: [],
            pay_info:'', //支付信息数据
            amount: '', //充值金额
            pay_modal_0: false,
            pay_modal_1: false,
            pay_modal_2: false,

        };
    },
    computed: {
        account_fund() {
            return this.$store.state.user.account_fund
        },
        remark:{
            get() {
            
            return this.$store.state.user.username
            },
            set() {
            }
        } 
    },
    created() {
        this.getPayWay()
        this.getPayData(1)
    },
    methods: {
        getPayWay() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/payment_channel/`)
            .then(function(res) {
                app.pay_ways = res.data.results.filter(item => {
                    return item.deposit == true
                });
                console.log(678)
                console.log(app.pay_ways)
            })
        },
        getPayData(id) {
            let app = this
            app.$api.get(`${app.$lib.host}/api/payment_channel/${id}/`)
            .then(function(res) {
                app.pay_info = res.data
                console.log("res.data")
                console.log(res.data)
            })
        },
        onSelectPayWay(name) {
            this.getPayData(name)
            console.log(name)
        },
        onShowPayModal(name) {
            let app = this
            app.checkNumber(function() {
                if(name.indexOf('微信') != -1) {
                    app.pay_modal_0 = true
                }
                if(name.indexOf('支付宝') != -1) {
                    app.pay_modal_1 = true
                }
                if(name.indexOf('银行') != -1) {
                    app.pay_modal_2 = true
                }
                
            })
        },
        checkNumber(callback) {
            let app = this
            if(!this.amount) {
                app.$Message.error('请输入金额');
                return 
            }
            if(String(this.amount).indexOf('.') != -1) {
                app.$Message.error('金额必须是整数');
                return
            }
            if(app.amount > Number(this.pay_info.max_money)) {
                app.$Message.error(`入金金额不能大于${app.pay_info.max_money}`);
                return 
            }
            if(app.amount < Number(this.pay_info.min_money)) {
                app.$Message.error(`入金金额不能小于${app.pay_info.min_money}`);
                return 
            }
            callback()
        },
        onFinishPay () {
            let app = this
            let params = {
                payment_channel: app.pay_info.id,
                deposit: app.pay_info.deposit,
                back: true,
                amount: app.amount,
                remark: app.remark,
            }
            app.$api.post(`${app.$lib.host}/api/funds/`, params)
                .then(function(res) {
                    // console.log(res)
                    console.log(889)
                }).catch((err) => {
                // console.log(789)
                // console.log(err)
                if(err.status == 201) {
                        app.$Message.success('付款申请提交成功');
                        app.$router.push('/home/index/recharge')
                    }
                })
        },
    },
    filters: {
        addBlank(val) {
            let result = [];
            let card_num = ''
            val = String(val)
            for(var i=0,len=val.length;i<len;i+=4){
                result.push(val.slice(i,i+4));
            }
            card_num = result.join("  ")
            return card_num
        }
    }
};
</script>

<style >
.title {
    font-size: 16px;
    color: rgb(162, 77, 19); 
    font-weight: bold;
    
}

.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}
.vertical-center-modal .ivu-modal{
    top: 0;
}

.buy-box{
    text-align: center;
}
.img-code-wrap img{
    position: relative;
    width: 60%;
    padding: 15px;
}
.my-relative{
    position: relative;
}
.bank{
    width: 100%;
    height: 160px;
    text-align: center;
    padding: 10px 0;
}

.bank img {
    width: 94%;
    height: 100%; 
}

.bank .bank-card-info {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 26px 30px;
    color: #fff;
    text-align: left;
}
.bank .my-font-16{
    font-size: 20px;
}

.bank p .bank-num{
    font-size: 24px;
    margin-top: 10px;
    display: inline-block;
}

</style>
