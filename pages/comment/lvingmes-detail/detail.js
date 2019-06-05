const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();

Page({

 
  secondcomid: Number,
  answeruserid: String,
  comment_content: String,

  data: {
    inputBoxShow: false,
    isScroll: true,
    parentid: Number,
    activityid: String,


    totalreply: Number,
    recordcontent: [],
    recordcontent_secComments: [],
    secondreplynickname: String,
    pages: 0,
    nowpages: 0,
    temp: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.parentid = options.pid
    this.data.activityid = options.aid
    console.log('传到留言详情页的父评论id:', this.data.parentid)
    console.log('传到留言详情页的活动id:', this.data.activityid)
    this.loadseccomment()
   

  },

  loadseccomment(){
    var that = this
    var data = {
      "page": 0,
      "size": 10,
      "activityId": that.data.activityid,
      "parentId": that.data.parentid,
      "secondaryId": -1
    }
    wxRequest.postRequest(app.globalData.get_activity_comment_sec, data).then(res => {
      console.log('获得的二级留言内容：', res)
      for (var i = 0; i < res.dataList.secComments.length; i++) {
        res.dataList.secComments[i]["createTime"] = forMatTime.tsFormatTime(res.dataList.secComments[i]["createTime"], 'Y年M月D日')
      }
      res.dataList["createTime"] = forMatTime.tsFormatTime(res.dataList["createTime"], 'Y年M月D日')
      that.setData({
        totalreply: res.totalRecord,
        recordcontent: res.dataList,
        recordcontent_secComments: res.dataList.secComments
      })
    })
  },


  loadmoreseccomment(a) {
    var that = this
    var data = {
      "page": a,
      "size": 8,
      "activityId": that.data.activityid,
      "parentId": that.data.parentid,
      "secondaryId": -1
    }
    wxRequest.postRequest(app.globalData.get_activity_comment_sec, data).then(res => {
      for (var i = 0; i < res.dataList.secComments.length; i++) {
        res.dataList.secComments[i]["createTime"] = forMatTime.tsFormatTime(res.dataList.secComments[i]["createTime"], 'Y年M月D日')
      }
      var list = that.data.recordcontent_secComments
      that.setData({
        recordcontent_secComments: list.concat(res.dataList.secComments)
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },

  getTextare(e) {
    this.comment_content = e.detail.value
  },

  gotoreplyparent: function(e) {
    this.setData({
      inputBoxShow: true
    })
    this.state = 1
  },



  gotosecondreply: function(e) {
    console.log(e)
    this.secondcomid = e.target.dataset.id
    this.answeruserid = e.target.dataset.userid
    this.setData({
      secondreplynickname: e.target.dataset.name
    })
    this.setData({
      inputBoxShow: true
    })
    this.state = 0
  },





  publishcomment() {
    var that = this
    var reply = this.data.recordcontent_secComments
    if (this.state == 1) {
      var data1 = {
        "activityId": that.data.activityid,
        "parentId": that.data.parentid,
        "content": this.comment_content,
        "secondaryId": -1
      }
      wxRequest.postRequest(app.globalData.add_activity_comment, data1).then(res => {
        console.log('二级评论：', res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
        that.setData({
          inputBoxShow: false,
          recordcontent_secComments: reply.concat(res),
          totalreply: that.data.totalreply + 1
        })
      })

    } else if (this.state == 0) {
      var data2 = {
        "activityId": that.data.activityid,
        "parentId": that.data.parentid,
        "content": this.comment_content,
        "secondaryId": this.secondcomid,
        "toAnswerUserId": this.answeruserid
      }
      wxRequest.postRequest(app.globalData.add_activity_comment, data2).then(res => {
        console.log('三级评论：', res)
        res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')
        that.setData({
          inputBoxShow: false,
          recordcontent_secComments: reply.concat(res),
          totalreply: that.data.totalreply + 1
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




  onReachBottom: function() {
    if (this.data.nowpages < this.data.pages) {
      this.loadmoreseccomment(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      wx.showToast({
        title: '没有更多了!',
        icon: 'none'
      })
      this.data.temp = 1;
    }

  },

})