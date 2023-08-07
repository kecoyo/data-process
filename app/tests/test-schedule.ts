// eslint-disable-next-line import/no-extraneous-dependencies
import schedule from 'node-schedule';

let [total, error, success] = [0, 0, 0];

/**
 * Jobs and Scheduling
 * https://www.npmjs.com/package/node-schedule
 *
 * Job objects are EventEmitters, and emit the following events:
 * run, scheduled, canceled, error, success
 * The cron format consists of:
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    │
 * │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 * │    │    │    │    └───── month (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, OPTIONAL)
 */
const job = schedule.scheduleJob('*/5 * * * * *', function () {
  if (Math.random() < 0.5) {
    throw new Error('hello job!');
  } else if (Math.random() < 0.8) {
    console.log('The answer to life, the universe, and everything!');
  } else {
    job.cancel();
  }
});
// console.log('🚀', job);

// A scheduled event each time they're scheduled to run.
job.addListener('scheduled', () => {
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  total++;
  console.log(total, 'scheduled');
});

// A run event after each execution.
job.addListener('run', () => {
  console.log(total, 'run');
});

// An error event when a job invocation triggered by a schedule throws or returns a rejected Promise.
job.addListener('error', () => {
  error++;
  console.log(total, 'error', error);
});

// A success event when a job invocation triggered by a schedule returns successfully or returns a resolved
job.addListener('success', () => {
  success++;
  console.log(total, 'success', success);
});

// A canceled event when an invocation is canceled before it's executed.
job.addListener('canceled', () => {
  console.log(total, 'canceled');
});
