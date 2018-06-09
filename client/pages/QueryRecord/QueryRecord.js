//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    hidden: true,
    uploadTimes: 1,
    userInfo: {},
    record: '0',
    list: [
      {
        user_number: 'A123',
        query_time: new Date(),
        phoneNum:'12334679401',
        description:'xxxxx基因检测结果：未携带'
      },
      {
        user_number: 'B123',
        query_time: new Date(),
        phoneNum:"97541871248",
        description:'xxxxx基因检测结果：携带'
      }]
  },
  LM: function () {
    var that = this;
    that.setData({
      hiden: true
    })
    if (that.data.uploadTimes >= 100000) {
      that.setData({
        hiden: false
      });
    }
    else {
      wx.request({
        url: 'https://brightasdream.cn/uploadImage/handleLookSelf',
        data: {
          'user_id': wx.getStorageSync('session_key'),
          'page': that.data.uploadTimes,
        },

        success: function (res) {
          if (res.data.length < 5) {
            that.setData({
              hiden: false
            });
          }
          if (!res.data[0]) {
            that.setData({
              hiden: false
            });
            return;
          }
          that.setData({
            list: that.data.list.concat(res.data),
          })
          var l = res.data;
          var p = new Array(l.length);
          for (var j = 0; j < l.length; j++) {
            var t = l[j].image_path.split("&");//取出图片名
            t.pop();//删除最后一个空白元素
            p[j] = new Array(t.length);
            p[j] = t;
            for (var i = 0; i < t.length; i++) {
              p[j][i] = 'https://brightasdream.cn/uploadImage/upload/' + wx.getStorageSync("session_key") + '/' + l[j].uploadId + '/' + p[j][i];//得到服务器上的图片的路劲
            }
          }
          that.setData(
            {
              paths: that.data.paths.concat(p),
            }
          )
        }
      })
      that.setData({
        uploadTimes: that.data.uploadTimes + 1
      })
    }
  },
  onLoad: function () {
    var that = this;
    queryRequest(that);

    that.setData({
      uploadTimes: that.data.uploadTimes + 1
    });
  },
  toResult(index){
    var num = this.data.list[index].user_number;
    var phoneNum = this.data.list[index].phoneNum;
    wx.navigateTo({
      url: '../QueryResult/QueryResult?num='+num+'&phoneNum='+phoneNum,
    })
  }
})

function queryRequest(that) {
  
}