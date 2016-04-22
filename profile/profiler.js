import fs from 'fs';
import profiler from 'v8-profiler';


export const profile = (label, fn) => {
  /*eslint-disable */
  console.time(label);
  /*eslint-enable */

  fn();

  /*eslint-disable */
  console.timeEnd(label);
  /*eslint-enable */
};


export const profileWithLogs = (label, fn) => {
  profiler.startProfiling(label, true);

  fn();

  const prof = profiler.stopProfiling(label);

  prof.export((_error, result) => {
    const file = label.toLowerCase().replace(/ /g, '-') + new Date().getTime();
    fs.writeFileSync('./profile/logs/' + file + '.cpuprofile', result);
    prof.delete();
  });
};
