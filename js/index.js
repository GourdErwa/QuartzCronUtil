/**
 * Created by wei.Li on 15/8/24.
 */



var Type = {

    /**
     * 匹配 *
     */
    "All": {
        "name": "All",
        "keyword": "*",
        "set": function (name, value) {

        },
        "get": function (name) {
            return this.keyword;
        }
    },
    /**
     * 周期性 x-x
     */
    "Cyclic": {
        "name": "Cyclic",
        "keyword": "-",
        "set": function (name, value) {

        },
        "get": function (name) {
            var id_1 = name + this.name + "_1";
            var id_2 = name + this.name + "_2";
            return $("#" + id_1).val() + this.keyword + $("#" + id_2).val();
        }
    },
    /**
     * 从 x 开始 ,每 x 执行一次
     */
    "Interval": {
        "name": "Interval",
        "keyword": "/",
        "set": function (name, value) {

        },
        "get": function (name) {
            var id_1 = name + this.name + "_1";
            var id_2 = name + this.name + "_2";
            return $("#" + id_1).val() + this.keyword + $("#" + id_2).val();
        }
    },
    /**
     * 指定
     */
    "Assigned": {
        "name": "Assigned",
        "keyword": ",",
        "set": function (name, value) {

        },
        "get": function (name) {
            var id_1 = name + this.name + "_1";
            return $("#" + id_1).val();
        }
    },
    /**
     * 不指定
     */
    "NotAssigned": {
        "name": "NotAssigned",
        "keyword": "?",
        "set": function (name, value) {

        },
        "get": function (name) {
            return "?";
        }
    },
    /**
     * 每月 x 号最近的那个工作日
     */
    "RecentDays": {
        "name": "RecentDays",
        "keyword": "L",
        "set": function (name, value) {

        },
        "get": function (name) {
            return $("#" + name + this.name + "_1").val() + "L";
        }
    },
    /**
     * 本月最后一天
     */
    "LastDayOfMonth": {
        "name": "LastDayOfMonth",
        "keyword": "W",
        "set": function (name, value) {

        },
        "get": function (name) {
            return $("#" + name + this.name + "_1").val() + "W";
        }
    },
    /**
     * 第 x 周的星期 x
     */
    "WeeksOfWeek": {
        "name": "WeeksOfWeek",
        "keyword": "#",
        "set": function (name, value) {

        },
        "get": function (name) {
            var id_1 = name + this.name + "_1";
            var id_2 = name + this.name + "_2";
            return $("#" + id_1).val() + this.keyword + $("#" + id_2).val();
        }
    },
    /**
     * 本月最后一个星期 x
     */
    "LastWeekOfMonth": {
        "name": "LastWeekOfMonth",
        "keyword": "L",
        "set": function (name, value) {

        },
        "get": function (name) {
            var id_1 = name + this.name + "_1";
            return $("#" + id_1).val() + this.keyword;
        }
    }
};


var TimeObject = {

    "second": {
        radioName: "secondType",
        min: 0,
        max: 59,
        types: [Type.All, Type.Cyclic, Type.Interval, Type.Assigned]
    },
    "minute": {
        radioName: "minuteType",
        min: 0,
        max: 59,
        types: [Type.All, Type.Cyclic, Type.Interval, Type.Assigned]
    },
    "hour": {
        radioName: "hourType",
        min: 0,
        max: 23,
        types: [Type.All, Type.Cyclic, Type.Interval, Type.Assigned]
    },
    "day": {
        radioName: "dayType",
        min: 1,
        max: 31,
        types: [Type.All, Type.Cyclic, Type.Interval, Type.Assigned, Type.NotAssigned, Type.RecentDays, Type.LastDayOfMonth]
    },
    "month": {
        radioName: "monthType",
        min: 1,
        max: 12,
        types: [Type.All, Type.Cyclic, Type.Interval, Type.Assigned, Type.NotAssigned]
    },
    "week": {
        radioName: "weekType",
        min: 1,
        max: 7,
        types: [Type.All, Type.Cyclic, Type.Assigned, Type.NotAssigned, Type.WeeksOfWeek, Type.LastWeekOfMonth]
    },
    "year": {
        radioName: "yearType",
        min: 2015,
        max: 2299,
        types: [Type.All, Type.Cyclic, Type.NotAssigned]
    }
};

var getChecked = function (name) {
    return $("input[type=radio][name='" + name + "']:checked").val();
};

var setChecked = function (name, value) {
    $("input[type=radio][name='" + name + "'][value='" + value + "']").attr("checked", true);
};


//init
$(function () {

    for (var i in TimeObject) {
        var timeObject = TimeObject[i];
        var radioName = timeObject.radioName;
        var min = timeObject.min;
        var max = timeObject.max;
        var types = timeObject.types;
        types.forEach(function (v) {
            if (v.name === Type.Assigned.name) {
                var id = radioName + Type.Assigned.name + "_1";
                var $currChosen = $("#" + id);
                for (; min <= max; min++) {
                    var option = "<option value='" + min + "'>" + min + "</option>";
                    $currChosen.append(option);
                }
                $currChosen.chosen({
                    no_results_text: "未找到此选项",
                    width: "42%"
                });
                return false;
            }
        });
    }
});