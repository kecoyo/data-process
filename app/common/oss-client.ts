import OSS from 'ali-oss';
import path from 'path';

class OssClient extends OSS {
  // 列出文件列表
  async listOssFile(query) {
    let list = [];
    let result = await this.list(query);
    for (let i = 0; i < result.objects.length; i++) {
      const object = result.objects[i];
      list.push(object.name);
    }
    return list;
  }

  // 列出指定前缀的文件列表
  async listOssFileByPrefix(prefix) {
    let list = [];
    let result = await this.list({
      prefix: prefix,
    });
    for (let i = 0; i < result.objects.length; i++) {
      const object = result.objects[i];
      list.push(object.name);
    }
    return list;
  }

  // 解冻OSS文件
  async restoreOssFile(name) {
    try {
      let ret = await this.restore(name);
      return ret.res.statusCode;
    } catch (err) {
      return err.code || err.status;
    }
  }

  // 修改OSS文件存储类型
  async updateOssStorageClass(file, storageClass = 'Standard') {
    try {
      let options = {
        headers: { 'x-oss-storage-class': storageClass },
      };
      let ret = await this.copy(file, file, options);
      return ret.res.statusCode;
    } catch (err) {
      return err.code || err.status;
    }
  }

  // 删除单个文件
  async deleteFile(name) {
    try {
      let ret = await this.delete(name);
      return ret.res.statusCode;
    } catch (err) {
      return err.code || err.status;
    }
  }

  async uploadFile(name, file) {
    const headers = {
      'x-oss-storage-class': 'Standard',
    };
    try {
      const ret = await this.put(name, path.normalize(file), headers);
      return ret.res.statusCode;
    } catch (err) {
      return err.code || err.status;
    }
  }
}

export default OssClient;
