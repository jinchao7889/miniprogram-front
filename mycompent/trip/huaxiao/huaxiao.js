// mycompent/trip/huaxiao/huaxiao.js
Component({
  /**
   * 组件的属性列表
   */  
  options: {
    addGlobalClass: true,

  },
  properties: {
    huaxiaocontent:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    listExpan:[]
  },
  attached() {
    var con = this.properties.huaxiaocontent;
    console.log(con)
    var list = this.data.listExpan;
    for (var i = 0; i < con.length; i++) {
      list.push(false)
    }
    this.setData({
      listExpan: list
    })
    console.log(list)

  },

  /**
   * 组件的方法列表
   */
  methods: {
    isshowsechuaxiao(e){
      console.log(e)
      var index = e.currentTarget.dataset.index
      var that = this;
      var list = this.data.listExpan
      list[index] = !list[index]
      this.setData({
        listExpan: list
      })
      console.log(list)
    } 
  }

})
