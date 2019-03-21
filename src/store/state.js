export default {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    loginStatus: true, //是否登录
    attestationStatus: true, //是否认证
    goldenStatus: true, //是否入金
    isActualQuotation: '实盘',
    
    // marketData:[]
    market_data: "",
    list_month:"", //月份列表
    arr_security_id: [], //所有合约数组,
    contract_lists:[],

    header_padding_top :0,// 头部padding-top值
    isplusReady : false,
    
    user: {
        first_name: '',
        identity_card: '', //身份证
        id_front_image: '', //身份证正面照片
        id_back_image: '', //身份证反面照片bank_card
        // ('1','已开户待提审'),
        // ('2','已提审待审核'),
        // ('3','已审核待入金'),
        // ('4','已入金待交易'),
        // ('5','已交易')
        status: '未开户',  //实名认证有没有通过
        status_before: '', //用来判断历史有没有认证过
        bank_card: '', //银行卡号
        bank_name: '', //开户银行
        open_city: '', //开户城市id
        open_city_pc_id: '', //pc端开户城市id
        bank_branch: '', //开户支行
        is_active: true, //账户是否可以用
        username: '点击跳转登录', //用户名
        account_fund: "0.0000",//可用资金
        yes_fund: "", //昨结

        alipay_image:'',//支付宝收款码
        wechat_image:'',//微信收款码

    }
}