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
            var val1 = $("#" + id_1).val();
            var val2 = $("#" + id_2).val();
            return (val1 && val2) && (val1 + this.keyword + val2);
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
            var val1 = $("#" + id_1).val();
            var val2 = $("#" + id_2).val();
            return (val1 && val2) && (val1 + this.keyword + val2);
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
            var val1 = $("#" + id_1).val();
            return val1 || undefined;
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
            var val = $("#" + name + this.name + "_1").val();
            return val && (val + "L");
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
            return "W";
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
            var val1 = $("#" + id_1).val();
            var val2 = $("#" + id_2).val();
            return (val1 && val2) && (val1 + this.keyword + val2);
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
            var val = $("#" + id_1).val();
            return val && (val + this.keyword);
        }
    }
};


var TimeObject = [

    {
        radioName: "secondType",
        min: 0,
        max: 59
    },
    {
        radioName: "minuteType",
        min: 0,
        max: 59
    },
    {
        radioName: "hourType",
        min: 0,
        max: 23
    },
    {
        radioName: "dayType",
        min: 1,
        max: 31
    },
    {
        radioName: "monthType",
        min: 1,
        max: 12
    },
    {
        radioName: "weekType",
        min: 1,
        max: 7
    },
    {
        radioName: "yearType",
        min: 2015,
        max: 2299
    }
];

/**
 * @param name 单选框按钮 name
 * @returns {String}
 */
var getChecked = function (name) {
    return $("input[type=radio][name='" + name + "']:checked").val();
};

/**
 * @param name 单选框按钮 name
 * @returns {String}
 */
var setChecked = function (name, value) {
    $("input[type=radio][name='" + name + "'][value='" + value + "']").attr("checked", true);
};


var second, minute, hour, day, month, week, year;

//init
$(function () {

    var $result = $("#result");

    TimeObject.forEach(function (v) {
        var radioName = v.radioName;
        var min = v.min;
        var max = v.max;
        var id = radioName + Type.Assigned.name + "_1";
        var $currChosen = $("#" + id);
        if ($currChosen) {
            for (; min <= max; min++) {
                var option = "<option value='" + min + "'>" + min + "</option>";
                $currChosen.append(option);
            }
            $currChosen.change(function () {
                reset();
            });
            $currChosen.chosen({
                no_results_text: "未找到此选项",
                width: "42%"
            });
        }
    });

    var $tabContentInput = $(".tab-content");

    $tabContentInput.find("input[type=radio]").change(function () {
        reset();
    });
    $tabContentInput.find("input[type=number]").keyup(function () {
        reset();
    });

    var reset = function () {
        var r = '';
        TimeObject.forEach(function (v) {
            var radioName = v.radioName;
            var value = Type[getChecked(radioName)].get(radioName);
            value = value || "未配置";
            r += value + " ";
        });

        if (r) {
            $result.val(r.trim());
        }
    };

    reset();
});