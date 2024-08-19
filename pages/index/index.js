//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        // 滚动选择列表
        type: [
            {'week': 1, 'content': '第 1 周'},
            {'week': 2, 'content': '第 2 周'},
            {'week': 3, 'content': '第 3 周'},
            {'week': 4, 'content': '第 4 周'},
            {'week': 5, 'content': '第 5 周'},
            {'week': 6, 'content': '第 6 周'},
            {'week': 7, 'content': '第 7 周'},
            {'week': 8, 'content': '第 8 周'},
            {'week': 9, 'content': '第 9 周'},
            {'week': 10, 'content': '第 10 周'},
            {'week': 11, 'content': '第 11 周'},
            {'week': 12, 'content': '第 12 周'},
            {'week': 13, 'content': '第 13 周'},
            {'week': 14, 'content': '第 14 周'},
            {'week': 15, 'content': '第 15 周'},
            {'week': 16, 'content': '第 16 周'},
            {'week': 17, 'content': '第 17 周'},
            {'week': 18, 'content': '第 18 周'},
            {'week': 19, 'content': '第 19 周'},
            {'week': 20, 'content': '第 20 周'},
        ],
        // 滚动选中项
        selectedTypeIndex: 0,

        // 今天星期几
        todayWeek: 0,

        // 课程列表
        wlist: [
            // { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "Matlab技术与应用", "CourseLocation": "教A-301", "teacher": "张三", "color": "#2e1f54" },
            // { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#52057f" },
            // { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "Matlab技术与应用", "CourseLocation": "教A-301(直播)", "teacher": "张三", "color": "#bf033b" },
            // { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#f00a36" },
            // { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#ff6908" },
            // { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#ffc719" },
            // { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#598c14" },
            // { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#335238" },
            // { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#4a8594" },
            // { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#051736" },
            // { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#706357" },
            // { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#b0a696" },
        ],
        // other课程列表
        OtherCourses: [],

        // 时间表
        timeTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    identy: function (e, ...args) {
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                wx.showLoading({
                    title: '请求中...',
                })

                // 当前周数, 和是否请求没有地点的课程
                var weekreq, refesh
                if (args.length > 0) {
                    weekreq = args[0]
                    refesh = args[1]
                }
                else {
                    weekreq = parseInt(e.detail.value, 10) + 1
                    refesh = 0
                }
                console.log("当前要变成第几周weekreq : " + weekreq)

                if (this.currentWeek() == weekreq) {
                    this.setData({
                        todayWeek: new Date().getDay() + 1
                    })
                } else {
                    this.setData({
                        todayWeek: 0
                    })
                }

                // 有时间和地点的课程
                wx.request({
                    url: app.globalData.apiUrl + '/getweekcoure/' + weekreq,
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
                        console.log(res)
                        if (res.statusCode == 200) {
                            // 成功获取到数据
                            // console.log("网络获取到的data: " + res.data);
                            var netlist = new Array();
                            if (res.data != null) {
                                res.data.forEach((item) => {
                                    netlist.push({
                                        xqj: item.WeekDay,
                                        skjc: item.NumberOfLessons,
                                        skcd: item.NumberOfLessonsLength,
                                        kcmc: item.CourseContent,
                                        CourseLocation: item.CourseLocation,
                                        teacher: item.TeacherName,
                                        color: item.Color,
                                    })
                                })
                            }
                            this.setData({
                                selectedTypeIndex: weekreq - 1,
                                wlist: netlist
                            })
                        } else {
                            wx.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 1800
                            })
                        }
                        wx.hideLoading();
                    },
                    fail: (res) => {
                        wx.hideLoading();
                        wx.showToast({
                            title: "网络请求失败",
                            icon: 'none',
                            duration: 2500
                        })
                    },
                });

                // 只有onload才会刷新
                if (refesh == 1) {
                    // 请求时间表
                    wx.request({
                        url: app.globalData.apiUrl + '/getTimeTable',
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
                                    timeTable: res.data.timeTable
                                })
                                // console.log(this.data.timeTable)
                            }
                        }
                    })
                    // 没有时间或地点的课程
                    wx.request({
                        url: app.globalData.apiUrl + '/getweekcoure/0',
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
                            console.log(res)
                            if (res.statusCode == 200) {
                                // 成功获取到数据
                                var netlist = new Array();
                                if (res.data != null) {
                                    res.data.forEach((item) => {
                                        netlist.push({
                                            CourseContent: item.CourseContent,
                                            TeacherName: item.TeacherName,
                                            BeginWeek: item.BeginWeek,
                                            EndWeek: item.EndWeek,
                                        })
                                    })
                                }
                                this.setData({
                                    OtherCourses: netlist
                                })
                            }
                        },
                    })
                }
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

    // 确认时
    picker(e) {
        wx.vibrateShort();
        this.identy(e);
    },

    // 点击时
    handlePickerTap: function () {
        // 触发震动
        wx.vibrateShort();
    },

    // 点击课程
    showCardView: function (e) {
        // todo 增加点击课程, 显示课程详细信息功能
    },

    currentWeek: function (e) {
        // 计算出距离3.4日到今天, 是第几周
        // todo 这里要随开学日期更改
        var StartData = new Date(2024, 8 - 1, 26) //8月26日
        var currentDate = new Date();
        var gapday = parseInt((currentDate - StartData) / 86400000)
        var week = parseInt(gapday / 7) + 1
        return week
    },

    // 自带函数
    onLoad: function (e) {
        console.log('onLoad');
        var week = this.currentWeek();
        console.log("this week is"+week)
        this.data.type[week - 1].content = "第"+ week +"周(当前周)"
        this.setData({
            type : this.data.type
        })
        this.identy(e, week, 1);
    },

    // 下拉刷新
    onPullDownRefresh: function () {
        wx.vibrateShort();
        this.onLoad()
        wx.stopPullDownRefresh();
    },
})
