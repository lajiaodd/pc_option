<template>
    <div class="home">
        <div class="header">
            <div class="header-left">
                <div class="logo-area">
                    <!-- <img src="../assets/images/logo.png">     -->
                    <p class="logo-name">易期权</p>
                </div>
                <Menu mode="horizontal" :theme="theme1" active-name="1">
                    <MenuItem name="1" to="/home/market">
                        <Icon class="icon iconfont icon-hangqing"/>行情
                    </MenuItem>
                    <MenuItem name="2" :to="'/home/deal/'+avg_value">
                        <Icon class="icon iconfont icon-jiaoyi"  />交易
                    </MenuItem>
                    <MenuItem name="3" to="/home/optional">
                        <Icon class="icon iconfont icon-gupiao-zixuangudianjitai" />自选
                    </MenuItem>
                </Menu>
            </div>
            <div class="header-right">
                <div class="head-portarit">
                    <img src="../assets/images/logo.png">
                </div>
                <div class="head-portarit-drop">
                    <Dropdown @on-click="onChanceMonth">
                        <a href="javascript:void(0)" name="0">
                            {{username}}
                            <span class="triangle"></span>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="0">个人中心</DropdownItem>
                            <DropdownItem name="1" divided>充值</DropdownItem>
                            <DropdownItem name="2">提现</DropdownItem>
                            <DropdownItem name="3" divided>退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div class="content">
            <transition mode="out-in">
                <router-view></router-view>
            </transition>
        </div>


    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            theme1: "dark",
            bianhao:0,
        };
    },

    computed: {
        username() {
            return this.$store.state.user.username;
        },
        //均值认购合约security_id
        avg_value: {
            get() {
                let market_data = this.$store.getters.marketOne(this.bianhao);
                // console.log(market_data)
                let market_result = ''
                if(market_data) {
                    //计算执行价平均值
                    var etf50_current_price = market_data[3][0].current_price
                    var i  = this.approach(market_data[1], etf50_current_price)//获取最小值索引
                    market_result = market_data[0][i].security_id
                    // console.log(market_result)
                    return market_result;
                }

            },
            set(value) {}
        },

    },

    methods: {
        approach(arr, num){
            var newArr = [];
            arr.map(function(x){
                // 对数组各个数值求差值
                newArr.push(Math.abs(parseFloat(x.exercise_price) - num));
            });
            // 求最小值的索引
            var index = newArr.indexOf(Math.min.apply(null, newArr));
            return index;
        },
        onChanceMonth(index) {
            let app = this;
            switch (Number(index)) {
                case 0:
                    this.$router.push("/home/index/center");
                    break;
                case 1:
                    this.$router.push("/home/index/recharge");
                    break;
                case 2:
                    this.$router.push("/home/index/withdraw");
                    break;
                default:
                    //退出登录
                    app.$Modal.confirm({
                        title: '退出',
                        content: '<p>您确定退出登录吗？',
                        onOk: () => {
                            if(localStorage.getItem("TOKEN")) {

                                app.$store.commit("RESET_USER_INFO");
                                localStorage.removeItem("TOKEN");

                                app.$store.commit("changeLogin", null);
                                app.$Message.info('退出登录成功');

                                app.$router.push('/login')
                            }
                            
                        },
                        onCancel: () => {
                            // this.$Message.info('Clicked cancel');
                        }
                    });
                    break;
            }

            
        },


    },
    watch: {
        avg_value: {
            handler(newValue, oldValue) {
                // console.log(newValue)
            },
            deep: true
        }
    },
};
</script>

<style scoped>
.home {
    min-height: 100vh;
}
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #515a6e;
    padding: 0 20px;
}
.header-left {
    display: flex;
    flex-direction: row;
}

.logo-area {
    line-height: 40px;
    margin-right: 20px;
}
.ivu-menu-horizontal {
    height: 40px;
    line-height: 40px;
}
.header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.header img {
    width: 36px;
}

.head-portarit {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 4px;
}

.header .logo-name {
    color: #ffffff;
}
.triangle {
    display: inline-block;
    margin-right: 4px;
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-top: 6px solid #ffffff;
}
.content {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
