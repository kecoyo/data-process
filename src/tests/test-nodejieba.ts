import nodejieba from 'nodejieba';

const topN = 4;
const result = nodejieba.extract('升职加薪，当上CEO，走上人生巅峰。', topN);
console.log(JSON.stringify(result, null, '  '));

const result2 = nodejieba.cut('南京市长江大桥');
console.log(result2);
