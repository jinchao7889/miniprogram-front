// pages/trip/questiondetail/questiondetail.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var id=0;
var userid='';
var toanswernickname='';
var qid = 0;
var tripid=0;
var state=0;
var comment_content = 'content';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputBoxShow: false,
    isScroll: true,
    questiondetailanswer: [],
    totalreply:Number,
    pages: 0,
    nowpages: 0,
    temp: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qid = options.qid
    tripid = options.tripid
    this.loadquestionanswer(0)

  },

  loadquestionanswer(a) {
    var that = this
    var data = {
      "page": a,
      "size": 10,
      "questionId": qid,
      "parentId": -1,
      "secondaryId": -1
    }

    wxRequest.postRequest(app.globalData.jiehuo_get_question_answer_parent, data).then(res => {
      console.log(res)
      for (var i = 0; i < res.dataList.tripAnswers.length; i++) {
        res.dataList.tripAnswers[i]["createTime"] = forMatTime.tsFormatTime(res.dataList.tripAnswers[i]["createTime"], 'Y年M月D日')
      }
      res.dataList["createTime"] = forMatTime.tsFormatTime(res.dataList["createTime"], 'Y年M月D日')
      var list = that.data.questiondetailanswer
      that.setData({
        questiondetailanswer: list.concat(res.dataList.tripAnswers) ,
        questiondetail: res.dataList,
        totalreply: res.totalRecord+1
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
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

  goreply(e) {
    this.showInputBox();
console.log(e)
    id=e.target.dataset.id
    toanswernickname = e.target.dataset.name
    userid = e.target.dataset.userid

    console.log('回复别人的回复')
    state=0;
  },

  goreplyquestion(){
    this.showInputBox();
    console.log('回答问题')
    state=1;
  },
  getTextare(e) {
    comment_content = e.detail.value
    // console.log(comment_content)
  },


  publishcomment() {
    var that=this
    if(state==1){
      var data={
        "tripId": tripid,
        "questionId": qid,
        "content": comment_content,
        "parentId": -1,
        "secondaryId": -1
      }
      wxRequest.postRequest(app.globalData.add_jiehuo_trip_answer, data).then(res => {
        console.log(res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
        var list = that.data.questiondetailanswer
        var totalreply=that.data.totalreply+1
        that.setData({
          questiondetailanswer:list.concat(res),
          totalreply: totalreply
        })

      })
    }else{
      var dataa = {
        "tripId": tripid,
        "questionId": qid,
        "content": comment_content,
        "parentId": id,
        "secondaryId": -1
      }
      wxRequest.postRequest(app.globalData.add_jiehuo_trip_answer, dataa).then(res => {
        console.log(res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
        var list2 = that.data.questiondetailanswer
        var totalreply2 = that.data.totalreply + 1
        that.setData({
          questiondetailanswer: list2.concat(res),
          totalreply: totalreply2
        })

    })
    }




    this.invisible();
  },


  onReachBottom: function () {
    if (this.data.nowpages < this.data.pages) {
      this.loadquestionanswer(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      wx.showToast({
        title: '没有更多了！',
        icon: 'none'
      })
      this.data.temp = 1;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})