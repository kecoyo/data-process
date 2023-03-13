const path = require('path');
const OssClient = require('../../common/oss-client');
const { createCsvTask } = require('../../common/task');
const config = require('../../config.json');

const ossClient = new OssClient(Object.assign({}, config.ossclient, { bucket: 'file-im' }));

/**
 * OSS恢复归档文件
 */
createCsvTask({
  input: path.join(__dirname, './restore_file-input.csv'),
  processRow: async (row, i) => {
    if (!row.oss_file) {
      throw new Error('缺少参数：(oss_file)');
    }

    // 恢复文件
    if (!row.restore_status || row.restore_status !== '200') {
      let code = await ossClient.restoreOssFile(row.oss_file);
      row.restore_status = String(code);
    }

    // 先恢复归档文件，等几秒后，才可以修改文件类型
    // 202: 恢复操作成功
    // RestoreAlreadyInProgress: 恢复中
    // OperationNotSupported: 不支持
    // 200: 已恢复

    // 恢复文件后，校验是否成功
    if (row.restore_status !== '200') {
      throw new Error(row.restore_status);
    }

    // 修改文件类型
    if (!row.update_status || row.update_status !== '200') {
      let code = await ossClient.updateOssStorageClass(row.oss_file);
      row.update_status = String(code);
    }

    // 修改文件类型后，校验是否成功
    if (row.update_status !== '200') {
      throw new Error(row.update_status);
    }
  },
});
