// pages/addCoures/addCoures.js
var app = getApp();
Page({
    data: {
        checkboxItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        timetable: [{
            "checkboxs": [],
            "multiIndex": [0, 0, 0],
            "place": ""
        }],
        multiArray: [
            ["星期?", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            [
                ["从第?大节开始"],
                ["第1大节"],
                ["第2大节"],
                ["第3大节"],
                ["第4大节"],
                ["第5大节"],
                ["第6大节"]
            ],
            [
                ["上?小节"],
                ["1小节"],
                ["2小节"],
                ["3小节"],
                ["4小节"]
            ]
        ],
    },
    checkboxChange(e) {
        const stringArray = e.detail.value;
        this.data.timetable[e.target.dataset.index].checkboxs = stringArray.map(function (element) {
            return parseInt(element);
        });
        this.setData({
            timetable: this.data.timetable
        })
    },
    bindMultiPickerChange(e) {
        this.data.timetable[e.target.dataset.index].multiIndex = e.detail.value
        this.setData({
            timetable: this.data.timetable
        })
        console.log(this.data.timetable)
    },
    inputfocus(e) {
        this.data.timetable[e.target.dataset.index].place = e.detail.value
        this.setData({
            timetable: this.data.timetable
        })
    },
    submit: function (e) {
        wx.vibrateShort()
        for (var i = 0; i < this.data.timetable.length; i++) {
            this.data.timetable[i].multiIndex[1] *= 2;
            this.data.timetable[i].multiIndex[1] -= 1;
        }
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                wx.showLoading({
                    title: '请求中...',
                })
                wx.request({
                    url: app.globalData.apiUrl + '/courses/add',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json',
                        "cookie": res.data.authentication,
                    },
                    data: {
                        username: res.data.user,
                        password: res.data.password,
                        school: res.data.school,
                        studentType: parseInt(res.data.studentType),
                        color: e.detail.value.color,
                        coures: e.detail.value.coures,
                        teacher: e.detail.value.teacher,
                        time: this.data.timetable,
                    },
                    success: (res) => {
                        wx.hideLoading();
                        // 登陆成功后返回上一页, 并刷新页面
                        wx.navigateBack({
                            delta: 1,
                        })
                    },
                    fail: (err) => {
                        wx.hideLoading();
                        wx.showToast({
                            title: "网络请求失败",
                            icon: 'none',
                            duration: 1800
                        })
                    }
                })
            },
            fail: function (err) {
                wx.showToast({
                    title: '请先登陆...',
                    icon: 'success',
                    duration: 2000
                })
            },


        })
    },
    copy() {
        this.data.timetable.push({
            "checkboxs": [],
            "multiIndex": [0, 0, 0],
            "place": ""
        })
        this.setData({
            timetable: this.data.timetable
        })
    },
    dele() {
        this.data.timetable.pop()
        this.setData({
            timetable: this.data.timetable
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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