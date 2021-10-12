//app.js

const host = "http://localhost:8080/";// http://192.168.1.3:8080
App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    var access_token_expires_in = wx.getStorageSync('access_token_expires_in');
    if (access_token_expires_in < (new Date()).getTime() / 1000) {
      console.log("缓存过期");
      wx.navigateTo({
      
        url: "/pages/auth/auth",
      })
      
    } else {
      var access_token = wx.getStorageSync('access_token');
      var user_info = wx.getStorageSync('user_info');
      if (!access_token) {
        wx.navigateTo({
          url: "/pages/auth/auth",
        })
      }
      this.globalData.userInfo = user_info;
      console.log("缓存正常");
    }
  },
  globalData: {
    userInfo: null,
    login_url: host + '/authentication/openid',
    travel_div_pages: host + '/travels/get_page',
    get_travel_content: host + '/travels/get_content/',
    isFollowadd: host + '/follow//add/',
    isFollowcancel: host + '/follow//cancel/',
    travel_isFabulous_add: host + '/travels_collection/add/',
    travel_isFabulous_cancel: host + '/travels_collection/cancel/',
    add_travel_comment: host + '/travels_comment/add',
    get_travel_comment: host + '/travels_comment/get_page',
    sec_get_travel_comment: host + '/travels_comment/sec/get_page',
    comment_fabulous_add: host + '/travels_comment_fabulous/add/',
    comment_fabulous_cancel: host + '/travels_comment_fabulous/cancel/',
    get_trip_content: host + '/trip/get_page',
    add_trip_collection: host + '/trip_collection/add/',
    cancel_trip_collection: host + '/trip_collection/cancel/',
    trip_mainpage_detail: host + '/trip/get_detail/',
    qianyan_trip_preface_content: host + '/trip_preface_content/get/',
    xingcheng_trip_summarize: host + '/trip_summarize/get_page',
    huaxiao_trip_expenses_detailed: host + '/trip_expenses_detailed/get_page',
    qindan_trip_inventory_element: host + '/trip_inventory/get_all/',
    jiehuo_trip_questions: host + '/trip_questions/get_page',
    add_trip_question: host + '/trip_questions/add',
    jiehuo_mine_trip_questions: host + '/trip_questions/owner/get_page',
    jiehuo_get_question_answer_parent: host + '/trip_answer/get_page',
    add_jiehuo_trip_answer: host + '/trip_answer/add',
    add_trip: host + '/trip/add',
    get_trip_covermap_throw_travelid: host + '/trip/get/',
    updata_travel_content: host + '/travels/update_content',
    upload_file: host + '/cosFile/upload',
    add_travel_mes: host + '/travels/add',
    add_trip_mes: host + '/trip/add',
    get_owner_travels: host + '/travels/owner/get_page',
    get_travels_caogao: host + '/travels/get_travels/',
    add_trip_qianyan: host + '/trip_preface_content/add',
    get_trip_qianyan: host + '/trip_preface_content/get/',
    add_trip_xincheng: host + '/trip_summarize/batch/add',
    get_trip_xincheng_all: host + '/trip_summarize/get_all/',
    add_trip_huaxiao: host + '/trip_expenses/add',
    get_trip_huaxiao_all: host + '/trip_expenses/get_all/',
    add_trip_qindan: host + '/trip_inventory/add',
    get_trip_qindan_all: host + '/trip_inventory/get_all/',
    get_activity_all: host + '/activity/get_page',
    get_activity_detail: host + '/activity/get/',
    get_activity_comment: host + '/activity_leave_message/get_page',
    get_activity_comment_sec: host + '/activity_leave_message/sec/get_page',
    add_activity_comment: host + '/activity_leave_message/add',
    add_activity_sign_up: host + '/activity_enter/add',
    get_activity_owner: host + '/activity_enter/get_page',


    delet_travel: host + '/travels/del/',
    travel_release: host + '/travels/release/',
    delet_travel: host + '/travels/del/',
    get_owner_follow_trips: host + '/trip_collection/get_owner_page',
    get_owner_trips: host + '/trip/get_owner_page',
    get_owner_follow_user: host + '/follow/get_owner_page',
    user_activity_enter: host + '/activity_enter/add',
    get_orderform_all: host + '/order/get_page',
    get_activity_signup_detail: host + '/activity_enter/get/',
    get_order_detail: host + '/order/get/',
    get_rotation_chart: host + '/rotation_chart/get_main_page_chart',


    product_sell_well_url: host + '/product/get_sell_well',
    product_type_url: host + '/product_type/get/',
    shop_image_url: host + '/shop_carousel_img/get/',
    product_detail_url: host + '/product/get/',
    address_query_url: host + '/address/query',
    address_update_url: host + '/address/update',
    address_add_url: host + '/address/add',
    address_del_url: host + '/address/del/',
    address_default_url: host + '/address/get/defaultAddress',
    order_add_url: host + '/order/add',
    product_get_url: host + '/product/get_page',
    file_upload_url: host + '/cosFile/upload',
    authorization_add_url: host + '/user_authentication/add',
    authorization_get_url: host + '/user_authentication/get_owner',

    authorization: 'Basic ZG9ua2V5OmRvbmtleS1zZWNyZXQ=',
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]
  }
})