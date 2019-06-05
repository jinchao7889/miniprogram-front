const app = getApp();
const wxRequest = require('../../../../utils/promise-util.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar + 6,
    TabbarBot: app.globalData.tabbar_bottom,
    swiperlist: [
      'https://img.alicdn.com/imgextra/i3/1773095659/O1CN01ZTgfy11rfrqH00B9p_!!1773095659.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i1/1773095659/O1CN01dSWy871rfrqsim906_!!1773095659.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/1773095659/O1CN01tZ7Mcy1rfrqKR5iuD_!!1773095659.jpg_430x430q90.jpg',
    ],
    TabCur: 0,
    scrollLeft: 0,
    flag: false,
    product: null,
    isshow: false,
    choosetype: ['御air','御air+电池管家'],




    ischoosea: false,
    ischooseb: false
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

  choosea() {
    this.setData({
      ischoosea: true,
      ischooseb: false
    })
  },
  chooseb() {
    this.setData({
      ischoosea: false,
      ischooseb: true
    })
  }





});