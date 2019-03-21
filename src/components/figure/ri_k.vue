<template>
    
    <div ref="tuXings"  :style="{height: '100%',width:'100%',position: 'absolute',}"></div>
    
</template>

<script>
export default {
    name: "ri_k",
    data() {
        return {
            ri_k: [], //日k数据
            pageTimer:{},
            time:1000,
        };
    },
    props:['security_id','tuxing'],
    mounted() {
        let _this = this
        _this.getRiKData()

        window.onresize = function() {
            console.log(88888888);
                console.log(_this.tuXings);
            
            if(_this.tu_xing) {
                _this.tu_xing.resize()
            }
        }
    },
    methods:{
        getRiKData() {
            let _this = this;
            let security_id = _this.security_id
            _this.$api.get(`${_this.$lib.host}/api/opt_daily/?search=${security_id}`)
            .then(function(res) {
                if(res.status == 200) {
                    let result = res.data
                    _this.ri_k = _this.$lib.array_objiect_to_array(result)
                    _this.initRiK()
                }

            })
            
        },
        splitData(rawData) {
            var categoryData = [];
            var values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i])
            }
            return {
                categoryData: categoryData,
                values: values
            };
        },
        initRiK(){
            let _this = this
            var upColor = '#ec0000';
            var upBorderColor = '#8A0000';
            var downColor = '#00da3c';
            var downBorderColor = '#008F28';

            var data0 = _this.splitData(_this.ri_k)
            // console.log(_this.tu_xing)
            _this.tu_xing = _this.$echarts.init(_this.$refs.tuXings)
            let option = null
            option ={
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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: { //布局   控制图的大小，调整下面这些值就可以
                        left: '10px',
                        right: '10px',
                        bottom: '15px',
                        top:'40px',
                        containLabel: true
                    },
                    xAxis:[
                        {
                            type : 'category',
                            show: true,
                            data : data0.categoryData,
                            axisTick: {
                            },
                            boundaryGap : false,
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
                        }
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
                                        return value >= data0.values[0] ? (value == data0.categoryData[0]? '#fff': '#ff0000' ): '#00C800';
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
                        },
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
                                        return value >= data0.values[0] ? (value == data0.categoryData[0]? '#fff': '#ff0000' ): '#00C800';
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

                    series: [
                        {
                            name: '日K',
                            yAxisIndex : '0',
                            type: 'candlestick',
                            showAllSymbol : true, //动画效果
                            data: data0.values,
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: upBorderColor,
                                    borderColor0: downBorderColor
                                }
                            },
 
                        },
                        {
                            name: '日K',
                            yAxisIndex : '1',
                            show: false,
                            type: 'candlestick',
                            data: data0.values,
                            showAllSymbol : true, //动画效果
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: upBorderColor,
                                    borderColor0: downBorderColor
                                }
                            },
 
                        },
                    ]
            }
            if (option && typeof option === "object") {
                _this.tu_xing.setOption(option, true);
            }
            _this.tu_xing.resize()
            _this.pageTimer.timer0 = setTimeout(function() {
                _this.ri_k = null
                _this.tuxing = null
                _this.getRiKData()
            }, _this.time)
            
        },
    },
    destroyed () {
        let _this = this
        // _this.tu_xing.clear()
        _this.ri_k = null
        for(var each in _this.pageTimer){
            window.clearInterval(_this.pageTimer[each]);
        }_this
    },
};
</script>

<style scoped>


</style>
