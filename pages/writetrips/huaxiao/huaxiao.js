// pages/writetrips/xincheng/xincheng.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var tid = -1;
var flag = false;

Page({


  daytotalmoney: 0,
  data: {
    isfold: [false],
    tripHuaxiao: [],
    allmoney: 0
  },


  onLoad: function(options) {
    tid = options.tid
    console.log(tid, 'tid')
    var that = this

    wxRequest.getRequest(app.globalData.get_trip_huaxiao_all + tid, null).then(res => {
      console.log(res)
      if (res.length == 0) {
        var huaxiao = {
          "id": null,
          "tripId": tid,
          "tripTime": "",
          "totalMoney": 0,
          "serialNumber": 0,
          "expensesDetail": [{
            "id": 0,
            "entry": "",
            "expenses": null,
            "serialNumber": 0
          }]
        }
        var list = that.data.tripHuaxiao
        list.push(huaxiao)
        that.setData({
          tripHuaxiao: list
        })
      } else {
        var temp = that.data.allmoney
        for (var i = 0; i < res.length; i++) {
          temp = Number(temp) + Number(res[i].totalMoney)
        }
        that.setData({
          tripHuaxiao: res,
          allmoney: temp
        })
      }
    })
  },




  gettime(e) {
    var time = e.detail.value
    var index = e.currentTarget.dataset.index
    var huaxiao_f = this.data.tripHuaxiao;
    var huaxiao = {
      "id": huaxiao_f[index].id,
      "tripId": huaxiao_f[index].tripId,
      "tripTime": time,
      "totalMoney": huaxiao_f[index].totalMoney,
      "serialNumber": huaxiao_f[index].serialNumber,
      "expensesDetail": huaxiao_f[index].expensesDetail
    }
    huaxiao_f[index] = huaxiao;
    this.setData({
      tripHuaxiao: huaxiao_f
    })
    flag = true
  },




  gettype(e) {
    console.log('gettype:', e)
    var type = e.detail.value
    var index = e.currentTarget.dataset.index
    var indexa = e.currentTarget.dataset.indexa
    var list = this.data.tripHuaxiao
    var expensesdetail = {

      "id": list[index].expensesDetail[indexa].id,
      "entry": type,
      "expenses": list[index].expensesDetail[indexa].expenses,
      "serialNumber": indexa
    }
    // console.log(list[index].tripDetail[indexa], "tripdetail")


    list[index].expensesDetail[indexa] = expensesdetail
    this.setData({
      tripSummize: list
    })
    console.log(this.data.tripSummize, "tripSummize")
    flag = true
  },



  getmoney(e) {
    console.log('getmoney:', e)
    var money = e.detail.value
    var index = e.currentTarget.dataset.index
    var indexa = e.currentTarget.dataset.indexa
    var list = this.data.tripHuaxiao
    var expensesdetail = {
      "id": list[index].expensesDetail[indexa].id,
      "entry": list[index].expensesDetail[indexa].entry,
      "expenses": money,
      "serialNumber": indexa
    }
    // console.log(list[index].tripDetail[indexa], "tripdetail")
    list[index].totalMoney = Number(list[index].totalMoney) + Number(money)
    list[index].expensesDetail[indexa] = expensesdetail
    var temp = this.data.allmoney
    temp = Number(temp) + Number(money)
    this.setData({
      tripHuaxiao: list,
      allmoney: temp
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
            wxRequest.postRequest(app.globalData.add_trip_huaxiao, that.data.tripHuaxiao).then(res => {
              console.log(res)
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
            wxRequest.postRequest(app.globalData.add_trip_huaxiao, that.data.tripHuaxiao).then(res => {
              console.log(res)
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
    var lista = this.data.tripHuaxiao
    var expensesdetail = {
      "id": 0,
      "entry": "",
      "expenses": null,
      "serialNumber": 0
    }
    lista[index].expensesDetail.push(expensesdetail)

    this.setData({
      tripHuaxiao: lista
    })

    flag = true
  },

  popplace(e) {
    var index = e.currentTarget.dataset.index
    var list = this.data.tripHuaxiao
    if (list[index].expensesDetail.length <= 1) {
      wx.showToast({
        title: '不能再删除啦!',
        icon: 'none'
      })
      flag = true
    } else {
      list[index].totalMoney = Number(list[index].totalMoney) - list[index].expensesDetail.pop().expenses
      this.setData({
        tripHuaxiao: list
      })

      var temp =0
      for (var i = 0; i < this.data.tripHuaxiao.length; i++) {
        temp = Number(temp) + Number(this.data.tripHuaxiao[i].totalMoney)
      }
      this.setData({
        allmoney: temp
      })

      flag = true
    }

  },


  addNum(e) {
    var huaxiao = {
      "id": null,
      "tripId": tid,
      "tripTime": "",
      "totalMoney": 0,
      "serialNumber": 0,
      "expensesDetail": [{
        "id": 0,
        "entry": "",
        "expenses": null,
        "serialNumber": 0
      }]
    }
    var list = this.data.isfold
    var listb = this.data.tripHuaxiao
    list.push(false)
    listb.push(huaxiao)
    this.setData({
      isfold: list,
      tripHuaxiao: listb
    })

    // console.log(this.data.tripSummize, 'tripSummize')
    flag = true
  },

  popNum(e) {
    var list = this.data.tripHuaxiao
    console.log(list.length)
    if (list.length <= 1) {
      wx.showToast({
        title: '不能再删除啦!',
        icon: 'none'
      })
      flag = true
    } else {  
      var temp = this.data.allmoney
      temp = Number(temp) - Number(list.pop().totalMoney)
      this.setData({
        tripHuaxiao: list,
        allmoney: temp
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
    wxRequest.postRequest(app.globalData.add_trip_huaxiao, that.data.tripHuaxiao).then(res => {})
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