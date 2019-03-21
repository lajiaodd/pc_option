<template>
    <div class="deal">
        <div class="deal-top">
            <div class="figure">
                <div class="figure-left">
                    <div class="figure-item" :class="{figurebg:isfigureactive ==0}" @click="onChanceFigure(0)">分时图</div>
                    <div class="figure-item" @click="onChanceFigure(1)" :class="{figurebg:isfigureactive ==1}">5分</div>
                    <div class="figure-item" @click="onChanceFigure(2)" :class="{figurebg:isfigureactive ==2}">小时</div>
                    <div class="figure-item" @click="onChanceFigure(3)" :class="{figurebg:isfigureactive ==3}">日K</div>
                    <div class="figure-item1"></div>
                </div>
                <div class="figure-right">
                        <!-- <keep-alive> -->
                            <component :is="isFigure" :tuxing="tuxing" :security_id='security_id'></component>
                        <!-- </keep-alive> -->

                </div>
                <!-- <Tabs value="name1">
                    <TabPane label="标签一" name="name1">标签一的内容</TabPane>
                    <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                    <TabPane label="标签三" name="name3">标签三的内容</TabPane>
                </Tabs> -->
                
            </div>
            <div class="market">
                <div class="inner-container">

                    <div class="market-top">
                        <span>{{securityData.contract_str}}</span>
                        <span>剩余{{securityData.exercise_date | due_date}}天</span>
                        
                    </div>
                    <div class="etf code-public-css">
                        <Row>
                            <Col span="6" style="color: #FFFF00;">50ETF</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': etf.amount_of_change > 0 ? '#FF3C3C': (etf.amount_of_change < 0 ? '#00C800': '#fff') }">{{etf.current_price}}</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': etf.amount_of_change > 0 ? '#FF3C3C': (etf.amount_of_change < 0 ? '#00C800': '#fff') }">-{{etf.num_of_change}}</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': etf.amount_of_change > 0 ? '#FF3C3C': (etf.amount_of_change < 0 ? '#00C800': '#fff') }">-{{etf.amount_of_change}}</Col>
                        </Row>

                    </div>
                    <div class="sell code-public-css">
                        <Row>
                            <Col span="6">卖五</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.sell_five_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;" >{{securityData.sell_five_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖四</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.sell_four_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.sell_four_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖三</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.sell_four_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.sell_four_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖二</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.sell_two_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.sell_two_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">卖一</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.sell_one_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.sell_one_num}}</Col>
                        </Row>
                    </div>
                    <div class="buy code-public-css">
                        <Row>
                            <Col span="6">买一</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.buy_one_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.buy_one_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">买二</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.buy_two_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.buy_two_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">买三</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.buy_three_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.buy_three_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">买四</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.buy_four_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.buy_four_num}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">买五</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.buy_five_price}}</Col>
                            <Col span="12" style="text-align:right;color:#FFFF00;color:#FFFF00;">{{securityData.buy_five_num}}</Col>
                        </Row>
                    </div>
                    <div class="buy code-public-css">
                        <Row>
                            <Col span="6">最新</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.current_price}}</Col>
                            <Col span="6">行权日</Col>
                            <Col span="6" style="text-align:right;">{{securityData.exercise_date}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">涨跌</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{code_profit_loss}}</Col>
                            <Col span="6">行权价格</Col>
                            <Col span="6" style="text-align:right;">{{securityData.exercise_price}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">幅度</Col>
                            <Col span="6" style="text-align:right;" :style="{'color': securityData.amount_of_change > 0 ? '#FF3C3C': (securityData.amount_of_change < 0 ? '#00C800': '#fff') }">{{securityData.amount_of_change}}%</Col>
                            <Col span="6">合约单位</Col>
                            <Col span="6" style="text-align:right;">{{securityData.contract_unit | contractUint}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">今开</Col>
                            <Col span="6" style="text-align:right;color:#FFFF00;">{{securityData.open_price}}</Col>
                            <Col span="6">昨收</Col>
                            <Col span="6" style="text-align:right;color:#FFFF00;">{{securityData.yes_close}}</Col>
                        </Row>
                        <Row>
                            <Col span="6">最高</Col>
                            <Col span="6" style="text-align:right;color:#FFFF00;">{{securityData.top_price}}</Col>
                            <Col span="6">最低</Col>
                            <Col span="6" style="text-align:right;color:#FFFF00;">{{securityData.bottom_price }}</Col>
                        </Row>
                        <Row>
                            <Col span="6">总量</Col>
                            <Col span="6" style="text-align:right;color:#FFFF00;">{{securityData.turnover | addUnit}}</Col>
                            <Col span="6">持仓</Col>
                            <Col span="6" style="text-align:right;color:#FFFF00;">{{securityData.inventory | addUnit}}</Col>
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
        <div class="deal-bottom" v-show="is_close_trade" ref="dealBottom">
            <div class="trade-bian" ref="chanceTradeHeight" ></div>
            <div class="trade-header">
                <div class="trade-header-content">
                    <ul>
                        <li>可用资金：{{account_fund}}</li>
                        <li>总权益：{{rights_interests}}</li>
                        <li>持仓占用：{{occupation}}</li>
                        <li>持仓盈亏：{{float_profit}}</li>
                    </ul>
                </div>
                <span class="tubiao">
                    <i class="icon iconfont icon-cha" @click="onCloseTrade"></i>
                </span>
            </div>
            <div class="trade-content">
                <div class="trade-content-nav">
                    <div class="trade-nav-inner" :style="{height:trade_table_height+'px'}">
                        <Menu  active-name="1"  class="trade-nav-menu" @on-select="tradeNavSelect" @on-open-change="onOpenClose">
                                <MenuItem name="1">
                                    <Icon type="md-aperture" />
                                    当日委托
                                </MenuItem>
                                <MenuItem name="2">
                                    <Icon type="ios-bookmarks-outline" />
                                    持仓
                                </MenuItem>
                                <MenuItem name="3">
                                    <Icon type="md-shuffle" />
                                    可撤委托
                                </MenuItem>

                                <MenuItem name="4">
                                    <Icon type="md-swap" />
                                    合并持仓
                                </MenuItem>
                                <MenuItem name="5">
                                    <Icon type="ios-snow-outline" />
                                    分笔持仓
                                </MenuItem>
                                <!-- <MenuItem name="6">
                                    <Icon type="md-leaf" />
                                    查询
                                </MenuItem> -->
                                <Submenu name="6">
                                    <template slot="title">
                                        <Icon type="ios-book-outline" />
                                        查询
                                    </template>
                                    <MenuItem name="6-1">委托记录</MenuItem>
                                    <MenuItem name="6-2">成交记录</MenuItem>
                                    <MenuItem name="6-3">平仓盈亏</MenuItem>
                                    <MenuItem name="6-3">损赢单</MenuItem>
                                </Submenu>
                        </Menu>
                    </div>
                </div>
                <div class="trade-content-buy-sell">
                    <ul>
                        <li><span>合约:</span > 
                            <div style="display:inline-block;margin-right:4px">
                                {{securityData.contract_str}}
                            </div>
                            <Button size="small"  @click="onAttention"><i class="star icon iconfont icon-zan1" :class="{xingxing: activeColor}">{{attention_text}}</i></Button>
                            <!-- <Button size="small" type="error"  @click="onAddProfitLoss">止损止盈</Button> -->
                        </li>
                        <li> </li>
                        <li>
                            <span>开平:</span> 
                                <RadioGroup v-model="open_close" @on-change="onBuySellChangeNum">
                                    <Radio label="开仓"></Radio>
                                    <Radio label="平仓"></Radio>
                                </RadioGroup>                           
                        </li>
                        <li v-if="open_close =='开仓'">
                            <span>价格:</span> 
                            <InputNumber   v-model="currentBuyPrice" @on-focus="onChangeNum" @on-change="onChangeNum" :step="0.0001" style="width:250px!important">
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
                            <InputNumber  v-model="currentSellPrice"  @on-focus="onChangeNum" @on-change="onChangeNum" :step="0.0001" style="width:250px!important">
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
                            <Button v-if="open_close =='开仓'" @click="onConfirmBuy">
                                <p class="buy-one">{{currentBuyPrice}}</p>
                                <Divider class="line"></Divider>
                                <p class="buy-btn">买入</p>
                            </Button>
                            <Button v-if="open_close =='平仓'" @click="onConfirmSell">
                                <p class="sell-one">{{currentSellPrice}}</p>
                                <Divider class="line"></Divider>
                                <p class="sell-btn">卖出</p>
                            </Button>
                        </li>
                    </ul>
                </div>
                <div class="table-chance">
                    <!-- 切换当然委托 -->
                    <div class="btn-left"  @click="onEntrust" v-if="current_trade_name==1">
                        <button  v-if="is_cancel" :style="{height:trade_table_height-80+'px'}"><b>委托</b>/可撤</button>
                        <button  v-else :style="{height:trade_table_height-80+'px'}"><b>可撤</b>/委托</button>
                    </div>
                </div>
                <!-- 当日委托 -->
                <div class="trade-content-list " v-if="current_trade_name==1" ref="tradeList">
                    <div class="trade-content-inner">


                        <div class="mytable">
                                <Table v-if="is_cancel" :columns="entrust_columns" :data="entrust"  :height="trade_table_height"></Table>
                                <Table v-else :columns="cancellations_columns" :data="cancellations"  :height="trade_table_height"></Table>
                        </div>
                    </div>
                </div>
                <!-- 持仓-->
                <div class="trade-content-list" v-if="current_trade_name==2" >
                    <div class="mytable" >
                        <Table  :columns="positions_columns" :data="positions"   :height="trade_table_height"></Table>
                    </div>
                </div>

                <!-- 可撤委托-->
                <div class="trade-content-list" v-if="current_trade_name==3">
                    
                    <div class="mytable">
                        <Table  :columns="weituos_columns" :data="weituos" :height="trade_table_height"></Table>
                    </div>
                </div>

                <!-- 合并持仓 -->
                <div class="trade-content-list" v-if="current_trade_name==4">
                    <div class="mytable position-table">
                        <Table  :columns="merge_hold_postions_columns" :data="merge_hold_postions" :height="trade_table_height" @on-row-dblclick="onMergeHold"></Table>
                    </div>
                </div>
                <!-- 分笔持仓 -->
                <div class="trade-content-list" v-if="current_trade_name==5">
                    <div class="mytable position-table">
                        <Table  :columns="pointpen_hold_positions_columns" :data="pointpen_hold_positions" :height="trade_table_height" @on-row-dblclick="onMergeHold"></Table>
                    </div>
                </div>
                <!-- <div class="trade-content-list" v-if="current_trade_name.indexOf('6') != -1">
                    <keep-alive>
                        <component :is="'query'"></component>
                    </keep-alive>
                </div> -->

            </div>
        <Modal v-model="is_add_profit_loss" :fullscreen="fullscreen" title="添加止损止盈" :mask-closable="false" width="860" :styles="query_madal" >
            <p slot="header" class="query-header">
                <span>添加止损止盈</span>
                <Icon class="icon iconfont maxmin-pos" :class="maxmin" @click="onFullScreen"></Icon>
            </p>
            <div>                                    
                <component :is="'addProfitLoss'" :is_full_screen="fullscreen"></component>
            </div>
        </Modal>    
        <!-- 查询 -->
        <Modal v-model="is_query" :fullscreen="fullscreen" title="查询" :mask-closable="false" width="860" :styles="query_madal" >
            <p slot="header" class="query-header">
                <span>查询</span>
                <Icon class="icon iconfont maxmin-pos" :class="maxmin" @click="onFullScreen"></Icon>
            </p>
            <div>                                    
                <Tabs type="card" v-model="curQueryName">
                    <TabPane label="委托记录" name="1" >
                        <keep-alive>
                            <component :is="'historyOrders'" :is_full_screen="fullscreen"></component>
                        </keep-alive>
                    </TabPane>
                    <TabPane label="成交记录" name="2">
                        <keep-alive>
                            <component :is="'historyTrades'"></component>
                        </keep-alive>
                    </TabPane>
                    <TabPane label="平仓盈亏" name="3">
                        <keep-alive>
                            <component :is="'closeProfit'"></component>
                        </keep-alive>
                    </TabPane>
                    <TabPane label="损赢单" name="4">
                        <keep-alive>
                            <component :is="'cloudDamageWin'"></component>
                        </keep-alive>
                    </TabPane>
                </Tabs>

            </div>
        </Modal>
        </div>
        <div class="trade-line" ref="tradeLine" v-show="is_trade_line"></div>
    </div>
</template>

<script>
import historyOrders from '../query/history_orders.vue'
import historyTrades from '../query/history_trades.vue'
import closeProfit from '../query/close_profit.vue'
import cloudDamageWin from '../query/cloud_damage_win.vue'
import addProfitLoss from './add_profit_loss.vue'
import fenshi from '../figure/fen_shi.vue'
import wufen from '../figure/wu_fen.vue'
import xiaoshi from '../figure/xiao_shi.vue'
import rik from '../figure/ri_k.vue'
export default {
    name: "deal",
    data() {
        return {
            security_id:'',
            currentBuyPrice:0,
            currentBuyNum:1,
            currentSellPrice:0,
            currentSellNum: 1,
            open_close: '开仓',
            current_trade_name: '1',
            isFigure: 'fenshi',
            isFigures: ['fenshi','wufen','xiaoshi','rik'],
            tuxing:null,
            isfigureactive:0,
            weituos_columns: [

                {
                    title: '买卖',
                    key: 'open_position',
                    render: (h, params) => {
                        let a = params.row.open_position
                     
                        if(a) {
                            a = '买'
                        }else {
                            a = '卖'
                        }
                        return h('div', [
                            h('div', {}, a),

                        ]);
                    }
                },
                {
                    title: '委托价',
                    key: 'price',
                    "sortable": true,
                },
                {
                    title: '数量',
                    key: 'order_number',
                    "sortable": true,
                },
                {
                    title: '已成',
                    key: 'has_num',
                    "sortable": true,
                },
                {
                    title: '已撤',
                    key: 'cancel_number',
                    "sortable": true,
                },
                {
                    title: '时间',
                    key: 'date_joined',
                    "sortable": true,
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        let a = params.row
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(a.id,a.order_number,a.cancel_number)
                                    }
                                }
                            }, '撤单'),

                        ]);
                    }
                }
            ],
            cancellations_columns: [

                {
                    title: '合约简称',
                    key: 'contract_str',
                },
                {
                    title: '买卖',
                    key: 'open_position',
                    render: (h, params) => {
                        let a = params.row.open_position
                       
                        if(a) {
                            a = '买'
                        }else {
                            a = '卖'
                        }
                        return h('div', [
                            h('div', {}, a),

                        ]);
                    }
                },
                {
                    title: '委托价',
                    key: 'price',
                    "sortable": true,
                },
                {
                    title: '数量',
                    key: 'order_number',
                    "sortable": true,
                },
                {
                    title: '已成',
                    key: 'has_num',
                    "sortable": true,
                },
                {
                    title: '已撤',
                    key: 'cancel_number',
                    "sortable": true,
                },
                {
                    title: '时间',
                    key: 'date_joined',
                    "sortable": true,
                    // render: (h, params) => {
                    //     let a = params.row.date_joined

                    //     return h('div', [
                    //         h('div', {}, a),

                    //     ]);
                    // }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        let a = params.row
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(a.id,a.order_number,a.cancel_number)
                                    }
                                }
                            }, '撤单'),

                        ]);
                    }
                }
            ],
            entrust_columns: [

                {
                    title: '合约简称',
                    key: 'contract_str',
                },
                {
                    title: '买卖',
                    key: 'open_position',
                    render: (h, params) => {
                        let a = params.row.open_position
                       
                        if(a) {
                            a = '买'
                        }else {
                            a = '卖'
                        }
                        return h('div', [
                            h('div', {}, a),

                        ]);
                    }
                },
                {
                    title: '委托价',
                    key: 'price',
                    "sortable": true,
                },
                {
                    title: '数量',
                    key: 'order_number',
                    "sortable": true,
                },
                {
                    title: '已成',
                    key: 'has_num',
                    "sortable": true,
                },
                {
                    title: '已撤',
                    key: 'cancel_number',
                    "sortable": true,
                },
                {
                    title: '时间',
                    key: 'date_joined',
                    "sortable": true,
                },
                {
                    title: '状态信息',
                    key: 'remarks',
                },

            ],
            cancellations:[],
            entrust:[],
            weituos: [],
            positions: [],
            positions_columns: [
                {
                    title: '持仓',
                    key: 'position_num',
                    "sortable": true,
                },
                {
                    title: '可用',
                    key: 'can_use_num',
                    "sortable": true,
                },
                {
                    title: '均价',
                    key: 'position_price',
                    "sortable": true,
                },
                {
                    title: '盈亏',
                    "sortable": true,
                    render: (h, params) => {
                        let a = params.row
                      
                        let resutl = this.profit_loss(this.securityData.current_price, a.position_price, a.position_num, this.securityData.contract_unit)
                        return h('div', [
                            h('div', {}, resutl),

                        ]);
                    }
                }
            ],
            merge_hold_postions_columns: [
                {
                    title: '合约简称',
                    key: 'contract_str',
                },
                {
                    title: '持仓',
                    key: 'sum_position',
                    "sortable": true,
                },
                {
                    title: '可用',
                    key: 'sum_can_use',
                    "sortable": true,
                },
                {
                    title: '均价',
                    key: 'avg_price',
                    "sortable": true,
                },
                {
                    title: '市值',
                    "sortable": true,
                    render: (h, params) => {
                        let a = params.row
                   
                        let resutl = this.merge_market_value(a.security_id,a.sum_position,a.avg_price)
                        return h('div', [
                            h('div', {}, resutl),

                        ]);
                    }
                },
                {
                    title: '盈亏',
                    "sortable": true,
                    render: (h, params) => {
                        let a = params.row
                   
                        let resutl = this.merge_profit_loss(a.security_id,a.sum_position,a.avg_price)
                        return h('div', [
                            h('div', {}, resutl),

                        ]);
                    }
                }
            ],
            pointpen_hold_positions_columns: [
                {
                    title: '合约简称',
                    key: 'contract_str',
                },
                {
                    title: '持仓',
                    key: 'position_num',
                    "sortable": true,
                },
                {
                    title: '均价',
                    key: 'position_price',
                    "sortable": true,
                },
                {
                    title: '市值',
                    "sortable": true,
                    render: (h, params) => {
                        let a = params.row
                        
                        let resutl = this.pointpen_market_value(a.security_id,a.position_num,a.position_price)
                        return h('div', [
                            h('div', {}, resutl),

                        ]);
                    }
                },
                {
                    title: '盈亏',
                    "sortable": true,
                    render: (h, params) => {
                        let a = params.row
                        
                        let resutl = this.pointpen_profit_loss(a.security_id,a.position_num,a.position_price)
                        return h('div', [
                            h('div', {}, resutl),

                        ]);
                    }
                }
            ],
            merge_hold_postions: [],
            pointpen_hold_positions: [],
            is_close_trade: true,
            activeColor: false ,//关注星星样式
            bianhao: 0,
            time: 1000, //定时,
            pageTimer:{},
            trade_table_height:'340',
            is_trade_line: false,
            attention_text: '添加关注',
            one_securityData : true,
            is_query: false, //是否显示查询弹框
            fullscreen: false,
            maxmin: 'icon-zuidahua1',
            query_madal: {
                // color: 'red',
                // fontSize: '13px',
                // height:'800px',
            },
            curQueryName:'1',
            is_add_profit_loss: false,//是否显示止损止盈弹出
            is_cancel: true,//判断显示委托还是可撤按钮
        };
    },
    computed: {
        account_fund() {
            return this.$store.state.user.account_fund
        },
        securityData: {
            get () {
                let result = this.$store.getters.security(this.security_id)

                return result
            },
            set (value) {}
        },

        //计算涨跌
        code_profit_loss:function() {
            if(this.$route.params.security_id == undefined) {
                return "--.--"
            } else {
                return (this.securityData.current_price - this.securityData.current_price/(this.securityData.amount_of_change/100+1)).toFixed(4 )
            }
        },
        //获取50etf合约
        etf: {
            get () {
                
                let etf = this.$store.getters.getEtf(this.bianhao, 3);
                return etf[0]
                },
            set (value) {

            }
        
        },
        //计算盈亏
        profit_loss:function() {
            return function (current_price,position_price, position_num, contract_unit) {
                let market_value  = (Math.round((current_price-position_price)*contract_unit*position_num*100)/100).toFixed(2)
                return market_value
            }
        },
        // 获取分笔持仓市值
        pointpen_market_value () {
            //市值 = 当前价* 合约笔数*合约单位
            return function (security_id, sum_position, avg_price) {
                let security = this.$store.getters.security(security_id)
                let market_value  = (sum_position*security.current_price*security.contract_unit).toFixed(2)
                return market_value
            }
        },
        // 获取分笔盈亏
        pointpen_profit_loss () {
            return function (security_id, sum_position, avg_price) {
                let security = this.$store.getters.security(security_id)
                let market_value  = (Math.round((security.current_price-avg_price)*sum_position*security.contract_unit*100)/100).toFixed(2)
                return market_value
            }
        },
        // 获取合并持仓市值
        merge_market_value () {
            return function (security_id, sum_position, avg_price) {
                //市值 = 当前价* 合约笔数*合约单位
                let security = this.$store.getters.security(security_id)

                let market_value  = (sum_position*security.current_price*security.contract_unit).toFixed(2)
                return market_value
            }
        },
        // 获取合并盈亏
        merge_profit_loss () {
            return function (security_id, sum_position, avg_price) {
                let security = this.$store.getters.security(security_id)
                let market_value  = (Math.round((security.current_price-avg_price)*sum_position*security.contract_unit*100)/100).toFixed(2)
                return market_value
            }
        },
        //权益
        rights_interests() {
            let result_rights_interests = 0
            this.merge_hold_postions.forEach(item => {
                let result = this.merge_market_value(item.security_id, item.sum_position, item.avg_price)
                result_rights_interests += Number(result)
            });
            result_rights_interests += Number(this.account_fund)
            return result_rights_interests.toFixed(2)

        },
        //持仓占用
        occupation() {
            let result_occupation = 0
            this.merge_hold_postions.forEach(item => {
                let result = this.merge_market_value(item.security_id, item.sum_position, item.avg_price)
                result_occupation += Number(result)
            });
            return result_occupation.toFixed(2)

        },
        //浮盈
        float_profit() {
            let result_float_profit = 0.00
            this.merge_hold_postions.forEach(item => {
                let result = this.merge_profit_loss(item.security_id, item.sum_position, item.avg_price)
                result_float_profit += Number(result)
            });
            return result_float_profit.toFixed(2)
        },
        buyTotalPrice: function() {
            return (this.currentBuyPrice*this.currentBuyNum*this.securityData.contract_unit).toFixed(4)
        },
        sellTotalPrice: function() {
            
            return (this.currentSellPrice*this.currentSellNum*this.securityData.contract_unit).toFixed(4)
        },
        username() {
            return this.$store.state.user.username
        },

    },
    watch: {
        securityData: {
            handler(newValue, oldValue) {
              
                if(newValue && this.one_securityData) {
                    this.currentBuyPrice = Number(newValue.sell_one_price)
                    this.currentSellPrice = Number(newValue.buy_one_price)
                }
            },
            deep: true
        },
        '$route' (to, from) {
            if (to.name === '交易') {

                this.security_id = this.$route.params.security_id

            }
        },
        positions: {
            handler(newValue, oldValue) {

                let new_totle = 0
                let old_totle = 0

                newValue.forEach((item) => {
                    new_totle += Number(item.can_use_num)
                })
                oldValue.forEach((item) => {
                    old_totle += Number(item.can_use_num)
                })

                if(new_totle !== old_totle) {
                    this.currentSellNum = new_totle
                }
            },
            deep: true
        }
 


    },
    created() {
        this.security_id = this.$route.params.security_id
        this.getCodeList() //获取合约列表
        this.getPositionsList()
        this.getOrdersList()
        this.getPositionsPiointList() //分笔持仓
        this.getPositionsMergeList() //合并持仓
        this.getCancellationsList() //合并持仓
        this.getEntrustList() //合并持仓
    },
    mounted() {
        this.chanceTradeHeight()
    },
    methods: {
        //获取持仓列表
        getPositionsList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/positions/?search=${app.security_id}`)
            .then(function(res) {
                if(res.status == 200) {
                    app.positions = res.data
                    
                    app.pageTimer.timer_0 = setTimeout(function() {
                        app.getPositionsList(app.security_id)
                    }, app.time)
                }
                
            }).catch(function(err) {
                console.log(err)
            })
        },
        getOrdersList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/orders_can_cancel/?search=${app.security_id}`)
            .then(function(res) {
                if(res.status == 200) {
                    app.weituos = res.data
                    app.pageTimer.timer_1 = setTimeout(function() {
                        app.getOrdersList(app.security_id)
                    }, app.time)
                }
                
            }).catch(function(err) {
                console.log(err)
            })
        },
        getPositionsPiointList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/positions/`)
            .then(function(res) {
                if(res.status == 200) {
                    app.pointpen_hold_positions = res.data
                    app.open_merge = true
                    app.pageTimer.timer_2 = setTimeout(function() {
                        app.getPositionsPiointList()
                    }, app.time)
                }
                
            }).catch(function(err) {
                console.log(err)
            })
        },
        getPositionsMergeList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/position_group/`)
            .then(function(res) {
                if(res.status == 200) {
                    app.merge_hold_postions = res.data
                    app.pageTimer.timer_3 = setTimeout(function() {
                        app.getPositionsMergeList()
                    }, app.time)
 

                }
            }).catch(function(err) {
                console.log(err)
            })
        },
        getCancellationsList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/orders_can_cancel/`)
            .then(function(res) {
                if(res.status == 200) {
                    app.cancellations = res.data
                    // console.log(res.data);
                    
                    app.pageTimer.timer_4 = setTimeout(function() {
                        app.getCancellationsList()
                    }, app.time)
                  
                }
            }).catch(function(err) {
                console.log(err)
            })
        },
        getEntrustList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/orders_today/`)
            .then(function(res) {
                if(res.status == 200) {
                    app.entrust = res.data
                    // console.log("res.data");
                    // console.log(res.data);
                    
                    app.pageTimer.timer_4 = setTimeout(function() {
                        app.getEntrustList()
                    }, app.time)
                  
                }
            }).catch(function(err) {
                console.log(err)
            })
        },
        onEntrust() {
            this.is_cancel = !this.is_cancel
        },

        tradeNavSelect(name) {
            // console.log(name);
            if(name.indexOf('6-') != -1)  {
                let num = name.substr(-1, 1)
                this.curQueryName = num
                this.is_query = !this.is_query
            }else {
                this.current_trade_name = name
            }
            
        },
        onMergeHold(row) {
            this.$router.replace(`/home/deal/${row.security_id}`)
            this.open_close = "平仓"
        },
        onCloseTrade() {
            this.is_close_trade = false;
        },
        //获取那些合约收藏了的列表
        getCodeList() {
            let app = this
            app.$api.get(`${app.$lib.host}/api/client_optional_contract/`)
            .then(function(res) {
                if(res.status == 200) {
                    let data = res.data.results
                    let result = data.some(item => {
                        return (item.security_id == app.$route.params.security_id)
                    });
                    if(result) {
                        app.activeColor = true
                        app.attention_text = '取消关注'
                    }else {
                        app.activeColor = false
                        app.attention_text = '添加关注'
                    }
                }
            })
        },
        //关注
        onAttention() {
            if(this.activeColor) {
                this.removes()
            } else {
                this.add()
            }
            this.activeColor = !this.activeColor
        },
        onAddProfitLoss() {
            this.is_add_profit_loss = true
        },
        removes() {
            let app = this
            let security_id = app.$route.params.security_id
            app.$api.mydelete(`${app.$lib.host}/api/client_optional_contract/${security_id}/`)
            .then(function(res) {
             
                if(res.status == 200) {
                    app.attention_text = '添加关注'
                    app.$Message.success("取关成功")
                    app.init_optional_list()
                }
            })
        },
        add() {
            let app = this
            let params = {
                security_id: this.$route.params.security_id
            }
            app.$api.post(`${app.$lib.host}/api/client_optional_contract/`, params)
            .then(function(res) {

            })
            .catch(function(err) {
                if(err.status == 201) {
                    app.attention_text = '取消关注'
                    app.$Message.success("关注成功")
                }

                if(err.status == 400) {
                    app.$Message.success(err.data.security_id[0])
                }

            })
        },
        //撤单
        remove(id,order_number,has_number) {
            let app = this
            let order_num = order_number - has_number
            app.$Modal.confirm({
                title: '撤销委托',
                content: `<p>您确认撤销${order_num}笔${app.securityData.contract_str}订单？</p>`,
                onOk: () => {
                    let params = {
                        contract_str:app.securityData.contract_str,
                        security_id: app.securityData.security_id,
                        contract_id: app.securityData.contract_id,
                        position: '',
                        order_price: '',
                        order_num: order_num,
                        ip: localStorage.getItem('Ip'),
                        city:localStorage.getItem('cityname'),
                        contract_unit: app.securityData.contract_unit,
                        cancel: true,
                        cancel_id: id,
                        user_name: app.username,

                    }

                    let post_data = {
                        'message': params
                    }
                    
                    app.$api.post(`${app.$lib.host}/websocket/place_order`, post_data)
                    .then(function(res) {
                        if(res.status == 200) {
                            if(res.data.type == "ok") {
                                app.$Message.success(res.data.message);
                            }else if(res.data.type == "error") {
                                app.$Message.error(res.data.message);
                            }
                        }
                    }).catch(function(err) {
                        console.log(err)
                    })
                    // app.$websocketsend(JSON.stringify({message:JSON.stringify(params)}))
                    
                },
                onCancel: () => {

                }
            });

        },
        chanceTradeHeight() {
            let app =this
            let oDiv = this.$refs.chanceTradeHeight
            let dealBottomDiv = this.$refs.dealBottom
            let tradeListDiv = this.$refs.tradeList
            let tradeLineDiv = this.$refs.tradeLine

            oDiv.onmousedown = function(e) {
                e = e || window.event
                e.preventDefault()
                let oldY = e.clientY
                
                document.onmousemove = function(ev) {
                    ev = ev || window.event
                    e.preventDefault()
                    app.is_trade_line = true
                    tradeLineDiv.style.top = ev.clientY + 'px'
                    console.log(app.is_trade_line)
                }
                document.onmouseup = function(ev){
                    ev = ev || window.event
                    dealBottomDiv.style.top = dealBottomDiv.offsetTop + (ev.clientY - oldY)+'px';
                    dealBottomDiv.style.height = dealBottomDiv.offsetHeight - (ev.clientY - oldY)+'px';
                    app.trade_table_height = tradeListDiv.offsetHeight
                    //取消拖动的白线
                    app.is_trade_line = false
                    console.log(app.is_trade_line)
                    
                    //移除监听
                    document.onmouseup = document.onmousemove = null;
                }

            }

        },
        //改变价格是否跟随买一卖一变化
        onChangeNum() {
            this.one_securityData = false
        },
        //改变价格是否跟随买一卖一变化
        onBuySellChangeNum() {
            this.one_securityData = true
        },
        onConfirmBuy() {
            let app = this
            app.$Modal.confirm({
                title: '购买',
                content: `您确认购买${app.currentBuyNum}笔${app.securityData.contract_str}订单？`,
                onOk: () => {
                    let params = 
                    {
                        contract_str:app.securityData.contract_str,
                        security_id: app.securityData.security_id,
                        contract_id: app.securityData.contract_id,
                        position: "open",
                        order_price: app.currentBuyPrice,
                        order_num: app.currentBuyNum,
                        ip: localStorage.getItem('Ip'),
                        city:localStorage.getItem('cityname'),
                        contract_unit: app.securityData.contract_unit,
                        cancel: false,
                        cancel_id: '',
                        user_name: app.username,
                    
                    }

                    let post_data = {
                        'message': params
                    }
                    
                    app.$api.post(`${app.$lib.host}/websocket/place_order`, post_data)
                    .then(function(res) {
                        if(res.status == 200) {
                            if(res.data.type == "ok") {
                                app.$Message.success(res.data.message);
                            }else if(res.data.type == "error") {
                                app.$Message.error(res.data.message);
                            }
                        }
                    }).catch(function(err) {
                        console.log(err)
                    })
                    // app.$websocketsend(JSON.stringify({message:JSON.stringify(params)}))
                    app.getOrdersList(app.securityData.security_id)
                    app.getPositionsList(app.securityData.security_id)
                },
                onCancel: () => {

                }
            });

        },
        onConfirmSell() {
            let app = this
            app.$Modal.confirm({
                title: '卖出',
                content: `您确认卖出${app.currentSellNum}笔${app.securityData.contract_str}订单？`,
                onOk: () => {
                    let params = {
                        contract_str:this.securityData.contract_str,
                        security_id: this.securityData.security_id,
                        contract_id: this.securityData.contract_id,
                        position: "close",
                        order_price: this.currentSellPrice,
                        order_num: this.currentSellNum,
                        ip: localStorage.getItem('Ip'),
                        city:localStorage.getItem('cityname'),
                        contract_unit: this.securityData.contract_unit,
                        cancel: false,
                        cancel_id: '',
                        user_name: this.username,
                    }

                    let post_data = {
                        'message': params
                    }
                    
                    app.$api.post(`${app.$lib.host}/websocket/place_order`, post_data)
                    .then(function(res) {
                        if(res.status == 200) {
                            if(res.data.type == "ok") {
                                app.$Message.success(res.data.message);
                            }else if(res.data.type == "error") {
                                app.$Message.error(res.data.message);
                            }
                        }
                    }).catch(function(err) {
                        console.log(err)
                    })
                    // app.$websocketsend(JSON.stringify({message:JSON.stringify(params)}))
                    app.getOrdersList(app.securityData.security_id)
                    app.getPositionsList(app.securityData.security_id)
                },
                onCancel: () => {

                }
            });

        },
        onOpenClose() {

        },
        onFullScreen() {
            this.fullscreen = !this.fullscreen
            if(this.fullscreen) {
                this.maxmin = 'icon-zuidahua'
            }else{
                this.maxmin = 'icon-zuidahua1'
            }
        },
        onChanceFigure(i) {
            this.isFigure = this.isFigures[i]
            this.isfigureactive = i
        },

    },
    components:{
        historyOrders,
        historyTrades,
        closeProfit,
        cloudDamageWin,
        addProfitLoss,
        fenshi,
        wufen,
        xiaoshi,
        rik,
    },

    filters: {
        contractUint: function (val) {
            if(String(val).indexOf('-') != -1) {
                return val
            } else {
                return Number(val).toFixed(0)
            }
        },

        due_date: function (val) {
            if(val == "0000-00-00") {
                return "--"
            }
            let exercise_date_mytimer = new Date(val).getTime()
            let current_date_mytimer = new Date()

            let due_date_tiemr = exercise_date_mytimer - current_date_mytimer
            let due_date = Math.ceil(due_date_tiemr/1000/3600/24)
            return due_date
        },
        buy_price: function(val) {
            if(val == undefined) {
                return '0.0000'
            }else {
                return val
            }

        },
        sell_price: function(val) {
            if(val == undefined) {
                return '0.0000'
            }else {
                return val
            }

        },
    },
    destroyed () {
        let app = this
        for(var each in app.pageTimer){
            window.clearInterval(app.pageTimer[each]);
        }
    },
};
</script>

