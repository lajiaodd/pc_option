<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">实名认证</span>
        </div>
         <Divider type="horizontal" />

         <div class="center-content">
                <div v-if="authentication_status=='1' && !status_before" >
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                        <FormItem label="真实姓名" prop="first_name">
                            <Input v-model="formValidate.first_name" placeholder="请输入你的真实姓名"></Input>
                        </FormItem>
                        <FormItem label="身份证号码" prop="identity_card">
                            <Input v-model="formValidate.identity_card" placeholder="请输入你的身份证号码"></Input>
                        </FormItem>
                        <FormItem label="证件正面" prop="id_front_image">
                            <file-upload v-bind:avatar_later="formValidate.id_front_image" @upload="getFrontFile"></file-upload>
                        </FormItem>
                        <FormItem label="证件反面" prop="id_back_image">
                            <file-upload v-bind:avatar_later="formValidate.id_back_image" @upload="getReverseFile" ></file-upload>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
                        </FormItem>
                    </Form>
                </div>

                <!-- 重新认证 -->
                <div class="real-submit" v-else-if="authentication_status == '1' && status_before"> 
                    <div class="yestubiao">
                        <i class="icon iconfont icon-shibai" style=" color:#46BB61;"></i>
                    </div>
                    <div class="sm" style="">对不起， 实名认证失败了</div>
                    <div class="dd" style="">证件信息有误，请核对后重新输入</div>
                    <div @click="recertification">
                        <Button type="primary"  long>重新认证</Button>
                    </div>
                </div>
                <!-- 认证提交成功 -->
                <div class="real-submit" v-else-if="authentication_status == '2'">
                    <div class="yestubiao">
                        <i class="icon iconfont icon-chenggong" style="color:#EC6465; "></i>
                    </div>
                    <div class="sm" style="">实名认证已提交</div>
                    <div class="dd" style="">认证中请耐心等候</div>
                </div>

                    <!-- 认证成功 -->
                <div class="real-submit" v-else-if="authentication_status == '3'">
                    <div class="yestubiao">
                        <i class="icon iconfont icon-xiaolian" style="color:#EC6465; "></i>
                    </div>
                    <div class="sm" style="">恭喜你实名认证成功</div>
                </div>
         </div>
    </div>
</template>

<script>
import upload from '@/components/expands/upload.vue'
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',

            formValidate: {
                first_name: "",
                identity_card: "",
                id_front_image: "",
                id_back_image: "",
    
                font_image:'',
                back_image:'',
            },

            ruleValidate: {
                first_name: [
                    { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                ],
                identity_card: [
                    { required: true, message: '身份证号码不能为空', trigger: 'blur' },
                ],
                id_front_image: [
                    { required: true, message: '身份证正面不能为空', trigger: 'blur' }
                ],
                id_back_image: [
                    { required: true, message: '身份证反面不能为空', trigger: 'blur' },
                ],

            }
        };
    },
    computed: {
        authentication_status() {
            console.log("this.$store.state.user.status")
            console.log(this.$store.state.user.status)
            return this.$store.state.user.status
            // return '1'
        },
        status_before() {
            return this.$store.state.user.status_before
            // return ''
        },

    },
    components: {
        'file-upload': upload
    },
    methods: {
        getFrontFile(val, file) {

            this.formValidate.id_front_image = val
            this.formValidate.font_image = file
        },
        getReverseFile(val, file) {
            this.formValidate.id_back_image = val
            this.formValidate.back_image = file
        },
        handleSubmit (name) {
            let app = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let result = app.$lib.identityCodeValid(app.formValidate.identity_card)
                    if(result.status != 1) {
                        this.$Message.error(result.text);
                        return
                    }

                    let param = new FormData() 
                    param.append("first_name", app.formValidate.first_name)
                    param.append("identity_card", app.formValidate.identity_card)
                    param.append("id_front_image", app.formValidate.font_image)
                    param.append("id_back_image", app.formValidate.back_image)
                    param.append("status", 2)
                    param.append("status_before",1) //用来判断是否是第一次认证
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };  //添加请求头
                    app.$axios.patch(`${app.$lib.host}/api/users/8/`,param,config)
                    .then(res=>{
                        if(res.status == 200) {
                            app.$Message.success('实名认证提交成功!');
                            //刷新用户信息
                            app.$store.dispatch('getUserInfo' ).then(function() {
                                app.$router.push('/home/index/security')
                            })
                        }

                    })
                    
                } else {
                    this.$Message.error('必填项不能为空');
                }
            })
        },

        //重新认证
        recertification() {
            let app =this
            let params = {
                status: 1,
                status_before:  '',
            }
            app.$api.patch(`${app.$lib.host}/api/users/8/`,params)
            .then(function(res) {
                if(res.status == 200) {
                    app.$store.dispatch('getUserInfo' );
                }
                console.log(res)
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

.real-submit {
    text-align: center;
}

.yestubiao {
    padding :30px 0;
}

.yestubiao i {
    font-size : 50px;
}

.sm {
    font-size: 18px;
}

.add {
    font-size : 12px;
    color: #999999;
    padding: 5px 0 15px;
}
</style>
