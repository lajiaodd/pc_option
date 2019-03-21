<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">修改密码</span>
        </div>
        <Divider type="horizontal" />

        <div class="center-content">
            <Form ref="formValidate" :model="userform" :rules="ruleValidate" :label-width="150">
                <FormItem label="旧密码" prop="original_password">
                    <Input v-model="userform.original_password" placeholder="请输入旧密码"></Input>
                </FormItem>
                <FormItem label="新密码" prop="password">
                    <Input v-model="userform.password" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="password2">
                    <Input v-model="password2" placeholder="请输入确认新密码"></Input>
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
                </FormItem>
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

            userform: {

                original_password : '',
                password: '',
            },
            password2: '',

            ruleValidate: {
                original_password: [
                    { required: true, message: '旧不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                ],
            }
        };
    },
    computed: {


    },

    methods: {
        handleSubmit (name) {
            let app = this
            this.$refs[name].validate((valid) => {
                if (valid) {

                    if(app.userform.password.toString().length<6 || app.userform.password.toString().length>16) {
                        app.$Message.error('请输入6~16位密码');
                        return
                    }
                    if(app.userform.password != app.password2) {
                        app.$Message.error('两次输入密码不一致');
                        return
                    }

                    app.$api.put(`${app.$lib.host}/api/client_change_pwd/{id}/`,app.userform)
                    .then(function(res) {
        
                        if(res.status === 200 ) {
                            app.$router.push('/home/index/security')
                            app.$Message.success('修改密码成功');
                        }
                        // console.log(99)
                        // console.log(res.data)
                    }).catch((err) => {
                        if(err.status == 400) {
                            app.$Message.error(err.data.original_password[0]);
                        }
                    })
                    
                } else {
                    app.$Message.error('必填项不能为空');
                }
            })
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


</style>
