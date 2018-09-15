const Api = require('./../../utils/api');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: []
  },
  // 分享主页
  shareIndex(e) {
    let that = this;
    let target = e.currentTarget.dataset;
    let id = target.id;

    wx.navigateTo({
      url: `/pages/share_index/share_index?id=${id}`
    })
  },
  // 点赞
  handZan(e) {
    let that = this;
    let target = e.currentTarget.dataset;
    let sign = target.sign;

    if (sign == 0) {
      let id = target.id;
      Api.probability(id).then(result => {
        console.log(result);
        // 点赞成功
        if (result.data.code == 0) {
          wx.showToast({
            title: result.data.msg,
            icon: 'none',
            mask: true
          })
          setTimeout(() => {
            that.getRankList();
          }, 1000);
        } else { // 已经点赞过
          wx.showToast({
            title: result.data.msg,
            icon: 'none',
            mask: true
          })
        }
      }, err => {
        console.log(err);
      });


    } else if (sign == 1) {
      wx.showToast({
        title: '你今日已帮他点赞过了',
        icon: 'none',
        mask: true
      })
      return;
    } else if (sign == 2) {
      wx.showToast({
        title: '不能给自己点赞',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      wx.showModal({
        title: '提示',
        content: '登录后才能点赞哦',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: `/pages/login/login`
            })
          } else if (res.cancel) {
          }
        }
      })
    }
    console.log()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.tabIndex = 2;
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
    let that = this;

    that.getRankList();
  },
  /**
   * 获取排行榜数据
   */
  getRankList() {
    let that = this;
    // 获取排行榜数据
    Api.rankList().then(result => {
      let res = result.data;

      // 
      if (res.code === 0) {
        // console.log(res.rank.data);
        that.setData({
          rank: res.rank.data,
          user: res.user
        });
        // console.log(res.user);
      } else if (res.code === 1) {
        // {code: 0, msg: "请先登录"}
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }, 1000);
      }
      // console.log(res);
    }).catch(err => {
      console.log(err);
    });
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