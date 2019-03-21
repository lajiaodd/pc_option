<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">个人信息</span>
        </div>
        <Divider type="horizontal" />

        <div class="center-content">
            <ul>
                <li>
                    <span class="profile-content-title">会员账号</span>
                    <span class="profile-content-content">{{invitation_code}}</span>
                </li>
                <li>
                    <span class="profile-content-title">真实姓名</span>
                    <span class="profile-content-content">{{first_name}}</span>
                </li>
                <li>
                    <span class="profile-content-title">身份证号</span>
                    <span class="profile-content-content">{{identity_card}}</span>
                </li>
                <li>
                    <span class="profile-content-title">手机号码</span>
                    <span class="profile-content-content">{{invitation_code}}</span>
                </li>
                <li>
                    <span class="profile-content-title">邀请码</span>
                    <span class="profile-content-content">{{invitation_code}}</span>
                </li>
                <li>
                    <span class="profile-content-title">邀请链接</span>
                    <span class="profile-content-content">{{pc_invitation_url}}</span>
                    <span><Button size="small" type="primary" v-clipboard="pc_invitation_url">复制链接</Button></span>
                    <div class="code">
                        <qriously :value="invitation_url" :size="size" :backgroundAlpha="backgroundAlpha" style="display:none"/>
                        <div id="code"></div>
                        <div class="code-tip">(用微信扫描下方二维码,可直接在手机上分享给好友)</div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',
            size: 180,
            // 背景透明度，默认透明 0 
            backgroundAlpha: 1,
            mobileurl: 'http://192.168.101.3:8081/'
        };
    },
    computed:{
        invitation_code() {
            return this.$store.state.user.username
        },
        invitation_url() {
            return `${this.mobileurl}#/register?invitation_code=${this.invitation_code}`
        },

        pc_invitation_url() {
            return `${this.$axios.defaults.baseURL}#/register?invitation_code=${this.invitation_code}`
        },
        //认证状态
        authentication_status() {
            return this.$store.state.user.status
        },
        first_name() {
            if(this.authentication_status <= 2) {
                return "未实名认证"
            } else {
                return this.$store.state.user.first_name
            }
        },
        identity_card() {
           if(this.authentication_status <= 2) {
                return "未实名认证"
            } else {
                return this.$store.state.user.identity_card
            }
        },


    },
    created() {
        this.invite_link()
    },
    methods: {
        invite_link() {
            this.$nextTick(function() { // canvas转img
                let canvas = document.querySelector('canvas');
                let imgSrc = canvas.toDataURL("image/png")
                console.log(imgSrc)
                let elem = document.createElement('img');
                elem.setAttribute('src', imgSrc);
                document.getElementById('code').appendChild(elem);


            })
        }
    },

};
</script>

<style scoped>
.title {
    font-size: 16px;
    color: rgb(162, 77, 19); 
    font-weight: bold;
    
}

.center-content li{
    margin: 10px 0px;
}

.profile-content-title {
    font-size: 14px;
    font-weight: 700;
    color: #000;
    margin-left: 15px;
    display: -moz-inline-box;
    display: inline-block;
    width: 90px;
    text-align: right;
}

.profile-content-content {
    font-size: 14px;
    color: #333;
    margin-left: 15px;
}

.code {
    margin-left: 120px;
}
</style>
