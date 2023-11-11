import { resourceLoad, videoCheck } from '@/apis/rescApi';
import { createCsvTask } from '@/common/csv-task';
import axios from 'axios';
import _ from 'lodash';
import path from 'path';

/**
 * 检查师训资源是否存在
 */
createCsvTask({
  input: path.join(__dirname, './check_res_exists.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    // 检查视频资源
    if (row.res_type == 1) {
      // 检查封面图
      if (row.res_cover) {
        try {
          let res = await axios.head(row.res_cover);
          row.res_cover_status = res.status; // 200
        } catch (err: any) {
          row.res_cover_status = err.message;
        }
      } else {
        row.res_cover_status = 'no res_cover';
      }

      // 检查视频文件
      if (row.res_file) {
        const video = await videoCheck(row.res_file);
        if (video) {
          try {
            let res = await axios.head(video.uri);
            row.res_file_status = res.status; // 200
          } catch (err: any) {
            row.res_file_status = err.message;
          }
        } else {
          row.res_file_status = 'no video';
        }
      } else {
        row.res_file_status = 'no res_file';
      }
    }

    // 检查文档资源
    if (row.res_type == 3) {
      if (row.res_file) {
        const resource = await resourceLoad(row.res_file);
        if (resource) {
          let resource_url = '';
          if (resource.img_info) {
            const imgInfos = JSON.parse(resource.img_info);
            resource_url = _.get(imgInfos, '[0].file');
          }
          if (resource_url) {
            try {
              let res = await axios.head(`https://fileimosscdn.lejiaolexue.com/rest/dl/${resource_url}`);
              row.res_file_status = res.status; // 200
            } catch (err: any) {
              row.res_file_status = err.message;
            }
          } else {
            row.res_file_status = 'no resource_url';
          }
        } else {
          row.res_file_status = 'no resource';
        }
      } else {
        row.res_file_status = 'no res_file';
      }
    }
  },
});
