// 通过fs模块的readdirSync同步函数读取public/images-min/目录下的所有文件名，再根据文件名遍历文件每个文件的详细信息，
// 此处调用fs模块的statSync同步函数。

var fs = require('fs');
var getFileinfos = function (filePath) {
  // body...
  var fileInfos = [];
  var fileTmpInfos = fs.readdirSync(filePath);
  var fileCount = fileTmpInfos.length;
  var ele = null;
  for (let i = 0; i < fileCount; i++) {
    // console.log(fileTmpInfos[i]);
    ele = fs.statSync(filePath+fileTmpInfos[i]);
    // console.log(ele);
    fileInfos[i] = {
      valueof: ele.ctime.valueOf(),
      file_name: filePath+fileTmpInfos[i],
      file_size: ele.size,
      file_latest_ch: ele.ctime.toLocaleString()
    };
  }
  // console.log(!(filePath === './public/img/'));
  if (!(filePath === './public/img/')) {
    fileInfos.sort(function (v1,v2) {
      return v2.valueof - v1.valueof;
    });
  }
  return fileInfos;
};
module.exports.getFileinfos = getFileinfos;
