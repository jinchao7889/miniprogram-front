// pages/mine/authentication/authentication.js
const app = getApp();
const wxRequest = require('../../../utils/promise-util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList: [{
      name: '完善信息'
    }, {
      name: '审核中'
    }, {
      name: '审核结果'
    }],
    num: 0,
    auditStatus:0,
    imgList: [
      null,
      null,
      null
    
    ],
    realname:"",
    phone:"",
    smsCode:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthentication()
  },
   ChooseImage(e) {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log()
        this.upFile(res.tempFilePaths[0], e.currentTarget.dataset.index)

       
      }
    });
  },
  
  DelImg(e) {
    console.log(e)
    
  
    var imglist = this.data.imgList;
    imglist[e.currentTarget.dataset.index] = null;
    this.setData({
      imgList: imglist
    })
 
  },
  
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  upFile(tempFilePaths,index){
  
    var that=this;
    wxRequest.upFile(app.globalData.file_upload_url, tempFilePaths).then(res=>{
      var imglist= that.data.imgList;
      imglist[index]=res.fileUrl
      this.setData({
        imgList: imglist
      })
     
    })
  },


  formSubmit(e){
    console.log(e)
    for(var i=0;i<this.data.imgList.length;i++){
      if (this.data.imgList[i]==null){
        wx.showModal({
          title: '亲爱的用户',
          content: '照片都要上传哦',
          confirmText: '好的',
          success: res => {
            if (res.confirm) {
              return;
            }
          }
        })
        return
      }
    }
    var auData = {
      "realName": e.detail.value.realname,
      "userPhone": e.detail.value.phone,
      "idCardPositivePhoto": this.data.imgList[0],
      "idCardNegativePhoto": this.data.imgList[1],
      "studentIdPhoto": this.data.imgList[2],
    }
   var that=this
    wxRequest.postRequest(app.globalData.authorization_add_url, auData).then( res=>{
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 2000
      })
      console.log(res);
      that.setData({
     
        num: 1,
        auditStatus: res.auditStatus
      })

    })
  },

  getAuthentication(){
    var that =this;
    wxRequest.getRequest(app.globalData.authorization_get_url,null).then(res=>{
      console.log(res)

      if(res!=null){
        var imglist = [res.idCardPositivePhoto, res.idCardNegativePhoto, res.studentIdPhoto]

        if (res.auditStatus==1){
          that.setData({
            imgList: imglist,
            realname: res.realName,
            phone: res.userPhone,
            num:1,
            auditStatus: res.auditStatus
          })
        }else {
          that.setData({
            imgList: imglist,
            realname: res.realName,
            phone: res.userPhone,
            num: 2,
            auditStatus: res.auditStatus
          })
        }
      }
      
    })
  }
})