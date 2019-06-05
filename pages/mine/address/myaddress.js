const wxRequest = require('../../../utils/promise-util.js');
const app=getApp();
var isSelected=false;
Page({
  data: {
    addressList: null,
  },

  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wxRequest.getRequest(app.globalData.address_query_url,null).then(res=>{
      that.setData({
        addressList: res
      });
      wx.hideLoading();
    })
   
  },
  onLoad(option){
    isSelected = option.isSelected;
  },
  addAddess(event) {
    wx.navigateTo({
      url: '/pages/mine/address/detail/myaddressdetail'
    })
  },

  selectTap: function (e) {
    console.log(e);
    var that = this
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var data= {
      id: id,
      addressDefault: true
    }
    wxRequest.postRequest(app.globalData.address_update_url, data).then(res => {
      var addList = this.data.addressList;
      for (var i = 0; i < addList.length;i++){
        if (addList[i].addressDefault){
          addList[i].addressDefault=false;
          break;
        }
      }
      addList[index].addressDefault = true;
    this.setData({
      addressList: addList
    })
      if (isSelected){
        var pages = getCurrentPages();

        var prevPage = pages[pages.length - 2]; 

        prevPage.setData({

          //直接给上一个页面赋值

          address: that.data.addressList[index],

        });
        wx.navigateBack({

          //返回

          delta: 1

        })
      }

    })
  },

  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/mine/address/detail/myaddressdetail?id=" + e.currentTarget.dataset.id + "&detail=" + e.currentTarget.dataset.detailedaddress + "&approximately=" + e.currentTarget.dataset.approximatelyaddress +
        "&contacts=" + e.currentTarget.dataset.contacts + "&phone=" + e.currentTarget.dataset.phone + "&addressdefault=" + e.currentTarget.dataset.addressdefault
    })
  },

})