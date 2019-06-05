// mycompent/writemes/publish/publish.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    travelId: String,
    ispublish: Boolean,
    ispublish1: Boolean,
    tripid: Number

  },

  /**
   * 组件的初始数据
   */
  data: {
    ispublish: false
  },

  ready() {
    console.log('是否可以发表：', this.properties.ispublish)
    console.log(this.properties.travelId)

    wx.getStorageInfo({
      success(res) {
        console.log('缓存的key:', res.keys)
        console.log('缓存的占用大小：', res.currentSize)
        console.log('缓存的限制大小：', res.limitSize)
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    stepslast(e) {
      var mes = {
        'num': 2
      }
      this.triggerEvent('gotravel', mes, {})
    },
    saveall(e) {

      wx.showToast({
        title: '全部保存成功！',
        icon: 'none'
      })
    },
    publishall(e) {
      var that = this
      if (this.properties.ispublish == true || this.properties.ispublish1 == true) {
        wx.showToast({
          title: '您有内容没填写完，无法发表！',
          icon: 'none'
        })
      } else {
        wxRequest.getRequest(app.globalData.travel_release + that.properties.travelId, null).then(res => {
          console.log('发表返回参数：', res)
          wx.removeStorage({
            key: String(that.properties.travelid),
            success(res) {
              console.log('mes缓存清除成功！', res)
            }
          })
          wx.removeStorage({
            key: String(that.properties.tripid),
            success(res) {
              console.log('trip-covermap缓存清除成功！', res)
            }
          })
          wx.removeStorage({
            key: String('content' + that.properties.travelid),
            success(res) {
              console.log('travel-content缓存清除成功！', res)
            }
          })

          wx.removeStorage({
            key: String(that.properties.tripid + 'trip'),
            success(res) {
              console.log('trip-前言缓存清除成功！', res)
            }
          })

          wx.removeStorage({
            key: String(that.properties.tripid + 'trip_xincheng'),
            success(res) {
              console.log('trip-行程缓存清除成功！', res)
            }
          })

          wx.removeStorage({
            key: String(that.properties.tripid + 'trip_qindan'),
            success(res) {
              console.log('trip-清单缓存清除成功！', res)
            }
          })

          wx.showToast({
            title: '发表成功！',
          })
          wx.navigateBack({
            delta: 1
          });

        })

      }


    }


  }
})