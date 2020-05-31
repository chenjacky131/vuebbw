var copy = require('node-copydir');
var zipdir = require('zip-dir');
var rimraf = require('rimraf');
var package = require('./package.json');
var packageEnName = package.packageName;
var timeNow = new Date();
var timeMonth = timeNow.getMonth()+1 > 9 ? timeNow.getMonth()+1 : '0' + (timeNow.getMonth()+1);
var timeDate = timeNow.getDate() > 9 ? timeNow.getDate() : '0' + timeNow.getDate();
var timeHours = timeNow.getHours() > 9 ? timeNow.getHours() : '0' + timeNow.getHours();
var timeMinutes = timeNow.getMinutes() > 9 ? timeNow.getMinutes() : '0' + timeNow.getMinutes();
var timeSeconds = timeNow.getSeconds() > 9 ? timeNow.getSeconds() : '0' + timeNow.getSeconds();
var packageNameWithTime = packageEnName + timeNow.getFullYear() + timeMonth + timeDate + timeHours + timeMinutes + timeSeconds;
copy('./mobile/dist/','./' + packageNameWithTime, {}, function (err, files) {
    if(err) throw err;
}).then(function(){
    console.log('手机端拷贝完成');
    copy('./pc/dist/','./' + packageNameWithTime, {}, function (err, files) {
        if(err) throw err;
    }).then(function(){
        console.log('PC端拷贝完成');

        zipdir('./' + packageNameWithTime, { saveTo: './' + packageNameWithTime + '.zip' }, function (err, buffer) {
            if(err) throw err;
            rimraf('./' + packageNameWithTime,{}, function (err, data) {
                if(err) throw err;
                console.log(packageNameWithTime +' 文件夹删除成功');
            });
            console.log(packageNameWithTime +'.zip  压缩完成.');
        });
    });
});