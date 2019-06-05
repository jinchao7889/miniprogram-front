// mycompent/trip/xincheng/xincheng.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    xinchengcontent:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    listExpan:[]
  },
  attached(){
    var con= this.properties.xinchengcontent;
    console.log(con)
    var list=this.data.listExpan;
    for (var i=0; i<con.length;i++){
      list.push(false)
    }
    this.setData({
      listExpan:list
    })
    console.log(list)
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    onClickItem: function (e) {
     console.log(e)
      var index = e.currentTarget.dataset.index
      var that = this;
      var list=this.data.listExpan
      list[index]=!list[index]
      this.setData({
        listExpan: list
      })
      console.log(list)
    }
  }
})
