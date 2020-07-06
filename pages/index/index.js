//index.js
//获取应用实例
const app = getApp()

function Day() {}

function Work(title, day) {
  this.title = title;
  this.ticks = day.getTime();
}

Page({
  data: {
    motto: 'Hi, Sofia',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var now = new Date();
    var current_year = now.getFullYear();
    var current_month = now.getMonth();

    this.setYearMonth(current_year, current_month);
  },
  loadDays: function(year, month) {

    var works = [];
    works.push(new Work("R1", new Date(2019, 0, 5)));
    works.push(new Work("R2", new Date(2019, 0, 6)));
    works.push(new Work("R3", new Date(2019, 0, 7)));

    var days = [];
    var today = new Date();

    //得到表示指定年和月的1日的那个时间对象
    var date = new Date(year, month, 1);

    //1.先添加响应的空白的li:这个月1号是星期几，就添加几个空白的li
    var dayOfWeek = date.getDay(); //得到1日是星期几

    for (var i = 0; i < dayOfWeek; i++) {
      days.push(new Day());
    }

    //计算一个月有多少天
    var daysOfMonth = new Date(year, month + 1, 0).getDate();

    //2. 从1号开始添加li
    for (var i = 1; i <= daysOfMonth; i++) {

      var time = new Date(year, month, i);
      var day = new Day();
      days.push(day)

      day.title = i;
      day.today = (today.getFullYear() == year && today.getMonth() == month && today.getDate() == i) ? 'today' : null;

      var workDays = [];
      for (var ij = 0; ij < works.length; ij++) {
        if (this.isWork(works[ij], time)) {
          workDays.push(works[ij]);
        }
      }
      day.work = workDays.length > 0 ? 'work' : null
      day.relax = workDays.length == 0 ? 'relax' : null;
    }

    return days;
  },
  isWork: function(work, day) {

    var delta = (day.getTime() - work.ticks.valueOf()) / 1000 / 86400 % 5;

    return delta == 0;
  },
  previous: function() {

    if (this.current_month > 0) {
      this.setYearMonth(this.current_year, this.current_month - 1)
    } else {
      this.setYearMonth(this.current_year - 1, 11)
    }
  },
  next: function() {

    if (this.current_month < 11) {
      this.setYearMonth(this.current_year, this.current_month + 1)
    } else {
      this.setYearMonth(this.current_year + 1, 0)
    }
  },
  setYearMonth: function(current_year, current_month) {
    var newDays = this.loadDays(current_year, current_month);
    this.current_year = current_year;
    this.current_month = current_month;
    this.setData({
      days: newDays,
      current_year: current_year,
      current_month: current_month
    })
  }
})