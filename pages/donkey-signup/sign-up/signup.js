const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    index1: 0,
    picker: ['男', '女', '保密'],
    picker1: [],
    product: null,
    aid: String,
    pid: Number,
    productImg: "",
    productTitle: "",
    price: 0,
    specsName: String,
    productSpecId: Number,


    username: '',
    usergender: '',
    userphone: '',
    userqqnumber: '',
    userwechat: '',
    userconcat: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.aid = options.aid
    this.data.pid = options.pid
    console.log('传过来的活动id为：', this.data.aid)
    console.log('传过来的商品id为：', this.data.pid)

    var that = this
    wxRequest.getRequest(app.globalData.product_detail_url + that.data.pid, null).then(res => {
      console.log('商品信息：', res)
      that.setData({
        product: res,
        productImg: res.productThumbnail,
        productTitle: res.productName,
        picker1: res.productSpecs,
        price: res.productSpecs[that.data.index1].price,
        specsName: res.productSpecs[that.data.index1].specsName,
        productSpecId: res.productSpecs[that.data.index1].id
      })
    })


    // add_activity_sign_up

  },
  PickerChange1(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value,
      price: this.data.picker1[e.detail.value].price,
      specsName: this.data.picker1[e.detail.value].specsName
    })
  },

  PickerChange(e) {
    console.log(e);
    this.data.usergender = this.data.picker[e.detail.value]
    console.log(this.data.usergender)
    this.setData({
      index: e.detail.value
    })
  },

  gocancel() {
    wx.navigateBack({
      delta: 1
    })
  },


  goGenerateorderform() {
    if (this.data.usergender == '' || this.data.username == '' || this.data.userphone == '' || this.data.userqqnumber == '' || this.data.userwechat == '' || this.data.userconcat == '') {
      wx.showToast({
        title: '请填写完您得个人参与信息',
        icon: 'none'
      })
    } else {
      var productData = {
        id: this.data.pid,
        productThumbnail: this.data.product.coverImg,
        productPrice: this.data.price,
        productName: this.data.product.productName,
        productDescribe: this.data.specsName,
        deliverMoney: this.data.product.deliverMoney,
        additionalCharges: this.data.product.additionalCharges,
        productSaleType: this.data.product.productSaleType,
        productEntity: this.data.product.productEntity,
        productCount: 1,
        productSpec: this.data.productSpecId,
      }
      wx.setStorageSync('order-' + this.data.pid, productData)
     
      var that = this
      wx.navigateTo({
        url: "/pages/main/shop/order/order?proId=" + this.data.pid
      })

      
      var userinfo={
        "activityId": this.data.aid,
        "contactNumber": this.data.userphone,
        "contactId": this.data.userconcat,
        "realName": this.data.username,
        "qqNumber": this.data.userqqnumber,
        "wxNumber": this.data.userwechat,
        "gender":this.data.picker[this.data.index],
        "enrolmentNumber": 1
      }
      wxRequest.postRequest(app.globalData.user_activity_enter, userinfo).then(res => {
        console.log('报名情况返回值：',res)
      })
    }
  },


  getusername(e) {
    this.data.username = e.detail.value
  },

  getcontact(e) {
    this.data.userconcat = e.detail.value
  },

  getphone(e) {
    this.data.userphone = e.detail.value
  },

  getQQnumber(e) {
    this.data.userqqnumber = e.detail.value
  },

  getwechat(e) {
    this.data.userwechat = e.detail.value
  },


})