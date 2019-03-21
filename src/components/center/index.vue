<template>
    <div class="layout">
        <Layout>
            <Layout>
                
                <Sider hide-trigger :style="{background: '#fff' }"> 
                    <Card style="">

                        <Row>
                            <Col span="24" :style="{paddingBottom: '12px'}">登录账户： {{username}}</Col>
                            <Col span="24" :style="{paddingBottom: '12px'}">IP地址： {{ip}}</Col> 
                            <Col span="24" :style="{paddingBottom: '12px'}">安全等级： 
                                <Progress :percent="safenum" hide-info :style="{width: '60px'}"/>
                                <span class="ivu-progress-text"><span>{{safetext}}</span></span>
                            </Col> 
                        </Row>
                    </Card>
                    <!-- <div style="height:10px;background: #F5F7F9;"></div> -->
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" class="home-menu">
                        <MenuItem to="/home/index/center" :name="1">
                            <Icon type="md-home"></Icon>
                            个人中心
                        </MenuItem>
                        <Submenu :name="2">
                            <template slot="title">
                                <Icon type="logo-bitcoin"></Icon>
                                资金
                            </template>
                                <MenuItem :name="2-1" to="/home/index/recharge">
                                    <Icon type="logo-usd"></Icon>
                                    账户充值
                                </MenuItem>
                                <MenuItem :name="2-2" to="/home/index/withdraw">
                                    <Icon type="ios-cash"></Icon>
                                    账户提现
                                </MenuItem>
                                <MenuItem :name="2-3" to="/home/index/bank">
                                    <Icon type="ios-card"></Icon>
                                    银行卡管理
                                </MenuItem>
                                <MenuItem :name="2-4" to="/home/index/settlement">
                                    <Icon type="ios-paper-outline"></Icon>
                                    结算清单
                                </MenuItem>
                                <MenuItem :name="2-5" to="/home/index/in_out_gold">
                                    <Icon type="ios-repeat"></Icon>
                                    出入金
                                </MenuItem>
                        </Submenu>
                        <Submenu :name="3">
                            <template slot="title">
                                <Icon type="ios-contact"></Icon>
                                账户
                            </template>
                                <MenuItem :name="3-1" to="/home/index/profile">
                                    <Icon type="ios-mail-outline"></Icon>
                                    个人信息
                                </MenuItem>
                                <MenuItem :name="3-2" to="/home/index/security">
                                    <Icon type="ios-finger-print"></Icon>
                                    账户安全
                                </MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{margin: '0 0 0 20px'}">
                    <Content  class="contents">
                        <transition mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    name: "deal",
    data() {
        return {
            safenum:0,
            safetext: "弱"
        };
    },
    computed: {
        username() {
            return this.$store.state.user.username
        },
        ip() {
            return localStorage.getItem("Ip")
        },
        //认证状态
        authentication_status() {
            let status = Number(this.$store.state.user.status)

            if(status >= 3) {
                this.safenum = 100,
                this.safetext = "强"
            }
            return status
        },
    },
    methods: {

    },
    watch: {
        authentication_status(newval, oldval) {

        }
    }
};
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #F5F7F9;
    color: #515a6e;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    overflow: auto;
    /* min-height: calc(100vh - 60px); */
    padding: 40px 60px;
}

.contents {
    position: fixed;
    top: 80px;
    bottom: 60px;
    left: 300px;
    right: 60px; 
    overflow: auto; 
    background-color: #fff;
    padding: 24px;
}

.home-menu {
    position: fixed;
    top: 230px;
    bottom: 60px;
    left: 60px;
    width: 200px!important;
    overflow: auto; 
    background-color: #fff;
    
}
</style>
