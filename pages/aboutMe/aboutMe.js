// pages/aboutMe/aboutMe.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        article: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let text = `###### 我是理工23届计算机研究生\n做这个小程序是为了学golang, 并且已经**开源**了, 在github上可以看到所有源代码, 所以不会存在商业活动的, 比如打广告之类的.
        我自己知道, 肯定是不如市面上大的app好用, *比如wake up 或者 超级课程表之类的*. 但是**优势**就是我会尽我的可能来让理工的学生们用的舒服的, 并且加一些有趣的免费功能, 就比如现在的那个**问问题**
        想要一个好的**开源**环境, 没有利益.
        只有分享、帮助🥳🥳🥳`
        let result = app.towxml(text,'markdown');
		// 更新解析数据
		this.setData({
			article:result,
		});
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})