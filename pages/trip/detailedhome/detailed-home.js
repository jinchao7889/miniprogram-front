const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var question_content = 'question';
var tripID = 0;
var qId=0;
var tabid = 3;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputBoxShow: false,
    isScroll: true,
    PageCur: '',
    TabCur:0,
    index: 0,
    title: ["前言", "行程", "花销", "清单", "解惑"],
    content: '',
    xinchengcontent: [],
    huaxiaocontent: [],
    qindancontent: [],
    jiehuocontent: [],
    myjiehuocontent:[],
    pages: 0,
    nowpages: 0,
    temp: 1,
    pagesa: 0,
    nowpagesa: 0,
    tempa: 1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pagecur = options.k
    tripID = options.tripid
    this.getData(pagecur)

  },

  NavChange(e) {
    this.getData(e.currentTarget.dataset.cur)
  },

  goquestiondetail(e){
    qId=e.detail.qid
    wx.navigateTo({
      url: `/pages/trip/questiondetail/questiondetail?qid=${qId}&&tripid=${tripID}`,
    })
  },


  getData(pagecur) {
    var that = this
    var qianyancontent = this.data.content
    var xinChengcontent = this.data.xinchengcontent
    var huaXiaocontent = this.data.huaxiaocontent
    var qinDancontent = this.data.qindancontent
    var jieHuocontent = this.data.jiehuocontent
    var myjiehuocontent=this.data.myjiehuocontent

    if (pagecur == 'qianyan') {
      if (qianyancontent=='') {
        wxRequest.getRequest(app.globalData.qianyan_trip_preface_content + tripID, null).then(res => {
          console.log(res)
          that.setData({
            content: res.content
          })
          that.setData({
            PageCur: pagecur
          })
        })
      } else {
        that.setData({
          content: qianyancontent,
          PageCur: pagecur
        })
      }
    } else if (pagecur == 'xincheng') {
      if (xinChengcontent=='') {
        this.loadxinchengcontent(0);
        that.setData({
          PageCur: pagecur
        })
      } else {
        that.setData({
          xinchengcontent: xinChengcontent,
          PageCur: pagecur
        })
      }
    } else if (pagecur == 'huaxiao') {
      if (huaXiaocontent=='') {
        wxRequest.getRequest(app.globalData.get_trip_huaxiao_all + tripID, null).then(res => {
          console.log('花销返回值：',res)
          that.setData({
            huaxiaocontent: res
          })
        })
        that.setData({
          PageCur: pagecur
        })
      } else {
        that.setData({
          huaxiaocontent: huaXiaocontent,
          PageCur: pagecur
        })
      }

    } else if (pagecur == 'qindan') {

      if (qinDancontent=='') {
        wxRequest.getRequest(app.globalData.get_trip_qindan_all + tripID, null).then(res => {
          console.log(res)
          that.setData({
            qindancontent: res,
            PageCur: pagecur
          })
        })
      } else {
        that.setData({
          qindancontent: qinDancontent,
          PageCur: pagecur
        })
      }
    } else if (pagecur == 'jiehuo') {
      if (jieHuocontent==''||myjiehuocontent=='') {
        this.loadallqusetion(0);
        this.loadminequsetion(0)
        that.setData({
          PageCur: pagecur
        })
      } else {
        that.setData({
          jiehuocontent: jieHuocontent,
          myjiehuocontent:myjiehuocontent,
          PageCur: pagecur
        })
      }
    }
  },




  loadxinchengcontent(i) {
    var that=this
    var data = {
      "page": i,
      "size": 30,
      "tripId": tripID
    }
    wxRequest.postRequest(app.globalData.xingcheng_trip_summarize, data).then(res => {
      console.log(res)
      that.setData({
        xinchengcontent: res.dataList
      })
    })
  },

  loadhuaxiaoconten(i) {
    var that=this
    var data = {
      "page": i,
      "size": 30,
      "tripId": tripID
    }
    wxRequest.postRequest(app.globalData.huaxiao_trip_expenses_detailed, data).then(res => {
      
      that.setData({
        huaxiaocontent: res.dataList
      })
    })
  },


  loadminequsetion(a) {
    var that = this
    var data = {
      "page": a,
      "size": 5,
      "tripId": tripID,
      "questionStatus": 0,
    }
    wxRequest.postRequest(app.globalData.jiehuo_mine_trip_questions, data).then(res => {
      console.log(res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y年M月D日')
      }
      var list=that.data.myjiehuocontent
      that.setData({
        myjiehuocontent: list.concat(res.dataList) 
      })
      that.data.pagesa = res.pages
      that.data.nowpagesa = res.nowPage
    })

  },

  loadallqusetion(a) {
    var that = this
    var data = {
      "page": a,
      "size": 5,
      "tripId": tripID,
      "questionStatus": 0,
    }
    wxRequest.postRequest(app.globalData.jiehuo_trip_questions, data).then(res => {
      console.log(res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y年M月D日')
      }
      var list=that.data.jiehuocontent
      that.setData({
        jiehuocontent: list.concat(res.dataList) 
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },

  tabselect(e) {
    tabid = e.detail.id
    console.log(tabid)
    this.setData({
      TabCur:tabid
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
  goaddquestion() {
    this.showInputBox()
  },

  getTextare(e) {
    question_content = e.detail.value
  },

  publishquestion() {
    var that = this

    var data = {
      "tripId": tripID,
      "question": question_content
    }
    wxRequest.postRequest(app.globalData.add_trip_question, data).then(res => {
      console.log(res)


      res["createTime"] = forMatTime.tsFormatTime(res["createTime"], 'Y年M月D日')


      var jhc = that.data.jiehuocontent
      var myjhc=that.data.myjiehuocontent
      that.setData({
        jiehuocontent: jhc.concat(res),
        myjiehuocontent:myjhc.concat(res)
      })
      wx.showToast({
        title: '提问成功！',
        icon: 'none'
      })
      that.invisible();
    })

  },

  onReachBottom: function () {


    if (this.data.TabCur == 0) {
      if (this.data.nowpages < this.data.pages) {
        this.loadallqusetion(this.data.temp);
        this.data.temp = this.data.temp + 1;
     
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
        this.data.temp = 1;
      }
    } else {
      if (this.data.nowpagesa < this.data.pagesa) {
        this.loadminequsetion(this.data.tempa);
        this.data.tempa = this.data.tempa + 1;
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
        this.data.tempa = 1;
      }
    }

  }

})