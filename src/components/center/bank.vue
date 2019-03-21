<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">银行卡管理</span>
        </div>
        <Divider type="horizontal"/>

        <div class="center-content">
            <Tabs type="card">
                <TabPane label="银行卡">
                    <div class="card-add" v-if="!bank_card">
                        <p>暂未绑定任何银行卡</p>
                        <Button type="primary" to="/home/index/add_card">添加银行卡</Button>
                    </div>
                    <div class="card-box" v-else>
                        <ul>
                            <li>
                                <div class="card-left">
                                    <div class="card-img">
                                        <img :src="bank_tubiao">
                                    </div>
                                </div>
                                <div class="card-right">
                                    <div class="card-title">
                                        <span>{{bank_name}}</span>
                                        <img src="../../assets/images/pay.png">
                                    </div>
                                    <div class="card-type">储蓄卡</div>
                                    <div class="card-num">
                                        <div class="card-num-item star">{{bank_card | hideCardNum}}</div>
                                    </div>
                                    <div
                                        class="card-bg"
                                        :style="{backgroundImage:'url(' + bank_tubiao + ')'}"
                                    ></div>
                                    <div class="oprator-card">
                                        <div class="alter-card" @click="alterCard">修改</div>
                                        <div class="alter-card" @click="unbind">解绑</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </TabPane>
                <TabPane label="收款码">
                    <Form :label-width="150">
                        <FormItem label="上传支付宝收款码" prop="id_front_image">
                            <file-upload v-bind:avatar_later="alipay_pic" @upload="getAlipayFile"></file-upload>
                            <Button type="primary" @click="postAlipayCode" >上传支付宝二维码</Button>
                        </FormItem>
                        <FormItem label="上传微信收款码" prop="id_back_image">
                            <file-upload v-bind:avatar_later="weixin_pic" @upload="getWeixinFile" ></file-upload>
                            <Button type="primary" @click="postWeixinCode" >上传微信二维码</Button>
                        </FormItem>
                        <FormItem label="" prop="id_back_image">
                            <p class="tip">注：上传的收款码只用来提现</p>
                        </FormItem>
                        
                        <!-- <FormItem>
                            <Button type="primary" @click="postMoneyCode" >上传</Button>
                        </FormItem> -->
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
let china_bank = require("../../assets/images/china.png"),
    gong_shang = require("../../assets/images/gong_shang.png"),
    jian_she = require("../../assets/images/jian_she.png"),
    nong_ye = require("../../assets/images/nong_ye.png"),
    jiao_tong = require("../../assets/images/jiao_tong.png"),
    you_zheng = require("../../assets/images/you_zheng.png"),
    zhao_shang = require("../../assets/images/zhao_shang.png"),
    guang_da = require("../../assets/images/guang_da.png"),
    pu_fa = require("../../assets/images/pu_fa.png"),
    xing_ye = require("../../assets/images/xing_ye.png"),
    ping_an = require("../../assets/images/ping_an.png"),
    min_sheng = require("../../assets/images/min_sheng.png"),
    hua_xia = require("../../assets/images/hua_xia.png"),
    chang_sha = require("../../assets/images/chang_sha.png");

