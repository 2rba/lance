
var defaults = [
    {
        id: 'odesk',
        name: 'ODesk',
        keys: [

        ]
    },
    {
        id: 'elance',
        name: 'Elance',
        keys: []
    }
];

function saveConfig(config){
    localStorage.setItem("config",config);
}
function loadConfig(){
    var str = localStorage.getItem("config");
    if (str){
        return JSON.parse(str);
    } else {
        return [];
    }
}
var config = defaults;
$.extend(config,loadConfig());

var app = angular.module('options', ['mgcrea.ngStrap']); //'ui.bootstrap'
app.controller('ConfigCtrl', function($scope, $compile){
    this.sites = config;
});

app.controller('SearchKeyCtrl',['$scope','$compile',function($scope,$compile){
    this.new = false;
    this.tagValue = "";
    if ($scope.skeyObj) {
        var orig = angular.copy($scope.skeyObj.value);
        if ($scope.skeyObj){
            this.tagValue = angular.copy($scope.skeyObj.tag);
        }
    } else {
        var orig = "";
    }
    this.tag=function(){
        if (this.tagValue.length>0) {
            return this.tagValue
        } else {
            return this.value.slice(0,10);
        }
    };

    this.value = angular.copy(orig);

    this.present = function(){
        return this.value.length>0;
    }
    this.changeValue = function(searches,config){
        if (this.new){
        searches.push({value: this.value, tag: this.tag()})
            this.value="";
            this.tagValue="";
        } else {
            orig = angular.copy(this.value);
            $scope.skeyObj.value = this.value;
        }
        saveConfig(angular.toJson(config.sites));
    }
    this.delete = function(index,site,config){
        site.keys.splice(index,1);
        saveConfig(angular.toJson(config.sites));
    }
    this.isValueChanged = function(){
        return !angular.equals(this.value, orig);
    }
    $scope.onKeysChange = function(){
    }

    this.changeTag = function(config,event){
        this.tagValue=$(event.target).find('input').val();
        if (!this.new){
            $scope.skeyObj.tag= this.tagValue;
            saveConfig(angular.toJson(config.sites));
        }
        $('.popover').remove();
    }


}]);




//$('body').on('click','[data-toggle="popover"]',function(e){
//    console.log(e.target);
//    $(e.target).popover(
//        {
//            html:   true,
//            content: 'lala'
//        }
//    );
////    $(e.target).popover('show');
//})
//$('.config-ctrl').popover({
//    html:   true,
////    container:  'body',
//    title: 'Change tag',
//    content: function(){
//        console.log("this");
//        console.log(angular.element($(this)).scope().skey);
//        console.log(this);
//        return angular.element($(this)).scope().skey.tagForm();
//        return ;
//    },
//    selector: '[data-toggle="popover"]'
//}).on('shown.bs.popover', function (e,v) {
//        console.log("shown");
//        console.log(e);
//        console.log(v);
//
//
////        $('.popover-input').focus();
//});