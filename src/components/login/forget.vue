<template>
    <div class="login">
        <div class="login-box">
            <Row>
                <Col>
                    <Card>
                        <p slot="title">忘记密码</p>
                        <div class="form-con">
                            <Form ref="formValidate" :model="userform" :rules="ruleValidate" :label-width="60" label-position="left">

                                <FormItem label="用户名" prop="username">
                                    <Input prefix="ios-person" placeholder="请输入手机号码" style="width: 208px" type="text" v-model="userform.username" clearable/>
                                </FormItem>
                                <FormItem label="验证码" prop="code">
                                    <Input prefix="ios-mail" placeholder="请输入验证码" style="width: 108px" type="text" v-model="userform.code" clearable/>
                                    <Button type="primary" @click="handleGetCode" :disabled="getCode.disabled">{{getCode.txt}}</Button>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <Input prefix="md-lock" placeholder="请输入密码" style="width: 208px" type="password" v-model="userform.password" clearable/>
                                </FormItem>
                                <FormItem label="确认密码" prop="password2">
                                    <Input prefix="md-lock" placeholder="请确认密码" style="width: 208px" type="password" v-model="password2" clearable/>
                                </FormItem>
                                
                                <Button type="primary" long @click="handleRegist('formValidate')">设置</Button>
                            </Form>
                        </div>

                        <div class="go-login">
                            <router-link to="/login">返回登录</router-link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    name: "forget",
    data() {
        return {
            userform:{ 
                username: '',
                code: '',
                password: '',
            }, 
            password2: '', 
            getCode: {
                txt: '获取验证码',
                disabled: false,
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


                    app.$api.put(`${app.$lib.host}/api/client_forget_pwd/{id}/`,app.userform)
                    .then(function(res) {
        
                        if(res.status === 200 ) {
                            app.$router.push('/login')
                            app.$Message.success('重置密码成功');
                        }
                        // console.log(99)
                        // console.log(res.data)
                    }).catch((err) => {

                        console.log(88)
                        console.log(err)
                        if(err.status == 400) {
                            app.$Message.success(err.data.code[0]);
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
