import { snakeCase } from '@/common/change-case';
import { readdirp } from '@/common/fs-extra';
import { log } from '@/common/log';
import { runMain } from '@/common/utils';
import _ from 'lodash';
import nunjucks from 'nunjucks';
import path from 'path';

runMain(async () => {
  const files = await readdirp(path.join('d:\\output\\assets\\'), {
    fileFilter: ['*.*'],
    // directoryFilter: ['!fonts'],
  });

  const context = {};
  for (const entry of files) {
    const paths = entry.path.split('\\');
    const url = `assets/${paths.join('/')}`;
    const namePaths = paths.map((p) => snakeCase(p));

    _.set(context, namePaths, url);
    // _.set(context, namePaths, 'string');
  }

  log(context);
});
