const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var comment_content = 'content';
var tid = '';
var pages = 0;
var nowPage = 0;
var a = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputBoxShow: false,
    isScroll: true,
    isLoad:false,
    content: [],
    comMent: [],
    releasetime: String,
    departureTime: String,
    travelId: String,
    totalrecord: Number,
    InputBottom: 0,
    flag:false
  },



  onLoad: function(options) {
    const that = this;
    tid = options.tid
    this.setData({
      travelId: tid
    })
    wxRequest.getRequest(app.globalData.get_travel_content + tid, null).then(res => {
      console.log('详细游记信息：',res)
      this.setData({
        content: res,
        flag: true,
        departureTime: forMatTime.tsFormatTime(res.departureTime, 'Y/M/D'),
        releasetime: forMatTime.tsFormatTime(res.releaseTime, 'Y年M月D日')
      })
    })




  },

  loadmorecomment(i){
    var that=this
    var data = {
      "page": i,
      "size": 8,
      "travelsId": tid,
      "parentId": -1,
      "secondaryId": -1
    }

    wxRequest.postRequest(app.globalData.get_travel_comment, data).then(res => {
     // console.log(res)

      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y年M月D日')
      }
      var list = that.data.comMent
      that.setData({
        comMent: list.concat(res.dataList)
      })
      pages = res.pages
      nowPage = res.nowPage
    });
  },


gotoxingcheng(){
  wx.navigateTo({
    url: `/pages/trip/detailed/detailed?tid=${tid}`
  })
},
  textareacatch:function(e){
    console.log(e);
  },


  traveldianzan: function() {
    var state = this.data.content
    var that = this
    if (state.isFabulous == false) {
      wxRequest.getRequest(app.globalData.travel_isFabulous_add + this.data.content.travelsId, null).then(res => {
        state.isFabulous = true
        state.fabulousVolume = state.fabulousVolume + 1
        that.setData({
          content: state
        })
      })
    } else {
      wxRequest.getRequest(app.globalData.travel_isFabulous_cancel + this.data.content.travelsId, null).then(res => {
        state.isFabulous = false
        state.fabulousVolume = state.fabulousVolume - 1
        that.setData({
          content: state
        })
      })
    }

  },


  goreply: function() {
    this.showInputBox();
  },
  gotoreply: function(e) {
   var parid = e.detail.id
   console.log(parid)
    wx.navigateTo({
      url: `/pages/comment/details/com-details?id=${parid}&&tid=${tid}`,
    })

  },

  gotodianzan: function(e) {
    var commentid = e.detail.id
    var index=e.target.dataset.index
    var state = this.data.comMent
    var that = this
    if (state[index].isFabulous == false) {
      wxRequest.getRequest(app.globalData.comment_fabulous_add + commentid, null).then(res => {
        //console.log(res)
        state[index].isFabulous = true
        state[index].likeNumber = state[index].likeNumber + 1
        this.setData({
          comMent: state
        })
      })
    } else {
      wxRequest.getRequest(app.globalData.comment_fabulous_cancel + commentid, null).then(res => {
        //console.log(res)
        state[index].isFabulous = false
        state[index].likeNumber = state[index].likeNumber -1
        this.setData({
          comMent: state
        })
      })
    }

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
    comment_content = e.detail.value
    // console.log(comment_content)
  },

  publishComment() {
    var that = this
      var data = {
        "travelsId": tid,
        "content": comment_content,
        "parentId": "-1",
        "secondaryId": "-1"
      }
      wxRequest.postRequest(app.globalData.add_travel_comment, data).then(res => {
        console.log(res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
        var comment = that.data.comMent
        that.setData({
          comMent: comment.concat(res),
          totalrecord:that.data.totalrecord+1
        })
        that.invisible();
      })
  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var data = {
      "page": 0,
      "size": 8,
      "travelsId": tid,
      "parentId": -1,
      "secondaryId": -1
    }

    wxRequest.postRequest(app.globalData.get_travel_comment, data).then(res => {
      console.log(res)

      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y年M月D日')
      }

      this.setData({
        comMent: res.dataList,
        totalrecord: res.totalRecord,
      })
      pages = res.pages
      nowPage = res.nowPage
      a=1
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function() {

    if (nowPage < pages) {
      this.loadmorecomment(a)
      a = a + 1;
    } else {
     this.setData({
       isLoad:true
     })
      a=1;
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
 InputFocus(e) {
   console.log(e)
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  }

})