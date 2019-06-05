// pages/main/shop/product/product.js
const app = getApp();
const wxRequest = require('../../../../utils/promise-util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    title:"",
    productList:[]

  },
  typeId:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.typeName,

    })
    this.typeId = options.typeId
    this.getData()
  },
  getData(){
    var data={
      "page":0,
      "size":20,
      "shopId":1,
      "productTypeId": this.typeId
    }
    wxRequest.postRequest(app.globalData.product_get_url,data).then(res=>{
      console.log(res);
      this.setData({
        productList: res.dataList
      })
    })
  }
})