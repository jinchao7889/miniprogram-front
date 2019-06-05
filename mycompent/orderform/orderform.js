// mycompent/orderform/orderform.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true

  },
  properties: {
    orderId:String,
    createTime:String,
    startTime:String,
    endTime:String,
    payMoney:Number,
    orderState:Number,



    productThumbnail:String,
    productName:String,
    productPrice:String,
    productCount:Number,
    specsDec:String,




  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goreply() {
      wx.showToast({
        title: '暂时未开放评价',
        icon: 'none'
      })
    }
  }
})
