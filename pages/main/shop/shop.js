Page({
  data: {
    cardCur: 0,
    swiperList: [{
      op:0,
      id: 2,
      type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556778569&di=75449f92660112dcee2922e50ed41202&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0310c6358057635a84a0e282b2f9145.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556183700400&di=bbdf1632437e7f2bc038d91f43263693&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1611%2F24%2Fc10%2F30486109_1479985745748_mthumb.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556778441&di=3f6b8f6188a3c9c1d2ba80d1196d9bdf&imgtype=jpg&er=1&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F171120%2F1-1G120135044.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556183740176&di=0ca3af06d04e8a5e6985eb2794a9a51b&imgtype=0&src=http%3A%2F%2Fimgs.soufun.com%2Fnewshezuo%2F201507%2F09%2F84%2F89b1dc9055c09d1b04c1e5f358a3a542.jpeg'
    }, {
      id: 6,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556778498&di=5d3559cdbe017ef45f80e8d7747c64c0&imgtype=jpg&er=1&src=http%3A%2F%2Fm.360buyimg.com%2Fn12%2Fjfs%2Ft640%2F335%2F434184159%2F429010%2F2e561d38%2F546858b8Naf044cc3.jpg%21q70.jpg'
    }]
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  onPageScroll: function (e) {
    if (e.scrollTop < 67){
      if (this.data.op !=0) {

        this.setData({
          op: 0
        })
      }
        return;
    }else{
      e.scrollTop = e.scrollTop-67
    }
    var op =parseInt(e.scrollTop*10/67);
    if (op>10){
      if(this.data.op<1){

        this.setData({
          op: 1
        })
      }
    }else{
      op=op/10;
      console.log(op);//{scrollTop:99}

      this.setData({
        op: op
      })
    }
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})