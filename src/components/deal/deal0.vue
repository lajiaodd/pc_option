<template>
    <div class="deal">

        <div class="content-top">

            <div class="tu">center</div>
            <div class="market" ref="market">
                <div class="inner-container">

                    <div class="market-top">
                        <span>50ETF购2月2100</span>
                        <span>剩余11天</span>
                    </div>
                    <div class="etf code-public-css">
                        <Row>
                            <Col span="6" style="color: #FFFF00;">50ETF</Col>
                            <Col span="6" style="text-align:right;">2.511</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>

                    </div>
                    <div class="sell code-public-css">
                        <Row>
                            <Col span="6">卖五</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖四</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖三</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖二</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖一</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                    </div>
                    <div class="buy code-public-css">
                        <Row>
                            <Col span="6">买一</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">买二</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">买三</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">买四</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">买五</Col>
                            <Col span="6" style="text-align:right;">0.1288</Col>
                            <Col span="12" style="text-align:right;">-2.18%</Col>
                        </Row>
                    </div>
                    <div class="buy code-public-css">
                        <Row>
                            <Col span="6">最新</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                            <Col span="6">行权日</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">涨跌</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                            <Col span="6">行权价格</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">幅度</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                            <Col span="6">合约单位</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">今开</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                            <Col span="6">昨收</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">最高</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                            <Col span="6">最低</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                        </Row>
                        <Row>
                            <Col span="6">总量</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                            <Col span="6">持仓</Col>
                            <Col span="6" style="text-align:right;">-2.18%</Col>
                        </Row>

                    </div>
                    <div class="buy code-public-css">
                        <Row>
                            <Col span="6">交易时间</Col>
                            <Col span="18" style="text-align:right;">09:30-11:30 13:00-14:57</Col>

                        </Row>

                    </div>
                </div>

            </div>
        </div>
        <div class="content-bottom">
            <div class="trade-header">header</div>
            <div class="trade-content">

                <div class="trade-nav">
                    <div class="trade-nav-outer">
                        <div class="trade-nav-inner">
                            <Menu  active-name="1"  class="trade-nav-menu" @on-select="tradeNavSelect">
                                    <MenuItem name="1">
                                        <Icon type="md-document" />
                                        持仓
                                    </MenuItem>
                                    <MenuItem name="2">
                                        <Icon type="md-heart" />
                                        可撤委托
                                    </MenuItem>
                                    <MenuItem name="3">
                                        <Icon type="md-leaf" />
                                        合并持仓
                                    </MenuItem>
                                    <MenuItem name="4">
                                        <Icon type="md-leaf" />
                                        分笔持仓
                                    </MenuItem>
                                    <MenuItem name="5">
                                        <Icon type="md-leaf" />
                                        止盈止损
                                    </MenuItem>
                                    <MenuItem name="6">
                                        <Icon type="md-leaf" />
                                        查询
                                    </MenuItem>
                            </Menu>
                        </div>

                    </div>
                </div>
                <div class="trade-buy-sell">
                    <ul>
                        <li><span>合约:</span> 50ETF购2月2100</li>
                        <li>
                            <span>开平:</span> 
                                <RadioGroup v-model="open_close">
                                    <Radio label="开仓"></Radio>
                                    <Radio label="平仓"></Radio>
                                </RadioGroup>                           
                        </li>
                        <li v-if="open_close =='开仓'">
                            <span>价格:</span> 
                            <InputNumber  :min="1" v-model="currentBuyPrice" :step="0.0001" style="width:250px!important">
                            </InputNumber >
                        </li>
                        <li v-if="open_close =='开仓'">
                            <span>数量:</span> 
                            <InputNumber  :min="1" v-model="currentBuyNum" :step="1" style="width:250px!important"></InputNumber >
                        </li >
                        <li v-if="open_close =='开仓'">
                            <span>金额: </span> {{buyTotalPrice}}
                        </li>
                        <li v-if="open_close =='平仓'">
                            <span>价格:</span> 
                            <InputNumber  :min="1" v-model="currentBuyPrice" :step="0.0001" style="width:250px!important">
                            </InputNumber >
                        </li>
                        <li v-if="open_close =='平仓'">
                            <span>数量:</span> 
                            <InputNumber  :min="1" v-model="currentSellNum" :step="1" style="width:250px!important"></InputNumber >
                        </li>
                        <li v-if="open_close =='平仓'">
                            <span>金额: </span> {{sellTotalPrice}}
                        </li>
                        <li class="buy-sell-btn">
                            <Button>
                                <p class="buy-one">0.0017</p>
                                <Divider class="line"></Divider>
                                <p class="buy-btn">买入</p>
                            </Button>
                            <Button>
                                <p class="sell-one">0.0017</p>
                                <Divider class="line"></Divider>
                                <p class="sell-btn">卖出</p>
                            </Button>
                        </li>
                    </ul>
                </div>
                <div class="trade-list" v-if="current_trade_name==1">
                    <div class="trade-list-left">
                        <div class="trade-list-title">持仓列表</div>
                    </div>
                    <div class="trade-list-right">
                        <Table height="330" :columns="columns1" :data="data2"></Table>
                    </div>
                </div>
                <div class="trade-list" v-if="current_trade_name==2">
                    22222
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "deal",
    data() {
        return {

            currentBuyPrice:0,
            currentBuyNum:0,
            buyTotalPrice:252,
            currentSellPrice:0,
            currentSellNum:0,
            sellTotalPrice:365,
            open_close: '开仓',
            current_trade_name: 1,
                columns1: [
                    {
                        title: 'Name',
                        key: 'name',
                        "sortable": true,
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        "sortable": true,
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        "sortable": true,
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
        };
    },
    methods: {
        tradeNavSelect(name) {
            console.log(name);
            this.current_trade_name = name
            
        }
    },
};
</script>

<style scoped>
.deal {
    display: flex;
    flex-flow: column;
    min-height: 100%;
    /* flex-direction: column; */
    /* position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0; */
}
.content-top {
    display: flex;
    flex:1;
    flex-direction: row;
    /* height: 100%; */
    /* position: absolute;
    top: 0px;
    bottom: 360px;
    left: 0;
    right: 0; */
}
.content-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 40%; */
    height: 360px;
    background: #EBEBED;
}
.tu {
    flex-grow:1;
    /* background: blue; */
}
.market {
    position: relative;
    overflow: hidden;
    width: 20%;
    min-width: 260px;
    border-left: 1px solid #800000;
}
.inner-container {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
.inner-container::-webkit-scrollbar {
    display: none;
}
.suofang{
    position: absolute;
    top: 8px;
    left: 4px;
    font-size: 24px;
    color: #800000;
}
.code-public-css {
    padding: 0 4px;
    border-bottom: 1px solid #800000;
    text-align: left;
    line-height: 22px;
}
.code-public-css .ivu-col-span-6 {
    padding: 0 4px;
}
.market-top{
    color: #FFFF00;
    font-size: 0px;
    font-weight: 400;
    padding: 8px 0px;
    border-bottom: 1px solid #800000;
    text-align: center
}

.market-top span {
    font-size: 16px;
}
.market-top span:first-child {
    margin-right: 10px;
}

.trade-header{
    background: #E0E0E0;
    height: 30px;
    border-bottom: 1px solid #A7A7A7;
}
.trade-content {
    display: flex;
    flex-direction: row;
}
.trade-nav {
    width: 148px;
    margin: 10px 10px;
    /* height: 100%; */
}
.trade-nav-outer{
    
}
.trade-nav-inner{
    border: 1px solid #828790;
    height: 100%;
    overflow: scroll;
}
.trade-nav-menu{
    height: 290px;
    width:148px!important;
    /* box-sizing: border-box; */
}
.trade-buy-sell{
    box-sizing: border-box;
    padding: 10px;
    width: 340px;
    height: 330px;
    border-right: 1px solid #A7A7A7;
    color: #605e5e;
}
.trade-buy-sell ul>li{
    padding:5px 0px;
}
.trade-buy-sell ul>li span{
    display: inline-block;
    width: 40px;
}
.buy-sell-btn{
    text-align: center;
}
.buy-sell-btn .ivu-btn{
    background-color: #E2E2E4;
    border: 1px solid #828790;
    width: 100px;
}

.buy-one {
    color:  #F93F0A;
    font-size: 16px;
}
.sell-one {
    color:  #3C8B0C;
    font-size: 16px;
}
.buy-btn{
    color:  #F93F0A;
    font-size: 28px;
}
.sell-btn{
    color: #3C8B0C;
    font-size: 28px;
}
.line{
    margin: 0px;
    background: #828790;
}

.trade-list{
    flex-grow:1;
    color: #605e5e;
    display: flex;
    flex-direction: row;
}
.trade-list-left{
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.trade-list-right{
    flex-grow: 1;
}
.trade-list-title{
    width: 24px;
    height: 200px;
    background-color: #E8E8E8;
    border: 1px solid #828790;
    border-radius: 5px;
    word-wrap: break-word;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.trade-line{
    height: 6px;
    background: #fff;
}
</style>
