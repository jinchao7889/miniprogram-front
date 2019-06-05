const app = getApp();
const wxRequest = require('../../../utils/promise-util.js');
Page({
  data: {
    cardCur: 0,
    navList:[],
    productList:[],
    swiperList: []
  },
  onLoad() {
    this.getProductType(1)
    this.towerSwiper('swiperList');
    this.getSellWellProduct(1);
    this.getSwiperImages(1);

    // 初始化towerSwiper 传已有的数组名即可
  },
  onPageScroll: function (e) {
    if (e.scrollTop < 67){
      if (this.data.op !=0) {

        this.setData({
          op: 0
        })
      }
        return;
    }else{
      e.scrollTop = e.scrollTop-67
    }
    var op =parseInt(e.scrollTop*10/67);
    if (op>10){
      if(this.data.op<1){
        this.setData({
          op: 1
        })
      }
    }else{
      op=op/10;
      console.log(op);//{scrollTop:99
      this.setData({
        op: op
      })
    }
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
  ,
  getProductType(shopId){
    
    wxRequest.getRequest(app.globalData.product_type_url + shopId,null).then(res=>{
      this.setData({
        navList: res
      })
    })
  },
  
  getSellWellProduct(shopId) {
    var pageQuery={
        page:0,
        size:10,
      shopId: shopId
    }
    wxRequest.postRequest(app.globalData.product_sell_well_url, pageQuery).then(res => {
      this.setData({
        productList: res.dataList
      })
    })
  },
  getSwiperImages(shopId){
    wxRequest.getRequest(app.globalData.shop_image_url + shopId, null).then(res => {
      console.log(res)
      this.setData({
        swiperList: res
      })
    })
  }
})