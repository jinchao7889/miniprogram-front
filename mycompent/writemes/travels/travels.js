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
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: String,
    content: String
  },


  ready() {

    var tid = this.properties.travelId
    var that = this

    wx.getStorage({
      key: String('content' + tid),

      fail: function(res) {
        wxRequest.getRequest(app.globalData.get_travel_content + that.properties.travelId, null).then(res => {
          console.log(res)
          that.setData({
            content: res.content,
            title:res.title
          })
          wx.setStorage({
            key: String('content' + tid),
            data: res
          })
        })
      },

      success: function(res) {
        console.log(res)
        that.setData({
          content: res.data.content,
          title: res.data.title
        })
      }
    })
  },


  methods: {

    stepslast(e) {

      var tid = this.properties.travelId
      console.log(tid)
      var that = this
      if (flag == true) {
        wx.showModal({
          title: '提示',
          content: '是否保存更改的内容？',
          success(res) {
            if (res.confirm) {
              var data = {
                "travelsId": tid,
                "content": that.data.content
              }

              wxRequest.postRequest(app.globalData.updata_travel_content, data).then(res => {
                console.log(res)
                wx.setStorage({
                  key: String('content' + tid),
                  data: res
                })
                flag = false
              })

              var mes = {
                'num': 1,
              }
              that.triggerEvent('gopublish', mes, {})

            } else if (res.cancel) {
              var mes = {
                'num': 1,
              }
              that.triggerEvent('gopublish', mes, {})
            }
          }
        })

      } else {
        var mes = {
          'num': 1,
        }
        that.triggerEvent('gopublish', mes, {})

      }
    },


    stepsnext(e) {
      var tid = this.properties.travelId
      console.log(tid)
      var that = this
      if (flag == true) {
        wx.showModal({
          title: '提示',
          content: '是否保存更改的内容？',
          success(res) {
            if (res.confirm) {
              var data = {
                "travelsId": tid,
                "content": that.data.content
              }

              wxRequest.postRequest(app.globalData.updata_travel_content, data).then(res => {
                console.log(res)
                wx.setStorage({
                  key: String('content' + tid),
                  data: res
                })
                flag = false
              })

              var mes = {
                'num': 3,
              }
              that.triggerEvent('gopublish', mes, {})

            } else if (res.cancel) {
              var mes = {
                'num': 3,
              }
              that.triggerEvent('gopublish', mes, {})
            }
          }
        })

      } else {
        var mes = {
          'num': 3,
        }
        that.triggerEvent('gopublish', mes, {})
      }
    },


    gettext(e) {
      this.data.content = e.detail.value
      flag=true
    },


    // addimage() {
    //   var that = this
    //   const value = wx.getStorageSync('access_token')
    //   wx.chooseImage({
    //     count: 1,
    //     sizeType: ['compressed'],
    //     sourceType: ['album', 'camera'],
    //     success(res) {
    //       const tempFilePaths = res.tempFilePaths
    //       console.log(tempFilePaths[0])
    //       that.setData({
    //         fileUrl: tempFilePaths
    //       })
    //       wx.uploadFile({
    //         url: app.globalData.upload_file, // 仅为示例，非真实的接口地址
    //         filePath: tempFilePaths[0],
    //         name: 'file',
    //         header: {
    //           "Authorization": "bearer " + value
    //         },
    //         success(res) {
    //           console.log(res)
    //           console.log(JSON.parse(res.data).data.fileUrl)
    //           that.data.fileUrl = JSON.parse(res.data).data.fileUrl
    //         }
    //       })
    //     }
    //   })
    //   flag = true;
    // }

  }
})