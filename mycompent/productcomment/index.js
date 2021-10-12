// mycompent/productcomment/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true

  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    piclist: [{
        id: 1,
        type: 'image',
        url: "http://5b0988e595225.cdn.sohucs.com/images/20180415/b1920990b5654d53864afeb1c3ce932e.jpeg"
      },
      {
        id: 2,
        type: 'image',
        url: "http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1404/02/c28/32730466_1396428855625_mthumb.jpg"
      },
      {
        id: 3,
        type: 'image',
        url: "http://img.juimg.com/tuku/yulantu/110715/9128-110G514440969.jpg"
      },
      {
        id: 4,
        type: 'image',
        url: "http://5b0988e595225.cdn.sohucs.com/images/20180415/b1920990b5654d53864afeb1c3ce932e.jpeg"
      },
      {
        id: 5,
        type: 'video',
        url: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      }
    ],
    list: [],
    controls: false
  },


  ready(res) {
    this.videoContext = wx.createVideoContext('myvideo', this)

    for (var i = 0; i < this.data.piclist.length; i++) {
      if (this.data.piclist[i].type == 'image') {
        this.data.list.push(this.data.piclist[i].url)
      }
    }
    console.log(this.data.list)
  },


  methods: {

    previewImage: function(e) {
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.data.list // 需要预览的图片http链接列表  
      })
    },


    allscreen: function(e) {
      this.videoContext.requestFullScreen()
    },

    bindended(){
      this.videoContext.exitFullScreen()
    },

    screenChange(e) {
      let fullScreen = e.detail.fullScreen //值true为进入全屏，false为退出全屏
      if (!fullScreen) { //退出全屏
        this.setData({
          controls: false
        })
        this.videoContext.pause()
      } else { //进入全屏
        this.setData({
          controls: true
        })
      }
    }
  }
})