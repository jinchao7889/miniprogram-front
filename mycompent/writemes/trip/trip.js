// mycompent/writemes/trip/trip.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var flag = false;
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
    tripid: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileUrl: null,
    ispublish:Boolean

  },

  ready() {
    var tid = this.properties.travelId
    console.log(tid)
    var that = this

    wx.getStorage({
      key: String(that.properties.tripid),
      fail: function(res) {

        wxRequest.getRequest(app.globalData.get_trip_covermap_throw_travelid + that.properties.travelId, null).then(res => {
          console.log('缓存获取失败，从服务器获取行程封面信息：',res)
          that.setData({
            fileUrl: res.coverMap
          })
          wx.setStorage({
            key: String(that.properties.tripid),
            data: res
          })
        })
      },
      success: function(res) {
        console.log(res)
        that.setData({
          fileUrl: res.data.coverMap
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoqianyan() {
      var tripid = this.properties.tripid
      wx.navigateTo({
        url: `/pages/writetrips/qianyan/qinyan?tid=${tripid}`,
      })
    },
    gotoxincheng() {
      var tripid = this.properties.tripid
      wx.navigateTo({
        url: `/pages/writetrips/xincheng/xincheng?tid=${tripid}`,
      })
    },
    gotohuaxiao() {
      var tripid = this.properties.tripid
      wx.navigateTo({
        url: `/pages/writetrips/huaxiao/huaxiao?tid=${tripid}`,
      })
    },
    gotoqindan() {
      var tripid = this.properties.tripid
      wx.navigateTo({
        url: `/pages/writetrips/qindan/qindan?tid=${tripid}`,
      })
    },


    addimage() {
      var that = this
      const value = wx.getStorageSync('access_token')
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          that.setData({
            fileUrl: tempFilePaths
          })
          wx.uploadFile({
            url: app.globalData.upload_file, // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              "Authorization": "bearer " + value
            },
            success(res) {
              that.data.fileUrl = JSON.parse(res.data).data.fileUrl
            }
          })
        }
      })

      flag = true;
    },


    stepslast(e) {
      var that = this

      if(this.data.fileUrl==null){
        this.data.ispublish=true
        console.log('行程图片没有上传！')
      }else{
        this.data.ispublish = false
        console.log('图片已经上传，数据完整')
      }


      if (flag == true) {
        wx.showModal({
          title: '提示',
          content: '您有更改的内容，是否保存？',
          success(res) {
            if (res.confirm) {
              var data = {
                "id": that.properties.tripid,
                "coverMap": that.data.fileUrl,
                "travelsId": that.properties.travelId
              }
              wxRequest.postRequest(app.globalData.add_trip_mes, data).then(res => {
                console.log('上传新的行程图片，返回的结果：',res)
                wx.setStorage({
                  key: String(that.properties.tripid),
                  data: res
                })
                flag = false
              })

              var mes = {
                'num': 0,
                'ispublish': that.data.ispublish,
              }
              that.triggerEvent('gomes', mes, {})

            } else if (res.cancel) {
              var mes = {
                'num': 0,
                'ispublish': that.data.ispublish,
              }
              that.triggerEvent('gomes', mes, {})
            }
          }
        })

      } else {
        var mes = {
          'num': 0,
          'ispublish': that.data.ispublish,
        }
        that.triggerEvent('gomes', mes, {})
      }

    },


    stepsnext(e) {
      var that = this

      if (this.data.fileUrl == null) {
        this.data.ispublish = true
        console.log('行程图片没有上传！')
      }else{
        this.data.ispublish = false
        console.log('图片已经上传，数据完整')
      }


      if (flag == true) {
        wx.showModal({
          title: '提示',
          content: '是否保存更改的内容？',
          success(res) {
            if (res.confirm) {
              var data = {
                "id": that.properties.tripid,
                "coverMap": that.data.fileUrl,
                "travelsId": that.properties.travelId
              }
              wxRequest.postRequest(app.globalData.add_trip_mes, data).then(res => {
                console.log('上传新的行程图片，返回的结果：', res)
                wx.setStorage({
                  key: String(that.properties.tripid),
                  data: res
                })
                flag = false
              })

              var mes = {
                'num': 2,
                'ispublish': that.data.ispublish,
              }
              that.triggerEvent('gotravels', mes, {})

            } else if (res.cancel) {
              var mes = {
                'num': 2,
                'ispublish': that.data.ispublish,
              }
              that.triggerEvent('gotravels', mes, {})
            }
          }
        })

      } else {
        var mes = {
          'num': 2,
          'ispublish': that.data.ispublish,
        }
        that.triggerEvent('gotravels', mes, {})
      }

    }

  }
})