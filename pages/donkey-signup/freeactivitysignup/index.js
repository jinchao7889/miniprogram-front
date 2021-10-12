const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    picker: ['男', '女', '保密'],
    aid: String,
    username: '',
    usergender: '',
    userphone: '',
    userqqnumber: '',
    userwechat: '',
    userconcat: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.aid = options.aid
    console.log('传过来的活动id为：', this.data.aid)
  },

  PickerChange(e) {
    console.log(e);
    this.data.usergender = this.data.picker[e.detail.value]
    console.log(this.data.usergender)
    this.setData({
      index: e.detail.value
    })
  },

  gocancel() {
    wx.navigateBack({
      delta: 1
    })
  },


  goGenerateorderform() {
    if (this.data.usergender == '' || this.data.username == '' || this.data.userphone == '' || this.data.userqqnumber == '' || this.data.userwechat == '' || this.data.userconcat == '') {
      wx.showToast({
        title: '请填写完您得个人参与信息',
        icon: 'none'
      })
    } else {
      var userinfo = {
        "activityId": this.data.aid,
        "contactNumber": this.data.userphone,
        "contactId": this.data.userconcat,
        "realName": this.data.username,
        "qqNumber": this.data.userqqnumber,
        "wxNumber": this.data.userwechat,
        "gender": this.data.picker[this.data.index],
        "enrolmentNumber": 1
      }
      wxRequest.postRequest(app.globalData.user_activity_enter, userinfo).then(res => {
        wx.showToast({
          title: '报名成功!',
        })
        wx.redirectTo({
          url: '/pages/main/donkey/donkey',
        })
      })
    }
  },


  getusername(e) {
    this.data.username = e.detail.value
  },

  getcontact(e) {
    this.data.userconcat = e.detail.value
  },

  getphone(e) {
    this.data.userphone = e.detail.value
  },

  getQQnumber(e) {
    this.data.userqqnumber = e.detail.value
  },

  getwechat(e) {
    this.data.userwechat = e.detail.value
  },


})