<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">账户安全</span>
        </div>
         <Divider type="horizontal" />

         <div class="center-content">
            <Row class="security-row"> 
                <Col span="4" class="recurity-content-title">实名认证</Col>
                <Col span="7" >{{security_text}}</Col>
                <Col span="11">保障账户安全，需完成实名认证才能提现</Col>
                <Col span="2">
                    <Button class="security-btn" to="/home/index/real_user">认证</Button>
                </Col>
            </Row>
            <Divider type="horizontal" />
            <Row class="security-row">
                <Col span="4" class="recurity-content-title">修改密码</Col>
                <Col span="7">已设置</Col>
                <Col span="11" >登录网站时需要输入的密码</Col>
                <Col span="2">
                    <Button class="security-btn"  to="/home/index/alter_password">修改</Button>
                </Col>
            </Row>
         </div>
    </div>
</template>

<script>
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',
        };
    },
    computed: {
        //认证状态
        authentication_status() {
            return this.$store.state.user.status
        },
        status_before() {
            return this.$store.state.user.status_before
        },

        first_name() {
            return this.$store.state.user.first_name
        },
        identity_card() {
            return this.$store.state.user.identity_card
        },
        security_text() {
            if(this.authentication_status=='1' && !this.status_before) {
                return "未认证"
            }else if(this.authentication_status=='1' && this.status_before) {
                return "认证失败，请重新认证"
            }else if(this.authentication_status=='2') {
                return "实名认证正在审核中"
            }else {
                return "已认证"
            }
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

.center-content {
    padding: 20px;
}

.recurity-content-title{
    font-size: 14px;
    font-weight: bold;
}

.security-btn {
    color: rgb(230, 0, 18);
    cursor: pointer;
}

.security-row{
    display: flex;
    align-items: center;
}
</style>
