<template>
    <div class="login">
        <div class="login-box">
            <Row>
                <Col>
                    <Card>
                        <p slot="title">欢迎登录</p>
                        <div class="form-con">
                            <Form ref="formValidate" :model="userform" :rules="ruleValidate" >
                                <FormItem label="交易服务器" prop="select" >
                                    <Select v-model="userform.select" placeholder="Select your city">
                                        <Option value="易期权真实账户">易期权真实账户</Option>
                                        <Option value="易期权模拟账户">易期权模拟账户</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="用户名" prop="username">
                                    <Input prefix="ios-person" placeholder="请输入手机号码" style="width: 268px" type="text" v-model="userform.username" clearable/>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <Input prefix="md-lock" placeholder="请输入密码" style="width: 268px" type="password" v-model="userform.password" clearable @keyup.enter.native="handleSubmit('formValidate')"/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" long  @click="handleSubmit('formValidate')">登录</Button>
                                </FormItem>
                            </Form>
                        </div>

                        <div class="forget-regist">
                            <router-link to="/forget">忘记密码?</router-link>
                            <router-link class="right" to="/register">立即注册</router-link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            selects:['易期权真实账户', '易期权模拟账户'],
            userform:{ 
                select:'易期权真实账户',
                username: '',
                password: '',
            },  
            ruleValidate: {
                select: [
                    { required: true, message: '请选择交易服务器', trigger: 'change' }
                ],
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],

            }          
        };
    },
    created() {

        if(localStorage.getItem("USERNAME") != undefined) {
            this.userform.username = localStorage.getItem("USERNAME")
        }
    },
    methods: {
        handleSubmit (name) {
            let app = this
            //表单验证
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.$Message.success('登录成功');
 //登录
                    app.$api.post(`${app.$lib.host}/login/`, app.userform).then(function(res) {
                        if(res.status === 200 ) {
                            app.$store.commit('changeLogin', res.data.token)
                            
                            //实时更新用户信息
                            app.$store.dispatch('getUserInfo')
                            .then(function() {
                                window.setInterval(function() {
                                    app.$store.dispatch('getUserInfo');
                                }, 1000)
                                localStorage.setItem("USERNAME", app.userform.username)
                                
                                app.$Message.info({
                                    content: '登录成功',
                                    duration: 2,
                                });

                                if(app.userform.select == app.selects[0]) {
                                    window.location.href = `${process.env.REAL_HOST}/${process.env.DIST}/#/home/market`
                                }else {
                                    window.location.href = `${process.env.SIMULATE_HOST}/${process.env.DIST}/#/home/market`
                                }
                                // app.$router.push('/home/market')

                                //连接交易websoket
                                // app.$initTradeWebSocket(app.$store.state.user.username, app)
                            
                            })
                            .catch(function(err) {

                            })
                        } else if(res.status == 400) {
                            app.$Message.error("用户账户已禁用")
                            // return
                        }
                    }).catch(function(err) {

                        app.$Message.error("账户或者密码错误")

                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })

           
        },
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
</style>
