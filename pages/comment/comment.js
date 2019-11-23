// pages/comment/comment.js
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    content: '',
    score: '',
    movieid: '',
    comments: {}
  },

  submit: function (){
    wx.showLoading({
      title: '提交中...',
    })
    db.collection('comment').add({
      data: {
        content: this.data.content,
        score: this.data.score,
        movieid: this.data.movieid
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '评论成功！',
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '评论失败',
      })
    }).finally(() => {
      db.collection('comment').where({
        movieid: this.data.movieid
      }).get().then(res => {
        this.setData({
          comments: res.data
        })
      }).catch(err => {
        console.log(err)
      })
    })

  },

  onContentChange: function (event){
    this.setData({
      content: event.detail
    })
  },
  onScoreChange: function (event){
    this.setData({
      score: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid: options.movieid
    })
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        movieid: options.movieid
      }
    }).then(res => {
      console.log(res)
      this.setData({
        detail: JSON.parse(res.result)
      })
      console.log(this.data.detail)
      db.collection('comment').where({
        movieid: this.data.movieid
      }).get().then(res => {
        this.setData({
          comments: res.data
        })
        console.log(this.data.comments)
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
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