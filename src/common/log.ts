/**
 *
 * @param args
 */
export const log = (...args) => {
  let list: any[] = [];
  for (const arg of args) {
    if (typeof arg === 'object') {
      list.push(JSON.stringify(arg, null, '  '));
    } else {
      list.push(arg);
    }
  }
  console.log(...list);
};
