// pages/travels/details/details.js
var WxParse = require("../../../wxParse/wxParse.js");
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
    InputBottom: 0
  },



  onLoad: function(options) {
    const that = this;
    var data = `<p>
	<br />
</p>
<div class="f-block" id="_j_paragraph_1" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<h2 style="font-size:24px;color:#333333;">
		前言
	</h2>
</div>
<div class="f-block" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
		来四川旅游，<br />
一定要去乐山大佛和峨眉山，<br />
一览乐山大佛的雄伟庄严，<br />
峨眉山的秀丽风光。<br />
峨眉山占地面积有154平方公里，<br />
如果要徒步上山最少要花费两天的时间。<br />
这篇攻略主要写给时间有限，<br />
又想一览乐山峨眉山壮观景象的人们。<br />
	</div>
</div>
<div class="f-block" id="_j_paragraph_2" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<h2 style="font-size:24px;color:#333333;">
		乐山大佛景区简介
	</h2>
</div>
<p>
	<br />
</p>
<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
	乐山大佛,<br />
自古便有“山是一座佛，佛是一座山”的美誉，<br />
很多人都会慕名而来，<br />
亲眼目睹大佛的雄伟庄严，<br />
还有一部分人是为了诚心礼佛，<br />
寻佛缘而来。`;

    var temp = WxParse.wxParse('article', 'html', data, that, 5)
    tid = options.tid
    this.setData({
      travelId: tid
    })
    wxRequest.getRequest(app.globalData.get_travel_content + tid, null).then(res => {
      console.log('详细游记信息：',res)
      this.setData({
        content: res,
        departureTime: forMatTime.tsFormatTime(res.departureTime, 'Y/M/D'),
        releasetime: forMatTime.tsFormatTime(res.releaseTime, 'Y年M月D日')
      })
    })



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
        totalrecord: res.totalRecord
      })
      pages = res.pages
      nowPage = res.nowPage
    });
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