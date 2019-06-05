const wxRequest = require('../../../../utils/promise-util.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    
    id: "",
    no: "",
    contacts: "",
    phone: "",
    approximatelyAddress: "",
    detailedAddress: "",
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var id = this.data.id
    var no = this.data.no
    var addressDefault = true
    var that = this;
    if (!id) {
      if (no) {
        addressDefault = true
      }
      var contacts = e.detail.value.contacts;
      var phone = e.detail.value.phone;
      var detailedAddress = e.detail.value.detailedAddress;
      var approximatelyAddress = e.detail.value.approximatelyAddress;
      var addressType = 1;

      if (contacts == "") {
        wx.showModal({
          title: '提示',
          content: '请填写联系人姓名',
          showCancel: false
        })
        return
      }
      if (phone == "") {
        wx.showModal({
          title: '提示',
          content: '请填写手机号码',
          showCancel: false
        })
        return
      }
      if (!approximatelyAddress) {
        wx.showModal({
          title: '提示',
          content: '请完善地址',
          showCancel: false
        })
        return
      }
      if (!detailedAddress) {
        wx.showModal({
          title: '提示',
          content: '请完善地址',
          showCancel: false
        })
        return
      }

      wx.showLoading({
        title: '正在保存地址',
      })
      var data={
        contacts: contacts,
          phone: phone,
            approximatelyAddress: approximatelyAddress,
              detailedAddress: detailedAddress,
                addressType: addressType,
                  addressDefault: addressDefault
      }
      wxRequest.postRequest(app.globalData.address_add_url, data).then(res => {
        //关闭loading框
        wx.hideLoading()
        //成功的弹框
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
        //跳转
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000)
      })
     
    }
    else {
      var id = that.data.id
      var contacts = e.detail.value.contacts;
      var phone = e.detail.value.phone;
      var detailedAddress = e.detail.value.detailedAddress;
      var approximatelyAddress = e.detail.value.approximatelyAddress;
      var addressDefault = that.data.addressDefault
      var addressType = 1;
      if (contacts == "") {
        wx.showModal({
          title: '提示',
          content: '请填写联系人姓名',
          showCancel: false
        })
        return
      }
      if (phone == "") {
        wx.showModal({
          title: '提示',
          content: '请填写手机号码',
          showCancel: false
        })
        return
      }
      if (!approximatelyAddress) {
        wx.showModal({
          title: '提示',
          content: '请完善地址',
          showCancel: false
        })
        return
      }
      if (!detailedAddress) {
        wx.showModal({
          title: '提示',
          content: '请完善地址',
          showCancel: false
        })
        return
      }
      data= {
        id: id,
          contacts: contacts,
            phone: phone,
              detailedAddress: detailedAddress,
                approximatelyAddress: approximatelyAddress,
                  addressType: addressType,
                    addressDefault: addressDefault
      }
      wxRequest.getRequest(app.globalData.address_update_url, data).then(res => {
        wx.hideLoading()
        //成功的弹框
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
        //跳转
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000)
          // 跳转到结算页面       
      })
    
    }
  },

  onLoad: function (e) {

    var token = wx.getStorageSync('access_token')
    var that = this;
    var id = e.id;
    var no = e.no;
    var addressDefault = e.addressdefault
    var approximately = e.approximately
    var detail = e.detail
    var contacts = e.contacts
    var phone = e.phone
    if (no) {
      that.setData({
        no: no
      })
    }
    if (id) {
      // 初始化原数据
      // wx.showLoading();
      that.setData({
        id: id,
        approximatelyAddress: approximately,
        detailedAddress: detail,
        contacts: contacts,
        phone: phone,
        addressType: 1,
        addressDefault: addressDefault
      });
    }
    return
  },

  deleteAddress: function (e) {
    var that = this;
    var id = that.data.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
         
          wxRequest.getRequest(app.globalData.address_del_url + id,null).then(res => {
            wx.navigateBack({})
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})
