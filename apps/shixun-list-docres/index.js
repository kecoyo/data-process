const path = require('path');
const fsExtra = require('../../common/fs-extra');
const OssClient = require('../../common/oss-client');
const config = require('../../config');

const ossClient = new OssClient(config.ossclient);

// 师训输出文档资源列表到文件
class ShiXun {
  async run() {
    let array = fsExtra.readArraySync(path.join(__dirname, './data.txt'));
    let array2 = [];
    let history = []; // 查询历史

    for (let i = 0; i < array.length; i++) {
      // const data = 'e6eb308d3d2b5019ca99778a88550572b6930daf.docx';
      const data = array[i];

      data[0] = data[0].replace('rest/dl/', ''); // rest/dl/
      data[0] = data[0].split('.')[0]; // .docx

      let prefix = 'rest/dl/' + data[0];
      if (!history.includes(prefix)) {
        let list = await ossClient.listOssFileByPrefix(prefix);
        history.push(prefix);
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          console.log(item);
          array2.push([item]);
        }
      }
    }

    fsExtra.writeArraySync(path.join(__dirname, './data.txt'), array2);
    console.log('Success');
  }
}

new ShiXun().run();
