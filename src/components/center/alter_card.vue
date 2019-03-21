<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">修改银行卡</span>
        </div>
        <Divider type="horizontal" />

        <div class="center-content">
            <Form   :label-width="150">
                <FormItem label="真实姓名" prop="first_name">
                    <Input v-model="first_name"  disabled ></Input>
                </FormItem>
                <FormItem label="身份证号码" prop="identity_card">
                    <Input v-model="identity_card"  disabled></Input>
                </FormItem>
                <FormItem label="开户银行">
                    <Select v-model="bank_name">
                        <Option v-for="item in bank_names" :key="item" :value="item">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行地址">
                    <Cascader :data="addressData" v-model="open_city_pc_id" @on-change="onShadowChange"></Cascader>
                </FormItem>
                <FormItem label="开户支行" prop="bank_branch">
                    <Input v-model="bank_branch" placeholder="请输入开户支行"></Input>
                </FormItem>
                <FormItem label="银行卡号" prop="bank_card">
                    <Input v-model="bank_card" placeholder="请输入银行卡号"></Input>
                </FormItem>
                <FormItem label="确认卡号" prop="bank_card2">
                    <Input v-model="bank_card2" placeholder="请确认银行卡号"></Input>
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="postBankCardData" >提交</Button>
                </FormItem>
            </Form>

        </div>
    </div>
</template>

<script>
import addressData from '../../style/city.js'
let bank_names = ["中国银行", "工商银行", "建设银行", "农业银行","交通银行", "邮政银行", "招商银行", "光大银行", "广发银行", "浦发银行", "兴业银行", "平安银行", "民生银行", "中兴银行", "华夏银行", "长沙银行"]
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',

            bank_names: bank_names,
            bank_name: "中国银行",
            addressData: addressData,
            open_city_pc_id:'',
            open_city_id: '',
            bank_branch: '',
            bank_card:'' ,//银行卡号码
            bank_card2: '',

        };
    },
    created() {
        this.bank_name = this.$store.state.user.bank_name
        this.open_city_pc_id = this.$store.state.user.open_city_pc_id.split('-').map(Number) //数组每一项转出数字
        this.bank_branch = this.$store.state.user.bank_branch
        this.bank_card = this.$store.state.user.bank_card
    },
    computed: {
        first_name() {
            return this.$store.state.user.first_name
        },
        identity_card() {
            return this.$store.state.user.identity_card
        },


    },

    methods: {
        onShadowChange (ids, names) {
        console.log("ids")
        console.log(ids, names)
            this.open_city_pc_id = ids

            names.forEach(element => {
                this.open_city_id += element.label
            });
            // console.log(this.open_city_pc_id)
            // console.log(this.open_city_id)
        },
        postBankCardData() {
            let app = this
            app.verifyInfo(() =>{
                this.open_city_pc_id = this.open_city_pc_id.join('-')
                let params = {
                    bank_name: app.bank_name,
                    open_city_pc_id: app.open_city_pc_id,
                    open_city_id: app.open_city_id,
                    open_city:'',
                    bank_branch: app.bank_branch,
                    bank_card: app.bank_card,
                }
                app.$api.patch(`${app.$lib.host}/api/users/8/`,params)
                .then(function(res) {
                    if(res.status == 200) {
                        app.$Message.error('修改银行卡成功')
                        //刷新用户信息
                        app.$store.dispatch('getUserInfo' ).then(function() {
                            app.$router.replace('/home/index/bank')
                        })
                    }
                    // console.log(res)
                })
            })

        },
        verifyInfo(callback) {
            let app = this

            if(!this.bank_name) {
                app.$Message.error('开户银行不能为空');
                return
            }
            if(!app.open_city_pc_id) {
                app.$Message.error('请选择开户城市');
                return
            }
            if(!app.bank_branch) {
                app.$Message.error('开户支行不能为空')
                return
            }
            if(!app.bank_card) {
                app.$Message.error('银行卡号不能为空')
                return
            }

            if(app.bank_card != app.bank_card2) {
                app.$Message.error('两次输入的银行卡号不匹配')
                return
            }

            callback()
            
            
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
