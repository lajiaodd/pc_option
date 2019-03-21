'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //本地ip
  HOST: '"http://192.168.101.3:8082"', 
  //真实账户域名
  REAL_HOST:'"http://47.103.35.227/"', 
//   REAL_HOST: '"http://zykj.jiale888.com.cn"', 
  //模拟账户域名
  SIMULATE_HOST:'"http://jia.jiale888.com:8080/"',
  //pc端
  DIST: '"pcdist"',
})
