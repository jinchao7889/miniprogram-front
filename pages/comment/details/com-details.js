// pages/comment/details/com-details.js
var Id = '';
var Tid = '';
var state=0;
var secondcomid=0;
var answeruserid=''
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var comment_content = 'content';
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
    totalreply: Number,
    recordcontent: [],
    recordcontent_secComments:[],
    secondreplynickname:String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Id = options.id
    Tid = options.tid
    console.log(Id)
    console.log(Tid)

  
    var that=this
    var data = {
      "page": 0,
      "size": 8,
      "travelsId": Tid,
      "parentId": Id,
      "secondaryId": -1
    }
    wxRequest.postRequest(app.globalData.sec_get_travel_comment, data).then(res => {
      console.log('热门评论：')
      console.log(res)
      for (var i = 0; i < res.dataList.secComments.length; i++) {
        res.dataList.secComments[i]["createTime"] = forMatTime.tsFormatTime(res.dataList.secComments[i]["createTime"], 'Y年M月D日')
      }
      res.dataList["createTime"] = forMatTime.tsFormatTime(res.dataList["createTime"], 'Y年M月D日')
      that.setData({
        totalreply: res.totalRecord,
        recordcontent: res.dataList,
        recordcontent_secComments: res.dataList.secComments
      })
      pages = res.pages
      nowPage = res.nowPage
    })
  },


  loadmoreseccomment(i){
    var that=this
    var data = {
      "page": i,
      "size": 8,
      "travelsId": Tid,
      "parentId": Id,
      "secondaryId": -1
    }
    wxRequest.postRequest(app.globalData.sec_get_travel_comment, data).then(res => {
      for (var i = 0; i < res.dataList.secComments.length; i++) {
        res.dataList.secComments[i]["createTime"] = forMatTime.tsFormatTime(res.dataList.secComments[i]["createTime"], 'Y年M月D日')
      }
      res.dataList["createTime"] = forMatTime.tsFormatTime(res.dataList["createTime"], 'Y年M月D日')
      var list = that.data.recordcontent_secComments
      that.setData({
        recordcontent_secComments: list.concat(res.dataList.secComments)
      })
      pages = res.pages
      nowPage = res.nowPage
    })
  },

  getTextare(e) {
    comment_content = e.detail.value
    //console.log(comment_content)
  },

  gotoreplyparent: function(e) {
    this.setData({
      inputBoxShow: true
    })
    state=1
  },

  publishcomment(){
    var that = this
    var reply = this.data.recordcontent_secComments
    if (state==1){
      var data1 = {
        "travelsId": Tid,
        "content": comment_content,
        "parentId": Id,
        "secondaryId": "-1"
      }
      wxRequest.postRequest(app.globalData.add_travel_comment, data1).then(res => {
        console.log('二级评论：')
        console.log(res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')  
        that.setData({
          inputBoxShow: false,
          recordcontent_secComments: reply.concat(res)
        })
      })

    }else if(state==0){
      var data2 = {
        "travelsId": Tid,
        "content": comment_content,
        "parentId": Id,
        "secondaryId": secondcomid,
        "toAnswerUserId": answeruserid
      }
      console.log(data2)
      wxRequest.postRequest(app.globalData.add_travel_comment, data2).then(res => {
        console.log('三级评论：')
        console.log(res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
        that.setData({
          inputBoxShow: false,
          recordcontent_secComments: reply.concat(res)
        })
      })



    }
    
  },



  gotosecondreply: function (e) {
    console.log(e)
    secondcomid=e.target.dataset.id
    answeruserid=e.target.dataset.userid
    this.setData({
      secondreplynickname: e.target.dataset.name
    })
    this.setData({
      inputBoxShow: true
    })
    state=0
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  onReachBottom: function () {

    if (nowPage < pages) {
      this.loadmoreseccomment(a)
      a = a + 1;
    } else {
      wx.showToast({
        title: '评论到底啦',
        icon: 'none'
      })
      a=1
    }

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})