//app.js
const app = getApp();
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  globalData:
  {
    result:'',

  },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})