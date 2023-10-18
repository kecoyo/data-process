import { getSchoolInfoCache } from '@/apis/eduyunApi';
import { createCsvTask } from '@/common/csv-task';
import { downloadFile } from '@/common/request';
import fs from 'fs-extra';
import path from 'path';

const outDir = 'D:\\output\\certImgs'; // 输出目录

/**
 * 导出云平台证书图片
 */
createCsvTask({
  input: path.join(__dirname, './export-cert-img.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    const certImg = row.CertImg;

    const extName = path.extname(certImg);
    const fileName = row.UserName + '_' + row.CertNo + extName;

    let provinceName = '';
    let cityName = '';
    let countyName = '';
    let schoolName = '';

    if (row.SchoolId != '0') {
      const schoolInfo = await getSchoolInfoCache(Number(row.SchoolId));
      if (schoolInfo) {
        cityName = schoolInfo.city_name; // '淮北市';
        countyName = schoolInfo.county_name; // '市直属';
        provinceName = schoolInfo.province_name; // '安徽省';
        schoolName = schoolInfo.school_name; // '人民路学校';
      }
    }

    // 文件输出路径
    const outFile = path.join(outDir, provinceName, cityName, countyName, schoolName, fileName);
    // 确保文件输出目录存在
    fs.ensureDirSync(path.dirname(outFile));
    // 下载文件
    await downloadFile(certImg, outFile);
  },
});
