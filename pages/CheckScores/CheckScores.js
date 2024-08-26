// pages/CheckScores/CheckScores.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CourseGradesPrompt: [],
        CourseGrades: [],
        WeightedAverage: 0,
        AcademicCredits: 0,
    },

    showCourseGrade: function () {
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                wx.request({
                    url: app.globalData.apiUrl + '/getgrade/',
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
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            this.setData({
                                CourseGradesPrompt: res.data.CourseGradesPrompt,
                                CourseGrades: res.data.CourseGrades,
                                WeightedAverage: res.data.WeightedAverage,
                                AcademicCredits: res.data.AcademicCredits,
                            })
                        } else {
                            wx.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 2500
                            })
                        }
                    },
                    fail: (err) => {
                        wx.showToast({
                            title: "网络请求失败",
                            icon: 'none',
                            duration: 1800
                        })
                    }
                })
            },
            fail: () => {
                // 未找到对应的 key 或获取失败
                console.log('获取数据失败');
                wx.showToast({
                    title: '请先登陆...',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.showCourseGrade()
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
        wx.vibrateShort();
        this.onLoad()
        wx.stopPullDownRefresh();
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