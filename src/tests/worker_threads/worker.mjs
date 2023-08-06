import axios from 'axios';
import { parentPort, workerData } from 'worker_threads';

axios.get('https://file-im.oss-cn-beijing.aliyuncs.com/dmres/1/01153f526c7da2532ec9445d60059332.jpg').then(res => {
  if (parentPort) {
    parentPort.postMessage({ welcome: workerData + ', status: ' + res.status });
  }
});
