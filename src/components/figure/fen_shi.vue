<template>
    
    <div ref="tuXings"  :style="{height: '100%',width:'100%',position: 'absolute',}"></div>

    
</template>

<script>
export default {
    name: "fen_shi",
    data() {
        return {
            arr_current_price: [],
            arr_market_date_time: [],
            arr_market_dates:['9:30','10:00', '10:30', '11:00', '11:30', '13:30','14:00', '14:30','15:00'],
            arr_times:[],
            pageTimer:{},
            time:1000,
        };
    },
    props:['security_id','tuxing'],
    computed: {
        securityData: {
            get () {
                let result = this.$store.getters.security(this.security_id)

                return result
            },
            set (value) {}
        },
    },
    created() {
        let _this = this
        this.getFenShiData()
        window.onresize = function() {
            
            if(_this.tu_xing) {
                _this.tu_xing.resize()
            }
        }
    },
    mounted () {
        this.creadTime()
    },
    methods: {
        getFenShiData() {
            let app = this;
            // console.log("this.security_id")
            // console.log(this.security_id)
            if(this.security_id != undefined ) {
                app.$api.get(`${app.$lib.host}/api/cmp/${this.security_id}`)
                .then(function(res) {
                    if(res.status == 200) {
                        if(res.data.length != 0 && res.data instanceof Array)  {
               
                            let result = app.removeKey(res.data)
                            app.arr_market_date_time = result.arr_market_date_time
                            app.arr_current_price = result.arr_current_price
                            
                            app.add_market_date_time_end()
                            
                            app.initFenShi()
                        }
                        // console.log("app.arr_market_date_time")
                        // console.log(app.arr_market_date_time)
                        // console.log(app.arr_current_price)
                    }

                })
            }
        },

        add_market_date_time_end() {
            let app = this;

            let len = app.arr_market_date_time.length-1

            let i = app.arr_times.indexOf(app.arr_market_date_time[len])
            
            //获取当前行情时间到收盘的时间
            let end_times = app.arr_times.slice(i)
            app.arr_market_date_time = app.arr_market_date_time.concat(end_times)

            
        },
        removeKey(data) {
            
            let arr_market_date_time = [],
                arr_current_price = []
            data.forEach((item, index)=> {
                arr_market_date_time.push(item.market_date_time)
                let cur_price = ''
                if(Number(item.current_price) == 0) {
                    cur_price = ''
                }else {
                    cur_price = Number(item.current_price)
                }
                arr_current_price.push(cur_price)
            })
            
            return {arr_market_date_time, arr_current_price}
        },
        creadTime() {
                // 上午9点半到11点半
                let sm = 9;
                let sn = 29;
                let slen = 2*60+1
                // 下午1点到下午3点
                let xm = 12;
                let xn = 59;
                let xlen = 2*60+1
                let stimes = this.getTimes(sm, sn, slen)
                let xtimes = this.getTimes(xm, xn, xlen)
                this.arr_times = stimes.concat(xtimes)

        },
        getTimes(m, n, len) {
                var arr=[];
                for(var i=0;i<len;i++){
                    n+=1;
                    if(n>59){
                        n = 0;
                        m+=1
                    }
                    arr.push((m>9?m:"0"+m)+":"+(n>9?n:"0"+n));
                }
                return arr
        },
        initFenShi() {
                let _this = this
                // console.log("_this.arr_market_date_time")
                // console.log(_this.arr_market_date_time)
                // console.log(_this.arr_times)
                _this.tu_xing = _this.$echarts.init(_this.$refs.tuXings)
                let option = null;                
                option = {
                    title : { //标题
                            x : 60,
                            y : 5,
                            text : _this.security_id ,
                            textStyle: {
                                color:'#ffffff',
                                fontWeight: 300,
                                fontSize:'16px',
                            },   //换行用 \n
                        },
                    
                    tooltip : { //鼠标悬停提示内容
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: { //布局   控制图的大小，调整下面这些值就可以
                        left: '10px',
                        right: '10px',
                        bottom: '0px',
                        top:'40px',
                        containLabel: true
                    },
                    xAxis : [ //X轴
                        {
                            type : 'category',
                            show: false,
                            // data : _this.arr_times,
                            data : _this.arr_market_date_time,
                            axisTick: {
                            },
                            axisLabel : {
                                show : true,
                                color: '#FF0000',
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    color: '#800000',//左边线的颜色
                                    width:'2'//坐标线的宽度
                                },
                                show: true,
                            },
                            splitLine : {
                                show : true,
                                lineStyle : {
                                    type : 'solid',
                                    color: '#800000'
                                },
                                // interval:8,
                            },
                            boundaryGap: false,
                            
                        },
                        {
                            type : 'category',
                            show: true,
                            position:'bottom',
                            data : _this.arr_market_dates,
                            axisTick: {
                                // alignWithLabel: true
                            },
                            axisLabel : {
                                show : true,
                                color: '#FF0000',
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#800000',//左边线的颜色
                                    width:'2'//坐标线的宽度
                                },
                                show: true,
                            },
                            splitLine : {
                                show : true,
                                lineStyle : {
                                    type : 'dashed',
                                    color: '#800000'
                                },
                                // interval:8,
                            },
                            boundaryGap: false,

                            
                        },
                        
                    ],
                    yAxis : [ //两个y轴
                        {
                            type : 'value',
                            axisLabel : {
                                show : true,
                                color: '#FF0000',
                                interval : 'auto',
                                formatter : function(value, index) {
                                    return value.toFixed(4)
                                },
                                textStyle: {
                                    color: function (value, index) {
                                        return value >= _this.arr_current_price[0] ? (value == _this.arr_current_price[0]? '#fff': '#ff0000' ): '#00C800';
                                    }
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#800000',//左边线的颜色
                                    width:'1'//坐标线的宽度
                                },
                                show: true,
                            },
                            splitNumber : 10,
                            splitLine : {
                                show : true,
                                lineStyle : {
                                    type : 'solid',
                                    color: '#800000'
                                }
                            },
                            scale: true,
                            splitArea : {
                                show : false
                            }
                        } ,
                        {
                            type : 'value',
                            axisLabel : {
                                show : true,
                                color: '#FF0000',
                                interval : 'auto',
                                formatter : function(value, index) {
                                    return value.toFixed(4)
                                },
                                textStyle: {
                                    color: function (value, index) {
                                        return value >= _this.arr_current_price[0] ? (value == _this.arr_current_price[0]? '#fff': '#ff0000' ): '#00C800';
                                    }
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#800000',//左边线的颜色
                                    width:'1'//坐标线的宽度
                                },
                                show: true,
                            },
                            splitNumber : 10,
                            splitLine : {
                                show : true,
                                lineStyle : {
                                    type : 'solid',
                                    color: '#800000'
                                }
                            },
                            scale: true,
                            splitArea : {
                                show : false
                            }
                        }
                    ],
                    series : [ //用于指定图标显示类型
                        
                        {
                            name : '当前价',
                            type : 'line',
                            symbol: 'none',
                            smooth : true, //光滑的曲线
                            show: false,

                            showAllSymbol : true, //动画效果
                            yAxisIndex : '0',//使用第一个y轴
                            data : _this.arr_current_price
                        },
                        {
                                name : '当前价',
                                type : 'line',
                                smooth : true, //光滑的曲线
                                symbol: 'none',
                                showAllSymbol : true, //动画效果
                                symbolSize : 0,
                                yAxisIndex : '1',

                                data : _this.arr_current_price
                            
                        },
                    ]
                };
                if (option && typeof option === "object") {
                    _this.tu_xing.setOption(option, true);
                }
                _this.tu_xing.resize()
                _this.pageTimer.timer0 = setTimeout(function() {
                    _this.getFenShiData()
                }, _this.time)


            },
    },
    destroyed () {
        let _this = this
        _this.tu_xing.clear()
        for(var each in _this.pageTimer){
            window.clearInterval(_this.pageTimer[each]);
        }_this
    },
};
</script>

<style scoped>


</style>
