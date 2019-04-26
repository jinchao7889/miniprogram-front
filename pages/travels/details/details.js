// pages/travels/details/details.js
var WxParse = require("../../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
寻佛缘而来。
</div>
<p style="font-size:14px;">
	<img src="http://b2-q.mafengwo.net/s1/M00/1E/92/wKgIC1xUUvKAWzeEAAXcJcgd_2g87.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90" alt="" />
</p>
<p style="font-size:14px;">
	<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">乐山大佛又名凌云大佛。</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">雕凿在岷江、青衣江和大渡河汇流处岩壁上，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">依岷江南岸凌云山栖霞峰，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">临江峭壁凿造而成为弥勒佛坐像，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">通高71米，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">是唐摩岩造像的艺术精品之一，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">历时90年才告完成，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">是世界上最大的石刻弥勒佛坐像。</span>
</p>
<p style="font-size:14px;">
	<br />
</p>
<div class="f-block" id="_j_paragraph_3" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<h3 style="font-size:18px;color:#333333;">
		门票信息
	</h3>
</div>
<div class="f-block" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
		大佛修缮期间，<br />
乐山大佛景区实行游山票、游江票半价优惠政策：游山全票40元/人(原价80元/人)；<br />
游山半票20元/人(原价40元/人)；<br />
游江票35元/人(原价70元/人)。
	</div>
</div>
<div class="f-block" id="_j_paragraph_4" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<h2 style="font-size:24px;color:#333333;">
		峨眉山景区介绍
	</h2>
</div>
<div class="f-block" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
	<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
		峨眉山万能大地图⍢⍢⍢⍢⍢⍢
	</div>
</div>
<p>
	<img src="http://b4-q.mafengwo.net/s10/M00/BE/6F/wKgBZ1xTDPKAZD4dAAK5Zp08f1o07.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90" alt="" />
</p>
<p>
	<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">峨眉山是我国“四大佛教名山”之一，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">地势陡峭，风景秀丽，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">自古便有“峨眉天下秀”的美誉。</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">峨眉山山顶-万佛顶是山峰的顶峰，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">海拔3099米，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">与峨眉平原形成2700米的巨大落差。</span>
</p>
<p>
	<img src="http://b4-q.mafengwo.net/s2/M00/02/75/wKgIDFxSqK6AXrR3AAFS4F4yYok31.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90" alt="" />
</p>
<p>
	<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">峨眉山是普贤菩萨的道场，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">早在一千多年前，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">佛教文化就已经构成了峨眉山历史文化的主体文化，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">所有的建筑、造像、法器以及礼仪，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">音乐、绘画等都展示出宗教文化的浓郁色彩。</span>
</p>
<p>
	<img src="http://n4-q.mafengwo.net/s11/M00/01/B7/wKgBEFxPKWWAJCekAAQCuEiKPoA67.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90" alt="" />
</p>
<p>
	<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">峨眉山景区内最高停车点为雷洞坪停车场，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">其在景区内，社会车辆无法进去景区，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">可乘坐观光车从零公里停车场直达雷洞坪。</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">私家车最高点停车场为零公里停车场，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">自驾车的话，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">推荐将车停在零公里停车场，</span><br />
<span style="color:#666666;font-family:Arial, &quot;font-size:14px;">买过票后乘坐零公里至雷洞坪的观光车进入景区。</span>
</p>
<p>
	<img src="http://b3-q.mafengwo.net/s1/M00/1E/63/wKgIC1xUUtKAB1OXABKH5q8xhe489.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90" alt="" />
</p>
<p>
	<div class="f-block" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
		<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
			从雷洞坪到金顶可徒步上山，<br />
大约三个小时，<br />
也可从雷洞坪徒步到接引殿后，半小时，<br />
再乘坐缆车直达金顶。
		</div>
	</div>
	<div class="f-block" id="_j_paragraph_5" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
		<h3 style="font-size:18px;color:#333333;">
			门票信息
		</h3>
	</div>
	<div class="f-block" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
		<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
			景区门票：160元/人<br />
观光车：零公路—雷洞坪往返&nbsp;50/人<br />
索道：上行65/人&nbsp;下行55/人<br />
		</div>
	</div>
	<div class="f-block" id="_j_paragraph_6" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
		<h3 style="font-size:18px;color:#333333;">
			峨眉山金顶介绍
		</h3>
	</div>
	<div class="f-block" id="_j_paragraph_7" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
		<h4>
			金顶
		</h4>
	</div>
	<div class="f-block" style="margin:0px;padding:0px;color:#666666;font-family:Arial, &quot;">
		<div class="p-section" style="margin:13px 0px 28px;padding:0px;font-size:14px;">
			峨眉山金顶，也称华藏寺，<br />
海拔3077米，是峨眉山第二高峰。<br />
峨眉山金顶是峨眉山寺庙和景点最集中的地方，<br />
名胜云集，为峨眉精华所在。<br />
金顶是峨眉山寺庙和景点最集中的地方，<br />
1983年被列为全国重点佛教寺院。<br />
在金顶人们可以烧香敬佛并流连于神的世界，<br />
领略大自然的神奇。
		</div>
	</div>
<img src="http://b1-q.mafengwo.net/s12/M00/B2/BF/wKgED1wQ5CuAZm4QAAES92VgHgI94.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90" alt="" />
</p>
<p>
	<br />
</p>
<p>
	<br />
</p>
<p>
	<br />
</p>`;

    var temp = WxParse.wxParse('article', 'html', data, that, 5); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})