<style scoped>
.deal {
    display: flex;
    flex-flow: column;
    min-height: 100%;
}
.deal-top {
    flex: 1;
    display: flex;
}
.figure{
    flex-grow: 1;
    display: flex;
    flex-direction: row;
}
.figure-left{
    flex-basis: 30px;
    display:flex;
    flex-direction:column;
}
.figure-item{
    height:80px;
    margin-top:1px;
    background-color:#3D4045;
    word-wrap: break-word;
    text-align:center;
    padding : 0 5px;
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    border: 1px solid #3D4045;
    cursor: pointer;
}
.figurebg{
    background-color:#25272B;
}
.figure-item:hover{
    background-color:#25272B;
}
/* .figure-item:nth-child(2){
    margin-top:2px;
} */

.figure-item1{
    flex: 1;
    margin-top:1px;
    background-color:#3D4045;
}
.figure-right{
    position: relative;
    flex-grow: 1;
}
.market {
    position: relative;
    overflow: hidden;
    width: 20%;
    min-width: 300px;
    border-left: 1px solid #800000;
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
    line-height: 24px;
}
.code-public-css:last-child {
    border-bottom: 0px solid #800000;
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
.inner-container {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
.deal-bottom {
    display: flex;
    flex-flow: column;
    min-height: 200px;
    max-height: 540px;
    color: #605e5e;
    overflow: hidden;
}
.trade-bian{
    height: 4px;
    background: #C7E2FF;
}
.trade-header{
    position: relative;
    word-break:break-all;
    height: 30px;
    background: #D4D4D4;
    border-top: 1px solid #A7A7A7;
    border-bottom: 1px solid #A7A7A7;
}
.trade-content{
    flex: 1;
    display: flex;
    flex-direction: row;
}
.trade-content-nav{
    width: 200px;
    box-sizing:border-box;
    /* padding: 10px; */
    background-color: #EBEBED;
}
.trade-content-buy-sell{
    width: 360px!important;
    max-width: 360px!important;
    box-sizing:border-box;
    /* -wibkit-box-sizing:border-box; */
    background-color: #EBEBED;
    padding: 10px;
    border-right: 1px solid #A7A7A7;
    color: #605e5e;
}
.trade-content-list{
    width: calc(100vw - 560px);
    
}
.trade-content-inner {
    display: flex;
}
.btn-left{ 
    background-color: #ffffff;
}
.btn-left button{ 
    /* height: 90%; */
    width: 24px;  
    margin: 40px 10px!important;  
    line-height: 24px;  
    font-size: 18px;  
    word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/
    outline: none;  
    border: 1px solid #A5A5A5;  
    background-color: #ECECEC;
}
.btn-left button:hover{
    background-color: #ffffff;
}

.mytable {
    width: 100%;
}
.trade-nav-inner{
    border: 1px solid #828790;
    /* height: 100%; */
    /* height: 340px; */
    overflow: scroll;
    
}
.trade-nav-menu{
    width:176px!important;
    /* box-sizing: border-box; */
}


.trade-content-buy-sell ul>li{
    padding:4px 4px;
    
}

.trade-content-buy-sell ul>li span{
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
    font-size: 24px;
}
.sell-btn{
    color: #3C8B0C;
    font-size: 24px;
}
.line{
    margin: 0px;
    background: #828790;
}
.tubiao{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.tubiao .icon-cha{
    font-size: 10px; 
}
.tubiao .icon-cha:hover{
    border: 1px solid #000;
}
.trade-content-list table {
	width: 100% !important;

}
.trade-header-content {
    height: 100%;
}
.trade-header-content ul{
    display: flex;
    flex-direction: row;
    height: 100%;
    /* justify-content: center; */
    align-items: center;
}
.trade-header-content ul li{
    padding-left: 30px;
}
.star{
    font-size: 12px;
    vertical-align:  top;
}
.xingxing{
    color: #ec5f65;
}
/* .mytable .ivu-table-wrapper {
    height: 340px;
} */

.trade-bian{
    cursor: s-resize;
}
.trade-line{
    height: 4px;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}
.query-header{
    position: relative;
}
.maxmin-pos{
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
}
.position-table tr{
    cursor: pointer!important;
}

</style>
