import _ from 'lodash';
import { readCsv, writeCsv } from './csv-file';
import Task, { TaskOptions } from './task';

/**
 * 定义配置
 */
export interface CsvTaskOptions extends TaskOptions {
  input: string;
  output?: string;
  options?: {
    headers?: boolean;
  };
}

export class CsvTask extends Task {
  constructor(options: CsvTaskOptions) {
    super(options);
    // 默认写回源文件
    if (!options.output) {
      (this.options as CsvTaskOptions).output = options.input;
    }
  }

  async readData() {
    let options = this.options as CsvTaskOptions;
    this.list = await readCsv(options.input, options.options);
  }

  async writeData() {
    let options = this.options as CsvTaskOptions;
    if (options.output) {
      await writeCsv(options.output, this.list, options.options);
    }
  }
}

export function createCsvTask(options: CsvTaskOptions) {
  options = _.defaultsDeep({}, options, {
    options: {
      headers: true,
    },
  });
  new CsvTask(options).run();
}
