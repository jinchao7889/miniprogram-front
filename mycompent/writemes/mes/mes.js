const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var title = '';
var way = '';
var time = '';
var place = '';
var day = null;
var cost = null;
var flag = false;

Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    travelid: String,
    tripid: Number

  },

  /**
   * 组件的初始数据
   */
  data: {
    mes: [],
    index: null,
    date: '2019/3/1',
    fileUrl: null,
    picker: ['自驾游', '自由行', '其他'],
    ispublish:Boolean
  },

  ready() {
    var that = this
    console.log('travelid:', this.properties.travelid)
    if (that.properties.travelid != 'a') {
      wx.getStorage({
        key: that.properties.travelid,
        fail: function(r) {
          console.log('缓存获取失败!')
          wxRequest.getRequest(app.globalData.get_travels_caogao + that.properties.travelid, null).then(res => {
            console.log('无缓存，从服务器加载来的数据：',res)
            that.setData({
              mes: res,
              fileUrl: res.coverMap
            })
            wx.setStorage({
              key: that.properties.travelid,
              data: res
            })

            for (var i = 0; i < that.data.picker.length; i++) {
              if (that.data.mes.travelType == that.data.picker[i]) {
                that.setData({
                  index: i
                })
                break;
              }
            }

            time = forMatTime.tsFormatTime(that.data.mes.departureTime, 'Y/M/D')


            that.setData({
              date: time
            })

            title = that.data.mes.title
            way = that.data.mes.travelType
            place = that.data.mes.travelDestination
            day = that.data.mes.travelDays
            cost = that.data.mes.perCapitaConsumption
            
          })
        },
        success: function(res) {
          console.log('缓存获取成功!')
          that.setData({
            mes: res.data,
            fileUrl: res.data.coverMap
          })
          for (var i = 0; i < that.data.picker.length; i++) {
            if (that.data.mes.travelType == that.data.picker[i]) {
              that.setData({
                index: i
              })
              break;
            }
          }
          time = forMatTime.tsFormatTime(that.data.mes.departureTime, 'Y/M/D')
          that.setData({
            date: time
          })

          title = that.data.mes.title
          way = that.data.mes.travelType
          place = that.data.mes.travelDestination
          day = that.data.mes.travelDays
          cost = that.data.mes.perCapitaConsumption
 
        }
      })


    }else{
      var timestamp = ((new Date()).getTime())/1000;
      console.log('timestamp:', timestamp)
      var data = {
        "title": "",
        "travelsStatus": 1,
        "departureTime": timestamp,
        "travelDays": null,
        "coverMap":"",
        "travelType": "",
        "perCapitaConsumption": null,
        "travelDestination": ""
      }
      wxRequest.postRequest(app.globalData.add_travel_mes, data).then(res => {
        that.properties.travelid = res.id
        wxRequest.getRequest(app.globalData.get_trip_covermap_throw_travelid + res.id, null).then(r => {
          that.properties.tripid = r.id
          console.log('新建游记成功！')
          console.log('travelid:', res.id)
          console.log('tripid:',  r.id)
        })
      })
    }

  },



  /**
   * 组件的方法列表
   */
  methods: {
    PickerChange(e) {
      // console.log(e);
      this.setData({
        index: e.detail.value
      })
      way = this.data.picker[e.detail.value];
      flag = true;
    },
    DateChange(e) {
      this.setData({
        date: e.detail.value
      })
      time = e.detail.value
      flag = true;
    },


    gettitle(e) {
      title = e.detail.value
      flag = true;
    },
    getplace(e) {
      place = e.detail.value
      flag = true;
    },
    getdays(e) {
      day = e.detail.value
      flag = true;
    },
    getcost(e) {
      cost = e.detail.value
      flag = true;
    },



    addimage() {
      var that = this
      const value = wx.getStorageSync('access_token')
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths[0])
          that.setData({
            fileUrl: tempFilePaths
          })
          wx.uploadFile({
            url: app.globalData.upload_file, // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              "Authorization": "bearer " + value
            },
            success(res) {
              that.data.fileUrl = JSON.parse(res.data).data.fileUrl
            }
          })
        }
      })
      flag = true;
    },






    stepsnext(e) {

      var tIme = forMatTime.timestampsTurnFuc(time.replace(/-/g, "/"))
      var that = this

      if(title==''||place==''||this.data.fileUrl==null||day==null||cost==null||way==''){
        this.data.ispublish=true;
console.log('信息有空白，没写完')
      }else{
        console.log('信息已经全部填写了')
        this.data.ispublish = false;
      }

      if (flag == true) {
        var that = this
        wx.showModal({
          title: '提示',
          content: '您有更改的内容，是否保存？',
          success(res) {
            if (res.confirm) {
              if (that.properties.travelid == 'a') {
                var data = {

                  "title": title,
                  "travelsStatus": 1,
                  "departureTime": tIme,
                  "travelDays": day,
                  "travelType": way,
                  "coverMap":that.data.fileUrl,
                  "perCapitaConsumption": cost,
                  "travelDestination": place

                }
                wxRequest.postRequest(app.globalData.add_travel_mes, data).then(res => {
                  console.log(res)
                  that.properties.travelid = res.id
                  wx.setStorage({
                    key: res.id,
                    data: res
                  })
                  wxRequest.getRequest(app.globalData.get_trip_covermap_throw_travelid + res.id, null).then(r => {
                    that.properties.tripid = r.id
                    var mes = {
                      'num': 1,
                      'ispublish':that.data.ispublish,
                      'tripid': that.properties.tripid,
                      'travelid': that.properties.travelid
                    }
                    console.log('mes:', mes)
                    that.triggerEvent('gomestoxincheng', mes, {})
                  })
                })
              } else {
                var data = {
                  "title": title,
                  "travelsStatus": 1,
                  "departureTime": tIme,
                  "travelDays": day,
                  "travelType": way,
                  "coverMap": that.data.fileUrl,
                  "perCapitaConsumption": cost,
                  "travelDestination": place,
                  'id': that.properties.travelid
                }
                wxRequest.postRequest(app.globalData.add_travel_mes, data).then(res => {
                  console.log('新增/更改信息后，服务器返回的信息：',res)
                  that.properties.travelid = res.id
                  wx.setStorage({
                    key: res.id,
                    data: res
                  })
                  wxRequest.getRequest(app.globalData.get_trip_covermap_throw_travelid + res.id, null).then(r => {
                    that.properties.tripid = r.id
                    var mes = {
                      'num': 1,
                      'ispublish': that.data.ispublish,
                      'tripid': that.properties.tripid,
                      'travelid': that.properties.travelid
                    }

                    console.log(mes)
                    that.triggerEvent('gomestoxincheng', mes, {})
                  })
                })
              }
              flag = false
            } else if (res.cancel) {

              var mes = {
                'num': 1,
                'ispublish': that.data.ispublish,
                'tripid': that.properties.tripid,
                'travelid': that.properties.travelid
              }
              that.triggerEvent('gomestoxincheng', mes, {})

            }
          }
        })
      } else {

        var mes = {
          'num': 1,
          'ispublish': that.data.ispublish,
          'tripid': that.properties.tripid,
          'travelid': that.properties.travelid
        }
        that.triggerEvent('gomestoxincheng', mes, {})
      }
    }
  }
})