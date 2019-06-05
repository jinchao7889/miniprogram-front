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
    tripQindan: [],

    isfold: [false]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    tid = options.tid
    console.log('tid', tid)
    var that = this

    wx.getStorage({
      key: String(tid + 'trip_qindan'),
      fail: function(res) {

        wxRequest.getRequest(app.globalData.get_trip_qindan_all + tid, null).then(res => {
          console.log('没有缓存，服务器请求返回的结果：',res)
          if (res.length == 0) {
            var qindan = {
              "tripId": tid,
              "inventoryType": "",
              "inventoryElements": [{
                "inventoryId": 0,
                "inventoryElement": "",
                "serialNumber": 0
              }]
            }
            var list = that.data.tripQindan
            list.push(qindan)
            that.setData({
              tripQindan: list
            })
          } else {
            that.setData({
              tripQindan: res
            })
            wx.setStorage({
              key: String(tid + 'trip_qindan'),
              data: res,
            })
          }
        })
      },


      success: function(res) {
        console.log('调用缓存数据', res)
        that.setData({
          tripQindan: res.data
        })
      },

    })


  },

  getthingstype(e) {
    var thingstype = e.detail.value
    var index = e.currentTarget.dataset.index
    var qindan_f = this.data.tripQindan;
    var qindan = {
      "tripId": qindan_f[index].tripId,
      "inventoryType": thingstype,
      "inventoryElements": qindan_f[index].inventoryElements
    }
    qindan_f[index] = qindan
    this.setData({
      tripQindan: qindan_f
    })
    flag = true
  },


  getthings(e) {
    var things = e.detail.value
    var index = e.currentTarget.dataset.index
    var indexa = e.currentTarget.dataset.indexa
    var list = this.data.tripQindan
    var inventoryelements = {
      "inventoryId": list[index].inventoryElements[indexa].inventoryId,
      "inventoryElement": things,
      "serialNumber": list[index].inventoryElements[indexa].serialNumber
    }
    list[index].inventoryElements[indexa] = inventoryelements
    this.setData({
      tripQindan: list
    })
    flag = true
  },





  backpage(e) {
    var that = this
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: '您有更改的内容，是否保存？',
        success(res) {
          if (res.confirm) {
            wxRequest.postRequest(app.globalData.add_trip_qindan, that.data.tripQindan).then(res => {
              console.log('向服务器提交请求，保存用户写的草稿，返回：',res)

              wx.setStorage({
                key: String(tid + 'trip_qindan'),
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
            wxRequest.postRequest(app.globalData.add_trip_qindan, that.data.tripQindan).then(res => {
              console.log(res)
              wx.setStorage({
                key: String(tid + 'trip_qindan'),
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














  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  addplace(e) {

    var index = e.currentTarget.dataset.index
    var lista = this.data.tripQindan
    var inventoryelements = {
      "inventoryId": 0,
      "inventoryElement": "",
      "serialNumber": 0
    }
    lista[index].inventoryElements.push(inventoryelements)

    this.setData({
      tripQindan: lista
    })
    console.log(lista)
    flag = true
  },

  popplace(e) {
    var index = e.currentTarget.dataset.index
    var list = this.data.tripQindan

    if (list[index].inventoryElements.length <= 1) {
      wx.showToast({
        title: '不能再删除啦!',
        icon: 'none'
      })
      flag = true
    } else {
      list[index].inventoryElements.pop()
      this.setData({
        tripQindan: list
      })
      flag = true
    }

  },




  addNum() {
    var qindan = {
      "tripId": tid,
      "inventoryType": "",
      "inventoryElements": [{
        "inventoryId": 0,
        "inventoryElement": "",
        "serialNumber": 0
      }]
    }
    var list = this.data.isfold
    var listb = this.data.tripQindan
    list.push(false)
    listb.push(qindan)
    this.setData({
      isfold: list,
      tripQindan: listb
    })

    flag = true
  },


  popNum(e) {
    var list = this.data.tripQindan
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
        tripQindan: list
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
    wxRequest.postRequest(app.globalData.add_trip_qindan, that.data.tripQindan).then(res => {})
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