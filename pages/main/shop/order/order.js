// pages/main/shop/order/order.js
const app = getApp();
const wxRequest = require('../../../../utils/promise-util.js');
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:null,
    deliverMoney:0,
    charges:[],
    productCount:1,
    totalMoney:0,
    productImg:"",
    productTitle:"",
    price:0,
    isSubmit:false,
    modalFlag:false,
    modalContent:"",
    picker: ['邮寄', '自取'],
    deliverIndex:0,
    isStudent:false,
    productSaleType: 1,
    startDate: '',
    endDate: '',
    start_s_Date:'',
    end_e_Date: '',
    productEntity:true,
    productSpec:0,
    productDescribe:""
  },
   product:{},
   productCharges : [],
   remarks :"",
   productId : 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDefaultAddress()

    var that =this;
    console.log(options)
    var proId = options.proId
    var item = wx.getStorageSync('order-' + proId) ;

    that.productId = item.id
  
    that.product = item;
    console.log(item)
        that.setData({
          deliverMoney: item.deliverMoney,
          charges: item.additionalCharges,
          price: item.productPrice,
          productImg: item.productThumbnail,
          productTitle: item.productName,
          productSaleType: item.productSaleType,
          productCount: item.productCount,
          productEntity: item.productEntity,
          productSpec: item.productSpec,
          productDescribe: item.productDescribe
        })
    if (item.productSaleType==2){
          var startDate_init = util.tsFormatDateTime(new Date(), 'Y/M/D')
          var nowDate = new Date(startDate_init);
          
          nowDate.setDate(nowDate.getDate()+1)
      
          var endDate_init = util.tsFormatDateTime(nowDate, 'Y/M/D')
          that.setData({
            startDate: startDate_init,
            start_s_Date:  util.tsFormatDateTime(new Date(startDate_init), 'Y-M-D'),
            endDate: endDate_init,
            end_e_Date: util.tsFormatDateTime(new Date(endDate_init), 'Y-M-D')
          })
        }
    for (var i = 0; i < item.additionalCharges.length;i++){
          var charges = {
            charges: item.additionalCharges[i],
            isCheck:true,
          }
          that.productCharges.push(charges);
        }
    if (app.globalData.userInfo.authenticationGrade == 3){
      this.setData({
        isStudent:true
      })
    }
    that.getTotalPrice();
  },
  onShow: function () {

    let pages = getCurrentPages();

    let currPage = pages[pages.length - 1];
    if (currPage.data.address) {
      this.setData({
        //将携带的参数赋值
        address: currPage.data.address,
      });
    }
  },
  getDefaultAddress(){
    var that =this;
    wxRequest.getRequest(app.globalData.address_default_url , null).then(res => {
      that.setData({
        address:res
      })
      console.log(res)
    })
  },
  selectAddress(){
    wx.navigateTo({
      url: "/pages/mine/address/myaddress?isSelected=true"
    })
  },
  productCountChange(e){
    this.setData({
      productCount: e.detail
    })
    this.getTotalPrice();
  },
  changeCharsges(e){
    this.productCharges[e.currentTarget.dataset.index].isCheck = !this.productCharges[e.currentTarget.dataset.index].isCheck
    this.getTotalPrice();
    
  },

  textareaBInput(e){
    this.remarks = e.detail.value
    console.log(e)
  },
  getTotalPrice(){
    var that=this;
    console.log(that.productCharges);
    var totalMoney = that.product.productPrice * this.data.productCount;
    if (this.data.productSaleType == 2) {
      var start_date = new Date(this.data.startDate);
      var end_date = new Date(this.data.endDate);
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / 86400000);
      console.log(day, "相差天数");
      totalMoney = day * totalMoney;
    }

    if (that.data.productEntity){
      totalMoney += that.data.deliverMoney * this.data.productCount;

    }
    console.log(totalMoney);
    for (var i = 0; i < that.productCharges.length;i++){
      
      if (that.productCharges[i].charges.optionalGrade == 1) {
        if (that.productCharges[i].isCheck) {
          totalMoney += that.productCharges[i].charges.chargesPrice * this.data.productCount;
        }
      } else if (that.productCharges[i].charges.optionalGrade==2){
        totalMoney += that.productCharges[i].charges.chargesPrice * this.data.productCount;
      } else if (that.productCharges[i].charges.optionalGrade == 3){
        if (!this.data.isStudent){
          totalMoney += that.productCharges[i].charges.chargesPrice * this.data.productCount;
        }
      }
    }
   
    console.log(totalMoney);
     this.setData({
       totalMoney: totalMoney
     })
  },
  onSubmit(){
    var chargesIds=[];
    for (var i = 0; i < this.productCharges.length; i++) {
      if (this.productCharges[i].isCheck) {
        chargesIds.push(this.productCharges[i].charges.id)
      }
    }
    var order={
      "remarks": this.remarks,
      "contacts": this.data.address.contacts,
      "phone": this.data.address.phone,
      "approximatelyAddress": this.data.address.approximatelyAddress,
      "detailedAddress": this.data.address.detailedAddress,
      "useCoupon": false,
      "couponId": "",
      "deliverType": 1,
      "paymentType":1,
      "shopId":1,
      "products":[{
        "productCount": this.data.productCount,
        "productId": this.productId,
        "productSpec": this.data.productSpec,
        "additionalChargesIds": chargesIds
      }],
      "startTime": util.timestampsTurnFuc(this.data.startDate),
      "endTime": util.timestampsTurnFuc(this.data.endDate)
    };
    this.setData({
      isSubmit: true
    })
    wxRequest.postRequest(app.globalData.order_add_url,order).then(res=>{
      console.log(res);
      this.setData({
        isSubmit :false
      })
      wx.showToast({
        title: '提交订单成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  showModal(e) {
    console.log(e)
    this.setData({
      modalFlag:true,
      modalContent: this.productCharges[e.currentTarget.dataset.index].charges.chargesExplain,
    })
  },
  hideModal(e) {
    this.setData({
      modalFlag: false
    })
  },
  PickerChange(e) {
    console.log(e);
    var deliverMoney=0;
    if (e.detail.value==0){
      deliverMoney = this.product.deliverMoney;
    } else if (e.detail.value==1){
      deliverMoney=0;
    }
    this.setData({
      deliverIndex: e.detail.value,
      deliverMoney: deliverMoney
    })
    this.getTotalPrice()
  },
  StartDateChange(e) {
    var startDate = e.detail.value.replace(/-/g, "/")

    if (new Date(startDate).getTime() >= new Date(this.data.endDate).getTime()){
      var sd = new Date(startDate);
      var endDate = new Date();
      endDate.setDate(sd.getDate()+1)
      var ed = util.tsFormatDateTime(endDate, 'Y/M/D');
      this.setData({
        startDate: startDate ,
        endDate: ed,
        end_e_Date: util.tsFormatDateTime(new Date(ed), 'Y-M-D') 
      })
    }else{
      this.setData({
        startDate: startDate
      })
    }
    this.getTotalPrice()
  },
  EndDateChange(e) {
    var endDate = e.detail.value.replace(/-/g, "/")
    this.setData({
      endDate: endDate
    })
    this.getTotalPrice()
  }

})