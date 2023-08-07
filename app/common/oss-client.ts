import OSS from 'ali-oss';

const timeout = 60000;

export default class OssClient extends OSS {
  // 列出文件列表
  async listOssFile(query: OSS.ListObjectsQuery) {
    let list = [];
    let result = await this.list(query, { timeout });
    for (let i = 0; i < result.objects.length; i++) {
      const object = result.objects[i];
      list.push(object.name);
    }
    return list;
  }

  // 列出指定前缀的文件列表
  async listOssFileByPrefix(prefix: string) {
    let list = [];
    let result = await this.list({ prefix: prefix, 'max-keys': 1000 }, { timeout });
    for (let i = 0; i < result.objects.length; i++) {
      const object = result.objects[i];
      list.push(object.name);
    }
    return list;
  }

  // 解冻OSS文件
  async restoreOssFile(name: string) {
    try {
      // let ret = await this.restore(name);
      // return ret.status;
    } catch (err: any) {
      return err.code || err.status;
    }
  }

  // 修改OSS文件存储类型
  async updateOssStorageClass(file: string, storageClass = 'Standard') {
    try {
      let options = {
        headers: { 'x-oss-storage-class': storageClass },
      };
      // let ret = await this.copy(file, file, options);
      // return ret.res.statusCode;
    } catch (err: any) {
      return err.code || err.status;
    }
  }

  // 删除单个文件
  async deleteFile(name: string) {
    try {
      // let ret = await this.delete(name);
      // return ret.res.statusCode;
    } catch (err: any) {
      return err.code || err.status;
    }
  }

  async uploadFile(name: string, file: string) {
    const headers = {
      'x-oss-storage-class': 'Standard',
    };
    try {
      // const ret = await this.put(name, path.normalize(file), headers);
      // return ret.res.statusCode;
    } catch (err: any) {
      return err.code || err.status;
    }
  }
}
