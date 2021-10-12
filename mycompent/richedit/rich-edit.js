// components/xing-editor.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true

  },

  /**
   * 组件的属性列表
   */


  properties: {
    //图片上传相关属性，参考wx.uploadFile
    title: String,
    imageUploadUrl: String,
    imageUploadName: String,
    imageUploadHeader: Object,
    imageUploadFormData: Object,
    imageUploadKeyChain: String, //例：'image.url'

    //是否在选择图片后立即上传
    // uploadImageWhenChoose: {
    //   type: Boolean,
    //   value: false,
    // },

    //输入内容
    nodes: Array,
    html: String,
    
    

    //内容输出格式，参考rich-text组件，默认为节点列表
    outputType: {
      type: String,
      value: 'html',
    },

    buttonBackgroundColor: {
      type: String,
      value: '#409EFF',
    },

    buttonTextColor: {
      type: String,
      value: '#fff',
    },
  },


  /**
   * 组件的初始数据
   */


  data: {
    windowHeight: 0,
    nodeList: [],
    textBufferPool: [],
    attackIndex:-1,
    scrollTop:0
  },


  attached: function () {
    const windowHeight = wx.getSystemInfoSync();
    console.log(this.properties.title)
    console.log(windowHeight.screenHeight)
    this.setData({
      windowHeight: windowHeight.screenHeight
    })


    if (this.properties.nodes && this.properties.nodes.length > 0) {
      const textBufferPool = [];
      this.properties.nodes.forEach((node, index) => {
        if (node.name === 'p') {
          textBufferPool[index] = node.children[0].text;
        }
      })
      this.setData({
        textBufferPool,
        nodeList: this.properties.nodes,
      })
    } else if (this.properties.html) {
      const nodeList = this.HTMLtoNodeList();
      console.log(nodeList)
      const textBufferPool = [];
      nodeList.forEach((node, index) => {
        if (node.name === 'p'||node.name === 'h') {
          textBufferPool[index] = node.children[0].text;
        }
      })
      this.setData({
        textBufferPool,
        nodeList,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 事件：添加文本
     */
    addText: function (e) {

      const nodeList = this.data.nodeList;
      const textBufferPool = this.data.textBufferPool;
      const flag = e.currentTarget.dataset.flag;
      this.writeTextToNode();

    

      if (nodeList.length > 0 && nodeList[nodeList.length - 1].name == "p"&&flag==1) {
        
       
        return;
      }

      const index = 0;
      const node = {
        name: 'p',
        attrs: {
         "class":""
        },
        children: [{
          type: 'text',
          text: ''
        }]
      }
      console.log("flag:" + flag)
      if(flag==1){
        nodeList.push(node);
        textBufferPool.push('');
        
        this.data.attackIndex == nodeList.length - 1;
      }else if(flag==2){
        if(this.data.attackIndex==-1){
            return
        }
        nodeList.splice(this.data.attackIndex + 1, 0, node);
        textBufferPool.splice(this.data.attackIndex + 1, 0, '');
        this.data.attackIndex = this.data.attackIndex + 1
      }
       
      console.log(nodeList)

      this.setData({
        nodeList,
        textBufferPool,
      })

    },

    
    /**
     * 事件：添加图片
     */
    addImage: function (e) {
      this.writeTextToNode();
      wx.chooseImage({
        count: 1,
        success: res => {
          const tempFilePath = res.tempFilePaths[0];
          wx.getImageInfo({
            src: tempFilePath,
            success: res => {
              const node = {
                name: 'img',
                attrs: {
                  class: "",
                  style: 'width: 100%',
                  src: tempFilePath,
                  // Todo: 图片是否已经上传
                  _uploaded: false,
                  _height: res.height / res.width,
                },
              }
              var index;
              if (this.data.attackIndex==-1){
                index = this.data.nodeList.length-1
              }else{
                index = this.data.attackIndex
              }
              
              let nodeList = this.data.nodeList;
              let textBufferPool = this.data.textBufferPool;
              nodeList.splice(index+1, 0, node);
         
              textBufferPool.splice(index+1, 0, tempFilePath);
              this.setData({
                nodeList,
                textBufferPool,
              })
            }
          })
        },
      })
    },
    addTitle: function (e) {
      const nodeList = this.data.nodeList;
      const textBufferPool = this.data.textBufferPool;
      this.writeTextToNode();
      const node = {
        name: 'h',
        attrs: {
          class: "",
        },
        children: [{
          type: 'text',
          text: ''
        }]
      }
      if(this.data.attackIndex==-1){
        nodeList.push(node);
        textBufferPool.push('');
      } else{
        nodeList.splice(this.data.attackIndex + 1, 0, node);
        textBufferPool.splice(this.data.attackIndex + 1, 0, '');
      }
     
      this.data.attackIndex = nodeList.length-1
      this.setData({
        nodeList,
        textBufferPool,
      })
    },

    addVideo: function (e) {
      this.writeTextToNode();
      
      let that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: ['front', 'back'],
        success: function (res) {
          console.log(tempFilePath)

          const tempFilePath = res.tempFilePath

          const node = {
            name: 'video',
            attrs: {
              class: "x-p",
              style: 'width: 100%',
              src: tempFilePath,
              // Todo: 图片是否已经上传
              _uploaded: false
            },
          }
          var index;
          if (that.data.attackIndex == -1) {
            index = that.data.nodeList.length - 1
          } else {
            index = that.data.attackIndex
          }
          let nodeList = that.data.nodeList;
          let textBufferPool = that.data.textBufferPool;
          nodeList.splice(index + 1, 0, node);
          textBufferPool.splice(index, 0, tempFilePath);
          that.setData({
            nodeList,
            textBufferPool,
          })
        },
        fail:function(res){
          console.log(res)
        }
      })
    },

    /**
     * 事件：删除节点
     */
    deleteNode: function (e) {
      const index = e.currentTarget.dataset.index;
      let nodeList = this.data.nodeList;
      let textBufferPool = this.data.textBufferPool;
      nodeList.splice(index, 1);
      textBufferPool.splice(index, 1);
      if(index==this.data.attackIndex){
        this.data.attackIndex=-1;
      }
      this.setData({
        nodeList,
        textBufferPool,
      })
      
    },
    textCatChaa:function(e){
      console.log("防止textarear冒泡")
    }
    ,

    move: function (e) { 
      var height = this.data.windowHeight - e.touches[0].clientY 
      this.setData({
        scrollTop: height
      })
      console.log(e)
    },
    catchtapImage:function(e){
      const index = e.currentTarget.dataset.index;
    
      if (index == this.data.attackIndex) {
        return;
      }
    
      this.setData({
        attackIndex: index
      })
      this.data.attackIndex = index;
    },
    catchText: function (e) {
      const index = e.currentTarget.dataset.index;

  
      console.log(index, "点击", this.data.attackIndex);
      if (index == this.data.attackIndex){
        return;
      }
  
      this.setData({
        attackIndex: index
      })
      this.data.attackIndex = index;

    },

    onTextareaInput: function (e) {
      const index = e.currentTarget.dataset.index;
      var nodeList = this.data.nodeList;
      var textBufferPool = this.data.textBufferPool;
     
      console.log("输入",index);
      this.data.attackIndex = index;
     
      if (textBufferPool[index] == '' && e.detail.value == ''){
        
      } else if (textBufferPool[index] == '' && e.detail.value != '' || textBufferPool[index] != '' && e.detail.value == ''){
        textBufferPool[index] = e.detail.value;
              // this.setData({
        //   textBufferPool,
        //   nodeList,
        // })
        this.data.textBufferPool = textBufferPool;
        this.writeTextToNode();

      } else {
        textBufferPool[index] = e.detail.value;
        
        this.setData({
          textBufferPool,
        })

      }
    },

    textconfirm: function (e) {
      const index = e.currentTarget.dataset.index;
      var nodeList = this.data.nodeList;
      var textBufferPool = this.data.textBufferPool;
      nodeList[index].children[0].text=textBufferPool[index] ;
      this.setData({
        textBufferPool,
        nodeList,
      })
    },
    /**
     * 事件：提交内容
     */
    onFinish: function (e) {
      console.log('nodeList: ', this.data.nodeList)
      console.log('textBufferPool: ', this.data.textBufferPool)
      wx.showLoading({
        title: '正在保存',
      })
      this.writeTextToNode();
      this.handleOutput();
    },
    famhzhimaopao: function(e){
  
      if (this.data.attackIndex!=-1)
      {
        var nodeList = this.data.nodeList;
        var textBufferPool = this.data.textBufferPool;
        nodeList[this.data.attackIndex].children[0].text = textBufferPool[this.data.attackIndex];
        this.setData({
          textBufferPool,
          nodeList,
        })
      }
      
      console.log("防止事件冒泡")
    },



    /**
     * 预览图片
     */
    previewImg: function (e) {
      let index = e.currentTarget.dataset.index
      let curentUrl = e.currentTarget.dataset.url
      let nodeList = this.data.nodeList;
      console.log(e)
      wx.previewImage({
        current: curentUrl, // 当前显示图片的http链接
        urls: [curentUrl]
      })
    },

    /**
     * 方法：HTML转义
     */
    htmlEncode: function (str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&/g, "&gt;");
      s = s.replace(/</g, "&lt;");
      s = s.replace(/>/g, "&gt;");
      s = s.replace(/ /g, "&nbsp;");
      s = s.replace(/\'/g, "&#39;");
      s = s.replace(/\"/g, "&quot;");
      s = s.replace(/\n/g, "<br>");
      return s;
    },

    /**
     * 方法：HTML转义
     */
    htmlDecode: function (str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&gt;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, "\"");
      s = s.replace(/<br>/g, "\n");
      return s;
    },

    /**
     * 方法：将缓冲池的文本写入节点
     */
    writeTextToNode: function (e) {
      const textBufferPool = this.data.textBufferPool;
      const nodeList = this.data.nodeList;
      nodeList.forEach((node, index) => {
        if (node.name === 'p' || node.name === 'h') {
          node.children[0].text = textBufferPool[index];
        }
      })
      this.setData({
        nodeList,
      })

    },

    /**
     * 方法：将HTML转为节点
     */
    HTMLtoNodeList: function () {
      let html = this.properties.html;
      
      let htmlNodeList = [];
      while (html.length > 0) {
        const endTag = html.match(/<\/[a-z0-9]+>/);
        if (!endTag) break;
        const htmlNode = html.substring(0, endTag.index + endTag[0].length);
        htmlNodeList.push(htmlNode);
        html = html.substring(endTag.index + endTag[0].length);
      }

      return htmlNodeList.map(htmlNode => {
        let node = { attrs: {} };
        const startTag = htmlNode.match(/<[^<>]+>/);
        const startTagStr = startTag[0].substring(1, startTag[0].length - 1).trim();

        node.name = startTagStr.split(/\s+/)[0];
        var stm = startTagStr.match(/[^\s]+="[^"]+"/g);
      
        if (stm!=null)
        {
            stm.forEach(attr => {
            const [name, value] = attr.split('=');
            node.attrs[name] = value.replace(/"/g, '');
          })
        }else{
          console.log("为null")
        }
        if (node.name === 'p' || node.name === 'h') {
          const endTag = htmlNode.match(/<\/[a-z0-9]+>/);
          const text = this.htmlDecode(htmlNode.substring(startTag.index + startTag[0].length, endTag.index).trim());
          node.children = [{
            text,
            type: 'text',
          }]
        }
        return node;
      })
    },

    /**
     * 方法：将节点转为HTML
     */
    nodeListToHTML: function () {
      return this.data.nodeList.map(node => `<${node.name} ${Object.keys(node.attrs).map(key => `${key}="${node.attrs[key]}"`).join(' ')}>${node.children ? this.htmlEncode(node.children[0].text) : ''}</${node.name}>`).join('');
    },

    /**
     * 方法：上传图片
     */
    uploadImage: function (node) {
      return new Promise(resolve => {
        let options = {
          filePath: node.attrs.src,
          url: this.properties.imageUploadUrl,
          name: this.properties.imageUploadName,
        }
        if (this.properties.imageUploadHeader) {
          options.header = this.properties.imageUploadHeader;
        }
        if (this.properties.imageUploadFormData) {
          options.formData = this.properties.imageUploadFormData;
        }
        options.success = res => {
        
         var res_data=JSON.parse(res.data);
          let url = res_data.data.fileUrl;
          console.log(url, "上传图片")
       
          node.attrs.src = url;
          node.attrs._uploaded = true;
          resolve();
        }
        wx.uploadFile(options);
      })
    },
    /**
     * 方法：处理节点，递归
     */
    handleOutput: function (index = 0) {
      let nodeList = this.data.nodeList;
      if (index >= nodeList.length) {
        wx.hideLoading();
        if (this.properties.outputType.toLowerCase() === 'array') {
          this.triggerEvent('finish', { content: this.data.nodeList });
        }
        if (this.properties.outputType.toLowerCase() === 'html') {
          var content = this.nodeListToHTML();
          console.log(content)
          this.triggerEvent('finish', { content: content });
        }
        return;
      }
      const node = nodeList[index];
      if (node.name === 'img' && !node.attrs._uploaded) {

        this.uploadImage(node).then(() => {
          this.handleOutput(index + 1)
        });
      } else {
        this.handleOutput(index + 1);
      }
    },

    backpage:function(e){

      wx.navigateBack({
        delta: 1
      })
    }
  }
})
