const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
var app = getApp();
Page({

  comment_content: String,

  data: {
    did: String,
    productId: Number,
    mes: [],
    swiperList: [],
    comment: [],
    commentnum: Number,
    pages: 0,
    nowpages: 0,
    temp: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.did)
    this.data.did = options.did
    this.loadactivitydetail()
    this.loadcomment(0)
  },



  loadactivitydetail() {
    var that = this
    wxRequest.getRequest(app.globalData.get_activity_detail + that.data.did, null).then(res => {
      console.log('驴行详情:', res)
      res["startActivity"] = forMatTime.tsFormatTime(res["startActivity"], 'Y.M.D')
      that.setData({
        mes: res,
        swiperList: res.carouselImgs,
        productId: res.productId
      })
    })
  },



  loadcomment(a) {
    var that = this
    var data = {
      "page": a,
      "size": 5,
      "activityId": that.data.did,
      "parentId": -1,
      "secondaryId": -1
    }
    wxRequest.postRequest(app.globalData.get_activity_comment, data).then(res => {
      console.log('评论信息:', res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y年M月D日')
      }
      var list = that.data.comment
      that.setData({
        comment: list.concat(res.dataList),
        commentnum: res.totalRecord
      })

      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })

  },




  gotoreply: function(e) {
    var pid = e.detail.pid
    var aid = this.data.did
    console.log('父评论id:', pid)
    console.log('驴行id:', aid)
    wx.navigateTo({
      url: `/pages/comment/lvingmes-detail/detail?pid=${pid}&&aid=${aid}`,
    })
  },


  goservice() {
    console.log('联系客服')
  },

  gosignup() {
    console.log('去报名')
    var aid = this.data.did
    var pid = this.data.productId
    wx.navigateTo({
      url: `/pages/donkey-signup/sign-up/signup?aid=${aid}&&pid=${pid}`,
    })
  },

  golvingmes() {
    this.showInputBox();
  },




  showInputBox: function() {
    this.setData({
      inputBoxShow: true
    });
    this.setData({
      isScroll: false
    });
  },
  invisible: function() {
    this.setData({
      inputBoxShow: false
    });
    this.setData({
      isScroll: true
    });
  },

  getTextare(e) {
    this.comment_content = e.detail.value
  },

  publishComment() {
    var that = this
    var data = {
      "activityId": that.data.did,
      "content": this.comment_content,
      "parentId": "-1",
      "secondaryId": "-1"
    }
    wxRequest.postRequest(app.globalData.add_activity_comment, data).then(res => {
      console.log(res)
      res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
      var list = that.data.comment
      that.setData({
        comment: list.concat(res),
        commentnum: that.data.commentnum + 1
      })
      that.invisible();
    })
  },








  onReachBottom: function() {
    if (this.data.nowpages < this.data.pages) {
      this.loadcomment(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      wx.showToast({
        title: '没有更多了!',
        icon: 'none'
      })
      this.data.temp = 1;
    }
  },


  onShareAppMessage: function() {

  }
})