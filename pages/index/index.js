//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        // 滚动选择列表
        type: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
        // 滚动选择
        selectedTypeIndex: 0,
        // 课程列表
        wlist: [
            { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "Matlab技术与应用", "CourseLocation": "教A-301", "teacher": "张三", "color": "#2e1f54" },
            { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#52057f" },
            { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "Matlab技术与应用", "CourseLocation": "教A-301(直播)", "teacher": "张三", "color": "#bf033b" },
            { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#f00a36" },
            { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#ff6908" },
            { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#ffc719" },
            { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#598c14" },
            { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#335238" },
            { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#4a8594" },
            { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#051736" },
            { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#706357" },
            { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学", "CourseLocation": "教A-301", "teacher": "张三", "color": "#b0a696" },
        ],
        // other课程列表
        OtherCourses: []
    },
    identy: function (e, ...args) {
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                wx.showLoading({
                    title: '请求中...',
                })
                var weekreq, refesh
                if (args.length > 0) {
                    weekreq = args[0]
                    refesh = args[1]
                }
                else {
                    refesh = 0
                    weekreq = parseInt(e.detail.value, 10) + 1
                }
                console.log("weekreq : " + weekreq)
                // console.log(res.data.authentication)

                // 有时间和地点的课程
                wx.request({
                    // url: 'http://127.0.0.1:8080/getweekcoure/' + weekreq,
                    url: 'https://zzyan.com:8000/getweekcoure/' + weekreq,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        "cookie": res.data.authentication,
                    },
                    data: {
                        username: res.data.user,
                        password: res.data.password,
                        school:res.data.school,
                        studentType: res.data.studentType,
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
                            duration: 1800
                        })
                    },
                });

                // 没有时间或地点的课程
                if (refesh == 1) {
                    wx.request({
                        // url: 'http://127.0.0.1:8080/getweekcoure/0' ,
                        url: 'https://zzyan.com:8000/getweekcoure/0',
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            "cookie": res.data.authentication,
                        },
                        data: {
                            username: res.data.user,
                            password: res.data.password,
                            school:res.data.school,
                            studentType: res.data.studentType,
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
    picker(e) {
        wx.vibrateShort();
        this.identy(e);
    },
    handlePickerTap: function () {
        // 触发震动
        wx.vibrateShort();
    },
    showCardView: function(e){
        // todo 增加点击课程, 显示课程详细信息功能
    },
    onLoad: function (e) {
        console.log('onLoad')

        // 计算出距离3.4日到今天, 是第几周
        var StartData = new Date(2024, 3 - 1, 4) //3月4日
        var currentDate = new Date();
        var gapday = parseInt((currentDate - StartData) / 86400000)
        var week = parseInt(gapday / 7) + 1

        this.identy(e, week, 1);
    },
    onPullDownRefresh: function() {
        this.onLoad()
        wx.stopPullDownRefresh();
      },
})
