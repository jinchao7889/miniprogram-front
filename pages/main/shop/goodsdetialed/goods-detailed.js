const app = getApp();
const wxRequest = require('../../../../utils/promise-util.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar + 6,
    TabbarBot: app.globalData.tabbar_bottom,
    TabCur: 0,
    scrollLeft: 0,
    flag: false,
    product: null,
    isshow: false,
    choosetype: ['御air', '御air+电池管家'],
    
    ischoose:0
  },

  onLoad: function(options) {
    const that = this;
    console.log(options.productId)
    this.getProductDetail(options.productId)
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  getProductDetail(productId) {
    wxRequest.getRequest(app.globalData.product_detail_url + productId, null).then(res => {
      console.log(res)
      this.setData({
        product: res,
        flag: true,
      })

    })
  },
  toOrder() {

    var productData = {
      id: this.data.id,
      productThumbnail: this.data.product.coverImg,
      productPrice: this.data.product.productPrice,
      productName: this.data.product.productName,
      productDescribe: this.data.product.productDescribe,
      deliverMoney: this.data.product.deliverMoney,
      additionalCharges: this.data.product.additionalCharges,
      productSaleType: this.data.product.productSaleType,
      productEntity: this.data.product.productEntity,
      productCount: 1
    }
    var str = JSON.stringify(productData);
    var that = this
    this.setData({
      isshow: false
    })
    wx.navigateTo({
      url: "/pages/main/shop/order/order?jsonStr=" + str
    })
  },


  tochoose() {
    this.setData({
      isshow: true
    })
  },

  tohidden() {
    this.setData({
      isshow: false
    })
  },

  choose(e) {
    var index = e.currentTarget.dataset.index

    this.setData({
    ischoose:index
    })
  }


});