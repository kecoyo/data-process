const path = require('path');
const fsExtra = require('../common/fs-extra');
const OssClient = require('../common/oss-client');
const config = require('../../config.json');

const ossClient = new OssClient(config.ossclient);

/**
 * OSS恢复归档文件
 */
class ShiXun {
  async run() {
    let array = fsExtra.readArraySync(path.join(__dirname, './data.txt'));
    let result = { success: 0, fail: 0 };

    for (let i = 0; i < array.length; i++) {
      const data = array[i];

      try {
        if (!data[0]) {
          result.fail++;
          continue;
        }

        // 恢复文件
        if (!data[1] || data[1] !== '200') {
          let code = await ossClient.restoreOssFile(data[0]);
          data[1] = String(code);
        }

        // 先恢复归档文件，等几秒后，才可以修改文件类型
        // 202: 恢复操作成功
        // RestoreAlreadyInProgress: 恢复中
        // OperationNotSupported: 不支持
        // 200: 已恢复

        // 恢复文件后，校验是否成功
        if (data[1] !== '200') {
          result.fail++;
          continue;
        }

        // 修改文件类型
        if (!data[2] || data[2] !== '200') {
          let code = await ossClient.updateOssStorageClass(data[0]);
          data[2] = String(code);
        }

        // 修改文件类型后，校验是否成功
        if (data[2] !== '200') {
          result.fail++;
          continue;
        }

        result.success++;
      } catch (err) {
        console.log('🚀 ~ ShiXun ~ run ~ err', err);
      }
      console.log(data.join(' '));
    }

    fsExtra.writeArraySync(path.join(__dirname, './data.txt'), array);
    console.log(result);
  }
}

new ShiXun().run();