import upload from "@/components/expands/upload.vue";
export default {
    name: "center",
    data() {
        return {
            buttonSize: "large",
            bankTabs: ["银行卡", "收款码"],
            showBind: false,
            menus3: {
                "title.noop": "确定解绑银行卡",
                delete: '<span style="color:red">解绑</span>'
            },
            weixin_pic: "",
            alipay_pic: "",

            alipay_image: "",
            wechat_image: "",

            bank_tubiaos: [
                china_bank,
                gong_shang,
                jian_she,
                nong_ye,
                jiao_tong,
                you_zheng,
                you_zheng,
                zhao_shang,
                guang_da,
                pu_fa,
                xing_ye,
                ping_an,
                min_sheng,
                hua_xia,
                chang_sha
            ],
            bank_names: [
                "中国银行",
                "工商银行",
                "建设银行",
                "农业银行",
                "交通银行",
                "邮政银行",
                "招商银行",
                "光大银行",
                "广发银行",
                "浦发银行",
                "兴业银行",
                "平安银行",
                "民生银行",
                "中兴银行",
                "华夏银行",
                "长沙银行"
            ]
        };
    },
    computed: {
        bank_name() {
            return this.$store.state.user.bank_name;
        },
        bank_card() {
            return this.$store.state.user.bank_card;
        },
        bank_tubiao() {
            let app = this;
            let result = "";
            app.bank_names.forEach((element, i) => {
                if (element == app.$store.state.user.bank_name) {
                    result = app.bank_tubiaos[i];
                }
            });
            return result;
        },
        //认证状态
        authentication_status() {
            return this.$store.state.user.status
        },
        
    },
    created() {
        this.onAddCard()
        this.alipay_pic = this.$store.state.user.alipay_image
        this.weixin_pic = this.$store.state.user.wechat_image
    },
    methods: {
        onAddCard() {
            //  判断是否实名认证
            let app = this
            if(app.authentication_status == 1) {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>您还没有进行实名认证？</p>',
                        okText: '实名认证',
                        onOk: () => {
                            app.$router.push("/home/index/real_user")
                        },
                        onCancel: () => {
                            app.$router.push("/home/index/center")
                        }
                    });

                return
            } 
            else if(app.authentication_status == 2) {
                app.$Message.info('实名认证正在审核中，请耐心等候')
                app.$router.push("/home/index/center")
                return
            }
                    

        },
        alterCard() {
            this.$router.push({
                path: "/home/index/alter_card",
                query: { id: "1" }
            });
        },

        unbind() {
            let app = this
            app.$Modal.confirm({
                title: '解绑',
                content: '<p>您确定解绑银行卡码？',
                onOk: () => {
                    app.onDelete()
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
        },
        //解除绑定
        onDelete() {
            let app = this;
            let params = {
                bank_name: "",
                open_city: "",
                open_city_id: "",
                open_city_pc_id: "",
                bank_branch: "",
                bank_card: ""
            };
            app.$api
                .patch(`${app.$lib.host}/api/users/8/`, params)
                .then(function(res) {
                    if (res.status == 200) {
                        app.$Message.success("银行卡解绑成功!");
                        //刷新用户信息
                        app.$store.dispatch("getUserInfo");
                    }
                    // console.log(res)
                });
        },

        getAlipayFile(val ,file) {
            this.alipay_image = file
            this.alipay_pic = val
        },
        getWeixinFile(val, file) {
            this.wechat_image = file
            this.weixin_pic = val
        },
        postAlipayCode() {
            let app = this
            let param = new FormData()

            param.append('alipay_image', app.alipay_image)
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };

            app.$axios.patch(`${app.$lib.host}/api/users/8/`,param,config)
            .then(res=>{
                if(res.status == 200) {
                    app.$Message.success("支付宝收款码上传成功!");
                    //刷新用户信息
                    app.$store.dispatch('getUserInfo' )
                }
                
            })
        },
        postWeixinCode() {
            let app = this
            let param = new FormData()

            param.append('wechat_image', app.wechat_image)
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };

            app.$axios.patch(`${app.$lib.host}/api/users/8/`,param,config)
            .then(res=>{
                if(res.status == 200) {
                    app.$Message.success("微信收款码上传成功!");
                    //刷新用户信息
                    app.$store.dispatch('getUserInfo' )
                }
                
            })
        },
    },
    components: {
        "file-upload": upload
    },
    filters: {
        hideCardNum(val) {
            console.log(val);
            let result = [];
            let card_num = "";
            val = String(val);
            for (var i = 0, len = val.length; i < len; i += 4) {
                result.push(val.slice(i, i + 4));
            }
            result = result.map((item, index) => {
                if (index < result.length - 1) {
                    item = "****";
                }
                return item;
            });
            card_num = result.join("  ");
            console.log(result);
            return card_num;
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

.card-add {
    margin: 36px 0 0 24px;
    text-align: center;
    color: #999;
}

.card-add p {
    margin-bottom: 12px;
}

.card-box{
    padding: 0 15px;
}

.card-box ul li{
        display: flex;
        position: relative;
        list-style: none;
        height: 200px;
        width: 400px;
         /* background linear-gradient(to left, #ef5470, #fe8e66) */
        background: linear-gradient(to left, #3966c1, #5aa2d6);
        border-radius: 5px ;
        margin-top: 14px ;
        padding: 25px 0 0 25px;  
}

.card-left {
    width: 15%;
}
.card-left .card-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background-color: #ffffff;
    border-radius: 50% ;
}

.card-left .card-img img{
    width: 30px;
}

.card-right{
    position: relative;
    width: 85%;
    color: #ffffff;
}

.card-title {
    display:  flex;
    align-items: center;
    font-size: 0;
    line-height: 20px;
}

.card-title span{
    font-size: 18px;
    opacity: 1;
}
.card-title img{
    width: 43px;
    opacity: .6;
    margin-left: 5px;
}

.card-type {

    font-size: 12px;
    line-height: 12px;
    margin-top: 5px;
}

.card-num{

    display: flex;
    margin-top: 22px; 
    align-items: flex-end;
}

.card-num .card-num-item {
    margin-left: 15px;
    font-size: 20px;
    line-height: 20px;
}
.card-num .card-num-item:first-child {
    margin-left: 0;
}

.card-num .star{
    position: relative;
    top: 5px;
    font-size: 24px;
    opacity: .6;  
}

.card-bg{

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: bottom -2.2rem right -1rem;
    opacity: .1;
}

.oprator-card{
    position: absolute;
    display: flex;
    top: 0;
    right: 15px;
}

.alter-card{

    padding: 0px 10px;
    border: 1px solid #fff;
    border-radius: 15px;
    margin-right: 10px;
}
</style>
