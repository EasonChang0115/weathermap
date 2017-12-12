var vm = new Vue({
    el: "#app",
    data: {
        Taiwan_map: "",
        weather_data: [],
        location: "",
    },
    mounted: function() {
        var vobj = this;
        $.get("http://35.187.156.37/fake/Taiwan.php?name=Taiwan_map.svg", function(res) {
            vobj.Taiwan_map = res;
        }, 'text');
        $.get("http://35.187.156.37/fake/weather.php", function(res) {
            vobj.weather_data = JSON.parse(res);
        })
    },
    computed: {
        now_area: function() {
            var vobj = this;
            var result = this.weather_data.filter(function(obj) {
                return obj.Name == vobj.location;
            });
            if (result.length == 0) {
                return null;
            }
            if (result[0].Weather.indexOf("雲") > -1 && result[0].Weather.indexOf("晴") > -1) {
                $(".bclouder").css("display", "none");
                $(".wclouder").css("display", "none");
                $(".SunCould").css("display", "block");
                $(".sunbox").css("display", "none");
                $(".rainny").css("display", "none");
            } else if (result[0].Weather.indexOf("雨") > -1) {
                $(".bclouder").css("display", "none");
                $(".SunCould").css("display", "none");
                $(".sunbox").css("display", "none");
                $(".rainny").css("display", "block");
            } else {
                $(".bclouder").css("display", "block");
                $(".SunCould").css("display", "none");
                $(".sunbox").css("display", "none");
                $(".rainny").css("display", "none");
            }
            return result[0];
        }
    }
});


$(function() {
    setTimeout(function() {
        $("path").mouseenter(function(e) {
            vm.location = $(this).attr("data-name");
        })
    }, 500);
});