<template>
    <div class="login">
        <div class="login-box">
            <Row>
                <Col>
                    <Card>
                        <p slot="title">免费注册</p>
                        <div class="form-con">
                            <Form ref="formValidate" :model="userform" :rules="ruleValidate" :label-width="60" label-position="left">

                                <FormItem label="用户名" prop="username">
                                    <Input prefix="ios-person" placeholder="请输入手机号码" style="width: 208px" type="text" v-model="userform.username" clearable/>
                                </FormItem>
                                <FormItem label="验证码" prop="code">
                                    <Input prefix="ios-mail" placeholder="请输入验证码" style="width: 110px" type="text" v-model="userform.code" clearable/>
                                    <Button type="primary"  @click="handleGetCode" :disabled="getCode.disabled">{{getCode.txt}}</Button>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <Input prefix="md-lock" placeholder="请输入密码" style="width: 208px" type="password" v-model="userform.password" clearable/>
                                </FormItem>
                                <FormItem label="确认密码" prop="password2">
                                    <Input prefix="md-lock" placeholder="请确认密码" style="width: 208px" type="password" v-model="password2" clearable/>
                                </FormItem>
                                <FormItem label="邀请码" prop="invite_code">
                                    <Input prefix="ios-people" placeholder="请输入邀请码" style="width: 208px" type="text" v-model="userform.invite_code" clearable/>
                                </FormItem>
                                <div class="agree">
                                    <Checkbox v-model="isSeclet" @on-change="onIsSelcetCode">同意</Checkbox>
                                    <span @click="modal.risk = true"><a>风险揭示书</a></span>
                                    <span @click="modal.qualified_investor = true"><a>合格投资者确认书</a></span>

                                    <Modal
                                        :title="modal.risk_title"
                                        v-model="modal.risk"
                                        class-name="vertical-center-modal">
                                        <div class="risk-content">
                                            {{modal.risk_content}}
                                        </div>
                                    </Modal>
                                    <Modal
                                        :title="modal.qualified_investor_title"
                                        v-model="modal.qualified_investor"
                                        class-name="vertical-center-modal">
                                        <div class="risk-content">
                                            {{modal.qualified_investor_content}}
                                        </div>
                                    </Modal>
                                </div>

                                
                                <Button type="primary" long @click="handleRegist('formValidate')">注册</Button>
                            </Form>
                        </div>

                        <div class="go-login">
                            <router-link to="/login">已有账号？去登录</router-link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            userform:{ 
                username: '',
                code: '',
                password: '',
                invite_code:'',
            }, 
            password2: '', 
            isSeclet: false,
            getCode: {
                txt: '获取验证码',
                disabled: false,
            },
            modal: {
                risk_title: '股票期权交易风险揭示书',
                risk_content: "尊敬的客户： 当您使用本期权交易系统投资时可能获得较高收益,但同时也存在相应的风险,为了帮助您更好地了解其中风险,根据国家有关法律法规、规章政策和交易所业务规则等,特提供本《风险揭示书》,请您在入市前务必认真、详细阅读并完全理解本告知书中的全部内容,并对自身的风险理解能力、风险承受能力、风险控制能力以及财务经济状况、投资经验等做出客观判断请您仔细阅读以下内容并自愿承担投资市场带来的风险。 本系统只支持上证50ETF期权合约买方交易。使用者可以在交易合约一栏查看具体可交易的合约。 我们强调,所提供的仅仅是可辅助进行期权合约买方交易的交易软件,交易软件本身可能存在风险。考虑使用本软件进行投资交易时,您应当明确使用本软件除了其它交易手段共同有的风险外,还存在且不限于下列风险： 1.由于您手机故障以及网络数据传输止盈止损等原因,指令可能会出现中断、延迟、停顿、数 据错误等情况,不能完全保证所有的交易都严格在限定的参数内完成交易。 2.本系统只是交易辅助工具,仅协助您按设定好的参数进行辅助开仓,平仓操作,并不能保证 交易能够获利。 3.由于国家法律、行业规范、交易所规定(如:持仓限制、开仓数量限制等)导致本系统无法 正常交易的情况,我公司不承担任何责任和义务。 4.您利用本系统进行期权交易，应积极采取安全措施，如：定期维护手机及联网设备、采用防病毒及防黑客产品、妥善保管个人资料等，以防范电子化交易可能发生的各种风险。 5.由于无法控制和不可预测的原因，例如：地震、水灾、火灾、战争、罢工等不可抗力因素 或者手机系统、通讯系统故障、黑客入侵等，可能造成您的指令无法成交或者无法全部成交，我公司不承担任何责任。 6. 请您关注股票期权业务中面临的各种政策风险，以及由此可能造成的损失，包括但不限于因法律法规及政策变动须作出重大调整或者终止该业务。 本风险揭示书的揭示事项仅为列举性质，未能详尽列明股票期权业务的所有风险。客户在参与股票期权业务前，应认真阅读相关业务规则及协议条款，对股票期权业务所特有的规则有所了解和掌握，并确信自己已做好足够的风险评估与财务安排，避免因参与股票期权业务而遭受难以承受的损失。 以上《股票期权风险揭示书》的各项内容，本人/单位已仔细阅读并完全理解，愿意自行承担股票期权交易的风险和损失。",
                risk: false,
                qualified_investor_title: '合格投资者确认书',
                qualified_investor_content: "尊敬的客户： 因为本平台所提供交易产品的属性所限，仅向符合以下标准的投资者（“合格投资者”）提供交易和服务功能。如果您同时具备以下合格投资者条件，请点击继续进行注册；如果您不满足下述任一条件，请退出本次注册： 1、 您具有一年以上投资于风险投资产品（包括基金、股票、信托、私募证券或金融衍生产品）的经验； 2、 个人证券资产【证券市值与资金账户可用余额（不含通过融资融券交易融入的证券和资金）】日均不低于50万元； 3、在证券公司开设证券账户6个月以上并具备融资融券业务参与资格或者金融期货交易经历；或者在期货公司开户6个月以上并具有金融期货交易经历； 4、具备期权基础知识并有期权模拟交易经历。 本人确认和承诺同时符合上述四项合格投资者标准；如本人承诺不实，本人愿意承担由此产生的一切法律风险及经济责任",
                qualified_investor: false,
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, max: 16,  message: '密码不能长度不能小于6，大于16', trigger: 'blur' }
                ],

            }          
        };
    },

    created() {
        // console.log(this.$route.query.invitation_code)
        this.userform.invite_code = this.$route.query.invitation_code
    },

    methods: {
        handleRegist (name) {
            let app = this
            //表单验证
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.$Message.success('登录成功');
                    if(app.userform.password != app.password2) {
                        app.$Message.success('两次输入密码不一致');
                        return
                    }
                    if(!app.isSeclet) {
                        app.$Message.success('请同意合约');
                        return
                    }

                    app.$api.post(`${app.$lib.host}/api/client/`,app.userform)
                    .then(function(res) {
        
                        console.log(99)
                        console.log(res.data)
                    }).catch((err) => {

                        console.log(88)
                        console.log(err)
                        if(err.status === 201 ) {
                            app.$router.push('/login')
                            app.$Message.success('注册成功')
                        }
                        if(err.status == 400) {
                            app.$Message.success(err.data.username[0])
                        }
                    })
                    
                } else {
                    app.$Message.error('Fail!');
                }
            })

           
        },

        handleGetCode() {
            let app = this
            if(this.userform.username) {
                app.$api.getCode(`${app.$lib.host}/api/codes/`, {mobile:app.userform.username},app)
            } else {
                app.$Message.error('请先填写手机号!')
            }
        },

        onIsSelcetCode() {
            console.log(333)
            // this.isSeclet = !this.isSeclet
        }
    }
};
</script>

<style scoped>
/* .ivu-form-item {
    margin-bottom: 16px;
    vertical-align: top;
    zoom: 1;
} */
.login {
    position: relative;
    height: 100vh;
    background-image: url('../../assets/images/login_bg.jpg');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
}

.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%,0);
    width: 300px;
}

.forget-regist {
    margin: 30px 0px;
    text-align: center;
    display: flex;
    justify-content: space-between;   
}

.forget-regist a {
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    padding: 0 .2rem;
    color: #515a6e;
}

.agree {
    color: #ed4014;
    font-size: 0;
    margin: 10px 0 20px;
}

.agree a {
    color: #515a6e;
    font-size: 14px;
    display: inline-block;
    vertical-align: top; 
    margin-left: .3rem;
}

.go-login {
    text-align: center;
    margin: 15px 30px;
}

.go-login a {
    color: #515a6e;
}
</style>
