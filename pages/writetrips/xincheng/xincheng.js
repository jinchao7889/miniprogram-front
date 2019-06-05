// pages/writetrips/xincheng/xincheng.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var tid = -1;
var flag = false;
Page({

  /**
   * 页面的初始数据
   */


  data: {
    isfold: [false],
    tripSummize: []
  },


  onLoad: function (options) {
    tid = options.tid
    console.log('tid', tid)
    var that=this
   

    wx.getStorage({
      key: String(tid + 'trip_xincheng'),

      fail: function (res) {

        wxRequest.getRequest(app.globalData.get_trip_xincheng_all + tid, null).then(res => {
          console.log(res)
          if(res.length==0){
            var summize = {
              "tripId": tid,
              "content": "",
              "id": null,
              "serialNumber": 0,
              "correctionsContent": "",
              "tripTime": "",
              "tripDetail": [{
                "content": "",
                "serialNumber": 0
              }]
            }
            var list = that.data.tripSummize
            list.push(summize)
            that.setData({
              tripSummize: list
            })
          }else{
            that.setData({
              tripSummize: res
            })
            wx.setStorage({
              key: String(tid + 'trip_xincheng'),
              data: res,
            })
          }

        })
      },

      success: function (res) {
        console.log('调用缓存数据', res)
        that.setData({
          tripSummize: res.data
        })
      },

    })
  },



  gettime(e) {
    var time = e.detail.value
    var index = e.currentTarget.dataset.index
    var summize_f = this.data.tripSummize;
    var summize = {
      "tripId": summize_f[index].tripId,
      "content": summize_f[index].content,
      "id": summize_f[index].id,
      "serialNumber": index,
      "correctionsContent": summize_f[index].correctionsContent,
      "tripTime": time,
      "tripDetail": summize_f[index].tripDetail
    }
    summize_f[index] = summize;
    this.setData({
      tripSummize: summize_f
    })
    flag = true
  },


  getdaycontent(e) {
    var daycontent = e.detail.value
    var index = e.currentTarget.dataset.index
    var summize_f = this.data.tripSummize;
    var summize = {
      "tripId": summize_f[index].tripId,
      "content": daycontent,
      "id": summize_f[index].id,
      "serialNumber": index,
      "correctionsContent": summize_f[index].correctionsContent,
      "tripTime": summize_f[index].tripTime,
      "tripDetail": summize_f[index].tripDetail
    }
    summize_f[index] = summize
    this.setData({
      tripSummize: summize_f
    })
    flag = true
  },

  getusefulmes(e) {
    var index = e.currentTarget.dataset.index
    var summize_f = this.data.tripSummize;
    var usefulmes = e.detail.value
    var summize = {
      "tripId": summize_f[index].tripId,
      "content": summize_f[index].content,
      "id": summize_f[index].id,
      "serialNumber": index,
      "correctionsContent": usefulmes,
      "tripTime": summize_f[index].tripTime,
      "tripDetail": summize_f[index].tripDetail
    }
    summize_f[index] = summize
    this.setData({
      tripSummize: summize_f
    })
    // console.log(this.data.tripSummize, "tripSummize")
    flag = true
  },

  getplace(e) {
    console.log(e, "getplace")
    var place = e.detail.value
    var index = e.currentTarget.dataset.index
    var indexa = e.currentTarget.dataset.indexa
    var list = this.data.tripSummize
    var tripdetail = {
      "id": list[index].tripDetail[indexa].id,
      "serialNumber": indexa,
      "content": place,
    }
    console.log(list[index].tripDetail[indexa], "tripdetail")

    list[index].tripDetail[indexa] = tripdetail
    this.setData({
      tripSummize: list
    })
    console.log(this.data.tripSummize, "tripSummize")
    flag = true
  },





  backpage(e) {
    var that=this
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: '您有更改的内容，是否保存？',
        success(res) {
          if (res.confirm) {
            wxRequest.postRequest(app.globalData.add_trip_xincheng, that.data.tripSummize).then(res => {
              console.log(res)
              wx.setStorage({
                key: String(tid + 'trip_xincheng'),
                data: res,
              })
              flag = false
              wx.showToast({
                title: '保存成功！'
              })
            })
            wx.navigateBack({
              delta: 1
            })
          } else if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },



  savecontent(e) {
    var that = this
    if (flag == false) {
      wx.showToast({
        title: '内容未做更改',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您有更改的内容，是否保存？',
        success(res) {
          if (res.confirm) {
            wxRequest.postRequest(app.globalData.add_trip_xincheng, that.data.tripSummize).then(res => {
              console.log(res)
              wx.setStorage({
                key: String(tid + 'trip_xincheng'),
                data: res,
              })
              flag = false
              wx.showToast({
                title: '保存成功！'
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
  },












  addplace(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var lista = this.data.tripSummize
    var tripdetail = {
      "content": "",
      "id": null,
      "serialNumber": 0
    }
    lista[index].tripDetail.push(tripdetail)

    this.setData({
      tripSummize: lista
    })
    console.log(lista)
    flag = true
  },

  popplace(e) {
    var index = e.currentTarget.dataset.index
    var list = this.data.tripSummize
    console.log(list[index].tripDetail.length)
    if (list[index].tripDetail.length <= 1) {
      wx.showToast({
        title: '不能再删除啦!',
        icon: 'none'
      })
      flag = true
    } else {
      list[index].tripDetail.pop()
      this.setData({
        tripSummize: list
      })
      flag = true
    }

  },


  addNum(e) {
    var summize = {
      "tripId": tid,
      "content": "",
      "serialNumber": -1,
      "correctionsContent": "",
      "id": null,
      "tripTime": "",
      "tripDetail": [{
        "content": "",
        "serialNumber": 0
      }]
    }
    var list = this.data.isfold
    var listb = this.data.tripSummize
    list.push(false)
    listb.push(summize)
    this.setData({
      isfold: list,
      tripSummize: listb
    })

    // console.log(this.data.tripSummize, 'tripSummize')
    flag = true
  },

  popNum(e) {
    var list = this.data.tripSummize
    console.log(list.length)
    if (list.length <= 1) {
      wx.showToast({
        title: '不能再删除啦!',
        icon: 'none'
      })
      flag = true
    } else {
      list.pop()
      this.setData({
        tripSummize: list
      })
      flag = true
    }

  },




  isfold(e) {
    var index = e.currentTarget.dataset.index
    var list = this.data.isfold


    list[index] = !list[index]

    this.setData({
      isfold: list
    })
    console.log(list)
  },


  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wxRequest.postRequest(app.globalData.add_trip_xincheng, that.data.tripSummize).then(res => {})
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})